import { CollectionConfig } from "payload";

export const WeeklyPrayerTimetables: CollectionConfig = {
  slug: "weekly-prayer-timetables", 
  admin: {
    useAsTitle: "weekLabel",
    group: "Prayer Info",
    defaultColumns: ["weekLabel", "weekKey", "scrapedAt", "updatedAt"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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
