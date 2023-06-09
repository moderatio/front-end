import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { type ICase } from "@/types/case";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { signTypedData } from "@wagmi/core";

import { type IComment } from "@/types/comment";
import { useCreateComment } from "@/lib/services/mutations/useCreateComment";
import { domain, types } from "@/config/type.comment.data";
import { formatTime } from "@/lib/utils/formatTime";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();
  const [caseData, setCaseData] = useState<ICase>();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<IComment[]>();
  const { address } = useAccount();
  const { mutate: create } = useCreateComment();

  const fetchData = async () => {
    const res = await axios.get("/api/get-case", {
      params: { caseId: router.query.id },
    });

    const commentsRes = await axios.get("/api/get-comments", {
      params: { caseId: router.query.id },
    });

    setComments(commentsRes.data);
    setCaseData(res.data);
  };

  const createComment = async () => {
    if (!address) {
      toast.error("you must sign up with your wallet first");
      return;
    }
    const signature = await signTypedData({
      domain,
      value: {
        caseId: String(router.query.id),
        content,
      },
      types,
    });

    create({
      caseId: String(router.query.id),
      content,
      creatorAddress: address,
      signature,
    });
  };

  useEffect(() => {
    if (router.query.id) fetchData();
  }, [router.query.id]);

  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />
      <div className="max-w-[1200px] m-auto mt-5">
        <h1 className="text-3xl ">{caseData?.summary}</h1>

        <ReactQuill
          modules={{
            toolbar: false,
          }}
          className="bg-[#fff] mt-3 border-none"
          value={caseData?.problemStatement}
          readOnly={true}
          theme={"snow"}
        />
        <div className=" bg-white border border-[#444]/50 border-t-0">
          <div className="ml-2 text-sm">
            <span>created by: </span>
            <span className="  bg-sky-blue text-sm text-[#0969DA] rounded px-1">
              {`${String(caseData?.creator).slice(0, 3)}...${String(
                caseData?.creator
              ).slice(-3)}`}
            </span>
            <span>
              ,{" "}
              {caseData?.createdAt && formatTime(caseData?.createdAt._seconds)}
            </span>
          </div>
        </div>

        <div className="mt-2">
          <span className="text-md">Possible outcomes available</span>
        </div>

        {comments?.map((comm) => (
          <>
            <ReactQuill
              key={comm?.id}
              modules={{
                toolbar: false,
              }}
              className="bg-[#fff]  mt-3"
              value={comm.content}
              readOnly={true}
              theme={"snow"}
            />
            <div className="bg-white border border-[#444]/50 border-t-0">
              <div className="ml-2 text-sm">
                <span className="">created by: </span>
                <span className=" bg-sky-blue text-sm text-[#0969DA] rounded px-1">
                  {`${String(comm.creatorAddress).slice(0, 3)}...${String(
                    comm.creatorAddress
                  ).slice(-3)}`}
                </span>
                <span>, {formatTime(comm.createdAt._seconds)}</span>
              </div>
            </div>
          </>
        ))}

        <div className="mb-12">
          <ReactQuill
            value={content}
            onChange={setContent}
            className="bg-[#fff] mt-12"
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
