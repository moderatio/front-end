import { type ICase } from "@/types/case";
import { useContractRead } from "wagmi";
import moderatioAbi from "@/abi/Moderatio.json";
import { useRequest } from "@/lib/wagmi/useRequest";
import { useExecute } from "@/lib/wagmi/useExecute";

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
  const { data: onChainCase } = useContractRead({
    address: `0x${String(process.env.NEXT_PUBLIC_MODERATIO_ADDRESS)}`,
    abi: moderatioAbi,
    functionName: "cases",
    args: [caseData.contractCaseId],
  });

  const { writeAsync: executeRuling, isLoading: isRuling } = useExecute({
    contractId: caseData.contractCaseId,
  });

  const { writeAsync: request, isLoading } = useRequest({
    contractId: caseData.contractCaseId,
  });

  const PossibleStatus = {
    2: "Ready to execute",
    3: "Ruling executed",
  };

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
        <div className="text-md text-red-500 mt-2 flex flex-col">
          {readyToRequest === true && (
            <button
              onClick={() => {
                if (request) request();
              }}
              className="bg-dark-blue p-1  mt-2 w-1/4  rounded text-white"
            >
              {isLoading ? (
                <span>loading...</span>
              ) : (
                <span> Ready to judge!</span>
              )}
            </button>
          )}

          {(onChainCase as { status: number })?.status === 2 && (
            <button
              onClick={() => {
                if (executeRuling) executeRuling();
              }}
              className="bg-dark-blue p-1  mt-2 w-1/4  rounded text-white"
            >
              {isRuling ? (
                <span>loading...</span>
              ) : (
                <span> Ready to rule!</span>
              )}
            </button>
          )}

          <span className="text-sm gray">
            {(onChainCase as { status: number })?.status !== 1 && (
              <span>
                {" "}
                current status:{" "}
                {
                  PossibleStatus[(onChainCase as { status: number })?.status]
                }{" "}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
