/**
 * Core Smart Contract Integration Module (Stellar SDK & Soroban RPC)
 * Provides direct interaction logic for:
 * 1. TranscendenceContract (Relief Pool)
 * 2. StellarNFT (Asset Ownership & Metadata)
 * 3. NFTShop (Marketplace & Inter-Contract Communication)
 */

import * as StellarSdk from '@stellar/stellar-sdk';
import { StellarWalletsKit, WalletNetwork, ALLOWED_WALLETS } from './utils/kit';

// Default Endpoints
export let horizonUrl = 'https://horizon-testnet.stellar.org';
export let rpcUrl = 'https://soroban-testnet.stellar.org';

export let horizonServer = new StellarSdk.Horizon.Server(horizonUrl);
export let rpcServer = new StellarSdk.rpc.Server(rpcUrl);

export const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;

// Contract Identifiers (Newly Deployed to Stellar Testnet)
export const CONTRACT_ID = "CB73TNAHPLIHS2FPCNCUERLDUEPA4QPYA2CSCSV6PFVZMSCI47ESKSLJ";
export const NFT_CONTRACT_ID = "CCT5ZLD3XYI3SQMOAW5KSW3RIHFVMHLCLOQSLUPMBQR5BXXH5VMIDMZB";
export const SHOP_CONTRACT_ID = "CBW4ZRVEO3Q6J76HX7JY47H7WIJANZKNJPUQ2H2QS4ZO46DE6V4CTBJG";
export const XLM_TOKEN_ID = "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC";

const kit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  allowedWallets: [
    ALLOWED_WALLETS.FREIGHTER,
    ALLOWED_WALLETS.XBULL,
    ALLOWED_WALLETS.ALBEDO,
    ALLOWED_WALLETS.RABE,
    ALLOWED_WALLETS.HANA
  ]
});

export const setCustomEndpoints = (newHorizonUrl, newRpcUrl) => {
  if (newHorizonUrl) {
    horizonUrl = newHorizonUrl;
    horizonServer = new StellarSdk.Horizon.Server(newHorizonUrl);
  }
  if (newRpcUrl) {
    rpcUrl = newRpcUrl;
    rpcServer = new StellarSdk.rpc.Server(newRpcUrl);
  }
};

export const getEndpoints = () => ({ horizonUrl, rpcUrl });

/**
 * Execute Soroban Contract Operation with Simulation and Wallet Signing
 */
export const executeSorobanOperation = async (publicKey, operation, onLog, walletType) => {
  try {
    const sourceAccount = await horizonServer.loadAccount(publicKey);
    let tx = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: "1000",
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(operation)
      .setTimeout(60)
      .build();

    if (onLog) onLog("SIMULATING CONTRACT EXECUTION...", "info");
    tx = await rpcServer.prepareTransaction(tx);
    
    if (onLog) onLog("UPLINK READY: AWAITING SIGNATURE...", "warn");
    const { signedTxXdr } = await kit.signTransaction(tx.toXDR(), {
      networkPassphrase: NETWORK_PASSPHRASE,
      address: publicKey,
      walletType
    });
    
    if (onLog) onLog("SIGNATURE ACQUIRED. BROADCASTING...", "ok");
    const sendResponse = await rpcServer.sendTransaction(
      StellarSdk.TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE)
    );
    
    if (sendResponse.status === 'ERROR') {
      throw new Error(`RPC_REJECTED: ${sendResponse.errorResultXdr}`);
    }

    if (onLog) onLog("TRANSACTION SUBMITTED. POLLING FOR INCLUSION...", "info");
    
    let status = 'PENDING';
    let txHash = sendResponse.hash;
    let attempts = 0;
    
    while (status === 'PENDING' && attempts < 10) {
      const txResponse = await rpcServer.getTransaction(txHash);
      status = txResponse.status;
      if (status === 'SUCCESS') {
        if (onLog) onLog("CONTRACT TRANSACTION FINALIZED.", "ok");
        return { hash: txHash };
      } else if (status === 'FAILED') {
        throw new Error("CONTRACT_EXECUTION_FAILED");
      }
      attempts++;
      await new Promise(r => setTimeout(r, 2000));
    }
    
    return { hash: txHash };
  } catch (err) {
    console.error("Soroban Execution Error:", err);
    throw err;
  }
};

/* ── 1. TRANSCENDENCE CONTRACT FUNCTIONS ─────────────────────── */

