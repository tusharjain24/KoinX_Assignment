import Crypto from '../models/Crypto.js';
import { ApiResponse } from '../utils/ApiError.util.js';
import { ApiError } from '../utils/ApiError.util.js';

export const getCryptoStats = async (req, res, next) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      throw new ApiError(400, 'Coin is required');
    }

    const latestRecord = await Crypto.findOne({ coin }).sort({ fetchedAt: -1 });
    if (!latestRecord) {
      throw new ApiError(404, 'No data found for the requested coin');
    }

    const response = new ApiResponse(200, {
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      '24hChange': latestRecord.change24h,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};