import { useMutation } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import axios from "axios";
import { toast } from "react-toastify";
import Router from "next/router";

interface Params {
  summary: string;
  addresses: string[];
  outcomes: string[];
  creator: string;
  problemStatement: string;
  transactionHash: string;
}

const createCase = async (params: Params) => {
  try {
    const { summary, addresses, problemStatement, creator, outcomes } = params;
    const res = await axios.post<{ id: string }>(
      "/api/create-case",
      {
        summary,
        addresses,
        problemStatement,
        creator,
        outcomes,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err: any) {
    toast(`error: ${String(err.message)}`, { type: "error" });
  }
};

const useCreateCase = () => {
  return useMutation(
    [QueryKeys.CREATE_CASE],
    createCase,

    {
      onSuccess: (data) => {
        if (!data) return;
        toast("case created", { type: "success" });
        Router.push(`case/${String(data.id)}`);
      },
    }
  );
};

export { useCreateCase, createCase };
