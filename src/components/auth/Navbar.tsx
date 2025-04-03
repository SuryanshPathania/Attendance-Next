


// import React from "react";
// import { useRouter } from "next/navigation";

// interface NavbarProps {
//   user: {
//     firstName: string;
//     lastName: string;
//     role: number; 
//   };
// }

// const Navbar: React.FC<NavbarProps> = ({ user }) => {
//   const router = useRouter();

//   const getDashboardTitle = () => {
//     switch (user.role) {
//       case 1:
//         return "Superadmin Dashboard";
//       case 2:
//         return "HR Admin Dashboard";
//       case 3:
//         return "User Dashboard";
//       default:
//         return "Dashboard";
//     }
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
//       <div>
//         <h1 className="text-2xl font-bold">{getDashboardTitle()}</h1>
//         <p className="text-lg">Welcome, {user.firstName} {user.lastName}!</p>
//       </div>
      
//       <div className="flex items-center space-x-4">
//         {/* Superadmin and HR can add employees */}
//         {(user.role === 1 || user.role === 2) && (
//           <a
//             onClick={() => router.push("/addemployee")}
//             className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
//           >
//             Add Employee
//           </a>
//         )}

//         {/* HR Admin can see Projects and Attendance */}
//         {user.role === 2 && (
//           <>
//             <a
//               onClick={() => router.push("/projects")}
//               className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
//             >
//               Projects
//             </a>
//             <a
//               onClick={() => router.push("/attendance")}
//               className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
//             >
//               Attendance
//             </a>
//           </>
//         )}

//         {/* Users can only see Projects and Attendance */}
//         {user.role === 3 && (
//           <>
//             <a
//               onClick={() => router.push("/projects")}
//               className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
//             >
//               Projects
//             </a>
//             <a
//               onClick={() => router.push("/attendance")}
//               className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
//             >
//               Attendance
//             </a>
//           </>
//         )}

//         {/* Logout Button */}
//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             router.push("/login");
//           }}
//           className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: {
    firstName: string;
    lastName: string;
    role: number;
  };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const router = useRouter();

  const getDashboardTitle = () => {
    switch (user.role) {
      case 1:
        return "Superadmin Dashboard";
      case 2:
        return "HR Admin Dashboard";
      case 3:
        return "User Dashboard";
      default:
        return "Dashboard";
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div>
        <h1 className="text-2xl font-bold">{getDashboardTitle()}</h1>
        <p className="text-lg">Welcome, {user.firstName} {user.lastName}!</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Superadmin and HR can add employees */}
        {(user.role === 1 || user.role === 2) && (
          <a
            onClick={() => router.push("/addemployee")}
            className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Add Employee
          </a>
        )}

        {/* Superadmin and HR Admin can see Projects */}
        {(user.role === 1 || user.role === 2) && (
          <a
            onClick={() => router.push("/projects")}
            className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Projects
          </a>
        )}

        {/* HR Admin can see Attendance */}
        {user.role === 2 && (
          <a
            onClick={() => router.push("/attendance")}
            className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Attendance
          </a>
        )}

        {/* Users can only see Projects and Attendance */}
        {user.role === 3 && (
          <>
            <a
              onClick={() => router.push("/projects")}
              className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              Projects
            </a>
            <a
              onClick={() => router.push("/attendance")}
              className="hover:text-red-600 transition underline cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              Attendance
            </a>
          </>
        )}

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
