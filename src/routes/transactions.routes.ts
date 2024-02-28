import express, { Request, Response } from "express";
import   {getTransactionsAndStore}  from "../controller/transactions.controller";

const router = require("express").Router();

//Fetch data to  store in the database and return it as a response
router.get("/alltransactions", async (req: Request, res: Response) => {
  try {
    let cursor: string | undefined = req.query.cursor as string | undefined;

    const result = await getTransactionsAndStore(cursor);

    if (result && result.transactions.length > 0) {
      res.status(201).json({
        message: "Transactions fetched and stored in the database successfully",
        result: result,
      });
    } else {
      res.status(500).json({ error: "Failed to fetch or store transactions" });
    }
  } catch (error: any) {
    console.error("Error in Express route:", error);
    if (error.code && error.code === "P2002") {
      res.status(409).json({ message: "Conflict with existing data." });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});


export default router;
