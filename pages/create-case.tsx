import { useState } from "react";
import Navbar from "../components/navbar";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import DynamicInputForm from "@/components/dynamicInputForm";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useCreateCase } from "@/lib/services/mutations/useCreateCase";
import { useContractCreateCase } from "@/lib/wagmi/useContractCreateCase";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

const CreateCasePage = () => {
  const [problemStatement, setProblemStatement] = useState("");

  const [summary, setSummary] = useState("");
  const { address } = useAccount();
  const [addresses, setAddresses] = useState<string[]>([""]);
  const [outcomes, setOutcomes] = useState<string[]>([""]);

  const { mutate: create } = useCreateCase();
  const { writeAsync: createCase } = useContractCreateCase({
    participants: addresses,
  });

  const handleSubmit = async () => {
    // TODO: use transactionHash of created contract to assing in back-end the contractId
    if (!address) toast.error("you must sign up with your wallet first");
    else if (!createCase) toast.error("error with create case");
    else {
      const tx = await createCase();
      const value = await tx.wait(1);
      const contractCaseId = parseInt(value.logs[0].topics[1], 16);
      create({
        outcomes,
        addresses,
        creator: address,
        problemStatement,
        summary,
        // transactionHash: tx.hash,
        contractCaseId,
      });
    }
  };

  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />

      <div className="max-w-[1200px] m-auto mt-5">
        <h1
          className="mb-4 text-xl font-extrabold leading-none 
        tracking-tight text-gray-900 md:text-xl  dark:text-white"
        >
          Define the case
        </h1>

        <p>First, define a case summary:</p>
        <div className="mt-3">
          <input
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="summary"
            type="text"
            placeholder="summary"
          />
        </div>
        <p className="mt-5">
          A case is simply an initial problem statement that you will define in
          the text section below. Be sure to state the problem extensively.
        </p>

        <ReactQuill
          className="bg-[#fff] border mt-3"
          theme="snow"
          value={problemStatement}
          onChange={setProblemStatement}
        />

        <p className="mt-5">
          It is also necessary to define the participants who will provide more
          context so the AI can elaborate on it and not be biased to a
          conclusion. Only these addresses will be able to create comments in
          your case.
        </p>

        <DynamicInputForm
          label="address"
          inputFields={addresses}
          setter={setAddresses}
        />
        <button
          onClick={() => {
            const updatedAddresses = [...addresses];
            updatedAddresses.push("");
            setAddresses(updatedAddresses);
          }}
          className="bg-dark-blue font-bold text-white p-2 rounded mt-2"
        >
          add new address
        </button>
        <p className="mt-5">
          The outcomes also must be pre-determined below. The AI will ponder
          which one to choose.
        </p>

        <DynamicInputForm
          label="outcome"
          inputFields={outcomes}
          setter={setOutcomes}
        />
        <button
          onClick={() => {
            const updateOutcomes = [...outcomes];
            updateOutcomes.push("");
            setOutcomes(updateOutcomes);
          }}
          className="bg-dark-blue font-bold text-white p-2 rounded mt-2"
        >
          add new outcomes
        </button>

        <div className="flex items-center m-auto">
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="mt-12 bg-mulberry rounded text-white p-2 px-5 font-bold "
          >
            create case
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCasePage;
