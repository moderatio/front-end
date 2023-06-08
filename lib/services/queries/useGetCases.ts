import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import axios from "axios";
import { type ICase } from "@/types/case";

interface Params {
  page: number;
  limit: number;
}

interface GetRes {
  cases: ICase[];
}

const getCases = async (params: Params) => {
  const { data } = await axios.get<GetRes>(`/api/get-cases/`, { params });
  return data.cases;
};

const useGetCases = (props: Params) => {
  return useQuery([QueryKeys.GET_CASES], async () => await getCases(props), {});
};

export { useGetCases, getCases };
