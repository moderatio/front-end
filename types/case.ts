export interface ICase {
  id: string;
  summary: string;
  addresses: string[];
  creator: string;
  problemStatement: string;
  createdAt: any;
  commentsAmount: number;
}
