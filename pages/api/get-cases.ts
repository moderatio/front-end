import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";

interface ListCasesRequest extends NextApiRequest {
  query: {
    page: string;
    limit: string;
  };
}

export default async function handler(
  req: ListCasesRequest,
  res: NextApiResponse
) {
  try {
    const { page = "1", limit = "10" } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const startAt = (pageNumber - 1) * limitNumber;
    const snapshot = await db
      .collection("cases")
      .orderBy("createdAt", "desc")
      .offset(startAt)
      .limit(limitNumber)
      .get();

    const cases = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ cases });
  } catch (error) {
    console.error("Error retrieving cases: ", error);
    res.status(500).json({ error: "Unable to retrieve cases." });
  }
}
