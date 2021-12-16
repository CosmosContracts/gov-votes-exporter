
import { readFile } from 'fs/promises';

const proposal_ids = [1,3,4,5,6,7,8];

var main = async () => {

    var votes = []

    for (const id of proposal_ids) {
        votes = [...votes, ...(JSON.parse(
            await readFile(
                new URL(`./juno/proposal_${id}.json`, import.meta.url)
            )
        ))]
    }


    // Find who voted all the proposals
    var result = votes.filter((item, pos) => votes.indexOf(item) === pos)
    
    console.log(JSON.stringify(result))
} 

main();