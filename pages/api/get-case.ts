import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";

interface GetCaseRequest extends NextApiRequest {
  body: {
    caseId: string;
  };
}

export default async function handler(
  req: GetCaseRequest,
  res: NextApiResponse
) {
  try {
    const { caseId } = req.body;

    console.log("case id", caseId);
    const caseDoc = await db.collection("cases").doc(caseId).get();

    if (!caseDoc.exists) {
      res.status(404).json({ error: "Case not found." });
      return;
    }

    const caseData = caseDoc.data();
    res.status(200).json(caseData);
  } catch (error) {
    console.error("Error retrieving case: ", error);
    res.status(500).json({ error: "Unable to retrieve case." });
  }
}
