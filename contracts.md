# Stellar Hub: Contract Registry (Level 4)

This document tracks the official deployment addresses and transaction hashes for the Soroban smart contracts powering the Stellar Management Hub.

---

## 1. Deployer Identity
- **Alias**: `rupsa`
- **Public Address**: `GBJB6GI3RUZGFRHXXTGW6CR646DV64BHJEVOTQFKLZMU6OF4QJHKFJOQ`

---

## 2. Contract Directory

### A. TranscendenceContract (The Hub)
- **Role**: Core protocol for relief funds and communal resource management.
- **Contract ID**: `CCYX4A425GKSSLBWD46OIFL7HVGDJPUUK74C2SFUIZG3WWOAA3DEOCM2`
- **Deployment Hash**: `27471426e2c3ca599e5ddc011396cb5da67f7f199b4143162a78ed08a5832cb0`
- **Initialization Hash**: `3ce99fe62d741cf71b1cd09a6ffec210479e10c9771cc54e3ece40f830fb0f8d`
- **Wasm Hash**: `ebb6cc10cd233acd0f4868e164298a0475f71055cd2a2b54378264d87cf1b393`
- **Status**: Active (Redeployed under `rupsa`)

### B. StellarNFT (The Asset)
- **Role**: Soroban NFT contract managing asset ownership and metadata.
- **Contract ID**: `CCXESEV3FJ7ZYRZHWTWBNT2R36I7MNSPGYPLBFASSOYGAEGN2DUIHYG4`
- **Deployment Hash**: `a6bfad8d4cba40e48e6b38ec424c8107da6cce984b83c7d03f613d418f15b73f`
- **Initialization Hash**: `b0b5ce872430dbd4a84999b4bf733080b7e2c67b48220c19fc8fb78454294569`
- **Wasm Hash**: `429d47d5c2297ed93fe03c206d8bb636b571981597157c8571099fb958f7e3aa`
- **Status**: Active (Redeployed under `rupsa`)

### C. NFTShop (The Exchange)
- **Role**: Marketplace handling USD pricing logic and XLM transfers (ICC).
- **Contract ID**: `CBOYD2HUX6RNCGEIMU6BSKKI6EXVSUPHJODFM445XEMQOFT67GG3KLVA`
- **Deployment Hash**: `f5de81da2149d19d589025f558e9acb4cdae71481a2ff8fa858f088b1e0bba01`
- **Initialization Hash**: `db6ec7628e14d54f8e300fdc2ec4e72c4b9496eebd22dc6a47dc8dd80835d8f6`
- **Wasm Hash**: `7921af2817f74937b42edcfa39c1b8318bd26d963322c4ca1c98b77744bd8957`
- **Status**: Active (Redeployed under `rupsa`)

---

## 2. Integrated Architectural Flow

### Flow A: NFT Acquisition (Purchase)
1. **User Request**: User calls `NFTShop.buy_nft(nft_id, metadata, price_usd)`.
2. **Pricing**: Shop calculates XLM cost based on the simulated `usd_rate`.
3. **Authentication**: User signs the transaction, authorizing the payment.
4. **ICC Execution**: `NFTShop` calls `StellarNFT.mint(user_address, nft_id, metadata)`.
5. **Finalization**: NFT is recorded on the ledger with the user as the owner.

### Flow B: Asset Liquidation (Sell Back)
1. **User Request**: User calls `NFTShop.sell_nft(nft_id)`.
2. **Verification**: Shop verifies the user owns the specific NFT.
3. **Escrow/Transfer**: Shop calls `StellarNFT.transfer(user, shop_address, nft_id)`.
4. **Payout**: Shop transfers XLM from its treasury (or simulated pool) back to the user.
5. **Restock**: NFT status is reset to "Available" in the NFT Shop.

---

## 3. Network Configuration
- **Network**: Stellar Testnet
- **Horizon URL**: `https://horizon-testnet.stellar.org`
- **Soroban RPC**: `https://soroban-testnet.stellar.org`
- **Passphrase**: `Test SDF Network ; September 2015`
