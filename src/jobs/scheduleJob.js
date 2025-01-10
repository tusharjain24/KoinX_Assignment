import { scheduleJob }  from 'node-schedule';
import fetchCryptoData  from './CryptoFetch.job.js';


const job = scheduleJob('0 0 * * *', async () => {
  console.log('Running fetchCryptoData job...');
  try {
    await fetchCryptoData();
    console.log('fetchCryptoData job completed successfully');
  } catch (error) {
    console.error('Error while running fetchCryptoData job:', error.message);
  }
});

export default job;