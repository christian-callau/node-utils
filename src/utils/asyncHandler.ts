import { NextFunction, Request, Response } from 'express'

/**
 * Async middleware wrapper that forward errors to next()
 * @param fn
 * @returns
 */
export const AsyncHandler = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
	return (req: Request, res: Response, next: NextFunction) =>
		Promise.resolve(fn(req, res, next)).catch(next)
}
