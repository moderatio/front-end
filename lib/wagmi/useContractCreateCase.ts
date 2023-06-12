import { type Address, useContractWrite, usePrepareContractWrite } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";

const contractAddress = String(process.env.NEXT_PUBLIC_MODERATIO_ADDRESS);

interface Args {
  ruler?: Address;
  participants: string[];
}

export function useContractCreateCase({ ruler, participants }: Args) {
  // TODO: remove this basic ruler later. It simply emits an event
  if (!ruler) ruler = "0x22b71291022b9fe139ebad84a6309d4966e22601";
  const { config } = usePrepareContractWrite({
    address: `0x${contractAddress}`,
    abi: moderatioAbi,
    functionName: "createCase",
    args: [participants, ruler],
  });
  return useContractWrite(config);
}
