import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";

interface CreateRequest extends NextApiRequest {
  body: {
    summary: string;
    addresses: string[];
    outcomes: string[];
    creator: string;
    problemStatement: string;
    contractCaseId: number;
    // transactionHash: string;
  };
}

export default async function handler(
  req: CreateRequest,
  res: NextApiResponse
) {
  try {
    // wait for 1 block of tx
    // const tx = await ethers.getDefaultProvider().getTransaction(req.body.transactionHash);
    // await tx.wait(1);

    const docRef = await db
      .collection("cases")
      .add({ ...req.body, createdAt: new Date(), commentsAmount: 0 });
    res.status(200).json({ id: docRef.id });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ error: "Unable to post data." });
  }
}
