
const roleConfig = {
  admin: { name: "Md Mehedi Hasan", title: "Founder & CEO", subtitle: "Astha Academic Management System", avatar: "https://i.pravatar.cc/150?u=mehedi" },
  school: { name: "Md Mehedi Hasan", title: "Founder & CEO", subtitle: "Astha Academic Management System", avatar: "https://i.pravatar.cc/150?u=mehedi" },
  teacher: { name: "Michael Smith", title: "Teacher", subtitle: "Astha Academic Management System", avatar: "https://i.pravatar.cc/150?u=teacher" },
  student: { name: "John Doe", title: "Student", subtitle: "Astha Academic Management System", avatar: "https://i.pravatar.cc/150?u=student" },
};


import { useState } from "react";
import schoolProfileImg from '../../assets/images/school-profile.avif'

const DashboardProfile = ({ role }) => {

  const config = roleConfig[role] || roleConfig.student;

  const progressPercentage = 75;
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (progressPercentage / 100) * circumference;

  const [balanceActive, setBalanceActive] = useState(false);

  // Get school info from localStorage
  const schoolInfo = JSON.parse(localStorage.getItem("schoolInfo") || "{}");
  const schoolName = schoolInfo.schoolName || "Register school name";
  const schoolLocation = schoolInfo.address || "Location, City";
  const principalName = schoolInfo.principalName || "Principal: Name set now";
  const availableBalance = schoolInfo.balance || 1000000;

  // Get school logo URL
  const getLogoUrl = (logoPath) => {
    if (!logoPath) return schoolProfileImg;
    if (logoPath.startsWith("http://") || logoPath.startsWith("https://")) {
      return logoPath;
    }
    if (logoPath.startsWith("/")) {
      return window.location.origin + logoPath;
    }
    // For File objects (from file input)
    if (logoPath instanceof File) {
      return URL.createObjectURL(logoPath);
    }
    return schoolProfileImg;
  };
  const schoolLogoUrl = getLogoUrl(schoolInfo.logo);


  const formatBalance = (amount) => {
    return amount.toLocaleString("en-US") + " ৳";
  };




  return (

    <>

      {/* Top Section */}
      <div className="relative  bg-blue-600 h-52 pb-16 rounded-br-[100px] flex flex-col items-center justify-center text-white">

        {/* Profile Section with Circular Progress */}
        <div className="mt-6">
          <div className="flex justify-center mb-4 ">
            <div className="relative w-20 h-20">
              <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 80 80"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  stroke="#fbc02d"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                />
              </svg>

              <img
                src={config.avatar}
                alt={config.name}
                className="w-full h-full rounded-full object-cover p-[3px]"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-start ml-30 text-left">
            <h2 className="text-xl font-bold">{config.name}</h2>
            <p className="text-[12px] font-bold opacity-80 uppercase tracking-wide">
              {config.title}
            </p>
            <p className="text-[11px] opacity-70">{config.subtitle}</p>
          </div>
        </div>

        <div
          className="absolute left-10 w-20 h-20 bg-white rounded-full border-2 border-[#fbc02d] flex items-center justify-center shadow-lg z-300"
          style={{
            bottom: "-40px",
            clipPath: "none",
            overflow: "visible",
          }}
        >
          <img
            src={schoolLogoUrl}
            alt="School Logo"
            className="w-full h-full object-cover rounded-full z-100"
            onError={(e) => {
              e.target.src = schoolProfileImg;
            }}
          />
        </div>


      </div>

      {/* Bottom Section */}
      <div
        className="bg-blue-600 relative z-10 mt-[-40px]"
        style={{ overflow: "visible" }}
      >
        <div
          className="bg-white px-5 pt-10 pb-6 rounded-tl-[95px] relative"
          style={{ overflow: "visible", marginTop: "40px" }}
        >
          {/* School Info */}
          <div className="ml-30 mb-6">
            <h3 className="text-sm font-black text-blue-800">
              {schoolName}
            </h3>
            <p className="text-[11px] text-gray-500">{schoolLocation}</p>
            <p className="text-[11px] font-bold text-black mb-3">
              {principalName}
            </p>

            {/* Balance Container */}
            <div
              onClick={() => setBalanceActive(!balanceActive)}
              className={`balance-container w-[150px] h-[35px] bg-gray-100 rounded-[50px] relative overflow-hidden cursor-pointer border border-gray-200 flex items-center transition-all duration-400 ${balanceActive ? "active" : ""
                }`}
            >
              <span
                className={`balance-text absolute left-3 text-[11px] font-bold text-[#3b66f5] transition-all duration-400 ${balanceActive ? "left-[110%] opacity-0" : ""
                  }`}
              >
                Available Balance
              </span>
              <span
                className={`balance-amount absolute text-[13px] font-extrabold text-green-600  ml-5 transition-all duration-400 ${balanceActive ? "left-[15px]" : "-left-full"
                  }`}
              >
                {formatBalance(availableBalance)}
              </span>
              <div
                className={`swipe-circle absolute right-1 w-[27px] h-[27px]  flex bg-[#3b66f5] rounded-full flex items-center justify-center text-white text-[10px] transition-all duration-400 z-10 ${balanceActive ? "translate-x-[-115px] bg-green-600" : ""
                  }`}
              >
                {balanceActive ? "✓" : "←"}
              </div>
            </div>
          </div>
        </div>
      </div>

    </>


  )
}

export default DashboardProfile;
