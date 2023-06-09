import { useMutation } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import axios from "axios";
import { toast } from "react-toastify";

interface Params {
  caseId: string;
  content: string;
  creatorAddress: string;
  signature: any;
}

const createComment = async (params: Params) => {
  if (!params.signature) throw Error("missing signature");
  const { caseId, content, creatorAddress, signature } = params;

  const res = await axios.post<{ id: string }>("/api/comment-case", {
    caseId,
    content,
    creatorAddress,
    signature,
  });
  return res.data;
};

const useCreateComment = () => {
  return useMutation(
    [QueryKeys.CREATE_COMMENT],
    createComment,

    {
      onSuccess: (data) => {
        if (!data) return;
        toast("published comment", { type: "success" });
      },

      onError: (err: any) => {
        if (err.response.data.error) toast.error(err.response.data.error);
        else toast.error("error publishing comment");
      },
    }
  );
};

export { useCreateComment, createComment };
