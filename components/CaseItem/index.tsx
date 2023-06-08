import { type ICase } from "@/types/case";
import { abrevAddress } from "@/lib/utils/abrevAddress";
import Link from "next/link";
import { formatTime } from "@/lib/utils/formatTime";

interface Props {
  ca: ICase;
  index: number;
}

const CaseItem = ({ ca, index }: Props) => {
  return (
    <div className="  flex flex-col justify-center mt-1 p-1 ">
      <Link href={`/case/${ca.id}`}>
        <h1 className="hover:underline">
          {`${index + 1}. `} {ca.summary}
        </h1>
      </Link>
      <div className="text-[#6e8177] text-sm">
        <span>
          {ca.commentsAmount > 1
            ? `${ca.commentsAmount} comments`
            : "1 comment"}
          , created by:{" "}
          <span className=" bg-sky-blue text-sm text-[#0969DA] rounded px-1">
            {`${abrevAddress(ca.creator)}`}
          </span>
          <span>, {formatTime(ca.createdAt._seconds)}</span>
        </span>
      </div>
    </div>
  );
};

export default CaseItem;
