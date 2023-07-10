import { IProject } from "@/types/interfaces/IProject"
import { IResume } from "@/types/interfaces/IResume"
import { IUser } from "@/types/interfaces/IUser"

export const resumesMockMany: IResume[] = [
  {
    id: 1,
    direction: "Software Development",
    description:
      "Experienced software developer proficient in multiple programming languages.",
    isActive: true,
    skills: ["Java", "Python", "JavaScript"],
    createWhen: 1625414400, // Example epoch timestamp (July 5, 2021)
  },
  {
    id: 2,
    direction: "Data Analysis",
    description:
      "Skilled data analyst with expertise in statistical analysis and data visualization.",
    isActive: false,
    skills: ["R", "Python", "SQL"],
    createWhen: 1631203200, // Example epoch timestamp (September 10, 2021)
  },
  {
    id: 3,
    direction: "UI/UX Design",
    description:
      "Creative UI/UX designer specializing in user-centered design principles.",
    isActive: true,
    skills: ["Adobe XD", "Sketch", "InVision"],
    createWhen: 1635475200, // Example epoch timestamp (October 29, 2021)
  },
  {
    id: 1,
    direction: "Software Development",
    description:
      "Experienced software developer proficient in multiple programming languages.",
    isActive: true,
    skills: ["Java", "Python", "JavaScript"],
    createWhen: 1625414400, // Example epoch timestamp (July 5, 2021)
  },
  {
    id: 2,
    direction: "Data Analysis",
    description:
      "Skilled data analyst with expertise in statistical analysis and data visualization.",
    isActive: false,
    skills: ["R", "Python", "SQL"],
    createWhen: 1631203200, // Example epoch timestamp (September 10, 2021)
  },
  {
    id: 3,
    direction: "UI/UX Design",
    description:
      "Creative UI/UX designer specializing in user-centered design principles.",
    isActive: true,
    skills: ["Adobe XD", "Sketch", "InVision"],
    createWhen: 1635475200, // Example epoch timestamp (October 29, 2021)
  },
  {
    id: 1,
    direction: "Software Development",
    description:
      "Experienced software developer proficient in multiple programming languages.",
    isActive: true,
    skills: ["Java", "Python", "JavaScript"],
    createWhen: 1625414400, // Example epoch timestamp (July 5, 2021)
  },
  {
    id: 2,
    direction: "Data Analysis",
    description:
      "Skilled data analyst with expertise in statistical analysis and data visualization.",
    isActive: false,
    skills: ["R", "Python", "SQL"],
    createWhen: 1631203200, // Example epoch timestamp (September 10, 2021)
  },
  {
    id: 3,
    direction: "UI/UX Design",
    description:
      "Creative UI/UX designer specializing in user-centered design principles.",
    isActive: true,
    skills: ["Adobe XD", "Sketch", "InVision"],
    createWhen: 1635475200, // Example epoch timestamp (October 29, 2021)
  },
  {
    id: 1,
    direction: "Software Development",
    description:
      "Experienced software developer proficient in multiple programming languages.",
    isActive: true,
    skills: ["Java", "Python", "JavaScript"],
    createWhen: 1625414400, // Example epoch timestamp (July 5, 2021)
  },
]

export const resumesMock: IResume[] = [
  {
    id: 1,
    direction: "Software Development",
    description:
      "Experienced software developer proficient in multiple programming languages.",
    isActive: true,
    skills: ["Java", "Python", "JavaScript"],
    createWhen: 1625414400, // Example epoch timestamp (July 5, 2021)
  },
  {
    id: 2,
    direction: "Data Analysis",
    description:
      "Skilled data analyst with expertise in statistical analysis and data visualization.",
    isActive: false,
    skills: ["R", "Python", "SQL"],
    createWhen: 1631203200, // Example epoch timestamp (September 10, 2021)
  },
  {
    id: 3,
    direction: "UI/UX Design",
    description:
      "Creative UI/UX designer specializing in user-centered design principles.",
    isActive: true,
    skills: ["Adobe XD", "Sketch", "InVision"],
    createWhen: 1635475200, // Example epoch timestamp (October 29, 2021)
  },
]

export const projectsMock: IProject[] = [
  {
    id: 1,
    leadId: 1001,
    title: "E-commerce Website",
    theme: "Web Development",
    description: "Building an online store for selling various products.",
    status: "In Progress",
    createWhen: 1654492800, // Example epoch timestamp (June 6, 2022)
  },
  {
    id: 2,
    leadId: 1002,
    title: "Data Analysis Dashboard",
    theme: "Data Analytics",
    description: "Developing a dashboard for visualizing and analyzing data.",
    status: "Completed",
    createWhen: 1663190400, // Example epoch timestamp (September 14, 2022)
  },
  {
    id: 3,
    leadId: 1003,
    title: "Mobile App Development",
    theme: "Mobile Application",
    description: "Creating a mobile app for managing tasks and reminders.",
    status: "On Hold",
    createWhen: 1671292800, // Example epoch timestamp (December 17, 2022)
  },
]

export const userMock: IUser = {
  id: 1,
  email: "example@example.com",
  password: "mypassword123",
  name: "John",
  surname: "Doe",
  picture:
    "https://sun9-31.userapi.com/impg/isjEmyfk5Q2x-oPznsh5pDiktKy8WXSCzKYwfw/cejg6hJfz5A.jpg?size=736x736&quality=95&sign=f9c18865eed5d6aa2182344ee6248cbd&type=album",
  mainInformation: "Experienced software engineer with a passion for coding.",
  contacts: ["https://github.com/luvlaceeeee", "https://t.me/luv044"],
  createWhen: 1678924800, // Example epoch timestamp (March 17, 2023)
}
