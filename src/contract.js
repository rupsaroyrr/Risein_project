/**
 * Contract Integration Utilities Proxy
 * Exports contract client functions for Stellar / Soroban integration.
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
