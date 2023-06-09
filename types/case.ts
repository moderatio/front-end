export interface ICase {
  id: string;
  summary: string;
  addresses: string[];
  outcomes: string[];
  creator: string;
  problemStatement: string;
  createdAt: { _seconds: number };
  commentsAmount: number;
}
