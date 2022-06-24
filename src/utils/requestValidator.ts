import Validator, { ValidationSchema } from 'fastest-validator'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '..'

const v = new Validator()

export const RequestValidator = (schema: ValidationSchema) => {
	const validator = v.compile(schema)

	return async (req: Request, res: Response, next: NextFunction) => {
		const validationErrors = await validator(req)

		if (validationErrors !== true) {
			throw new ValidationError('Request validation error', validationErrors)
		}

		next()
	}
}
