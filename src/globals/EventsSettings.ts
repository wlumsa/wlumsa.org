import { GlobalConfig } from "payload";

const EventsSettings: GlobalConfig = {
  slug: "events-settings",
  admin: {
    group: "App",
  },
  fields: [
    {
      name: "mode",
      type: "select",
      required: true,
      defaultValue: "auto",
      label: "Events display mode",
      options: [
        {
          label: "Auto",
          value: "auto",
        },
        {
          label: "Quiet Season",
          value: "quiet",
        },
      ],
    },
    {
      name: "quietMessage",
      type: "textarea",
      required: false,
      label: "Quiet season message (optional)",
      admin: {
        description:
          "Shown on the events page when mode is set to Quiet Season. Leave empty to use the default message.",
      },
    },
  ],
};

export default EventsSettings;
