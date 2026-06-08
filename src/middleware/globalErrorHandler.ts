import { config } from "dotenv";
import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: err instanceof Error ? err.message : 'An unexpected error occurred',
        stack: config.name === 'development' && err instanceof Error ? err.stack : undefined
    })
};