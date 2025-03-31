

"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import API from "../../../utils/axios";
import "react-toastify/dist/ReactToastify.css";
import PublicRoute from "../../components/auth/Publicroute";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function Signup() {
  const router = useRouter();

  const handleSubmit = async (
    values: { firstName: string; lastName: string; email: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const res = await API.post("/auth/signup", values);
      toast.success(res.data.message || "Signup successful! You can now log in.");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicRoute>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600 p-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Signup Photo Section */}
          <div
            className="md:w-1/2 h-64 md:h-auto bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/premium-vector/sign-up-registration-form-with-secure-password-3d-vector-icon-modern-minimal-style_365941-1124.jpg?semt=ais_hybrid')",
            }}
          ></div>

          {/* Signup Form Section */}
          <div className="md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h2>
            <ToastContainer position="top-right" autoClose={3000} />

            <Formik initialValues={{ firstName: "", lastName: "", email: "", password: "" }} validationSchema={SignupSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="flex space-x-2">
                    <div>
                      <label className="block text-gray-700 font-medium">First Name</label>
                      <Field type="text" name="firstName" className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500" />
                      <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Last Name</label>
                      <Field type="text" name="lastName" className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500" />
                      <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Email</label>
                    <Field type="email" name="email" className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Password</label>
                    <Field type="password" name="password" className="w-full p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500" />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md">
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-center text-gray-600 mt-4">
              Already have an account? <a href="/login" className="text-blue-500 font-medium hover:underline">Login</a>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}
