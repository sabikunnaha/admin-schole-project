
import { FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DashboardHeader=()=> {

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-lg">

      <h2 className="font-bold text-lg">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <button className="hover:bg-white/20 p-2 rounded">
          <FiBell size={18} />
        </button>

        <button className="hover:bg-white/20 p-2 rounded">
          <FiUser size={18} />
        </button>

        <button
          onClick={() => navigate("/")}
          className="hover:bg-white/20 p-2 rounded"
        >
          <FiLogOut size={18} />
        </button>

      </div>

    </div>
  );
}

export default DashboardHeader;