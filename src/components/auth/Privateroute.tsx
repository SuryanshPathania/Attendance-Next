"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

// Define the type for the decoded JWT token
interface DecodedToken {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  exp?: number; // Optional expiration timestamp
}

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Unauthorized! Please log in.");
        router.push("/login");
        return;
      }

      try {
        // Decode and verify token
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : false;

        if (isExpired) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        setLoading(false);
      } catch (error) {
        toast.error("Invalid token. Please log in again.");
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;

  return <>{children}</>;
}


