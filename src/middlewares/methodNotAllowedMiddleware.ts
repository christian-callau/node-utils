import { Request, Response } from 'express'
import { httpResponse } from '..'

export const methodNotAllowedMiddleware = (req: Request, res: Response) => {
	return httpResponse({ res, status: 405 })
}
