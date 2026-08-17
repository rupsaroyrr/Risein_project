/**
 * Filter ledger transaction history based on address/hash query, minimum amount, and optional maximum amount.
 */
export const filterHistory = (history, search, minAmt, maxAmt) => {
  if (!Array.isArray(history)) return [];
  
  const cleanSearch = typeof search === 'string' ? search.trim().toLowerCase() : '';

  return history.filter(item => {
    if (!item || typeof item !== 'object') return false;

    const addrMatches = !cleanSearch || (item.addr && item.addr.toLowerCase().includes(cleanSearch));
    const hashMatches = !cleanSearch || (item.hash && item.hash.toLowerCase().includes(cleanSearch));
    const matchesSearch = addrMatches || hashMatches;

    const itemAmt = parseFloat(item.amt) || 0;
    const parsedMin = parseFloat(minAmt);
    const parsedMax = parseFloat(maxAmt);

    const matchesMin = !minAmt || isNaN(parsedMin) || itemAmt >= parsedMin;
    const matchesMax = !maxAmt || isNaN(parsedMax) || itemAmt <= parsedMax;

    return matchesSearch && matchesMin && matchesMax;
  });
};

