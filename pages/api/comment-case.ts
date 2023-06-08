import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";

interface CommentRequest extends NextApiRequest {
  body: {
    caseId: string;
    comment: string;
    creatorAddress: string;
  };
}

export default async function handler(
  req: CommentRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);

    // TODO: validate signature to check if it matches the creatorAddress

    const { caseId, comment, creatorAddress } = req.body;

    // Create a new comment document in Firestore
    const docRef = await db
      .collection("cases")
      .doc(caseId)
      .collection("comments")
      .add({
        comment,
        creatorAddress,
      });

    res.status(200).json({ id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ error: "Unable to post data." });
  }
}
