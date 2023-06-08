import { formatDistanceToNow } from "date-fns";

export const formatTime = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return formatDistanceToNow(date, { addSuffix: true });
};
