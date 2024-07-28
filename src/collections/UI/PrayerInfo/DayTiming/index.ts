import { CollectionConfig } from "payload";

const PrayerTimingsMonth: CollectionConfig = {
  slug: "prayer-timings-month",
  admin: {
    group: "UI",
  },
  fields: [
    {
      name: "month",
      label: "Month",
      type: "array",
      required: true,
      maxRows: 12,
      fields: [
        {
          name: "month",
          type: "text",
          required: true,
        },
        {
          name: "days",
          type: "array",
          required: true,
          maxRows: 31,
          fields: [
            {
              name: "day",
              label: "Day",
              type: "number",
              required: true,
            },
            {
              name: "fajr",
              label: "Fajr",
              type: "text",
              required: true,
            },
            {
              name: "fajr_iqamah",
              label: "Fajr Iqamah",
              type: "text",
              required: false,
            },
            {
              name: "sunrise",
              label: "Sunrise",
              type: "text",
              required: true,
            },
            {
              name: "dhuhr",
              label: "Dhuhr",
              type: "text",
              required: true,
            },
            {
              name: "dhuhr_iqamah",
              label: "Dhuhr Iqamah",
              type: "text",
              required: true,
            },
            {
              name: "asr",
              label: "Asr",
              type: "text",
              required: true,
            },
            {
              name: "asr_iqamah",
              label: "Asr Iqamah",
              type: "text",
              required: true,
            },
            {
              name: "maghrib",
              label: "Maghrib",
              type: "text",
              required: true,
            },
            {
              name: "maghrib_iqamah",
              label: "Maghrib Iqamah",
              type: "text",
              required: true,
            },
            {
              name: "isha",
              label: "Isha",
              type: "text",
              required: true,
            },
            {
              name: "isha_iqamah",
              label: "Isha Iqamah",
              type: "text",
              required: false,
            },
          ],
        },
      ],
    },
  ],
};

export default PrayerTimingsMonth;
