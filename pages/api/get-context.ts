import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";
import { type ICase } from "@/types/case";
import { type IComment } from "@/types/comment";
import axios from "axios";

interface GetRequest extends NextApiRequest {
  query: {
    caseId: string;
  };
}

export default async function handler(req: GetRequest, res: NextApiResponse) {
  try {
    const { caseId: contractCaseId } = req.query;

    // fetch problemStatement, comments and outocmes and puts everything in a single
    // text to return for the google API.

    console.log("contract case Id", contractCaseId);
    const caseDoc = await db
      .collection("cases")
      .where("contractCaseId", "==", 0)
      .get();

    if (caseDoc.empty) {
      res.status(404).json({ error: "Case not found." });
      return;
    }

    const caseData = caseDoc.docs[0].data() as ICase;

    const snapshot = await db
      .collection("cases")
      .doc(String(caseDoc.docs[0].id))
      .collection("comments")
      .orderBy("createdAt", "asc")
      .get();

    // if case data was already setted, return the case data

    if (caseData.result !== null) {
      res.status(200).json({ result: caseData.result });
    }

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

    const gptPrompt = `
You will be given a case description and, based on utilitarianism, your task is to decide what the best ruling option is.

For example:

Case description: A trolley is speeding down a track, about to hit and kill five people. You have the option to pull a lever, diverting the trolley to another track where it will kill one person instead. What do you do?

Comments:
0. 2 of the 5 people are criminals.
1. The one person is a doctor.

Outcomes: 
0. Pull the lever, diverting the trolley to the other track where it will kill one person.
1. Do nothing, allowing the trolley to kill the five people on the current track.

Choice: 1
------`;

    const rawText = ""
      .concat(gptPrompt)
      .concat(caseData.problemStatement)
      .concat(
        `Outcomes:  
      `
      )
      .concat(rawOutcomes)
      .concat(
        `Comments:   
       `
      )
      .concat(rawComments).concat(`
      Choice: `);

    const gptRes = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: rawText,
        temperature: 0,
        max_tokens: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${String(process.env.OPENAI_KEY)}`,
        },
      }
    );

    // Update the "result" property of the case document
    // to avoid wasting gpt-3 resources

    // TODO: rethink this later, because if any new comment comes,
    // or is edited, the case outcome will be outdated
    // await db
    //   .collection("cases")
    //   .doc(String(caseDoc.docs[0].id))
    //   .update({
    //     result: Number(gptRes.data.choices[0].text),
    //   });

    res.status(200).json({ result: Number(gptRes.data.choices[0].text) });
  } catch (error) {
    console.error("Error retrieving case: ", error);
    res.status(500).json({ error: "Unable to retrieve case." });
  }
}
