import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />
      <p>Post: {router.query.id}</p>{" "}
    </div>
  );
}
