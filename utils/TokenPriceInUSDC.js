const tokenPriceCache = {}; // Cache for token prices
const JUPITER_API_URL = 'https://quote-api.jup.ag/v6/quote';

async function fetchTokenPriceInUSDC(tokenMint, amount) {
    if (tokenPriceCache[tokenMint]) {
        return tokenPriceCache[tokenMint];
    }

    try {
        const response = await fetch(`${JUPITER_API_URL}?inputMint=${tokenMint}&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${Math.round(amount * 1e9)}&slippageBps=50`);
        const data = await response.json();

        if (data.error || !data.apiResponse) {
            console.warn(`Token ${tokenMint} is not tradable.`);
            return null;
        }

        const price = data.apiResponse.outAmount / 1e6; // Convert to USD
        tokenPriceCache[tokenMint] = price; // Cache the price
        return price;
    } catch (error) {
        console.error(`Error fetching price for token ${tokenMint}:`, error);
        return null;
    }
}

export { fetchTokenPriceInUSDC };