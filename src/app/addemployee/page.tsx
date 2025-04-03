
"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import API from "../../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/auth/Navbar"; // Adjust the import path as necessary

// Define the structure of an employee
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
}

// Define the structure of form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
}

const roleMap: { [key: number]: string } = {
  1: "Super Admin",
  2: "HR",
  3: "Employee",
};

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editEmployeeId, setEditEmployeeId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: 3,
  });
  const [adding, setAdding] = useState<boolean>(false);
  const [currentUserRole, setCurrentUserRole] = useState<number | null>(null);
  const [user, setUser] = useState<{ firstName: string; lastName: string; role: number }>({
    firstName: "",
    lastName: "",
    role: 3,
  });

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
      });
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "role" ? Number(value) : value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication required!");
        return;
      }

      if (isEditing) {
        // Edit existing employee
        await API.put(`/auth/users/${editEmployeeId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        toast.success("Employee updated successfully!");
      } else {
        // Add new employee
        await API.post("/auth/signup", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        toast.success("Employee added successfully!");
      }

      // Reset Form and Refresh Employee List
      setFormData({ firstName: "", lastName: "", email: "", password: "", role: 3 });
      setIsEditing(false);
      setEditEmployeeId(null);
      fetchEmployees();
      setShowForm(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to process request");
    } finally {
      setAdding(false);
    }
  };

  const handleEdit = (employee: Employee) => {
    setIsEditing(true);
    setEditEmployeeId(employee.id);
    setShowForm(true);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      password: "", // Leave password empty
      role: employee.role,
    });
  };

  const handleDelete = async (id: number) => {
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
      <Navbar user={user} />
      <div className="flex items-center justify-center min-h-screen bg-blue-600 p-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Employee Management</h1>
          <div className="flex justify-center mb-6">
            <button
              onClick={() => {
                setShowForm(!showForm);
                setIsEditing(false);
                setFormData({ firstName: "", lastName: "", email: "", password: "", role: 3 });
              }}
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
              {!isEditing && <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500" required />}
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
                {currentUserRole === 1 && <option value={2}>HR</option>}
                <option value={3}>Employee</option>
              </select>
              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-md" disabled={adding}>
                {adding ? "Processing..." : isEditing ? "Update Employee" : "Add Employee"}
              </button>
            </form>
          ) : (
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead className="bg-blue-200">
                <tr>
                  <th className="p-3 text-black">First Name</th>
                  <th className="p-3 text-black">Last Name</th>
                  <th className="p-3 text-black">Email</th>
                  <th className="p-3 text-black">Role</th>
                  <th className="p-3 text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b text-black">
                    <td className="p-3">{employee.firstName}</td>
                    <td className="p-3">{employee.lastName}</td>
                    <td className="p-3">{employee.email}</td>
                    <td className="p-3">{roleMap[employee.role]}</td>
                    <td className="p-3">
                      <button onClick={() => handleEdit(employee)} className="text-blue-600 mr-3">Edit</button>
                      <button onClick={() => handleDelete(employee.id)} className="text-red-500">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;
