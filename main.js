

import { StargateClient, setupGovExtension, QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc"

import * as fs from "fs"

const RPC = "http://127.0.0.1:26657";
const PROPOSAL_ID = 8;

var main = async () => {
    var tmClient = await Tendermint34Client.connect(RPC);
    // var queryClient = await QueryClient.withExtensions(tmClient, setupGovExtension);

    var client = new StargateClient(tmClient);

    var lastBlock = await client.getBlock();

    console.log(`Succesffuly Connected to RPC! Last block: ${lastBlock.header.height} @ ${lastBlock.header.time}`)

    // Query Gov votes transactions
    const results = await client.searchTx({
        tags: [{ key: "proposal_vote.proposal_id", value: PROPOSAL_ID }],
    });
    
    var votes = [];

   // console.log(results)
    for (const tx of results) {

        const rawLog = JSON.parse(tx.rawLog)

        // Get address from MsgVote
        const msgVoteLog = rawLog[0].events.find((el) => el.type === "message");
        const address = msgVoteLog.attributes.find((el) => el.key == "sender").value

        if (votes.indexOf(address) === -1) {
            votes.push(address)
        }
    }


    try {
        fs.writeFileSync(`proposal_${PROPOSAL_ID}.json`, JSON.stringify(votes))
    } catch (err) {
        console.error(err)
    }
    
    console.log(`Voters exported`)
}

main();