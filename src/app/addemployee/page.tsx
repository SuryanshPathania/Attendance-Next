// "use client";

// import { useEffect, useState } from "react";
// import API from "../../../utils/axios";
// import { toast } from "react-toastify";

// const roleMap = {
//   "SUPERADMIN": "Super Admin",
//   "HR": "HR",
//   "EMPLOYEE": "Employee",
// };

// export default function EmployeeManagement() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     role: "", // Default role
//   });
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Authentication required!");
//         return;
//       }
//       const response = await API.get("/auth/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEmployees(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to fetch employees");
//       console.error("Fetch Employees Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setAdding(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Authentication required!");
//         return;
//       }
//       await API.post("/auth/signup", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       toast.success("Employee added successfully!");
//       setFormData({ firstName: "", lastName: "", email: "", password: "", role: "EMPLOYEE" });
//       fetchEmployees();
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Failed to add employee");
//       console.error("Add Employee Error:", err);
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-semibold text-center mb-6">Employee Management</h1>
//       <div className="flex justify-center mb-6">
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
//         >
//           {showForm ? "View Employees" : "Add Employee"}
//         </button>
//       </div>

//       {showForm ? (
//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
//           <h2 className="text-xl font-semibold text-gray-700">Add Employee</h2>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="HR">HR</option>
//             <option value="EMPLOYEE">Employee</option>
//           </select>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
//             disabled={adding}
//           >
//             {adding ? "Adding..." : "Add Employee"}
//           </button>
//         </form>
//       ) : (
//         <div className="overflow-x-auto">
//           {loading ? (
//             <div className="text-center text-gray-600">Loading...</div>
//           ) : error ? (
//             <div className="text-center text-red-600">Error: {error}</div>
//           ) : (
//             <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="p-3 text-left">First Name</th>
//                   <th className="p-3 text-left">Last Name</th>
//                   <th className="p-3 text-left">Email</th>
//                   <th className="p-3 text-left">Role</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {employees.length > 0 ? (
//                   employees.map((employee) => (
//                     <tr key={employee.id} className="border-b hover:bg-gray-100 transition-all">
//                       <td className="p-3">{employee.firstName}</td>
//                       <td className="p-3">{employee.lastName}</td>
//                       <td className="p-3">{employee.email}</td>
//                       <td className="p-3">{roleMap[employee.role] || "Unknown"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="p-3 text-center text-gray-600">No employees found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }






////////////////////////////////////////////////////////////////


// "use client";

// import { useEffect, useState } from "react";
// import API from "../../../utils/axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const roleMap = {
//   1: "Super Admin",
//   2: "HR",
//   3: "Employee",
// };

// export default function EmployeeManagement() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     role: 3,
//   });
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Authentication required!");
//         return;
//       }
//       const response = await API.get("/auth/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEmployees(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to fetch employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: name === "role" ? Number(value) : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setAdding(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Authentication required!");
//         return;
//       }
//       await API.post("/auth/signup", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       toast.success("Employee added successfully!");
//       setFormData({ firstName: "", lastName: "", email: "", password: "", role: 3 });
//       fetchEmployees();
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Failed to add employee");
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
//         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Employee Management</h1>
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
//           >
//             {showForm ? "View Employees" : "Add Employee"}
//           </button>
//         </div>

//         {showForm ? (
//           <form onSubmit={handleSubmit} className="space-y-4 text-black">
//             <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//             <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//             <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//             <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//             <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
//               <option value={2}>HR</option>
//               <option value={3}>Employee</option>
//             </select>
//             <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md" disabled={adding}>
//               {adding ? "Adding..." : "Add Employee"}
//             </button>
//           </form>
//         ) : (
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="text-center text-gray-600">Loading...</div>
//             ) : error ? (
//               <div className="text-center text-red-600">Error: {error}</div>
//             ) : (
//               <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
//                 <thead className="bg-blue-200">
//                   <tr>
//                     <th className="p-3  text-black text-left">First Name</th>
//                     <th className="p-3 text-black text-left">Last Name</th>
//                     <th className="p-3 text-black  text-left">Email</th>
//                     <th className="p-3 text-black  text-left">Role</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-black">
//                   {employees.length > 0 ? (
//                     employees.map((employee) => (
//                       <tr key={employee.id} className="border-b hover:bg-gray-100 transition-all">
//                         <td className="p-3">{employee.firstName}</td>
//                         <td className="p-3">{employee.lastName}</td>
//                         <td className="p-3">{employee.email}</td>
//                         <td className="p-3">{roleMap[employee.role] || "Unknown"}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="p-3 text-center text-gray-600">No employees found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




///////////////////////
// "use client";

// import { useEffect, useState } from "react";
// import API from "../../../utils/axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const roleMap = {
//   1: "Super Admin",
//   2: "HR",
//   3: "Employee",
// };

