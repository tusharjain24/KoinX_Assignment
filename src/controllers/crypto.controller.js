import Crypto from '../models/Crypto.js';
import { ApiError } from '../utils/ApiError.util.js';
import { ApiResponse } from '../utils/ApiError.util.js';
import { standardDeviation } from '../utils/helpers.js';

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
    }, 'Crypto stats fetched successfully');
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


export const getCryptoDeviation = async (req, res, next) => {
  try {
    const { coin } = req.query;
    if (!coin) {
      throw new ApiError(400, 'Coin is required');
    }

    const records = await Crypto.find({ coin }).sort({ fetchedAt: -1 }).limit(100);
    if (records.length < 2) {
      throw new ApiError(400, 'Not enough data to calculate deviation');
    }

    const prices = records.map(record => record.price);
    const deviation = standardDeviation(prices);

    const response = new ApiResponse(200, { deviation });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
