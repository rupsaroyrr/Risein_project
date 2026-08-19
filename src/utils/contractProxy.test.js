import { describe, it, expect } from 'vitest';
import * as contractProxy from '../contract';
import * as sorobanProxy from '../soroban';

describe('Contract Proxy Modules', () => {
  it('should export all required contract IDs in contract.js proxy', () => {
    expect(contractProxy.CONTRACT_ID).toBeDefined();
    expect(contractProxy.NFT_CONTRACT_ID).toBeDefined();
    expect(contractProxy.SHOP_CONTRACT_ID).toBeDefined();
    expect(contractProxy.XLM_TOKEN_ID).toBeDefined();

    expect(typeof contractProxy.CONTRACT_ID).toBe('string');
    expect(contractProxy.CONTRACT_ID.length).toBeGreaterThan(10);
  });

  it('should export all required contract IDs in soroban.js proxy', () => {
    expect(sorobanProxy.CONTRACT_ID).toBeDefined();
    expect(sorobanProxy.NFT_CONTRACT_ID).toBeDefined();
    expect(sorobanProxy.SHOP_CONTRACT_ID).toBeDefined();
    expect(sorobanProxy.XLM_TOKEN_ID).toBeDefined();
  });

  it('should export identical contract invocation functions across both proxies', () => {
    const requiredFunctions = [
      'executeSorobanOperation',
      'invokeContractInit',
      'invokeContractDonate',
      'invokeContractWithdraw',
      'invokeContractSetAdmin',
      'invokeContractSetActive',
      'invokeContractSetGoal',
      'fetchReliefFundStats',
      'fetchNftOwner',
      'fetchNftMetadata',
      'invokeContractBuyNft',
      'invokeContractSellNft',
      'invokeAdminFreeNft',
      'invokeShopWithdraw'
    ];

    requiredFunctions.forEach((fnName) => {
      expect(contractProxy[fnName]).toBeTypeOf('function');
      expect(sorobanProxy[fnName]).toBeTypeOf('function');
      expect(contractProxy[fnName]).toBe(sorobanProxy[fnName]);
    });
  });
});
