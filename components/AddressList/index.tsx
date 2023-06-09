import { type ICase } from "@/types/case";

interface Props {
  caseData: ICase;
}

export const AddressList = ({ caseData }: Props) => {
  return (
    <div className="w-1/3">
      <div className="mt-2 border p-2 border-[#444]/50  ">
        <span className="text-md mb-2">Valid context providers</span>
        {caseData.addresses.map((addr, index) => (
          <div className="text-sm" key={addr}>
            <span className="text-fun-blue">{addr}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
