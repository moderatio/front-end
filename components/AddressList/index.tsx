import { type ICase } from "@/types/case";
import { useContractReads } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";
import { useEffect } from "react";

interface Props {
  caseData: ICase;
}

export const AddressList = ({ caseData }: Props) => {
  const { data: onChainData } = useContractReads({
    contracts: caseData.addresses.map((addr) => ({
      address: `0x${String(process.env.NEXT_PUBLIC_MODERATIO_ADDRESS)}`,
      abi: moderatioAbi,
      functionName: "getCaseContextProviderStatus",
      args: [caseData.contractCaseId, addr],
    })),
  });

  const hasDroppedTheMic = (addr: string) => {
    const idx = caseData.addresses.indexOf(addr);
    if (onChainData && onChainData[idx] === 2) return true;
    return false;
  };

  useEffect(() => {
    console.log(onChainData);
  }, [onChainData]);
  return (
    <div className="w-1/3">
      <div className="mt-2 border p-2 border-[#444]/50  ">
        <span className="text-md mb-2">Valid context providers</span>
        {caseData.addresses.map((addr, index) => (
          <div className="text-sm" key={addr}>
            <span className="text-fun-blue">{addr}</span>
            {hasDroppedTheMic(addr) && (
              <span className="ml-1 text-[#00A300]">(voted)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
