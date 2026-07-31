/**
 * Soroban Smart Contract Integration Proxy
 * Exports contract client functions for Soroban RPC interaction.
 */

export {
  CONTRACT_ID,
  NFT_CONTRACT_ID,
  SHOP_CONTRACT_ID,
  XLM_TOKEN_ID,
  executeSorobanOperation,
  invokeContractInit,
  invokeContractDonate,
  invokeContractWithdraw,
  invokeContractSetAdmin,
  invokeContractSetActive,
  invokeContractSetGoal,
  fetchReliefFundStats,
  fetchNftOwner,
  fetchNftMetadata,
  invokeContractBuyNft,
  invokeContractSellNft,
  invokeAdminFreeNft,
  invokeShopWithdraw
} from './stellar';
