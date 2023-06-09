import { type ICase } from "@/types/case";

interface Props {
  caseData: ICase;
}

export const Outcomes = ({ caseData }: Props) => {
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
          <span className="text-[#FF0000]">No consensus reached yet</span>
        </div>
      </div>
    </div>
  );
};
