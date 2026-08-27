import config from "@payload-config";
import { getPayload } from "payload";
import { NextResponse } from "next/server";

import type { ContentSchedule, EventTask, Exec } from "@/payload-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production";
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function getAssignees(item: ContentSchedule | EventTask): Exec[] {
  return (item.assignees ?? []).filter(
    (assignee): assignee is Exec => typeof assignee === "object"
  );
}

function getServerURL() {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayload({ config });
  const now = new Date();
  const reminderWindowEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const commonWhere = {
    and: [
      { status: { not_equals: "done" } },
      { reminderSentAt: { exists: false } },
    ],
  } as const;

  const [tasks, posts] = await Promise.all([
    payload.find({
      collection: "event-tasks",
      depth: 1,
      limit: 200,
      overrideAccess: true,
      where: {
        and: [
          ...commonWhere.and,
          { dueDate: { greater_than_equal: now.toISOString() } },
          { dueDate: { less_than_equal: reminderWindowEnd.toISOString() } },
        ],
      },
    }),
    payload.find({
      collection: "content-schedule",
      depth: 1,
      limit: 200,
      overrideAccess: true,
      where: {
        and: [
          ...commonWhere.and,
          { scheduledFor: { greater_than_equal: now.toISOString() } },
          {
            scheduledFor: {
              less_than_equal: reminderWindowEnd.toISOString(),
            },
          },
        ],
      },
    }),
  ]);

  let remindersSent = 0;
  const adminURL = `${getServerURL()}/admin`;

  for (const task of tasks.docs) {
    const assignees = getAssignees(task);
    if (assignees.length === 0) continue;

    await Promise.all(
      assignees.map((assignee) =>
        payload.sendEmail({
          subject: `Due tomorrow: ${task.title}`,
          text: `Salam ${assignee.name || ""},\n\n“${
            task.title
          }” is due within the next 24 hours.\n\nOpen your tasks: ${adminURL}`,
          to: assignee.email,
        })
      )
    );
    await payload.update({
      collection: "event-tasks",
      id: task.id,
      data: { reminderSentAt: new Date().toISOString() },
      overrideAccess: true,
    });
    remindersSent += assignees.length;
  }

  for (const post of posts.docs) {
    const assignees = getAssignees(post);
    if (assignees.length === 0) continue;

    await Promise.all(
      assignees.map((assignee) =>
        payload.sendEmail({
          subject: `Scheduled tomorrow: ${post.title}`,
          text: `Salam ${assignee.name || ""},\n\n“${
            post.title
          }” is scheduled within the next 24 hours.\n\nOpen your tasks: ${adminURL}`,
          to: assignee.email,
        })
      )
    );
    await payload.update({
      collection: "content-schedule",
      id: post.id,
      data: { reminderSentAt: new Date().toISOString() },
      overrideAccess: true,
    });
    remindersSent += assignees.length;
  }

  return NextResponse.json({
    ok: true,
    remindersSent,
    checked: tasks.totalDocs + posts.totalDocs,
  });
}
