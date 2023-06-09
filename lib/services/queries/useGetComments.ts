import { useQuery } from "react-query";
import { QueryKeys } from "@/config/queryKeys";
import axios from "axios";
import { type IComment } from "@/types/comment";

interface Params {
  caseId: string;
}

const getComments = async (params: Params) => {
  const { data } = await axios.get<IComment[]>(`/api/get-comments/`, {
    params,
  });
  return data;
};

const useGetComments = (props: Params) => {
  return useQuery(
    [QueryKeys.GET_COMMENTS, props.caseId],
    async () => await getComments(props),
    {
      enabled: props.caseId !== null,
    }
  );
};

export { useGetComments, getComments };
