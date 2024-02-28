import { PrismaClient } from "@prisma/client";
import ITransactionData from "../../Interface/ITransactionData";
const prisma = new PrismaClient();

export async function insertTransactionsInBatches(
  transactions: ITransactionData[]
): Promise<void> {
  const batchSize = 102;

  for (let i = 0; i < transactions.length; i += batchSize) {
    const batch = transactions.slice(i, i + batchSize);

    await prisma.wallet_trans_master.createMany({
      data: batch.map((transaction) => ({
        from_address: transaction.from_address,
        txn_value: parseFloat(transaction.txn_value),
        block_timestamp: transaction.block_timestamp,
        trans_hash: transaction.trans_hash,
      })),
    });
  }
}
