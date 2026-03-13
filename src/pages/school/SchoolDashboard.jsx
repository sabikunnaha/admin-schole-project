import DashboardProfile from "../../components/dashboard/DashboardProfile";
import DashboardStats from "../../components/dashboard/DashboardStats";
import FeeStatistics from "../../components/school/schoolDashboard/FeeStatistics";




const SchoolDashboard = () => {

  const role = localStorage.getItem("role") || "student";

  return (
    <div className="">

      <div className="p-0">
        <DashboardProfile />
      </div>

      <div className="space-y-6 px-4 pb-8 mt-6">

        <DashboardStats/>

        {role === "school" && (
          <>
            <FeeStatistics/>
          
          </>
        )}
      </div>

    </div>
  );
}

export default SchoolDashboard;