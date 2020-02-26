
import { Blockchain } from './Blockchain';

describe('Blockchain', () => {
    let mychain: Blockchain;

  

  
    it('should create', () => {
      expect(mychain).toBeTruthy();
    });


    let block = mychain.GetLastBlock();
    let block1 = mychain.CreateNewBlock(18140,"0","0");
    
  });