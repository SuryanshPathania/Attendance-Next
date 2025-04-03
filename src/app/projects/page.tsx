

// "use client";

// import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import API from "../../../utils/axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "../../components/auth/Navbar"; // Adjust the import path as necessary

// // Define the structure of the project
// interface Project {
//   id: number;
//   name: string;
//   clientName: string;
//   status: string;
//   description: string;
//   assignedTo?: { id: number; firstName: string; lastName: string };
// }

// const ProjectsPage = () => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [employees, setEmployees] = useState<{ id: number; firstName: string; lastName: string }[]>([]);
//   const [newProject, setNewProject] = useState({
//     name: "",
//     clientName: "",
//     status: "",
//     description: "",
//     assignedToId: "",
//   });
//   const [currentUserRole, setCurrentUserRole] = useState<number | null>(null);
//   const [currentUserId, setCurrentUserId] = useState<number | null>(null);
//   const [currentUser, setCurrentUser] = useState<{ firstName: string; lastName: string; role: number; id: number } | null>(null);
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [adding, setAdding] = useState<boolean>(false);
//   const [editing, setEditing] = useState<boolean>(false);
//   const [currentProject, setCurrentProject] = useState<Project | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);

//   // Setup API headers to include token for all requests
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//       try {
//         const decodedToken = JSON.parse(atob(token.split(".")[1]));
//         console.log("Decoded token:", decodedToken); // Debug log

//         setCurrentUserRole(decodedToken.role);
//         setCurrentUserId(decodedToken.userId); // Ensure this matches the token structure
//         setCurrentUser({
//           firstName: decodedToken.firstName,
//           lastName: decodedToken.lastName,
//           role: decodedToken.role,
//           id: decodedToken.userId, // Ensure this matches the token structure
//         });
//       } catch (e) {
//         console.error("Error decoding token:", e);
//         setError("Invalid authentication token");
//       }
//     } else {
//       console.log("No token found");
//       setError("You are not logged in");
//     }
//   }, []);

//   // Fetch projects based on role and userId
//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         console.log("Fetching projects with role:", currentUserRole, "and userId:", currentUserId); // Debug log
//         const response = await API.get("/projects");
//         console.log("Projects response:", response.data); // Debug log

//         // Filter projects based on the user's role
//         if (currentUserRole === 3) {
//           setProjects(response.data.filter((project: Project) => project.assignedTo?.id === currentUserId));
//         } else {
//           setProjects(response.data);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//         setError("Failed to fetch projects");
//         toast.error("Failed to fetch projects");
//       }
//     };

//     if (currentUserRole !== null && currentUserId !== null) {
//       fetchProjects();
//       if (currentUserRole === 1 || currentUserRole === 2) {
//         fetchEmployees();
//       }
//     }
//   }, [currentUserRole, currentUserId]);

//   const fetchEmployees = async () => {
//     try {
//       const response = await API.get("/auth/users");
//       console.log("Employees response:", response.data); // Debug log
//       setEmployees(response.data.filter((user) => user.role === 3));
//     } catch (err) {
//       console.error("Error fetching employees:", err);
//       toast.error("Failed to fetch employees");
//     }
//   };

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     console.log(`Changed ${name} to ${value}`); // Debug log
//     setNewProject({ ...newProject, [name]: value });
//   };

//   const handleCreate = async (e: FormEvent) => {
//     e.preventDefault();
//     if (currentUserRole !== 1 && currentUserRole !== 2) return toast.error("Permission denied");

//     setAdding(true);
//     try {
//       const response = await API.post("/projects", newProject);
//       console.log("Project created:", response.data); // Debug log
//       toast.success("Project added successfully!");

//       // Add the new project to the state immediately
//       setProjects([...projects, response.data]);

//       setShowForm(false);
//       setNewProject({ name: "", clientName: "", status: "", description: "", assignedToId: "" });
//     } catch (err) {
//       console.error("Error adding project:", err);
//       toast.error("Failed to add project");
//     } finally {
//       setAdding(false);
//     }
//   };

//   const handleUpdate = async (e: FormEvent) => {
//     e.preventDefault();
//     if (currentUserRole !== 1 && currentUserRole !== 2) return toast.error("Permission denied");
//     if (!currentProject) return toast.error("No project selected for editing");

//     setEditing(true);
//     try {
//       const response = await API.put(`/projects/${currentProject.id}`, newProject);
//       console.log("Project updated:", response.data); // Debug log
//       toast.success("Project updated successfully!");

