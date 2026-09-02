import type { SelectField } from "payload";

export const departmentOptions = [
  { label: "Marketing", value: "marketing" },
  { label: "Events Brothers", value: "events_brothers" },
  { label: "Events Sisters", value: "events_sisters" },
  {
    label: "Religious Affairs Brothers",
    value: "religious_affairs_brothers",
  },
  {
    label: "Religious Affairs Sisters",
    value: "religious_affairs_sisters",
  },
  { label: "Finance", value: "finance" },
  { label: "Community Engagement", value: "community_engagement" },
  { label: "Operations", value: "operations" },
  { label: "Technology", value: "technology" },
] satisfies NonNullable<SelectField["options"]>;

export const planningStatusOptions = [
  { label: "Not started", value: "not_started" },
  { label: "In progress", value: "in_progress" },
  { label: "Ready for review", value: "ready_for_review" },
  { label: "Done", value: "done" },
] satisfies NonNullable<SelectField["options"]>;
