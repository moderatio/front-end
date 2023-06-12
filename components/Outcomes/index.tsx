import { type ICase } from "@/types/case";
import { useContractRead, useContractReads } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";
import { useRequest } from "@/lib/wagmi/useRequest";

interface Props {
  caseData: ICase;
}

export const Outcomes = ({ caseData }: Props) => {
  const { data: readyToRequest } = useContractRead({
    address: `0x${String(process.env.NEXT_PUBLIC_MODERATIO_ADDRESS)}`,
    abi: moderatioAbi,
    functionName: "isCaseReadyToRequest",
    args: [caseData.contractCaseId],
  });

  const { writeAsync: request, isLoading } = useRequest({ contractId: 1 });

  return (
    <div className="w-1/2">
      <div className="mt-2 border p-2 border-[#444]/50  ">
        <span className="text-md mb-2">Possible outcomes available:</span>
        {caseData.outcomes.map((outc, index) => (
          <div className="text-sm" key={outc}>
            <span>
              <span className="font-bold ">{index}. </span>
              {outc}
            </span>
          </div>
        ))}
        <div className="text-md text-red-500 mt-2">
          {readyToRequest === true && (
            <button
              onClick={() => {
                if (request) request();
              }}
              className="bg-dark-blue p-1  mt-2  rounded text-white"
            >
              {isLoading ? (
                <span>loading...</span>
              ) : (
                <span> Ready to judge!</span>
              )}
            </button>
          )}
          {readyToRequest === false && (
            <span className="text-[#FF0000]">ready to request</span>
          )}
        </div>
      </div>
    </div>
  );
};
