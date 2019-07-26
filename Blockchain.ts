import { Block } from "./Class/Block";
import { Transaction } from "./Class/Transaction";
class Blockchain
{
    
    public TheChain: Array<Block>;
    public NewsTransactions: Array<Transaction>;
    public Blockchain()
    {
        this.TheChain = new Array<Block>();
        this.NewsTransactions = new Array<Transaction>();
    }


    public CreateNewBlock()
    {

    }

    public CreateNewTransaction()
    {

    }

    public GetLastBlock()
    {
        return this.TheChain[this.TheChain.length -1];
    }
}