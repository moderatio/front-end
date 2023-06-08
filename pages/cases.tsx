import CaseItem from "@/components/CaseItem";
import Navbar from "../components/navbar";
import { useGetCases } from "@/lib/services/queries/useGetCases";

const CasesPage = () => {
  // Add your create case logic here
  const { data, isLoading } = useGetCases({ limit: 10, page: 1 });

  return (
    <div className="w-full h-screen bg-[##e7e8ea]">
      <Navbar />

      <div className="max-w-[1200px] m-auto">
        <div className="mt-3">
          <h1>available cases. Either with a reached consensus or ongoing. </h1>

          <div className="flex flex-col">
            {!isLoading && data?.map((ca) => <CaseItem key={ca.id} ca={ca} />)}
          </div>
        </div>
      </div>
      {/* Add your create case form or content here */}
    </div>
  );
};

export default CasesPage;
