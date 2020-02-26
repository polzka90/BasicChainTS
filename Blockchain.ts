import { Block, IBlock } from "./Class/Block";
import { Transaction } from "./Class/Transaction";
import { Guid } from "guid-typescript";
import { sha3_512 } from 'js-sha3';

export class Blockchain
{
    
    public TheChain: Array<Block>;
    public NewsTransactions: Array<Transaction>;
    public Blockchain()
    {
        this.TheChain = new Array<Block>();
        this.NewsTransactions = new Array<Transaction>();
        this.CreateNewBlock(100,"0","0");
    }


    public CreateNewBlock(nonce : Number, previousBlockHash : String, hash : String)
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

    public CreateNewTransaction(amount : Number, sender : Guid, recipient : Guid)
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

    public AddTransactionToPendingTransactions(transactionObj : Transaction)
    {
        this.NewsTransactions.push(transactionObj);
        return this.GetLastBlock().Index.valueOf() + 1;
    }

    public HashBlock(previousBlockHash : String, currentBlockData : Block, nonce : Number)
    {
        let dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
        let hash = sha3_512(dataAsString);
        return hash;
    }

    public ProofOfWork(previousBlockHash : String, currentBlockData : Block)
    {
        let nonce = 0;
        let hash = this.HashBlock(previousBlockHash, currentBlockData, nonce);
        while (hash.substring(0, 4) !== '0000') {
            nonce++;
            hash = this.HashBlock(previousBlockHash, currentBlockData, nonce);
        }
    
        return nonce;
    }

    public ChainIsValid()
    {
        let validChain = true;

	    for (var i = 1; i < this.TheChain.length; i++) {
		    let currentBlock = this.TheChain[i];
		    let prevBlock = this.TheChain[i - 1];
		    let blockHash = this.HashBlock(prevBlock.Hash, currentBlock, currentBlock.Nonce);
		    if (blockHash.substring(0, 4) !== '0000') validChain = false;
		    if (currentBlock.PreviousBlockHash !== prevBlock.Hash) validChain = false;
	    };

	    let genesisBlock = this.TheChain[0];
	    let correctNonce = genesisBlock.Nonce === 100;
	    let correctPreviousBlockHash = genesisBlock.PreviousBlockHash === '0';
	    let correctHash = genesisBlock.Hash === '0';
	    let correctTransactions = genesisBlock.Transactions.length === 0;

	    if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

	    return validChain;
    }

    public GetBlock(blockHash : String)
    {
        let selectedBlock : Block = null;
        this.TheChain.forEach(block => {
            if (block.Hash === blockHash) selectedBlock = block;
        });
        return selectedBlock;
    }

    public GetTransaction(transactionId : Guid)
    {
        let correctTransaction = null;
        let correctBlock = null;
    
        this.TheChain.forEach(block => {
            block.Transactions.forEach(transaction => {
                if (transaction.TransactionId === transactionId) {
                    correctTransaction = transaction;
                    correctBlock = block;
                };
            });
        });
    
        return {
            transaction: correctTransaction,
            block: correctBlock
        };
    }

    public GetAddressData(address : Guid)
    {
        let addressTransactions = [];
        this.TheChain.forEach(block => {
            block.Transactions.forEach(transaction => {
                if(transaction.Sender === address || transaction.Recipient === address) {
                    addressTransactions.push(transaction);
                };
            });
        });
    
        let balance = 0;
        addressTransactions.forEach(transaction => {
            if (transaction.Recipient === address) balance += transaction.Amount;
            else if (transaction.Sender === address) balance -= transaction.Amount;
        });
    
        return {
            addressTransactions: addressTransactions,
            addressBalance: balance
        };
    }

}