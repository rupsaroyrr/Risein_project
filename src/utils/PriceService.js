/**
 * PriceService: Real-time XLM/USD Oracle
 * Fetches current market rates to power the dynamic marketplace pricing.
 */

const COINGECKO_API = "https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd";
const CACHE_TTL_MS = 30000; // 30 seconds

let cachedPrice = null;
let lastFetchTime = 0;

/**
 * Clears cached price data (useful for testing or manual refresh)
 */
export const clearPriceCache = () => {
  cachedPrice = null;
  lastFetchTime = 0;
};

export const getXlmPrice = async () => {
  const now = Date.now();
  if (cachedPrice !== null && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedPrice;
  }

  try {
    // Attempt to fetch live data from CoinGecko
    const response = await fetch(COINGECKO_API);
    
    if (!response.ok) {
      throw new Error(`Oracle HTTP Failure: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data.stellar && typeof data.stellar.usd === 'number' && data.stellar.usd > 0) {
      cachedPrice = data.stellar.usd;
      lastFetchTime = now;
      console.log(`[PriceService] Live Rate: 1 XLM = $${data.stellar.usd} USD`);
      return cachedPrice;
    }
    
    throw new Error("Malformed Oracle Response");
  } catch (error) {
    console.warn("[PriceService] Falling back to baseline simulation:", error.message);
    // Return cached price if valid, otherwise stable fallback value ($0.12)
    return cachedPrice !== null ? cachedPrice : 0.12; 
  }
};

/**
 * Calculates how much XLM is required for a given USD price
 */
export const calculateXlmCost = (usdPrice, xlmPrice) => {
  const parsedUsd = parseFloat(usdPrice);
  const parsedXlm = parseFloat(xlmPrice);

  if (isNaN(parsedUsd) || isNaN(parsedXlm) || parsedUsd <= 0 || parsedXlm <= 0) {
    return 0;
  }
  return Math.ceil(parsedUsd / parsedXlm);
};

