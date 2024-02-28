 export default interface ITransactionData {
    trans_hash: string;
    from_address: string;
    txn_value:string ;
    block_timestamp: string| undefined;
}