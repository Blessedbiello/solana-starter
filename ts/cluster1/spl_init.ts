import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed"; //commitment set to confirmed to ensure mint is finalized
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Start here
        const mint = await createMint(
            connection,
            keypair,
            keypair.publicKey, //mint auth
            keypair.publicKey,  // freez auth
            9 //decimals
        );
        console.log(`Mint address: ${mint.toBase58}`)
        console.log(`View on Explorer: https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet `)
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
