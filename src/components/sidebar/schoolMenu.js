import { GraduationCap, CreditCard } from "lucide-react";
import { TbAddressBook, TbUsersGroup, TbUserShield } from "react-icons/tb";
import { LuLayoutDashboard, LuUsers, LuCalendarCheck2, LuCalendarClock } from "react-icons/lu";
import { FiCalendar, FiBell } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { BiReset, BiSolidCalendarExclamation } from "react-icons/bi";

export const schoolMenu = [
  { title: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },

  {
    title: "Teacher",
    icon: LuUsers,
    children: [
      { title: "Teacher List", path: "teacher/list" },
      { title: "Class Permission", path: "teacher/permission" },
    ],
  },

  {
    title: "Student",
    icon: GraduationCap,
    children: [
      { title: "Student List", path: "student/list" },
      { title: "Class Time", path: "student/class-time" },
      { title: "Promote Request", path: "student/promote-request" },
    ],
  },

  {
    title: "Guardian",
    icon: TbUserShield,
    children: [{ title: "Guardian List", path: "guardian/list" }],
  },

  {
    title: "Academic",
    icon: TbAddressBook,
    children: [
      { title: "Class", path: "academic/class" },
      { title: "Group", path: "academic/group" },
      { title: "Section", path: "academic/section" },
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
    title: "Leaves",
    icon: LuCalendarClock,
    children: [{ title: "Leave List", path: "leave/list" }],
  },

  {
    title: "Holiday",
    icon: FiCalendar,
    path: "holiday",
  },

  {
    title: "Inventory",
    icon: MdOutlineInventory2,
    children: [
      { title: "Income", path: "inventory/income" },
      { title: "Expense", path: "inventory/expense" },
    ],
  },

  {
    title: "Announcement",
    icon: FiBell,
    children: [{ title: "Send Notice", path: "announcement/notice" }],
  },

  {
    title: "Account",
    icon: RiAccountPinBoxLine,
    children: [
      { title: "Add Account", path: "account/add" },
      { title: "Cash In Request", path: "account/cash-in-request" },
    ],
  },

  {
    title: "Report",
    icon: BiSolidCalendarExclamation,
    children: [
      { title: "Today", path: "report/today" },
      { title: "Monthly", path: "report/monthly" },
    ],
  },

  {
    title: "Tools",
    icon: BiReset,
    children: [{ title: "Reset", path: "tool/reset", action: "reset" }],
  },
];