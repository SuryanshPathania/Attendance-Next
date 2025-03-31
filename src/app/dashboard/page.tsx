
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { jwtDecode } from "jwt-decode";
// import PrivateRoute from "../../components/auth/Privateroute";
// import Navbar from "../../components/auth/Navbar"; // Adjust the import path as needed

// interface DecodedToken {
//   userId: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   exp?: number;
// }

// export default function Dashboard() {
//   const [user, setUser] = useState<DecodedToken | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const loadUserFromToken = () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         toast.error("Unauthorized: No token provided");
//         router.push("/login");
//         return;
//       }

//       try {
//         const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
//         console.log("Decoded Token:", decoded);
//         setUser(decoded);
//       } catch (error) {
//         toast.error("Invalid token. Please log in again.");
//         localStorage.removeItem("token");
//         router.push("/login");
//       }
//     };

//     loadUserFromToken();
//   }, [router]);

//   if (!user) return <p className="text-center text-lg mt-10">Loading...</p>;

//   return (
//     <PrivateRoute>
//       <div className="min-h-screen bg-gray-100">
//         <Navbar user={user} />
//         <div className="flex flex-col items-center mt-10">
//           <div className="bg-white shadow-md rounded-lg p-6 w-3/4 text-center">
//             {/* Superadmin Panel */}
//             {user.role.toLowerCase() === "superadmin" && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">Superadmin Panel</h2>
//                 <p className="text-gray-600 mt-2">Manage users, settings, and configurations.</p>
//               </div>
//             )}

//             {/* HR Panel */}
//             {user.role.toLowerCase() === "hr" && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">HR Panel</h2>
//                 <p className="text-gray-600 mt-2">Manage employee records, hiring, and payroll.</p>
//               </div>
//             )}

//             {/* User Panel */}
//             {user.role.toLowerCase() === "user" && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">User Dashboard</h2>
//                 <p className="text-gray-600 mt-2">View personal information and available resources.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </PrivateRoute>
//   );
// }





////////////////////////////////////////



"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import PrivateRoute from "../../components/auth/Privateroute";
import Navbar from "../../components/auth/Navbar"; // Adjust the import path as needed

interface DecodedToken {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number; // Change role type to number
  exp?: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserFromToken = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized: No token provided");
        router.push("/login");
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        console.log("Decoded Token:", decoded);
        setUser(decoded);
      } catch (error) {
        toast.error("Invalid token. Please log in again.");
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    loadUserFromToken();
  }, [router]);

  if (!user) return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} />
        <div className="flex flex-col items-center mt-10">
          <div className="bg-white shadow-md rounded-lg p-6 w-3/4 text-center">
            {/* Superadmin Panel */}
            {user.role === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Superadmin Panel</h2>
                <p className="text-gray-600 mt-2">Manage users, settings, and configurations.</p>
              </div>
            )}

            {/* HR Panel */}
            {user.role === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800">HR Panel</h2>
                <p className="text-gray-600 mt-2">Manage employee records, hiring, and payroll.</p>
              </div>
            )}

            {/* User Panel */}
            {user.role === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800">User Dashboard</h2>
                <p className="text-gray-600 mt-2">View personal information and available resources.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}



