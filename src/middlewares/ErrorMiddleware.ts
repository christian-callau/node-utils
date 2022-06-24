import { NextFunction, Request, Response } from 'express'
import { ErrorHandlerType } from '..'

export const ErrorMiddleware = (errorHandler: ErrorHandlerType) => {
	return (error: Error, req: Request, res: Response, next: NextFunction) => {
		errorHandler(error, res.headersSent ? undefined : res)
	}
}
