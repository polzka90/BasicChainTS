import { Transaction } from "./Transaction"
export class Block
{
    constructor(){}
    public Index : Number;
    public Timestamp : Date = new Date();
    public Transactions : Array<Transaction>;
    public Nonce : Number;
    public Hash : String;
    public PreviousBlockHash : String;
}

export interface IBlock extends Block
{}