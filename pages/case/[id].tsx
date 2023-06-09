import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { signTypedData } from "@wagmi/core";

import { useCreateComment } from "@/lib/services/mutations/useCreateComment";
import { domain, types } from "@/config/type.comment.data";
import { formatTime } from "@/lib/utils/formatTime";
import { useGetCase } from "@/lib/services/queries/useGetCase";
import { useGetComments } from "@/lib/services/queries/useGetComments";
import { Outcomes } from "@/components/Outcomes";
import { AddressList } from "@/components/AddressList";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const { address } = useAccount();
  const { mutate: create } = useCreateComment();

  const { data: caseData, isLoading: isLoadingCase } = useGetCase({
    caseId: String(router.query.id),
  });

  const { data: comments, isLoading: isLoadingComments } = useGetComments({
    caseId: String(router.query.id),
  });

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
    console.log(caseData);
  }, [caseData]);

  if (isLoadingCase || isLoadingComments) {
    return (
      <div className="w-full h-screen bg-[##e7e8ea]">
        <Navbar />
        <div className="max-w-[1200px] m-auto mt-5">
          <span>loading...</span>
        </div>
      </div>
    );
  }

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

        <div className="flex flex-row w-full justify-between">
          {caseData && <Outcomes caseData={caseData} />}
          {caseData && <AddressList caseData={caseData} />}
        </div>
        {comments?.map((comm) => (
          <div key={comm.id}>
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
          </div>
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
