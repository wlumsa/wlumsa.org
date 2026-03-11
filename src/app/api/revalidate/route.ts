import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.PAYLOAD_SECRET || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const paths: string[] = Array.isArray(body?.paths)
    ? body.paths.filter((value: unknown): value is string => typeof value === "string" && value.startsWith("/"))
    : [];

  if (paths.length === 0) {
    return NextResponse.json({ ok: false, error: "No valid paths provided" }, { status: 400 });
  }

  for (const path of new Set<string>(paths)) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: paths });
}
