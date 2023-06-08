import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";
import { firestore } from "firebase-admin";
import { verifyTypedData } from "ethers/lib/utils.js";
import { domain, types } from "@/config/type.comment.data";

interface CommentRequest extends NextApiRequest {
  body: {
    caseId: string;
    content: string;
    creatorAddress: string;
    signature: string;
  };
}

export default async function handler(
  req: CommentRequest,
  res: NextApiResponse
) {
  try {
    // TODO: validate signature to check if it matches the creatorAddress
    const { caseId, content, creatorAddress, signature } = req.body;

    const signerAddress = verifyTypedData(
      domain,
      types,
      {
        caseId,
        content,
      },
      signature
    );

    // check if signer is in array of commenters
    const caseDoc = await db.collection("cases").doc(caseId).get();

    if (!caseDoc.exists) {
      res.status(404).json({ error: "Case not found." });
      return;
    }

    const cas = caseDoc.data() as { addresses: string[] };
    if (!cas.addresses.includes(signerAddress)) {
      res.status(401).json({ error: "invalid signer." });
      return;
    }

    // Create a new comment document in Firestore
    const docRef = await db
      .collection("cases")
      .doc(caseId)
      .collection("comments")
      .add({
        content,
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
