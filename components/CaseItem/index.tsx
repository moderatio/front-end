interface Props {
  summary: string;
  commentsAmount?: number;
}

const CaseItem = ({ summary }: Props) => {
  return (
    <div className="flex flex-col justify-center mt-3 p-3 border mx-3">
      <h1> {summary}</h1>
    </div>
  );
};

export default CaseItem;
