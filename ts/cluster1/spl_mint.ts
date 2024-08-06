import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("6DD4thYfK5g8ujsXow5sMJLLRUMdCPFukCc5jKmmD5pG");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair, //payer
            mint, //mint address
            keypair.publicKey // owner add    
        );
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        

        // Mint to ATA
        const mintTx = await mintTo(
            connection,
            keypair, //payer
            mint, //mint add
            ata.address, //destination of tokens
            keypair.publicKey, //mint auth
            10_000n * token_decimals //amount mint 10 bptn
        )
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})();
