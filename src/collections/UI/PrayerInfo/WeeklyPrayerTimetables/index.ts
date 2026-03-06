import { GlobalConfig } from "payload";

export const WeeklyPrayerTimetables: GlobalConfig = {
  slug: "weekly-prayer-timetables",
  admin: {
    group: "Prayer Info",
  },
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "weekKey",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Week Key",
    },
    {
      name: "weekLabel",
      type: "text",
      required: true,
      label: "Week Label",
    },
    {
      name: "sourceUrl",
      type: "text",
      required: true,
      label: "Source URL",
    },
    {
      name: "scrapedAt",
      type: "date",
      required: true,
      label: "Scraped At",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "headers",
      type: "json",
      required: true,
      label: "Headers",
    },
    {
      name: "rows",
      type: "json",
      required: true,
      label: "Rows",
    },
  ],
};

export default WeeklyPrayerTimetables;
