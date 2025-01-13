import { GlobalConfig} from "payload";

const PrayerTimings: GlobalConfig = {
  slug: "prayer-timings",
  admin: {
    group: "Prayer Info",
    
  }, 
  access: {
    update: () => true,
    read:()=> true,
    
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
          type: "select",
          options: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          required: true,
          unique: true,
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
              name: "dhuhr_iqamah_1",
              label: "Dhuhr Iqamah 1",
              type: "text",
              required: true,
            },
            {
              name: "dhuhr_iqamah_2",
              label: "Dhuhr Iqamah 2",
              type: "text",
              required: false,
            },
            {
              name: "asr",
              label: "Asr",
              type: "text",
              required: true,
            },
            {
              name: "asr_iqamah_1",
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

export default PrayerTimings;
