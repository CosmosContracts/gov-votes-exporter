# Cosmos Governance Vote Exporter

This tool export voters of a specific governance proposal from any cosmos stargate RPC, based on transaction history.
Governance votes get garbage collected on state after the gov proposal ends voting (for unknown reason), so this is the only way

# Usage

Set proposal id and RPC endpoint in `main.js`. 
Run `npm run dev`