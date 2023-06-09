import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import axios from "axios";
import { type ICase } from "@/types/case";

interface Params {
  caseId: string;
}

const getCase = async (params: Params) => {
  const { data } = await axios.get<ICase>(`/api/get-case`, { params });
  return data;
};

const useGetCase = (props: Params) => {
  return useQuery(
    [QueryKeys.GET_CASE, props.caseId],
    async () => await getCase(props),
    {
      enabled: props.caseId !== null,
    }
  );
};

export { useGetCase, getCase };
