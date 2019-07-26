import { Transaction } from "./Transaction"
export class Block
{
    public Index : Number;
    public Timestamp : Date = new Date();
    public Transactions : Array<Transaction>;
    public Nonce : string;
    public Hash : string;
    public PreviousBlockHash : string;

    public Block(nonce, previousblockhash, transactions)
    {
        this.Nonce = nonce;
        this.PreviousBlockHash = previousblockhash;
        this.Transactions = transactions;
    }


}