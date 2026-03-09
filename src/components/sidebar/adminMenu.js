import { Home } from "lucide-react";
import { LuLayoutDashboard, LuUserRoundPlus } from "react-icons/lu";
import { TbApiApp, TbReportMoney, TbSchoolBell } from "react-icons/tb";
import { BiReset } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";

export const adminMenu = [
  {
    title: "Dashboard",
    icon: LuLayoutDashboard,
    children: [
      { title: "Admin", path: "admin/dashboard" },
      { title: "School", path: "school/dashboard" },
      { title: "Teacher", path: "teacher/dashboard" },
      { title: "Student", path: "student/dashboard" },
    ],
  },

  {
    title: "Landing Page",
    icon: Home,
    children: [
      { title: "View", path: "landing/view" },
      { title: "Edit Page", path: "landing/edit" },
      { title: "Add Page", path: "landing/add" },
    ],
  },

  {
    title: "Subscription",
    icon: LuUserRoundPlus,
    children: [
      { title: "Create", path: "membership/plan" },
      { title: "Active", path: "membership/active" },
      { title: "Inactive", path: "membership/inactive" },
    ],
  },

  {
    title: "School Details",
    icon: TbSchoolBell,
    children: [
      { title: "School List", path: "school/list" },
      { title: "Pending List", path: "school/pending" },
    ],
  },

  {
    title: "Transaction",
    icon: GrTransaction,
    children: [
      { title: "Cash In Request", path: "transaction/cashin" },
      { title: "Statement", path: "transaction/cashout" },
    ],
  },

  {
    title: "Financial & Profit",
    icon: TbReportMoney,
    children: [
      { title: "Paid", path: "financial/profit" },
      { title: "Due", path: "financial/balance" },
    ],
  },

  {
    title: "Integration API",
    icon: TbApiApp,
    children: [{ title: "Payment API", path: "integration/payment" }],
  },

  {
    title: "Profile Tool",
    icon: BiReset,
    children: [{ title: "Reset", path: "profile/reset", action: "reset" }],
  },
];