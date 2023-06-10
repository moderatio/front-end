import { useContractWrite, usePrepareContractWrite } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";

const contractAddress = "0xb7efa49ae159c463c2c4d3b9dad89435a3681a9e";

interface Args {
  caseId: number;
}

export function useDropTheMic({ caseId }: Args) {
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: moderatioAbi,
    functionName: "createCase",
    args: [caseId],
  });
  return useContractWrite(config);
}
