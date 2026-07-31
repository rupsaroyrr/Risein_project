# Stellar Hub: Contract Registry

This document tracks the official deployment addresses and transaction hashes for the Soroban smart contracts powering the Stellar Management Hub.

---

## 1. Deployer Identity
- **Alias**: `rupsa`
- **Public Address**: `GBJB6GI3RUZGFRHXXTGW6CR646DV64BHJEVOTQFKLZMU6OF4QJHKFJOQ`

---

## 2. Contract Directory

### A. TranscendenceContract (The Hub)
- **Role**: Core protocol for relief funds and communal resource management.
- **Contract ID**: `CB73TNAHPLIHS2FPCNCUERLDUEPA4QPYA2CSCSV6PFVZMSCI47ESKSLJ`
- **Deployment Hash**: `f3f66c85cb3cb514ce9a8c00d5e75dbbc731190650babecbf0c60e02f8172175`
- **Initialization Hash**: `6762cd5e9759e934ba7330f81370fefba7631a415638c6e1d40be02e37ec8338`
- **Wasm Hash**: `0a09d7115baa8e9586a944790ad212b3f02d9b5b18a71e3d9b302a9b4c703497`
- **Status**: Active

### B. StellarNFT (The Asset)
- **Role**: Soroban NFT contract managing asset ownership and metadata.
- **Contract ID**: `CCT5ZLD3XYI3SQMOAW5KSW3RIHFVMHLCLOQSLUPMBQR5BXXH5VMIDMZB`
- **Deployment Hash**: `81d3591cff70759f1309e9f02f34b9b78ff9a8ed8d1df69b3bf4168bfed7e5b5`
- **Initialization Hash**: `9383c6865a11491e3feeca9d8a1609bf35a56338a8fbf788739b9c3ffb8a5294`
- **Wasm Hash**: `ae79126fde2fcdfdc8ff2161fdd6c74a4833a63733ed63ac7bdd07c1beb84b16`
- **Status**: Active

### C. NFTShop (The Exchange)
- **Role**: Marketplace handling USD pricing logic and XLM transfers (ICC).
- **Contract ID**: `CBW4ZRVEO3Q6J76HX7JY47H7WIJANZKNJPUQ2H2QS4ZO46DE6V4CTBJG`
- **Deployment Hash**: `19db10b9428efa473b03ecf79629c114f73639234f7666ea41d144951589e40d`
- **Initialization Hash**: `a2915ca0743b1ba25c76e737ac7a025e35087838baadb5250eb6c19615242e49`
- **Wasm Hash**: `f209e46f6659fbab870a6939ce43e1405b9c0b279083394f900e69e33e6fc5a2`
- **Status**: Active

---

## 3. Integrated Architectural Flow

### Flow A: NFT Acquisition (Purchase)
1. **User Request**: User calls `NFTShop.buy_nft(nft_id, metadata, price_usd)`.
2. **Pricing**: Shop calculates XLM cost based on the simulated `usd_rate`.
3. **Authentication**: User signs the transaction, authorizing the payment.
4. **ICC Execution**: `NFTShop` calls `StellarNFT.mint(user_address, nft_id, metadata)`.
5. **Finalization**: NFT is recorded on the ledger with the user as the owner.

### Flow B: Asset Liquidation (Sell Back)
1. **User Request**: User calls `NFTShop.sell_nft(nft_id, price_usd)`.
2. **Verification**: Shop verifies the user owns the specific NFT.
3. **Escrow/Transfer**: Shop calls `StellarNFT.transfer(user, shop_address, nft_id)`.
4. **Payout**: Shop transfers XLM from its treasury back to the user (80% buyback rate).
5. **Restock**: NFT status is reset in the shop.

---

## 4. Network Configuration
- **Network**: Stellar Testnet
- **Horizon URL**: `https://horizon-testnet.stellar.org`
- **Soroban RPC**: `https://soroban-testnet.stellar.org`
- **Passphrase**: `Test SDF Network ; September 2015`
