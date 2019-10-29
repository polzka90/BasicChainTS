import { Transaction } from "./Transaction"
export class Block
{
    constructor(){}
    public Index : Number;
    public Timestamp : Date = new Date();
    public Transactions : Array<Transaction>;
    public Nonce : string;
    public Hash : string;
    public PreviousBlockHash : string;
}

export interface IBlock extends Block
{}