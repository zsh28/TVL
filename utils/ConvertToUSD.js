import fetch from 'node-fetch';

async function convertToUSD(solAmount) {
    try {
        const solToUsdResponse = await fetch('https://price.jup.ag/v6/price?ids=SOL');
        const solToUsdData = await solToUsdResponse.json();

        const solPrice = solToUsdData.data?.SOL?.price || 0; // Default to 0 if price is not available
        return solAmount * solPrice;
    } catch (error) {
        console.error('Error fetching SOL price:', error);
        return 0;
    }
}

export { convertToUSD };
