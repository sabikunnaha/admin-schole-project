import {
  Home,
  GraduationCap,
  UserCog,
  BookOpen,
  CreditCard,
  ShoppingCart,
  Wallet,
  Settings,
} from "lucide-react";
import { FiUsers, FiBell, FiCalendar } from "react-icons/fi";

import {
  MdOutlineInventory2,
} from "react-icons/md";

import { RiAccountPinBoxLine, RiMoneyDollarCircleLine } from "react-icons/ri";

import { GiBookAura } from "react-icons/gi";

import {
  BiReset,
  BiSolidCalendarExclamation,
  BiSolidSchool,
} from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import {
  LuCalendarCheck2,
  LuCalendarClock,
  LuLayoutDashboard,
  LuUserRoundPlus,
  LuUsers,
} from "react-icons/lu";
import {
  TbAddressBook,
  TbApiApp,
  TbList,
  TbReportMoney,
  TbSchoolBell,
  TbUsersGroup,
  TbUserShield,
} from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";

export const sidebarMenu = (role) => {
  // ================= Admin Menu =================
  const adminMenu = [
    {
      title: "Dashboard",
      icon: LuLayoutDashboard,
      children: [
        { title: "Admin", path: "/admin/dashboard" },
        { title: "School", path: "/school/dashboard" },
        { title: "Teacher", path: "/teacher/dashboard" },
        { title: "Student", path: "/student/dashboard" },
      ],
    },
    {
      title: "Landing Page",
      icon: Home,

      children: [
        { title: "View", path: "/landing/see" },
        { title: "Edit Page", path: "/landing/edit" },
        { title: "Add Page", path: "/landing/add" },
      ],
    },
    {
      title: "Subscription",
      icon: LuUserRoundPlus,
      children: [
        { title: "Create ", path: "/membership/plan" },
        { title: "Active ", path: "/membership/active" },
        {
          title: "Unactive ",
          path: "/membership/unactive",
        },
      ],
    },
    {
      title: "School Details",
      icon: TbSchoolBell,
      children: [
        { title: "School List", path: "/school/list" },
        { title: "Pending List", path: "/school/pending" },
      ],
    },
    {
      title: "Transaction",
      icon: GrTransaction,
      children: [
        { title: "Cash in request ", path: "/transaction/cashin" },
        { title: "Statement ", path: "/transaction/cashout" },
      ],
    },
    {
      title: "Financial & Profit",
      icon: TbReportMoney,
      children: [
        { title: "Paid", path: "/financial/profit" },
        { title: "Due", path: "/financial/balance" },
      ],
    },

    {
      title: "Integration API",
      icon: TbApiApp,
      children: [{ title: " Payment API", path: "/integration/payment" }],
    },

    {
      title: "Profile Tool",
      icon: BiReset,
      children: [{ title: "Reset", path: "/profile/reset" }],
    },
  ];

  // ================= School Menu =================
  const schoolMenu = [
    { title: "Dashboard", icon: LuLayoutDashboard, path: "/school/dashboard" },

    {
      title: "Teacher",
      icon: LuUsers,
      children: [
        { title: "Teacher List", path: "teacherlist" },

        {
          title: "Class Permission",
          path: "permissionlist",
        },
      ],
    },

    {
      title: "Student",
      icon: GraduationCap,
      children: [
        { title: "Student List", path: "studentlist" },

        { title: "Class Time", path: "classtimelist" },
        {
          title: "Promote Request",
          path: "promoterequest",
        },
      ],
    },

    {
      title: "Guardian",
      icon: TbUserShield,
      children: [{ title: "Guardian List", path: "guardianlist" }],
    },

    {
      title: "Academic",
      icon: TbAddressBook,
      children: [
        { title: "Class", path: "classlist" },
        { title: "Group", path: "grouplist" },
        { title: "Section", path: "sectionlist" },
        { title: "Session", path: "sessionlist" },
        { title: "Subject", path: "subjectlist" },
        { title: "Syllabus", path: "syllabus" },
        { title: "Class Routine", path: "routine" },
      ],
    },

    {
      title: "Examination",
      icon: BookOpen,
      children: [
        { title: "Exam Name", path: "examlist" },
        { title: "Exam Routine", path: "examroutine" },
        { title: "Grade", path: "examgrade" },
        { title: "Admit Card", path: "examadmit" },
        { title: "Seat Number", path: "examsitnumber" },

        { title: "Schedule", path: "exam/schedule" },
        { title: "Result Find", path: "exam/result" },
        { title: "Certificate", path: "exam/certificate" },
      ],
    },

    {
      title: "Fee Management",
      icon: CreditCard,
      children: [
        { title: "Fees Type", path: "fee/type" },
        { title: "Discount", path: "fee/discount" },
        { title: "Payment", path: "fee/collection" },
      ],
    },

    {
      title: "HRM",
      icon: TbUsersGroup,
      children: [
        {
          title: "Employee",
          path: "hrm/employee",
        },
        { title: "Payroll", path: "hrm/payroll" },
        { title: "Role & permission", path: "hrm/role-permission" },
      ],
    },

    {
      title: "Attendance",
      icon: LuCalendarCheck2, // group icon for attendance section
      children: [
        {
          title: "Teacher ",
          path: "teacher/attendance",
        },
        {
          title: "Student ",
          path: "student/attendance",
        },
      ],
    },

    // Leaves Sub-section
    {
      title: "Leaves",
      icon: LuCalendarClock, // section icon for leaves
      children: [
        {
          title: "Leave List  ",
          path: "leaveList",
        },
      ],
    },

    {
      title: "Holiday",
      path: "holiday",
      icon: FiCalendar, // holiday calendar
    },

    {
      title: "Invantory",
      icon: MdOutlineInventory2, // Main section icon
      children: [
        { title: "Income", path: "invantory/income" },
        { title: "Expense", path: "invantory/expense" },

        { title: "Purchase", path: "invantory/purchase" },
        { title: "Return", path: "invantory/return" },
        { title: "Payment", path: "invantory/payment" },
      ],
    },

    {
      title: "Announcement",
      icon: FiBell,
      children: [
        {
          title: "Send Notice",
          path: "announcement/notice",
        },
      ],
    },
    {
      title: "Account",
      icon: RiAccountPinBoxLine,
      children: [
        {
          title: "Add Account",
          path: "account/add",
        },
        {
          title: " Cash in request ",
          path: "account/cash-in-request",
        },
      ],
    },

    {
      title: "Report",
      icon: BiSolidCalendarExclamation, // Example icon for reports
      children: [
        { title: "Today", path: "report/today" },
        {
          title: "Monthly",
          path: "report/monthly",
        },

        { title: "Profit / Loss", path: "report/profit-loss" },
      ],
    },

    {
      title: "Tools",
      icon: BiReset, // Main section icon
      children: [
        { title: "Reset", path: "tool/reset" }, // Feather rotate icon
      ],
    },
  ];
  // ================= Teacher Menu =================
  const teacherMenu = [
    { title: "Dashboard", icon: RxDashboard, path: "/teacher/dashboard" },

    {
      title: "Teacher",
      icon: LuUsers,
      children: [
        { title: "Teacher List", path: "teacherlist" },

        {
          title: "Class Permission",
          path: "permissionlist",
        },
        {
          title: "Assignment",
          path: "teacher/assignment",
        },
      ],
    },

    {
      title: "Student",
      icon: GraduationCap,
      children: [
        { title: "Student List", path: "studentlist" },

        { title: "Class Time", path: "classtimelist" },
      ],
    },

    {
      title: "Guardian",
      icon: TbUserShield,
      children: [{ title: "Guardian List", path: "guardianlist" }],
    },

    {
      title: "Academic",
      icon: TbAddressBook,
      children: [
        { title: "Class", path: "classlist" },
        { title: "Group", path: "grouplist" },
        { title: "Section", path: "sectionlist" },
        { title: "Session", path: "sessionlist" },
        { title: "Subject", path: "subjectlist" },
        { title: "Syllabus", path: "syllabus" },
        { title: "Class Routine", path: "routine" },
      ],
    },

    {
      title: "Examination",
      icon: BookOpen,
      children: [
        { title: "Exam Name", path: "/exam/name" },
        { title: "Exam Routine", path: "/exam/routine" },
        { title: "Grade", path: "/exam/grade" },
        { title: "Admit Card", path: "/exam/admit" },
        { title: "Seat Number", path: "/exam/sitnumber" },
        { title: "Mark Submit", path: "/exam/marksubmit" },
        { title: "Result Find", path: "/exam/result" },
        { title: "Certificate", path: "/exam/certificate" },
      ],
    },

    {
      title: "Fee Management",
      icon: Wallet,
      children: [{ title: "Payment", path: "/fee/payment" }],
    },
    {
      title: "HRM",
      icon: TbUsersGroup,
      children: [{ title: "Payroll", path: "/hrm/payroll" }],
    },

    {
      title: "Attendance",
      icon: LuCalendarCheck2,
      children: [
        {
          title: "Teacher ",
          path: "teacher/attendance",
        },
        {
          title: "Student ",
          path: "student/attendance",
        },
      ],
    },

    // Leaves Sub-section
    {
      title: "Leaves",
      icon: LuCalendarClock, // section icon for leaves
      children: [
        {
          title: "Leave Request",
          path: "leaveList",
        },
      ],
    },

    {
      title: "Holiday",
      path: "holiday",
      icon: FiCalendar, // holiday calendar
    },
    {
      title: "Tools",
      icon: BiReset, // Main section icon
      children: [
        { title: "Reset", path: "tool/reset" }, // Feather rotate icon
      ],
    },
  ];

  // ================= Student Menu =================
  const studentMenu = [
    {
      title: "Dashboard",
      icon: RxDashboard,
      path: "/student/dashboard",
    },

    {
      title: "Teacher",
      icon: UserCog,
      children: [{ title: "Teacher List", path: "teacherlist" }],
    },

    {
      title: "Student",
      icon: GraduationCap,
      children: [
        { title: "Student List", path: "studentlist" },

        { title: "Class Time", path: "classtimelist" },
        { title: "Class Promote", path: "promoterequest" },
        { title: "Assignment", path: "student/assignment" },
      ],
    },

    {
      title: "Academic",
      icon: GiBookAura,
      children: [
        { title: "Class", path: "classlist" },
        { title: "Group", path: "grouplist" },
        { title: "Section", path: "sectionlist" },
        { title: "Session", path: "sessionlist" },
        { title: "Subject", path: "subjectlist" },
        { title: "Syllabus", path: "syllabus" },
        { title: "Class Routine", path: "routine" },
      ],
    },

    {
      title: "Examination",
      icon: BookOpen,
      children: [
        { title: "Exam Name", path: "examlist" },
        { title: "Exam Routine", path: "examroutine" },
        { title: "Grade", path: "examgrade" },
        { title: "Admit Card", path: "examadmit" },
        { title: "Seat Number", path: "examsitnumber" },

        { title: "Result Find", path: "examresult" },
        { title: "Certificate", path: "examcertificate" },
      ],
    },

    {
      title: "Fee Management",
      icon: Wallet,
      children: [{ title: "Payment", path: "/fee/payment" }],
    },

    {
      title: "Attendance",
      icon: LuCalendarCheck2,
      children: [{ title: "Student ", path: "/attendance/student" }],
    },

    {
      title: "Leaves",
      icon: LuCalendarClock,
      children: [{ title: "Leave request", path: "leaveList" }],
    },

    {
      title: "Holiday",
      icon: FiCalendar,
      path: "/holiday",
    },

    {
      title: "Tools",
      icon: BiReset, // Main section icon
      children: [
        { title: "Reset", path: "tool/reset" }, // Feather rotate icon
      ],
    },
  ];

  if (role === "admin") return adminMenu;
  if (role === "school") return schoolMenu;
  if (role === "teacher") return teacherMenu;
  if (role === "student") return studentMenu;
  return [];
};
