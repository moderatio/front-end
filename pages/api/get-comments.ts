import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";
import { type IComment } from "@/types/comment";

interface GetCommentsRequest extends NextApiRequest {
  body: {
    caseId: string;
  };
}

export default async function handler(
  req: GetCommentsRequest,
  res: NextApiResponse<IComment[] | { error: any }>
) {
  try {
    const { caseId } = req.body;

    // Fetch all comments for the specified case from Firestore
    const snapshot = await db
      .collection("cases")
      .doc(caseId)
      .collection("comments")
      .orderBy("createdAt", "asc")
      .get();

    const comments: IComment[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      const comment: IComment = {
        id: doc.id,
        content: data.content,
        createdAt: data.createdAt,
        creatorAddress: data.creatorAddress,
      };
      comments.push(comment);
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error retrieving comments: ", error);
    res.status(500).json({ error: "Unable to fetch comments." });
  }
}
