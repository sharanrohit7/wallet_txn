import { Prisma } from "@prisma/client";

export const  genReportQuery =`WITH MaxValueTxn AS (
    SELECT
    trans_hash
    AS max_value_txn_hash
    FROM
        wallet_trans_master
    ORDER BY
    txn_value DESC
    LIMIT 1
),
MaxTxnsWithAddress AS (
    SELECT
        from_address,
        COUNT(*) AS address_txn_count
    FROM
        wallet_trans_master
    GROUP BY
        from_address
    ORDER BY
        address_txn_count DESC
    LIMIT 1
),
MaxEntriesDate AS (
    SELECT
        DATE_TRUNC('day', block_timestamp) AS max_entries_date,
        COUNT(*) AS entry_count
    FROM
        wallet_trans_master
    GROUP BY
        max_entries_date
    ORDER BY
        entry_count DESC
    LIMIT 1
)
SELECT
    (SELECT max_value_txn_hash FROM MaxValueTxn) AS max_value_txn_hash,
    (SELECT from_address FROM MaxTxnsWithAddress) AS max_txns_with_address,
    (SELECT max_entries_date FROM MaxEntriesDate) AS date_max_txns;
`;
