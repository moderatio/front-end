import { useContractWrite, usePrepareContractWrite } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";

const contractAddress = String(process.env.NEXT_PUBLIC_MODERATIO_ADDRESS);

interface Args {
  contractId: number;
}

export function useRequest({ contractId }: Args) {
  // TODO: remove this basic ruler later. It simply emits an event
  const { config } = usePrepareContractWrite({
    address: `0x${contractAddress}`,
    abi: moderatioAbi,
    functionName: "request",
    args: [contractId],
  });
  return useContractWrite(config);
}
