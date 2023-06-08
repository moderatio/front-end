import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";

interface CreateRequest extends NextApiRequest {
  body: {
    summary: string;
    addresses: string[];
    creator: string;
    problemStatement: string;
    transactionHash: string;
  };
}

export default async function handler(
  req: CreateRequest,
  res: NextApiResponse
) {
  try {
    // TODO: validate signature to check if it matches the creatorAddress

    const docRef = await db
      .collection("cases")
      .add({ ...req.body, createdAt: new Date(), commentsAmount: 0 });
    res.status(200).json({ id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ error: "Unable to post data." });
  }
}
