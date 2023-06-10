import { useDropTheMic } from "@/lib/wagmi/useDropTheMic";
import { toast } from "react-toastify";

interface Props {
  caseId: number;
}

export const DropTheMic = ({ caseId }: Props) => {
  const { write } = useDropTheMic({ caseId });

  return (
    <button
      onClick={() => {
        if (!write) return toast.error("error initializing contract");
        write();
      }}
      className="bg-fun-blue text-white p-2 rounded mt-2"
    >
      Drop the mic
    </button>
  );
};
