import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";
import { firestore } from "firebase-admin";

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
        createdAt: new Date(),
      });

    // Increment the commentsAmount counter inside the case document
    await db
      .collection("cases")
      .doc(caseId)
      .update({
        commentsAmount: firestore.FieldValue.increment(1),
      });

    res.status(200).json({ id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ error: "Unable to post data." });
  }
}
