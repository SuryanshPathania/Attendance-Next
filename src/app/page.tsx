import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // Redirects to the login page immediately
}
