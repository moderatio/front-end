import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";

interface CreateRequest extends NextApiRequest {
  body: {
    summary: string;
    addresses: string[];
    creator: string;
    problemStatement: string;
  };
}

export default async function handler(
  req: CreateRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);

    // TODO: validate signature to check if it matches the creatorAddress

    const docRef = await db.collection("cases").add({ ...req.body });
    res.status(200).json({ id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ error: "Unable to post data." });
  }
}
