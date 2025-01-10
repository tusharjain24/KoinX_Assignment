import { Router } from 'express';
import { getCryptoStats, getCryptoDeviation } from '../controllers/crypto.controller.js';

const cryptoRouter = Router();

cryptoRouter.route('/stats').get(getCryptoStats);
cryptoRouter.route('/deviation').get(getCryptoDeviation);

export {cryptoRouter};