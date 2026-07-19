/**
 * Filter ledger transaction history based on address/hash query and minimum amount.
 */
export const filterHistory = (history, search, minAmt) => {
  if (!Array.isArray(history)) return [];
  
  return history.filter(item => {
    const addrMatches = !search || (item.addr && item.addr.toLowerCase().includes(search.toLowerCase()));
    const hashMatches = !search || (item.hash && item.hash.toLowerCase().includes(search.toLowerCase()));
    const matchesSearch = addrMatches || hashMatches;

    const itemAmt = parseFloat(item.amt) || 0;
    const matchesMin = !minAmt || isNaN(parseFloat(minAmt)) || itemAmt >= parseFloat(minAmt);

    return matchesSearch && matchesMin;
  });
};
