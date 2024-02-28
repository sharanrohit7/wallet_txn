import axios from "axios";
import { PrismaClient } from "@prisma/client";
import Moralis from "moralis";
import ITransactionData from "../../Interface/ITransactionData";
import { insertTransactionsInBatches } from "../services/transaction.service";
import { configVar } from "../config/configVar";

export async function getTransactionsAndStore(
  cursor: string | undefined
): Promise<any> {
  try {
    const response: any =
      await Moralis.EvmApi.transaction.getWalletTransactions({
        chain: "0x1",
        order: "DESC",
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        cursor: cursor,
      });

    const resCursor = response.jsonResponse.cursor;
    const resultArray = response.jsonResponse.result;

    // Check if the resultArray exists and is an array
    if (Array.isArray(resultArray)) {
      // Extract transactions from the result array and map them to the desired format
      const transactions: ITransactionData[] = resultArray.map(
        (transaction: any) => {
          return {
            from_address: transaction.from_address,
            txn_value: transaction.value,
            block_timestamp: transaction.block_timestamp,
            trans_hash: transaction.hash,
          };
        }
      );

      await insertTransactionsInBatches(transactions);

      return { cursor: resCursor, transactions: transactions };
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    // If there's an error during the process, throw it for centralized error handling
    throw error;
  }
}
