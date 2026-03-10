 
 
 const SchoolInfo=()=> {

  const schoolInfo = JSON.parse(
    localStorage.getItem("schoolInfo") || "{}"
  );

  return (
    <div className="bg-white shadow rounded-lg p-4">

      <h3 className="font-bold text-blue-700">
        {schoolInfo.schoolName || "School Name"}
      </h3>

      <p className="text-sm text-gray-500">
        {schoolInfo.address || "Location"}
      </p>

      <p className="text-sm font-semibold mt-1">
        Principal: {schoolInfo.principalName || "Principal Name"}
      </p>

    </div>
  );
}

export default SchoolInfo;