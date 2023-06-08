import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { type ICase } from "@/types/case";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<ICase>();

  const fetchData = async () => {
    const res = await axios.post("/api/get-case", {
      caseId: router.query.id,
    });
    setData(res.data);
  };

  useEffect(() => {
    if (router.query.id) fetchData();
  }, [router.query.id]);

  console.log(data);
  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />
      <div className="max-w-[1200px] m-auto mt-5">
        <h1 className="text-3xl ">{data?.summary}</h1>

        <ReactQuill
          modules={{
            toolbar: false,
          }}
          className="bg-white mt-3 border-none"
          value={data?.problemStatement}
          readOnly={true}
          theme={"snow"}
        />
        <div className="bg-white border border-[#444]/50 border-t-0">
          <span className="text-sm">created by: </span>
          <span className=" bg-weird-orange text-sm rounded px-1">
            {`${String(data?.creator).slice(0, 3)}...${String(
              data?.creator
            ).slice(-3)}`}
          </span>
        </div>
      </div>
    </div>
  );
}
