import { type ICase } from "@/types/case";

interface Props {
  ca: ICase;
}

const CaseItem = ({ ca }: Props) => {
  return (
    <div className="flex flex-col justify-center mt-3 p-3 border mx-3">
      <h1> {ca.summary}</h1>
      <span>comments: {ca.commentsAmount}</span>
    </div>
  );
};

export default CaseItem;
