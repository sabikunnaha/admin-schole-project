
import SchoolInfo from "../../components/school/schoolDashboard/SchoolInfo";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardProfile from "../../components/dashboard/DashboardProfile";
import FeeStatistics from "../../components/school/schoolDashboard/FeeStatistics";
import BestTeachers from "../../components/school/schoolDashboard/BestTeachers";
import SchoolSchedules from "../../components/school/schoolDashboard/SchoolSchedules";

const SchoolDashboard = () => {

  const role = localStorage.getItem("role") || "student";

  return (
    <div className="">

      <div className="p-0">
        <DashboardProfile />
      </div>

      <div className="space-y-6 px-4 pb-8 mt-6">

        <DashboardStats />

        {role === "school" && (
          <>
            <FeeStatistics />
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <BestTeachers />
              </div>
              <SchoolSchedules />
            </div> */}
          </>
        )}
      </div>

    </div>
  );
}

export default SchoolDashboard;