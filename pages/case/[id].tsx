import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [, setData] = useState({});

  const fetchData = async () => {
    const res = await axios.post("/api/get-case", {
      caseId: router.query.id,
    });
    setData(res.data);
  };

  useEffect(() => {
    if (router.query.id) fetchData();
  }, [router.query.id]);

  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />
    </div>
  );
}