//       // Update the project in the state immediately
//       setProjects(projects.map(p => p.id === currentProject.id ? response.data : p));

//       setShowForm(false);
//       setCurrentProject(null);
//       setNewProject({ name: "", clientName: "", status: "", description: "", assignedToId: "" });
//     } catch (err) {
//       console.error("Error updating project:", err);
//       toast.error("Failed to update project");
//     } finally {
//       setEditing(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (currentUserRole !== 1 && currentUserRole !== 2) return toast.error("Permission denied");

//     try {
//       await API.delete(`/projects/${id}`);
//       console.log("Project deleted with ID:", id); // Debug log
//       toast.success("Project deleted successfully!");

//       // Remove the project from the state immediately
//       setProjects(projects.filter(p => p.id !== id));
//     } catch (err) {
//       console.error("Error deleting project:", err);
//       toast.error("Failed to delete project");
//     }
//   };

//   const handleEdit = (project: Project) => {
//     console.log("Editing project:", project); // Debug log
//     setCurrentProject(project);
//     setNewProject({
//       name: project.name,
//       clientName: project.clientName,
//       status: project.status,
//       description: project.description || "",
//       assignedToId: project.assignedTo?.id.toString() || "",
//     });
//     setShowForm(true);
//   };

//   const handleDetails = (project: Project) => {
//     setSelectedProject(project);
//     setShowDetailModal(true);
//   };

//   const closeModal = () => {
//     setShowDetailModal(false);
//     setSelectedProject(null);
//   };

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-blue-600 p-4">
//         <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 text-center">
//           <h1 className="text-3xl font-semibold text-red-500 mb-4">Error</h1>
//           <p className="text-lg">{error}</p>
//           <button
//             onClick={() => window.location.href = "/login"}
//             className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
//           >
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {currentUser && <Navbar user={currentUser} />}
//       <div className="flex items-center justify-center min-h-screen bg-blue-600 p-4">
//         <ToastContainer position="top-right" autoClose={3000} />
//         <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
//           <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//             {currentUserRole === 3 ? "My Projects" : "All Projects"}
//           </h1>

//           {(currentUserRole === 1 || currentUserRole === 2) && (
//             <div className="flex justify-center mb-6">
//               <button
//                 onClick={() => {
//                   setShowForm(!showForm);
//                   setCurrentProject(null);
//                   setNewProject({ name: "", clientName: "", status: "", description: "", assignedToId: "" });
//                 }}
//                 className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
//               >
//                 {showForm ? (currentProject ? "Cancel Edit" : "View Projects") : "Add Project"}
//               </button>
//             </div>
//           )}

//           {showForm ? (
//             <form onSubmit={currentProject ? handleUpdate : handleCreate} className="space-y-4 text-black">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Project Name"
//                 value={newProject.name}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <input
//                 type="text"
//                 name="clientName"
//                 placeholder="Client Name"
//                 value={newProject.clientName}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 value={newProject.description}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//               <select
//                 name="assignedToId"
//                 value={newProject.assignedToId}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Assign to Employee</option>
//                 {employees.map((emp) => (
//                   <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
//                 ))}
//               </select>
//               <select
//                 name="status"
//                 value={newProject.status}
//                 onChange={handleChange}
//                 className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select Status</option>
//                 <option value="completed">Completed</option>
//                 <option value="pending">Pending</option>
//               </select>
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
//                 disabled={adding || editing}
//               >
//                 {adding ? "Adding..." : editing ? "Updating..." : currentProject ? "Update Project" : "Add Project"}
//               </button>
//             </form>
//           ) : (
//             <>
//               {loading ? (
//                 <div className="text-center p-10">
//                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
//                   <p className="mt-2">Loading projects...</p>
//                 </div>
//               ) : projects.length === 0 ? (
//                 <div className="text-center p-6 text-gray-700">No projects found.</div>
//               ) : (
//                 <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
//                   <thead className="bg-blue-200">
//                     <tr>
//                       <th className="p-3 text-black">Project Name</th>
//                       <th className="p-3 text-black">Client Name</th>
//                       <th className="p-3 text-black">Assigned To</th>
//                       <th className="p-3 text-black">Status</th>
//                       <th className="p-3 text-black">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {projects.map((project) => (
//                       <tr key={project.id} className="border-b text-black">
//                         <td className="p-3">{project.name}</td>
//                         <td className="p-3">{project.clientName}</td>
//                         <td className="p-3">{project.assignedTo ? `${project.assignedTo.firstName} ${project.assignedTo.lastName}` : "N/A"}</td>
//                         <td className="p-3">{project.status || "N/A"}</td>
//                         <td className="p-3">
//                           {(currentUserRole === 1 || currentUserRole === 2) && (
//                             <>
//                             <button
//                               onClick={() => handleEdit(project)}
//                               className="text-blue-500 hover:underline mr-2"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDelete(project.id)}
//                               className="text-red-500 hover:underline mx-2"
//                             >
//                               Delete
//                             </button>
//                             <button
//                               onClick={() => handleDetails(project)}
//                               className="text-green-500 hover:underline"
//                             >
//                               Details
//                             </button>
//                           </>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Modal for Project Details */}
//       {showDetailModal && selectedProject && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
//           <h2 className="text-2xl font-semibold text-black mb-4">Project Details</h2>
//           <p className="text-black"><strong>Name:</strong> {selectedProject.name}</p>
//           <p className="text-black"><strong>Client Name:</strong> {selectedProject.clientName}</p>
//           <p className="text-black"><strong>Assigned To:</strong> {selectedProject.assignedTo ? `${selectedProject.assignedTo.firstName} ${selectedProject.assignedTo.lastName}` : "N/A"}</p>
//           <p className="text-black"><strong>Status:</strong> {selectedProject.status || "N/A"}</p>
//           <p className="text-black"><strong>Description:</strong> {selectedProject.description || "N/A"}</p>
//           <button
//             onClick={closeModal}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//       )}
//     </div>
//   );
// };

