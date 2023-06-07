import CaseItem from "@/components/CaseItem";
import Navbar from "../components/navbar";

const CasesPage = () => {
  // Add your create case logic here

  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />

      <div className="max-w-[1200px] m-auto">
        <div className="mt-3">
          <h1>available cases. Either with a reached consensus or ongoing. </h1>

          <div className="grid grid-cols-4">
            <CaseItem summary="trolley problem" />
            <CaseItem summary="trolley problem" />

            <CaseItem summary="trolley problem" />

            <CaseItem summary="trolley problem" />
          </div>
        </div>
      </div>
      {/* Add your create case form or content here */}
    </div>
  );
};

export default CasesPage;
