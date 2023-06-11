import { useContractWrite, usePrepareContractWrite } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";
import { BigNumber } from "ethers";

const contractAddress = String(process.env.NEXT_PUBLIC_MODERATIO_ADDRESS);

interface Args {
  caseId: number;
}

export function useDropTheMic({ caseId }: Args) {
  const { config } = usePrepareContractWrite({
    address: `0x${contractAddress}`,
    abi: moderatioAbi,
    functionName: "dropTheMic",
    args: [caseId],
  });
  return useContractWrite(config);
}