// export default function EmployeeManagement() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     role: 3,
//   });
//   const [adding, setAdding] = useState(false);
//   const [currentUserRole, setCurrentUserRole] = useState(null);

//   useEffect(() => {
//     fetchEmployees();
//     const token = localStorage.getItem("token");
//     if (token) {
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       setCurrentUserRole(decodedToken.role);
//     }
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Authentication required!");
//         return;
//       }
//       const response = await API.get("/auth/users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEmployees(response.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to fetch employees");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: name === "role" ? Number(value) : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setAdding(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.error("Authentication required!");
//         return;
//       }
//       await API.post("/auth/signup", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       toast.success("Employee added successfully!");
//       setFormData({ firstName: "", lastName: "", email: "", password: "", role: 3 });
//       fetchEmployees();
//       setShowForm(false);
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Failed to add employee");
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
//         <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Employee Management</h1>
//         <div className="flex justify-center mb-6">
//           <button
//             onClick={() => setShowForm(!showForm)}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
//           >
//             {showForm ? "View Employees" : "Add Employee"}
//           </button>
//         </div>

//         {showForm ? (
//           <form onSubmit={handleSubmit} className="space-y-4 text-black">
//             <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//             <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//             <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//             <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
//             <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
//               {currentUserRole === 1 && <option value={2}>HR</option>}
//               <option value={3}>Employee</option>
//             </select>
//             <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md" disabled={adding}>
//               {adding ? "Adding..." : "Add Employee"}
//             </button>
//           </form>
//         ) : (
//           <div className="overflow-x-auto">
//             {loading ? (
//               <div className="text-center text-gray-600">Loading...</div>
//             ) : error ? (
//               <div className="text-center text-red-600">Error: {error}</div>
//             ) : (
//               <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
//                 <thead className="bg-blue-200">
//                   <tr>
//                     <th className="p-3  text-black text-left">First Name</th>
//                     <th className="p-3 text-black text-left">Last Name</th>
//                     <th className="p-3 text-black  text-left">Email</th>
//                     <th className="p-3 text-black  text-left">Role</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-black">
//                   {employees.length > 0 ? (
//                     employees.map((employee) => (
//                       <tr key={employee.id} className="border-b hover:bg-gray-100 transition-all">
//                         <td className="p-3">{employee.firstName}</td>
//                         <td className="p-3">{employee.lastName}</td>
//                         <td className="p-3">{employee.email}</td>
//                         <td className="p-3">{roleMap[employee.role] || "Unknown"}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="p-3 text-center text-gray-600">No employees found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



////////////////////////////////
"use client";

import { useEffect, useState } from "react";
import API from "../../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/auth/Navbar"; // Adjust the import path as necessary

const roleMap = {
  1: "Super Admin",
  2: "HR",
  3: "Employee",
};

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: 3,
  });
  const [adding, setAdding] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [user, setUser] = useState({ firstName: "", lastName: "", role: 3 });

  useEffect(() => {
    fetchEmployees();
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setCurrentUserRole(decodedToken.role);
      setUser({
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        role: decodedToken.role,
      }); // Set user information
    }
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required!");
        return;
      }
      const response = await API.get("/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "role" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required!");
        return;
      }
      await API.post("/auth/signup", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Employee added successfully!");
      setFormData({ firstName: "", lastName: "", email: "", password: "", role: 3 });
      fetchEmployees();
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to add employee");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required!");
        return;
      }
      await API.delete(`/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Employee deleted successfully!");
      fetchEmployees();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete employee");
    }
  };

  return (
    <div>
      <Navbar user={user} /> {/* Pass the user prop here */}
      <div className="flex items-center justify-center min-h-screen bg-blue-600 p-4"> {/* changed to bg-blue-600 */}
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Employee Management</h1>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              {showForm ? "View Employees" : "Add Employee"}
            </button>
          </div>

          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
                {currentUserRole === 1 && <option value={2}>HR</option>}
                <option value={3}>Employee</option>
              </select>
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md" disabled={adding}>
                {adding ? "Adding..." : "Add Employee"}
              </button>
            </form>
          ) : (
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-600">Error: {error}</div>
              ) : (
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="p-3 text-black text-left">First Name</th>
                      <th className="p-3 text-black text-left">Last Name</th>
                      <th className="p-3 text-black text-left">Email</th>
                      <th className="p-3 text-black text-left">Role</th>
                      <th className="p-3 text-black text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {employees.length > 0 ? (
                      employees.map((employee) => (
                        <tr key={employee.id} className="border-b hover:bg-gray-100 transition-all">
                          <td className="p-3">{employee.firstName}</td>
                          <td className="p-3">{employee.lastName}</td>
                          <td className="p-3">{employee.email}</td>
                          <td className="p-3">{roleMap[employee.role] || "Unknown"}</td>
                          <td className="p-3">
                            <button
                              onClick={() => handleDelete(employee.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="p-3 text-center text-gray-600">No employees found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}