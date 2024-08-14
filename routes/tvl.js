import express from 'express';
import { Connection } from '@solana/web3.js';
import Tvl from '../models/tvl.js';
import { calculateTotalTVL } from '../utils/calculateTotalTVL.js';

const router = express.Router();

router.get('/update-tvl', async (req, res) => {
    const { programId } = req.query;

    if (!programId) {
        return res.status(400).json({ error: 'Missing required query parameter: programId' });
    }

    try {
        const connection = new Connection(process.env.RPC_URL);
        const totalTVL = await calculateTotalTVL(connection, programId);

        // Store or update the TVL in MongoDB
        const tvlData = await Tvl.findOneAndUpdate(
            { programId },
            { totalTVL, updatedAt: new Date() },
            { new: true, upsert: true }
        );

        console.log(`TVL updated: $${totalTVL}`);
        res.json(tvlData);
    } catch (error) {
        console.error('Failed to update TVL:', error);
        res.status(500).json({ error: 'Failed to update TVL data' });
    }
});

router.get('/tvl', async (req, res) => {
    const { programId } = req.query;

    if (!programId) {
        return res.status(400).json({ error: 'Missing required query parameter: programId' });
    }

    try {
        const tvlData = await Tvl.findOne({ programId });

        if (!tvlData) {
            return res.status(404).json({ error: 'TVL data not found' });
        }

        res.json(tvlData);
    } catch (error) {
        console.error('Failed to fetch TVL:', error);
        res.status(500).json({ error: 'Failed to fetch TVL data' });
    }
});

export default router;
