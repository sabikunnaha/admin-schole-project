import { UserCog } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { FiCalendar } from "react-icons/fi";
import { BiReset } from "react-icons/bi";

export const studentMenu = [
  { title: "Dashboard", icon: RxDashboard, path: "student/dashboard" },

  {
    title: "Teacher",
    icon: UserCog,
    children: [{ title: "Teacher List", path: "teacher/list" }],
  },

  {
    title: "Holiday",
    icon: FiCalendar,
    path: "holiday",
  },

  {
    title: "Tools",
    icon: BiReset,
    children: [{ title: "Reset", path: "tool/reset", action: "reset" }],
  },
];