const DashboardProfile=()=> {

  const role = localStorage.getItem("role") || "student";

  const roleConfig = {
    admin: {
      name: "Md Mehedi Hasan",
      title: "Founder & CEO",
      avatar: "https://i.pravatar.cc/150?u=mehedi"
    },
    school: {
      name: "School Admin",
      title: "School Authority",
      avatar: "https://i.pravatar.cc/150?u=school"
    },
    teacher: {
      name: "Teacher",
      title: "Faculty Member",
      avatar: "https://i.pravatar.cc/150?u=teacher"
    },
    student: {
      name: "Student",
      title: "Learner",
      avatar: "https://i.pravatar.cc/150?u=student"
    }
  };

  const user = roleConfig[role];

  return (
    <div className="flex items-center gap-4 bg-white shadow rounded-lg p-4">

      <img
        src={user.avatar}
        alt="avatar"
        className="w-16 h-16 rounded-full object-cover"
      />

      <div>
        <h3 className="font-bold text-lg">
          {user.name}
        </h3>

        <p className="text-sm text-gray-500">
          {user.title}
        </p>
      </div>

    </div>
  );
}

export default DashboardProfile;