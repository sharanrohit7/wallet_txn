import express, { Request, Response, NextFunction } from 'express';
import { configVar } from '../config/configVar';

export const checkAPIKey = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['api-key'] as string;
    if (!apiKey) {
        return res.status(401).json({ error: 'API key is missing' });
    }
    const validAPIKey = configVar.API_KEY;

    if (apiKey !== validAPIKey) {
        return res.status(403).json({ error: 'Invalid API key' });
    }
    next();
};