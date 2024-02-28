import express, { Request, Response } from "express";
import { getCurrentReport, getReport } from "../controller/reports.controller";
const router = require("express").Router();

router.get("/report", async (req: Request, res: Response) => {
    try {
      const result = await getReport ();
  
      if (result) {
        res.status(201).json({
          message: "Report Generated",
          result: result,
        });
      } else {
        res.status(500).json({ error: "Failed to fetch or store transactions" });
      }
    } catch (error: any) {
      console.error("Error in Express route:", error);
      return error;
    }
  });

  router.get("/currentReport", async (req: Request, res: Response) => {
    try {
      let {fromDate, toDate} = req.query as any;
      console.log(fromDate,toDate);
      
      const result = await getCurrentReport (fromDate,toDate);
  
      if (result) {
        res.status(201).json({
          message: "Report Generated",
          result: result,
        });
      } else {

        res.status(500).json({ error: "Failed to fetch or store transactions" });
      }
    } catch (error: any) {
      console.error("Error in Express route:", error);
      if(error.message == 'No transactions found.'){
        return  res.status(400).json({status:"success", message: "No Transactions Found"})
      }
      if(error.message = 'RangeError: Invalid time value'){
        return  res.status(500).json({status:"Failed", message: "Invalid Date Value"})
      }if(error.message = 'Invalid date range'){
        return  res.status(500).json({status:"Failed", message: "fromDate cannot be after toDate"})
      }

      
      else{
        res.status(500).json({status:"Failed", message: error.message})
      }
      
      return error;
    }
  });
  
  export default router;