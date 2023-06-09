import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";
import { type ICase } from "@/types/case";
import { type IComment } from "@/types/comment";

interface GetRequest extends NextApiRequest {
  query: {
    caseId: string;
  };
}

/** */

export default async function handler(req: GetRequest, res: NextApiResponse) {
  try {
    const { caseId } = req.query;

    // fetch problemStatement, comments and outocmes and puts everything in a single
    // text to return for the google API.

    const caseDoc = await db.collection("cases").doc(String(caseId)).get();

    if (!caseDoc.exists) {
      res.status(404).json({ error: "Case not found." });
      return;
    }

    const snapshot = await db
      .collection("cases")
      .doc(String(caseId))
      .collection("comments")
      .orderBy("createdAt", "asc")
      .get();

    const caseData = caseDoc.data() as ICase;

    let rawOutcomes: string = "";

    caseData.outcomes.forEach((outc, index) => {
      rawOutcomes = rawOutcomes.concat(`${index}. ${outc}`).concat("   ");
    });

    let rawComments: string = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      const comment: IComment = {
        id: doc.id,
        content: data.content,
        createdAt: data.createdAt,
        creatorAddress: data.creatorAddress,
      };
      rawComments = rawComments.concat("  ").concat(comment.content);
    });

    const rawText = ""
      .concat(caseData.problemStatement)
      .concat(
        "   the outcomes possible are the following. Each is preceded by the choice number it represents:   "
      )
      .concat(rawOutcomes)
      .concat("   ")
      .concat(rawComments);

    res.status(200).json(rawText);
  } catch (error) {
    console.error("Error retrieving case: ", error);
    res.status(500).json({ error: "Unable to retrieve case." });
  }
}
