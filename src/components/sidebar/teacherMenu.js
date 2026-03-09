import { GraduationCap } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { LuCalendarCheck2 } from "react-icons/lu";
import { BiReset } from "react-icons/bi";

export const teacherMenu = [
  { title: "Dashboard", icon: RxDashboard, path: "teacher/dashboard" },

  {
    title: "Student",
    icon: GraduationCap,
    children: [
      { title: "Student List", path: "student/list" },
      { title: "Class Time", path: "student/class-time" },
    ],
  },

  {
    title: "Attendance",
    icon: LuCalendarCheck2,
    children: [
      { title: "Teacher Attendance", path: "attendance/teacher" },
      { title: "Student Attendance", path: "attendance/student" },
    ],
  },

  {
    title: "Tools",
    icon: BiReset,
    children: [{ title: "Reset", path: "tool/reset", action: "reset" }],
  },
];