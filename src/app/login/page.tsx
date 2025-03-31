



"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import API from "../../../utils/axios";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "../../components/auth/Publicroute";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const res = await API.post("/auth/login", values);
      const token = res.data.token;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      toast.success(res.data.message || "Login successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Login Photo Section */}
          <div className="md:w-1/2 h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/secure-login-form-page-with-password-computer-padlock-3d-vector-icon-cartoon-minimal-style_365941-1119.jpg?semt=ais_hybrid')" }}>
            {/* Update the URL with the actual image path */}
          </div>

          {/* Login Form Section */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login to Your Account</h2>

            <ToastContainer position="top-right" autoClose={3000} />

            <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <Field type="email" name="email" placeholder="example@email.com" className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Password</label>
                    <Field type="password" name="password" placeholder="••••••••" className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md">
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-center text-gray-600 mt-4">
              Don't have an account? <a href="/signup" className="text-blue-500 font-medium hover:underline">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}