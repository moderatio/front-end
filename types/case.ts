export interface ICase {
  id: string;
  contractCaseId: number;
  summary: string;
  addresses: string[];
  outcomes: string[];
  creator: string;
  problemStatement: string;
  createdAt: { _seconds: number };
  commentsAmount: number;
}