// export default ProjectsPage;




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import API from "../../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/auth/Navbar"; // Adjust the import path as necessary

// Define the structure of the project
interface Project {
  id: number;
  name: string;
  clientName: string;
  status: string;
  description: string;
  assignedTo?: { id: number; firstName: string; lastName: string };
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<{ id: number; firstName: string; lastName: string }[]>([]);
  const [newProject, setNewProject] = useState({
    name: "",
    clientName: "",
    status: "",
    description: "",
    assignedToId: "",
  });
  const [currentUserRole, setCurrentUserRole] = useState<number | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<{ firstName: string; lastName: string; role: number; id: number } | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Setup API headers to include token for all requests
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded token:", decodedToken); // Debug log

        setCurrentUserRole(decodedToken.role);
        setCurrentUserId(decodedToken.userId); // Ensure this matches the token structure
        setCurrentUser({
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          role: decodedToken.role,
          id: decodedToken.userId, // Ensure this matches the token structure
        });
      } catch (e) {
        console.error("Error decoding token:", e);
        setError("Invalid authentication token");
      }
    } else {
      console.log("No token found");
      setError("You are not logged in");
    }
  }, []);

  // Fetch projects based on role and userId
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching projects with role:", currentUserRole, "and userId:", currentUserId); // Debug log
        const response = await API.get("/projects");
        console.log("Projects response:", response.data); // Debug log

        // Filter projects based on the user's role
        if (currentUserRole === 3) {
          setProjects(response.data.filter((project: Project) => project.assignedTo?.id === currentUserId));
        } else {
          setProjects(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects");
        toast.error("Failed to fetch projects");
      }
    };

    if (currentUserRole !== null && currentUserId !== null) {
      fetchProjects();
      if (currentUserRole === 1 || currentUserRole === 2) {
        fetchEmployees();
      }
    }
  }, [currentUserRole, currentUserId]);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("/auth/users");
      console.log("Employees response:", response.data); // Debug log
      setEmployees(response.data.filter((user) => user.role === 3));
    } catch (err) {
      console.error("Error fetching employees:", err);
      toast.error("Failed to fetch employees");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Changed ${name} to ${value}`); // Debug log
    setNewProject({ ...newProject, [name]: value });
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (currentUserRole !== 1 && currentUserRole !== 2) return toast.error("Permission denied");

    setAdding(true);
    try {
      const response = await API.post("/projects", newProject);
      console.log("Project created:", response.data); // Debug log
      toast.success("Project added successfully!");

      // Add the new project to the state immediately
      setProjects([...projects, response.data]);

      setShowForm(false);
      setNewProject({ name: "", clientName: "", status: "", description: "", assignedToId: "" });
    } catch (err) {
      console.error("Error adding project:", err);
      toast.error("Failed to add project");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (currentUserRole !== 1 && currentUserRole !== 2) return toast.error("Permission denied");
    if (!currentProject) return toast.error("No project selected for editing");

    setEditing(true);
    try {
      const response = await API.put(`/projects/${currentProject.id}`, newProject);
      console.log("Project updated:", response.data); // Debug log
      toast.success("Project updated successfully!");

      // Update the project in the state immediately
      setProjects(projects.map(p => p.id === currentProject.id ? response.data : p));

      setShowForm(false);
      setCurrentProject(null);
      setNewProject({ name: "", clientName: "", status: "", description: "", assignedToId: "" });
    } catch (err) {
      console.error("Error updating project:", err);
      toast.error("Failed to update project");
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (currentUserRole !== 1 && currentUserRole !== 2) return toast.error("Permission denied");

    try {
      await API.delete(`/projects/${id}`);
      console.log("Project deleted with ID:", id); // Debug log
      toast.success("Project deleted successfully!");

      // Remove the project from the state immediately
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Failed to delete project");
    }
  };

  const handleEdit = (project: Project) => {
    console.log("Editing project:", project); // Debug log
    setCurrentProject(project);
    setNewProject({
      name: project.name,
      clientName: project.clientName,
      status: project.status,
      description: project.description || "",
      assignedToId: project.assignedTo?.id.toString() || "",
    });
    setShowForm(true);
  };

  const handleDetails = (project: Project) => {
    setSelectedProject(project);
    setShowDetailModal(true);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedProject(null);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-600 p-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 text-center">
          <h1 className="text-3xl font-semibold text-red-500 mb-4">Error</h1>
          <p className="text-lg">{error}</p>
          <button
            onClick={() => window.location.href = "/login"}
            className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {currentUser && <Navbar user={currentUser} />}
      <div className="flex items-center justify-center min-h-screen bg-blue-600 p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {currentUserRole === 3 ? "My Projects" : "All Projects"}
          </h1>

          {(currentUserRole === 1 || currentUserRole === 2) && (
            <div className="flex justify-center mb-6">
              <button
                onClick={() => {
                  setShowForm(!showForm);
                  setCurrentProject(null);
                  setNewProject({ name: "", clientName: "", status: "", description: "", assignedToId: "" });
                }}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                {showForm ? (currentProject ? "Cancel Edit" : "View Projects") : "Add Project"}
              </button>
            </div>
          )}

          {showForm && (currentUserRole === 1 || currentUserRole === 2) && (
            <form onSubmit={currentProject ? handleUpdate : handleCreate} className="space-y-4 text-black">
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={newProject.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                name="clientName"
                placeholder="Client Name"
                value={newProject.clientName}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newProject.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="assignedToId"
                value={newProject.assignedToId}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Assign to Employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
                ))}
              </select>
              <select
                name="status"
                value={newProject.status}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
                disabled={adding || editing}
              >
                {adding ? "Adding..." : editing ? "Updating..." : currentProject ? "Update Project" : "Add Project"}
              </button>
            </form>
          )}

          {!showForm && (
            <>
              {loading ? (
                <div className="text-center p-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                  <p className="mt-2">Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center p-6 text-gray-700">No projects found.</div>
              ) : (
                <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="p-3 text-black">Project Name</th>
                      <th className="p-3 text-black">Client Name</th>
                      <th className="p-3 text-black">Assigned To</th>
                      <th className="p-3 text-black">Status</th>
                      <th className="p-3 text-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b text-black">
                        <td className="p-3">{project.name}</td>
                        <td className="p-3">{project.clientName}</td>
                        <td className="p-3">{project.assignedTo ? `${project.assignedTo.firstName} ${project.assignedTo.lastName}` : "N/A"}</td>
                        <td className="p-3">{project.status || "N/A"}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDetails(project)}
                            className="text-green-500 hover:underline mr-2 ml-3"
                          >
                            Details
                          </button>
                          {(currentUserRole === 1 || currentUserRole === 2) && (
                            <>
                              <button
                                onClick={() => handleEdit(project)}
                                className="text-blue-500 hover:underline mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="text-red-500 hover:underline mr-2"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal for Project Details */}
      {showDetailModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-black mb-4">Project Details</h2>
            <p className="text-black"><strong>Name:</strong> {selectedProject.name}</p>
            <p className="text-black"><strong>Client Name:</strong> {selectedProject.clientName}</p>
            <p className="text-black"><strong>Assigned To:</strong> {selectedProject.assignedTo ? `${selectedProject.assignedTo.firstName} ${selectedProject.assignedTo.lastName}` : "N/A"}</p>
            <p className="text-black"><strong>Status:</strong> {selectedProject.status || "N/A"}</p>
            <p className="text-black"><strong>Description:</strong> {selectedProject.description || "N/A"}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;




