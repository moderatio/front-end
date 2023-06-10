import { type Address, useContractWrite, usePrepareContractWrite } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";
import { constants } from "ethers";

const contractAddress = "0xb7efa49ae159c463c2c4d3b9dad89435a3681a9e";

interface Args {
  ruler?: Address;
  participants: string[];
}

export function useContractCreateCase({ ruler, participants }: Args) {
  if (ruler === undefined) ruler = constants.AddressZero;
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: moderatioAbi,
    functionName: "createCase",
    args: [participants, ruler],
  });
  return useContractWrite(config);
}
