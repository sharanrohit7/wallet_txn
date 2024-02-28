import Moralis from "moralis";
import { genReportQuery } from "../rawQuery/reports.query";
import { genReportService } from "../services/reports.service";
import { checkDateValidity, getDateRange } from "../commonFunctions";

export async function getReport() {
  try {
    const result = await genReportService();
    return result;
  } catch (error) {
    throw error;
  }
}

// export async function getCurrentReport(){
//     try {
//         const cursor  = null;
//         const storeData:JsonArray= [];
//         const response: any =
//       await Moralis.EvmApi.transaction.getWalletTransactions({
//         chain: "0x1",
//         order: "DESC",
//         address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",

//       });

//       return  response;

//     } catch (error) {

//     }
// }

export async function getCurrentReport(toDate:string, fromDate:string) {
  try {
    let cursor: string | undefined = "null";
    const storeData: any[] = [];
  
    if(toDate && fromDate){
        const isValidDateRange = await checkDateValidity(fromDate, toDate);

        if (!isValidDateRange) {
            throw new Error("Invalid date range: 'fromDate' cannot be after 'toDate'.");
    
        }
    }
    else if(!toDate && !fromDate){
        toDate = getDateRange().startDate;
        fromDate = getDateRange().endDate;
    }
    console.log("from date: past : ",fromDate);
    console.log("To date: Present : ",toDate);
    while (true) {
      const response: any =
        await Moralis.EvmApi.transaction.getWalletTransactions({
          chain: "0x1",
          order: "DESC",
          cursor: cursor,
          fromDate: fromDate,
          toDate: toDate,
          address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        });

     
      if (
        response.jsonResponse.result &&
        response.jsonResponse.result.length > 0
      ) {
        storeData.push(...response.jsonResponse.result);
      }

          cursor = response.jsonResponse.cursor;
      console.log(cursor);
      

      if (!cursor) {
        break;
      }
    }

    // Check if storeData is empty
    if (storeData.length === 0) {
      throw new Error("No transactions found.");
    }

    // Find the transaction with the maximum value
    let maxTransaction: any | null = null;
    for (const transaction of storeData) {
      if (
        !maxTransaction ||
        parseFloat(transaction.value) > parseFloat(maxTransaction.value)
      ) {
        maxTransaction = transaction;
      }
    }

    // If maxTransaction is still null, throw an error
    if (!maxTransaction) {
      throw new Error("No maximum transaction found.");
    }

  
    const report = {
      max_value: maxTransaction.value,
      max_value_txn_hash: maxTransaction.hash,
      block_timestamp: maxTransaction.block_timestamp,
    };

    return report;
  } catch (error) {
    console.error("Error generating report:", error);
    throw error;
  }
}
