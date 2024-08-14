import mongoose from 'mongoose';

const TvlSchema = new mongoose.Schema({
    programId: { type: String, required: true },
    totalTVL: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Tvl', TvlSchema);
