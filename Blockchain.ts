import { Block, IBlock } from "./Class/Block";
import { Transaction } from "./Class/Transaction";
import { Guid } from "guid-typescript";

class Blockchain
{
    
    public TheChain: Array<Block>;
    public NewsTransactions: Array<Transaction>;
    public Blockchain()
    {
        this.TheChain = new Array<Block>();
        this.NewsTransactions = new Array<Transaction>();
    }


    public CreateNewBlock(nonce, previousBlockHash, hash)
    {
        let block :  Block = {
            Index : (this.TheChain.length + 1),
            Timestamp : new Date(),
            Transactions: this.NewsTransactions,
            Nonce: nonce,
            Hash: hash,
            PreviousBlockHash: previousBlockHash
        };
        this.TheChain.push(block);
        this.NewsTransactions = new Array<Transaction>();
        return block;
    }

    public CreateNewTransaction(amount, sender, recipient)
    {
        let newTransaction : Transaction = {
            Amount: amount,
            Sender: sender,
            Recipient: recipient,
            TransactionId: Guid.create()
        };
    
        return newTransaction;
    }

    public GetLastBlock()
    {
        return this.TheChain[this.TheChain.length -1];
    }

    public AddTransactionToPendingTransactions(transactionObj)
    {
        this.NewsTransactions.push(transactionObj);
        return this.GetLastBlock()['index'] + 1;
    }
}