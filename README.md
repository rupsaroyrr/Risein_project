# 🚀 Stellar Network Payment Terminal

A decentralized payment terminal for the **Stellar Testnet** built with React + Vite. Connect your [Freighter wallet](https://www.freighter.app/), view your XLM balance, and send payments — all through a dystopian-themed terminal interface.

# Live Demo Link: [Click Here](https://risein-project.vercel.app/)

---

## ✨ Features

- **🔗 Freighter Wallet Integration** — Connect/disconnect your Stellar wallet via the Freighter browser extension
- **💰 Real-Time Balance** — Fetch and display your Testnet XLM balance from Horizon
- **📤 Send Payments** — Transfer XLM to any Stellar address on the Testnet
- **🚀 Advanced Batch Processing (MULTI-PAY)** — Execute parallel, multi-recipient payment scripts in a single operation with per-target status tracking
- **🧪 Frontend Live Diagnostics Panes** — An interactive, admin-only testing suite that interacts directly with Soroban Testnet to visually prove smart contract security measures (Malicious init blocking, Auth blocking, Protocol Pause toggling, Admin transfers).
- **⚡ Smart Caching Performance** — `sessionStorage` TTL caching architecture drastically reducing Horizon RPC rate-limits and allowing instant load times for Heavy queries like Account History and Whale Leaderboards.
- **⏳ Skeleton Loading States & UX** — Immersive glass-morphic `skeleton-pulse` loaders and dynamic UI synchronization indicators for zero layout shift during API fetches.
- **📋 Transaction Logs & Inspector** — Live diagnostic console showing all operations and errors with deep-dive remediation detail modals.
- **🔍 Explorer Links** — View completed transactions on Stellar Expert
- **🎨 Dystopian UI & Persistent Multi-Themes** — Immersive dark terminal aesthetic with CRT scanlines, glassmorphism cards, interactive 3D elements, animated effects, and 4 custom persistent themes (Slate, Matrix, CRT Amber, Cyber Deep) stored in `localStorage`.
- **⚙️ Custom RPC Config** — Live network endpoint settings allowing configuration of custom Horizon API and Soroban RPC nodes dynamically.
- **🛡️ Offline Transaction Sandbox** — Test payment payloads, simulate balance validation, and calculate network fees offline before broadcasting.
- **📟 Interactive CLI Terminal** — A custom command prompt (`help`, `about`, `contracts`, `network`) built directly into the diagnostics drawer.
- **📊 Live Latency Telemetry** — Real-time ping latency monitor tracking node connectivity in milliseconds.
- **🧪 Automated Vitest Pipeline** — Integrated unit testing suite verifying PriceService conversions, network fallbacks, and filter helper mechanics.
- **📱 Zero-Scroll Architecture** — High-density design optimized for professional monitoring without vertical scrolling
- **💎 Dynamic Discovery Engine** — Tiered leaderboard protocol that "hunts" for new network whales via live ledger scanning
- **🏦 Multi-Wallet Gateway** — Unified uplink supporting Freighter, Rabe, Hana, xBull, and Albedo
- **⚡ Soroban Relief Protocol** — Direct smart contract interaction for decentralized relief funding
- **🔔 Tactical Notifications** — Real-time red-dot alert system for critical system events
- **🏪 NFT Shop** — A premium decentralized marketplace featuring high-density "Glassmorphism" cards, professional hover interactions, and direct on-chain liquidity (Buy/Sell).
- **📉 Standardized Protocol Valuations** — All marketplace assets are calibrated to a fixed protocol rate of $1 = 6 XLM for institutional-grade stability.
- **📱 SEP-0007 Split Bill Engine** — A professional "Request-to-Pay" utility that generates shareable Stellar URIs and live QR codes for instant communal debt settlement.
- **📱 Mobile-First Responsive Overhaul** — A completely redesigned, responsive terminal experience with a compact hamburger menu for small screens.
- **🛡️ Error Boundary** — Graceful crash recovery with themed error screen


---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 8](https://vitejs.dev/) | Build tool & dev server |
| [@stellar/stellar-sdk](https://www.npmjs.com/package/@stellar/stellar-sdk) | Stellar blockchain interactions |
| [@stellar/freighter-api](https://www.npmjs.com/package/@stellar/freighter-api) | Freighter wallet integration |
| [Horizon Testnet](https://horizon-testnet.stellar.org) | Stellar Testnet API endpoint |
| [Soroban RPC](https://soroban-testnet.stellar.org) | Smart contract interaction layer |
| [StellarWalletsKit](https://www.npmjs.com/package/@CREW-SDK/stellar-wallets-kit) | Multi-wallet abstraction layer |

### 🧠 Advanced Architectures

#### 1. Triple-Redundant Leaderboard (Hunters Protocol)
The Hub employs a three-tier strategy to ensure the Network Leaderboard is never empty:
- **Tier 1 (Analytical)**: Real-time rich-list data from StellarExpert APIs.
- **Tier 2 (Discovery)**: A live "Discovery Engine" that scans the latest 50-100 ledger operations to identify active high-volume accounts and audits their balances directly via Horizon.
- **Tier 3 (Fail-safe)**: A hardcoded registry of verified high-balance accounts used as a mission-critical last resort.
- **Workflow Architecture**:
  ```mermaid
  graph TD
      A[Telemetry Trigger] --> B{Cache Valid?}
      B -- Yes --> C[Render from sessionStorage]
      B -- No --> D[Tier 1: StellarExpert API]
      D --> E{Success?}
      E -- No --> F[Tier 2: Discovery Engine]
      F --> G[Scan Ledger Ops]
      G --> H[Audit Balances via Horizon]
      H --> I{Results?}
      I -- No --> J[Tier 3: Registry Fail-safe]
      E -- Yes --> K[Merge & Cache]
      I -- Yes --> K
      J --> K
      K --> L[Update UI Context]
  ```

#### 2. Soroban Smart Contract Integration & Security Testing
The **DONATE** module interfaces directly with a WASM-based smart contract on the Soroban testnet. It handles:
- Real-time simulation of contract state (Goal vs. Secured).
- Transaction preparation, footprint analysis, and multi-wallet signing.
- Event tracking to identify recent network contributors.
- **Live UI Testing:** The app features a hidden `⚠ DIAGNOSTICS` panel strictly visible only to the contract's Admin address. It allows real-time execution of the internal Rust security tests directly via Freighter signatures:
   - Prove Malicious `init` Hijacks are blocked.
   - Prove Protocol Pauses (`set_active`) dynamically halt all pool contributions globally.
   - Prove Unauthorized `withdraw` functions trap the Wasm VM and reject theft.
   - Prove the Contract can be decentralized mapped to a new Admin safely.

#### 3. Relief Fund Architecture (Soroban Implementation)
The **Stellar Relief Fund** is a non-custodial protocol that allows users to pool resources for communal goals.
- **Contribution Pipeline**: User -> `TranscendenceContract.donate()` -> Soroban Auth -> Native XLM Transfer (via SAC) -> Global State Update.
- **Withdrawal Governance**: Admin -> `TranscendenceContract.withdraw()` -> Verification -> Treasury Liquidation to target recipient.
- **Event Streaming**: The contract publishes `DonationEvent` and `WithdrawalEvent` payloads, which the frontend captures via the `getEvents` RPC to update the live donor list.
- **Workflow Architecture**:
  ```mermaid
  sequenceDiagram
      participant U as Survivor (User)
      participant K as Wallet Kit
      participant S as Soroban RPC
      participant C as Relief Contract
      U->>K: Sign Donate(XLM)
      K->>S: Broadcast Transaction
      S->>C: invoke_host_function
      C->>C: Update Global State
      C-->>S: emit_event(Donation)
      S-->>U: Transaction Finalized
      Note over U,C: Live Telemetry Updated
  ```

#### 4. Leaderboard Syncing (The Hunters Protocol)
To ensure high-fidelity network data without exceeding RPC rate limits, the Hub uses a specialized **Hunters Protocol**:
1. **Cache-First Layer**: Checks `sessionStorage` for valid telemetry data (TTL: 60m).
2. **Tier 1 (StellarExpert)**: Fetches verified rich-list data for high-volume accounts.
3. **Tier 2 (Discovery Engine)**: Scans the latest 50-100 ledger operations to identify active participants and audits their balances in real-time via Horizon.
4. **Tier 3 (Fail-safe)**: Falls back to a hardcoded registry of verified network whales.

#### 5. Enterprise CI/CD Pipeline (Automation)
The project is integrated with a professional **GitHub Actions** pipeline (`main.yml`) that ensures code quality and deployment stability:
- **Continuous Integration**: Automatically builds the React/Vite frontend on every push to `main`.
- **Automated Testing**: Executes the contract test suite to verify protocol integrity before any code is merged.
- **Environment Parity**: Ensures the production environment matches development builds by standardizing the Node.js environment.

#### 6. Modular NFT Marketplace Architecture (Level 4)
The Hub has transitioned to a multi-contract ecosystem using **Inter-Contract Calls (ICC)** to separate asset ownership from marketplace logic.
- **`StellarNFT` (Asset)**: A standalone contract managing NFT minting, ownership, and metadata.
- **`NFTShop` (Marketplace)**: Handles USD pricing logic, XLM-to-Stroop conversions, and contract-to-contract communication.
- **Workflow Architecture**:
  ```mermaid
  sequenceDiagram
      participant U as User
      participant S as NFTShop
      participant N as StellarNFT
      U->>S: buy_nft(id, price_usd)
      S->>S: Calculate XLM cost via Oracle
      S->>U: Request XLM Transfer
      S->>N: ICC: mint(user, id, metadata)
      N-->>S: Confirmation
      S-->>U: Success Notification
  ```

#### 7. Admin Governance: Asset Release & Treasury
Advanced administrative controls allow for full lifecycle management of the ecosystem:
- **Asset Release Protocol**: A specialized function allowing admins to reset or "free" NFTs that have been sold back to the shop, restocking the inventory.
- **Earnings Withdrawal**: Admins can securely take out accumulated XLM earnings (marketplace fees) from the `NFTShop` contract directly via the authorized Diagnostics Panel.
- **Workflow Architecture**:
  ```mermaid
  graph TD
      A[Connected Wallet] --> B{Is Admin Address?}
      B -- No --> C[Hide Diagnostics]
      B -- Yes --> D[Decrypt Diagnostics Tab]
      D --> E[Security Test Selection]
      E --> F[Malicious Init / Pause / Withdraw]
      F --> G[Build Payload]
      G --> H[Freighter Sign]
      H --> I[Soroban Execution]
      I --> J{Wasm Trap / Revert?}
      J -- Yes --> K[UI: PROVEN SECURE]
      J -- No --> L[UI: PROTOCOL ERROR]
  ```

#### 8. SEP-0007 "Request-to-Pay" Architecture
The Hub has transitioned from simple payouts to a professional **Payment Request Engine** based on the Stellar SEP-0007 standard.
- **URI Generation**: Dynamically constructs `web+stellar:pay` URIs with hardcoded destinations, amounts, and metadata.
- **QR Uplink**: Integrated a real-time QR generation pipeline allowing mobile-first payment settlement.
- **Architecture Flow**:
  ```mermaid
  graph LR
      A[Operator Input] --> B(Precision Split Logic)
      B --> C{SEP-0007 Engine}
      C --> D[Shareable URI]
      C --> E[Dynamic QR Code]
      E --> F((Mobile Wallet Scan))
  ```

#### 9. Mobile-First Responsive Overhaul
The entire interface has been redesigned for accessibility on all device tiers:
- **Compact Navigation**: A sleek, tactical hamburger menu for mobile users.
- **Responsive Bento Grid**: Adaptive layout logic that reflows the Telemetry cards and Transaction history into a vertical stack on smaller screens.

---

## 🌊 Feature Deep-Dive & Data Flows

### 1. Multi-Wallet Gateway & Authentication Flow
**Feature:** Secure, dynamic connectivity to the Stellar Testnet using various web3 wallet providers.
**Data Flow:** 
- **State Injection:** The App captures the address, updates the global React context, and instantly triggers the `syncAllData` pipeline, dropping the dystopian UI into its "Authorized" layout.
- **Workflow Architecture**:
  ```mermaid
  graph LR
      A[Operator Click] --> B{Wallets Kit}
      B --> C[Freighter]
      B --> D[xBull]
      B --> E[Hana / Rabe]
      C & D & E --> F[Secure Handshake]
      F --> G[Extract PublicKey]
      G --> H[Update App Context]
      H --> I[Sync Horizon Data]
      I --> J[Terminal Online]
  ```

### 2. High-Performance Caching & Dashboard Telemetry
**Feature:** Real-time data streaming (Balances, Network Leaderboards, Payment History) without encountering Horizon RPC rate-limits.
**Data Flow:**
- Instead of hitting the Horizon API on every render, the app utilizes an aggressive `sessionStorage` TTL (Time-To-Live) architecture.
- **Whale Hunters (Network Leaderboard):** The app queries the latest ledger, extracts the top 50 active operations, filters the public keys, and queries Horizon for their XLM balances. This incredibly heavy calculation is immediately cached for 60 minutes.
- **Account History:** Past payments are parsed from Horizon's `/operations` endpoint, decoded, and cached for 30 seconds.
- **UX Flow:** During fetch cycles, a sleek `.skeleton-pulse` glass-morphic layout renders over the modules, guaranteeing zero layout shift while the background promises resolve.
- **Workflow Architecture**:
  ```mermaid
  graph TD
      A[Request Trigger] --> B{Check SessionStorage}
      B -- Valid TTL --> C[Instant UI Render]
      B -- Expired/Null --> D[Horizon/RPC Fetch]
      D --> E[Parse & Format Data]
      E --> F[Update Storage & TTL]
      F --> G[Smooth UI Transition]
      G --> H[Authorized State]
  ```

### 3. Advanced Batch Processing (MULTI-PAY)
**Feature:** The ability to execute multiple Stellar XLM transactions simultaneously to different recipients in a single unified Ledger operation.
**Data Flow:**
- The user inputs a command script (e.g., `GABC... 100`) into the Batch Terminal.
- The `stellar.js` engine parses the script line-by-line, validating Stellar address checksums and formatting the amounts.
- A single `TransactionBuilder` is instantiated. Instead of one operation, the engine loops through the parsed array and chains multiple `Operation.payment()` calls into the exact same XDR payload.
- The wallet signs once. If successful, the UI maps the individual results into a sleek, real-time progress bar tracking the batch status.
- **Workflow Architecture**:
  ```mermaid
  graph TD
      A[Script Entry] --> B[Parser Engine]
      B --> C[Address Validation]
      C --> D[Amount Formatting]
      D --> E[Transaction Builder]
      E --> F[Chain Ops 1...N]
      F --> G[Wallet Signature]
      G --> H[Ledger Broadcast]
      H --> I[Progress Mapping]
      I --> J[Batch Finalized]
  ```

### 4. NFT Shop: Professional Card Architecture
**Feature:** A high-fidelity, information-dense NFT trading interface optimized for professional asset managers.
**Data Flow:**
- **Full-Bleed Imagery:** Optimized at 220px height with `object-fit: cover` for cinematic impact.
- **Status Mapping:** Availability pills (Opaque Green/Red) and Token IDs are overlapped directly onto the artwork using `absolute` positioning, saving ~80px of vertical waste per card.
- **Interactive Tints:** Cards utilize `backdrop-filter: blur(4px)` and `rgba(35, 209, 139, 0.65)` glass-morphism effects for a "tactile" digital feel.
- **Liquidity Engine:** One-click "ACQUIRE" for available assets and integrated "LIQUIDATE" for owners, interacting directly with the `NFTShop` ICC pipeline.

### 5. SEP-0007 Request-to-Pay Workflow
**Feature:** Instant communal debt collection via standardized Stellar URIs.
**Data Flow:**
- **Input:** Total XLM / N People.
- **Generation:** App calculates split and binds it to the current user's `publicKey`.
- **Output:** A standardized `web+stellar:pay` link and a 160x160 QR code.
- **Execution:** External users scan/click, their local wallet (LOBSTR/Freighter) intercepts the SEP-0007 protocol, and executes a pre-filled payment back to the operator.

---

## 📦 Setup Instructions

### Prerequisites

- **Node.js** v18+ and **npm** v9+
- **Git** installed
- **Freighter** browser extension ([Install here](https://www.freighter.app/))

### 1. Clone the Repository

```bash
git clone https://github.com/Dark-97o/Stellar_Project.git
cd Stellar_Project
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

### 4. Set Up Freighter Wallet

1. Install the [Freighter browser extension](https://www.freighter.app/)
2. Create a new wallet and set a password
3. **Switch to TESTNET**: Settings → Network → Select **TESTNET**
4. **Fund your account**: Copy your public key and visit:
   ```
   https://friendbot.stellar.org/?addr=YOUR_PUBLIC_KEY
   ```
   This gives you 10,000 free test XLM

### 5. Connect and Use

1. Open `http://localhost:5173` in the same browser with Freighter
2. Click **Link Freighter** → Approve the connection in the Freighter popup
3. Your balance will appear automatically
4. Enter a destination address and amount to send a test transaction

---

## 📸 Screenshots


### Test Cases Passed

<img width="977" height="572" alt="image" src="https://github.com/user-attachments/assets/07797310-8842-4ee5-bf48-3d7feb9678bc" />


### Demo Video

https://drive.google.com/file/d/1TMtH6YZkWBtc8QAT2ucJCJrwm96J1pH4/view?usp=sharing

### CI/CD Pipelines Deployed

<img width="1917" height="1082" alt="image" src="https://github.com/user-attachments/assets/fe8084ee-d266-4e6a-aa49-49c610c30fca" />


### Mobile Responsive View - Small Screens

<img width="522" height="916" alt="image" src="https://github.com/user-attachments/assets/5e60d3e3-f164-4537-a944-428e9d81c51f" />


---

## 📜 Deployed Contracts & Transactions

| Resource | Address / Hash | Role |
|---|---|---|
| **Contract Address Relief Fund** | `CCYX4A425GKSSLBWD46OIFL7HVGDJPUUK74C2SFUIZG3WWOAA3DEOCM2` | `Relief Fund Contract`|
| **Transaction Hash** | `27471426e2c3ca599e5ddc011396cb5da67f7f199b4143162a78ed08a5832cb0` | `Relief Fund Contract Deployment Tx`|
| **Contract Address NFT Standard** | `CCXESEV3FJ7ZYRZHWTWBNT2R36I7MNSPGYPLBFASSOYGAEGN2DUIHYG4` | `NFT Standard Contract`|
| **Transaction Hash** | `a6bfad8d4cba40e48e6b38ec424c8107da6cce984b83c7d03f613d418f15b73f` | `NFT Standard Contract Deployment Tx`|
| **Contract Address NFT Shop** | `CBOYD2HUX6RNCGEIMU6BSKKI6EXVSUPHJODFM445XEMQOFT67GG3KLVA` | `NFT Shop Contract`|
| **Transaction Hash** | `f5de81da2149d19d589025f558e9acb4cdae71481a2ff8fa858f088b1e0bba01` | `NFT Shop Contract Deployment Tx`|
| **Native XLM Token ID** | `CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQVU2HHGCYSC` | `Native XLM Token`|
| `There is no separate Liquidity Pool (LP) contract deployed. Instead, the NFTShop contract acts as the primary treasury/escrow. All XLM from NFT purchases is held directly by the NFTShop contract ID (CBOY...LVA) to fund future buybacks and liquidations.` |


---

## 📁 Project Structure

```
Stellar_Project/
├── .github/
│   └── workflows/
│       └── main.yml             # Enterprise CI/CD Pipeline
├── TranscendenceContract/       # Soroban Workspace Root
│   ├── contracts/
│   │   ├── hello-world/         # Relief Fund Contract
│   │   ├── nft-shop/            # Marketplace Contract (ICC)
│   │   └── stellar-nft/         # NFT Standard Contract
│   └── target/                  # Compiled WASM artifacts
├── public/
│   ├── img/                     # Optimized Video & Image Assets
│   └── favicon.svg              # System Icon
├── src/
│   ├── utils/
│   │   ├── stellar.js           # Multi-tier Logic & SAC Queries
│   │   └── kit.js               # Wallet Abstraction Layer
│   ├── App.jsx                  # Primary React Controller & UI Routing
│   ├── index.css                # Global Design System (Dystopian Theme)
│   └── main.jsx                 # Application Bootstrap
├── index.html                   # Entry Structure
├── vite.config.js               # Build & Optimization Config
└── README.md                    # Core Documentation
```

---

## 🔧 Key Implementation Details

### Wallet Connection Flow (`stellar.js`)

```
isConnected() → requestAccess() → getAddress() → loadAccount()
```

1. **`isConnected()`** — Checks if Freighter extension is installed
2. **`requestAccess()`** — Triggers the Freighter popup for user authorization
3. **`getAddress()`** — Retrieves the user's public key (fallback)
4. **`loadAccount()`** — Fetches account data from Horizon Testnet

### Payment Flow

```
loadAccount() → buildTransaction() → signTransaction() → submitTransaction()
```

1. Build a Stellar `TransactionBuilder` with the payment operation
2. Sign via Freighter's `signTransaction()` (user approval in extension)
3. Submit the signed XDR to the Horizon Testnet server
4. Display the result hash with an explorer link

---

## ⚠️ Important Notes

- This app runs on the **Stellar Testnet** — no real funds are involved
- Multiple wallets are supported; ensure your chosen extension is set to **TESTNET**
- Fund your testnet account via **FAUCET** or [Friendbot](https://friendbot.stellar.org)
- The **Discovery Engine** audits identity-level fluidity across recent ledger activity
- Zero-balance accounts are automatically pruned from the Network Leaderboard

---

## 📜 License

This project is licensed under the terms specified in the [LICENSE](./LICENSE) file.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

<p align="center">
  <b>Stellar Network Payment Terminal</b> — Built with ❤️ on the Stellar Testnet
</p>
