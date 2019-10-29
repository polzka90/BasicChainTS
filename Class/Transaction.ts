import { Guid } from "guid-typescript";

export class Transaction{
    constructor(){}
    public Amount: Number;
    public Sender: Guid;
    public Recipient: Guid;
    public TransactionId: Guid;
}

export interface ITransaction extends Transaction
{}