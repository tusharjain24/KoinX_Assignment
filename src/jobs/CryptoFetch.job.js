import axios from 'axios';

const fetchCryptoData = async () => {
  try {
    const baseUrl = process.env.COINGECKO_API_BASE;
    const coins = process.env.COINGECKO_COINS;
    const params = process.env.COINGECKO_PARAMS;

    const { data } = await axios.get(`${baseUrl}?ids=${coins}&vs_currencies=${params}`);

    for (const coin of coins.split(',')) {
      const record = {
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
        fetchedAt: new Date(),
      };
      await Crypto.create(record);
    }

    console.log('Crypto data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
};

export default fetchCryptoData;
