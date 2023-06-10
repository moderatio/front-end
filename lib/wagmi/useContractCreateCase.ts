import { type Address, useContractWrite, usePrepareContractWrite } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";
import { constants } from "ethers";

const contractAddress = String(process.env.NEXT_PUBLIC_MODERATIO_ADDRESS);

interface Args {
  ruler?: Address;
  participants: string[];
}

export function useContractCreateCase({ ruler, participants }: Args) {
  if (ruler === undefined) ruler = constants.AddressZero;
  const { config } = usePrepareContractWrite({
    address: `0x${contractAddress}`,
    abi: moderatioAbi,
    functionName: "createCase",
    args: [participants, ruler],
  });
  return useContractWrite(config);
}
