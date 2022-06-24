import { Request, Response } from 'express'
import { httpResponse } from '..'

export const fallbackMiddleware = (req: Request, res: Response) => {
	return httpResponse({ res, status: 400 })
}