export const invokeContractInit = async (publicKey, onLog, walletType) => {
  const contract = new StellarSdk.Contract(CONTRACT_ID);
  const op = contract.call(
    "init", 
    StellarSdk.nativeToScVal(publicKey, { type: "address" }),
    StellarSdk.nativeToScVal(XLM_TOKEN_ID, { type: "address" }),
    StellarSdk.nativeToScVal(100000000000n, { type: "i128" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const invokeContractDonate = async (publicKey, amount, onLog, walletType) => {
  const contract = new StellarSdk.Contract(CONTRACT_ID);
  const stroops = BigInt(Math.floor(amount * 10000000));
  const op = contract.call(
    "donate", 
    StellarSdk.nativeToScVal(publicKey, { type: "address" }),
    StellarSdk.nativeToScVal(stroops, { type: "i128" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const invokeContractWithdraw = async (publicKey, destination, onLog, walletType) => {
  const contract = new StellarSdk.Contract(CONTRACT_ID);
  const op = contract.call(
    "withdraw", 
    StellarSdk.nativeToScVal(destination, { type: "address" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const invokeContractSetAdmin = async (publicKey, newAdmin, onLog, walletType) => {
  const contract = new StellarSdk.Contract(CONTRACT_ID);
  const op = contract.call(
    "set_admin", 
    StellarSdk.nativeToScVal(newAdmin, { type: "address" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const invokeContractSetActive = async (publicKey, isActive, onLog, walletType) => {
  const contract = new StellarSdk.Contract(CONTRACT_ID);
  const op = contract.call(
    "set_active", 
    StellarSdk.nativeToScVal(isActive, { type: "bool" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const invokeContractSetGoal = async (publicKey, newGoalXlm, onLog, walletType) => {
  const contract = new StellarSdk.Contract(CONTRACT_ID);
  const stroops = BigInt(Math.floor(newGoalXlm * 10000000));
  const op = contract.call(
    "set_goal", 
    StellarSdk.nativeToScVal(stroops, { type: "i128" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const fetchReliefFundStats = async () => {
  const DUMMY_PK = "GB2VHOGXRWAF53JHDTBXYV3FZUNSTTNCTAVA2M5NLVXPFDVYDSVE2HBJ";
  let total = 0;
  let goal = 10000;
  let donors = [];
  let admin = null;

  try {
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    const dummyAccount = new StellarSdk.Account(DUMMY_PK, "0");
    const tx = new StellarSdk.TransactionBuilder(dummyAccount, { fee: "100", networkPassphrase: NETWORK_PASSPHRASE })
      .addOperation(contract.call("get_stats"))
      .setTimeout(30)
      .build();
    const sim = await rpcServer.simulateTransaction(tx);
    if (sim.result?.retval) {
      const stats = StellarSdk.scValToNative(sim.result.retval);
      goal = Number(stats.goal || 0) / 10000000 || 10000;
      total = Number(stats.total || 0) / 10000000;
      admin = stats.admin;
    }
  } catch (e) {
    console.warn("fetchReliefFundStats simulation error:", e.message);
  }

  return { total, goal, donors, admin };
};

/* ── 2. STELLAR NFT CONTRACT FUNCTIONS ───────────────────────── */

export const fetchNftOwner = async (nftId) => {
  try {
    const contract = new StellarSdk.Contract(NFT_CONTRACT_ID);
    const dummyAccount = new StellarSdk.Account("GB2VHOGXRWAF53JHDTBXYV3FZUNSTTNCTAVA2M5NLVXPFDVYDSVE2HBJ", "0");
    const tx = new StellarSdk.TransactionBuilder(dummyAccount, { fee: "100", networkPassphrase: NETWORK_PASSPHRASE })
      .addOperation(contract.call("owner_of", StellarSdk.nativeToScVal(nftId, { type: "u32" })))
      .setTimeout(30).build();
    const sim = await rpcServer.simulateTransaction(tx);
    if (sim.result?.retval) {
      return StellarSdk.scValToNative(sim.result.retval);
    }
  } catch (e) { /* ignore */ }
  return null;
};

export const fetchNftMetadata = async (nftId) => {
  try {
    const contract = new StellarSdk.Contract(NFT_CONTRACT_ID);
    const dummyAccount = new StellarSdk.Account("GB2VHOGXRWAF53JHDTBXYV3FZUNSTTNCTAVA2M5NLVXPFDVYDSVE2HBJ", "0");
    const tx = new StellarSdk.TransactionBuilder(dummyAccount, { fee: "100", networkPassphrase: NETWORK_PASSPHRASE })
      .addOperation(contract.call("get_metadata", StellarSdk.nativeToScVal(nftId, { type: "u32" })))
      .setTimeout(30).build();
    const sim = await rpcServer.simulateTransaction(tx);
    if (sim.result?.retval) {
      return StellarSdk.scValToNative(sim.result.retval);
    }
  } catch (e) { /* ignore */ }
  return null;
};

/* ── 3. NFT SHOP CONTRACT FUNCTIONS (ICC) ────────────────────── */

export const invokeContractBuyNft = async (publicKey, nftId, metadata, priceUsd, onLog, walletType) => {
  const contract = new StellarSdk.Contract(SHOP_CONTRACT_ID);
  const op = contract.call(
    "buy_nft",
    StellarSdk.nativeToScVal(publicKey, { type: "address" }),
    StellarSdk.nativeToScVal(nftId, { type: "u32" }),
    StellarSdk.nativeToScVal(metadata, { type: "string" }),
    StellarSdk.nativeToScVal(priceUsd, { type: "u32" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const invokeContractSellNft = async (publicKey, nftId, priceUSD, onLog, walletType) => {
  const contract = new StellarSdk.Contract(SHOP_CONTRACT_ID);
  const op = contract.call(
    "sell_nft",
    StellarSdk.nativeToScVal(publicKey, { type: "address" }),
    StellarSdk.nativeToScVal(nftId, { type: "u32" }),
    StellarSdk.nativeToScVal(priceUSD, { type: "u32" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const invokeAdminFreeNft = async (publicKey, nftId, onLog, walletType) => {
  const contract = new StellarSdk.Contract(SHOP_CONTRACT_ID);
  const op = contract.call(
    "admin_free_nft",
    StellarSdk.nativeToScVal(nftId, { type: "u32" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};

export const invokeShopWithdraw = async (publicKey, amountXlm, onLog, walletType) => {
  const contract = new StellarSdk.Contract(SHOP_CONTRACT_ID);
  const stroops = BigInt(Math.floor(amountXlm * 10000000));
  const op = contract.call(
    "withdraw_xlm",
    StellarSdk.nativeToScVal(publicKey, { type: "address" }),
    StellarSdk.nativeToScVal(stroops, { type: "i128" })
  );
  return await executeSorobanOperation(publicKey, op, onLog, walletType);
};
