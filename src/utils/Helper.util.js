export const standardDeviation = (values) => {
    if (values.length === 0) return 0;
  
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
  };
  
  export const formatDate = (date) => {
    return new Date(date).toISOString().replace('T', ' ').slice(0, 19);
  };
  
  export const isValidCoin = (coin, allowedCoins) => {
    return allowedCoins.includes(coin);
  };
  