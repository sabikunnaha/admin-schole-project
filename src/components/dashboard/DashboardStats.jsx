
import { dashboardData } from "../../data/dashboardData";
import { statCardBgColors } from "../../utils/statCardBgColors";
import StateCard from "../school/schoolDashboard/StateCard";

  const DashboardStats= ()=> {

  const role = localStorage.getItem("role") || "student";
  const cards = dashboardData[role] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {cards.map((item, index) => (

        <StateCard
          key={index}
          {...item}
          bgColor={statCardBgColors[index % statCardBgColors.length]}
        />

      ))}

    </div>
  );
}

export default DashboardStats;