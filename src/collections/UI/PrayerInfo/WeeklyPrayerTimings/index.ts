import { CollectionConfig } from "payload";

const WeeklyPrayerTimings: CollectionConfig = {
  slug: "weekly-prayer-timings",
  admin: {
    useAsTitle: "weekLabel",
    group: "Prayer Info",
    defaultColumns: ["weekLabel", "weekStart", "weekEnd", "fetchedAt", "sourceUrl"],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "weekLabel",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "weekStart",
      type: "date",
      required: true,
      index: true,
    },
    {
      name: "weekEnd",
      type: "date",
      required: true,
    },
    {
      name: "sourceUrl",
      type: "text",
      required: true,
    },
    {
      name: "fetchedAt",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
          displayFormat: "MMM d, yyyy h:mm aa",
          timeIntervals: 15,
        },
      },
    },
    {
      name: "rows",
      type: "array",
      required: true,
      minRows: 7,
      maxRows: 7,
      fields: [
        {
          name: "dateISO",
          label: "Date (ISO)",
          type: "text",
          required: true,
        },
        {
          name: "weekday",
          type: "text",
          required: true,
        },
        {
          name: "fajr",
          type: "text",
          required: true,
        },
        {
          name: "fajrIqamah",
          type: "text",
          required: false,
        },
        {
          name: "sunrise",
          type: "text",
          required: true,
        },
        {
          name: "dhuhr",
          type: "text",
          required: true,
        },
        {
          name: "dhuhrIqamah",
          type: "text",
          required: false,
        },
        {
          name: "asr",
          type: "text",
          required: true,
        },
        {
          name: "asrIqamah",
          type: "text",
          required: false,
        },
        {
          name: "maghrib",
          type: "text",
          required: true,
        },
        {
          name: "maghribIqamah",
          type: "text",
          required: false,
        },
        {
          name: "isha",
          type: "text",
          required: true,
        },
        {
          name: "ishaIqamah",
          type: "text",
          required: false,
        },
        {
          name: "jumuahKhutbah",
          type: "text",
          required: false,
        },
      ],
    },
    {
      name: "rawSnapshot",
      type: "json",
      required: false,
      admin: {
        description: "Captured raw table data for debugging parser changes.",
      },
    },
  ],
};

export default WeeklyPrayerTimings;
