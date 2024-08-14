import { fetchTokenPriceInUSDC } from './TokenPriceInUSDC.js';
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';
import { getRealms } from '@solana/spl-governance';
import { PublicKey } from '@solana/web3.js';
import { convertToUSD } from './ConvertToUSD.js';



async function calculateTotalTVL(connection, programId) {
    const realms = await getRealms(connection, new PublicKey(programId));
    let totalTVL = 0;

    for (let realm of realms) {
        const realmPubKey = realm.pubkey;

        // Fetch SOL balance for the realm's main account
        const solBalance = await connection.getBalance(realmPubKey);
        const solUSD = await convertToUSD(solBalance / 1e9); // Convert lamports to SOL and then to USD
        totalTVL += solUSD;

        // Fetch SPL token balances
        const tokenAccounts = await connection.getTokenAccountsByOwner(realmPubKey, {
            programId: TOKEN_PROGRAM_ID
        });

        for (let tokenAccountInfo of tokenAccounts.value) {
            const accountData = AccountLayout.decode(tokenAccountInfo.account.data);
            const mint = new PublicKey(accountData.mint);
            const amount = BigInt(accountData.amount);
            const decimals = (await connection.getParsedAccountInfo(mint)).value?.data?.parsed?.info?.decimals || 0;
            const humanReadableAmount = Number(amount) / Math.pow(10, decimals);
            const priceInUSDC = await fetchTokenPriceInUSDC(mint.toString(), humanReadableAmount);

            if (priceInUSDC !== null) {
                totalTVL += humanReadableAmount * priceInUSDC;
            } else {
                console.warn(`No price available for token ${mint.toString()} (amount: ${humanReadableAmount}). This value is excluded from TVL.`);
            }
        }
    }

    console.log(`Final calculated TVL for ${programId}: $${totalTVL}`);
    return totalTVL.toFixed(2);
}

export { calculateTotalTVL };