import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { type ICase } from "@/types/case";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { type IComment } from "@/types/comment";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState<ICase>();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<IComment[]>();
  const { address } = useAccount();

  const fetchData = async () => {
    const res = await axios.post("/api/get-case", {
      caseId: router.query.id,
    });
    const commentsRes = await axios.post("/api/get-comments", {
      caseId: router.query.id,
    });

    setComments(commentsRes.data);
    setData(res.data);
  };

  const createComment = async () => {
    try {
      await axios.post("/api/comment-case", {
        caseId: router.query.id,
        comment,
        creatorAddress: address,
      });
      toast.success("published comment");
    } catch (e) {
      toast.error("error commenting");
    }
  };

  useEffect(() => {
    if (router.query.id) fetchData();
  }, [router.query.id]);

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
          <span className=" bg-sky-blue text-sm text-[#0969DA] rounded px-1">
            {`${String(data?.creator).slice(0, 3)}...${String(
              data?.creator
            ).slice(-3)}`}
          </span>
        </div>
        {comments?.map((comm) => (
          <>
            <ReactQuill
              key={comm?.id}
              modules={{
                toolbar: false,
              }}
              className="bg-[#fff]  mt-3"
              value={comm.comment}
              readOnly={true}
              theme={"snow"}
            />
            <div className="bg-white border border-[#444]/50 border-t-0">
              <span className="text-sm">created by: </span>
              <span className=" bg-sky-blue text-sm text-[#0969DA] rounded px-1">
                {`${String(comm.creatorAddress).slice(0, 3)}...${String(
                  comm.creatorAddress
                ).slice(-3)}`}
              </span>
            </div>
          </>
        ))}

        <div className="mb-12">
          <ReactQuill
            value={comment}
            onChange={setComment}
            className="bg-white mt-12"
            theme="snow"
          />
          <div className="flex justify-end">
            <button
              onClick={() => {
                createComment();
              }}
              className="bg-fun-blue text-white p-2 rounded mt-2"
            >
              publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
