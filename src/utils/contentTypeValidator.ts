import { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '..'

export const ContentTypeValidator = (validContentTypes: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const isValid = validContentTypes.some(validContentType =>
			req.is(validContentType)
		)

		if (!isValid) {
			throw new BadRequestError('Invalid provided Content-Type header')
		}

		next()
	}
}
