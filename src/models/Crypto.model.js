import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
  coin: { 
    type: String,
    required: true 
},
  price: { 
    type: Number,
    required: true
},
  marketCap: {
    type: Number,
    required: true
 },
  change24h: {
    type: Number,
    required: true
 },
  fetchedAt: {
    type: Date, 
    default: Date.now 
},
},
{timestamps: true}
);

const Crypto = mongoose.model('Crypto', cryptoSchema);
export default Crypto;
