import { IProject } from "@/types/interfaces/IProject"

export const projectsMock: IProject[] = [
  {
    id: 1,
    leadId: 1001,
    title: "E-commerce Website",
    theme: "Web Development",
    description: "Building an online store for selling various products.",
    status: "In Progress",
    createdWhen: 1654492800, // Example epoch timestamp (June 6, 2022)
  },
  {
    id: 2,
    leadId: 1002,
    title: "Data Analysis Dashboard",
    theme: "Data Analytics",
    description: "Developing a dashboard for visualizing and analyzing data.",
    status: "Completed",
    createdWhen: 1663190400, // Example epoch timestamp (September 14, 2022)
  },
  {
    id: 3,
    leadId: 1003,
    title: "Mobile App Development",
    theme: "Mobile Application",
    description: "Creating a mobile app for managing tasks and reminders.",
    status: "On Hold",
    createdWhen: 1671292800, // Example epoch timestamp (December 17, 2022)
  },
]
