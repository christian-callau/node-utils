import Validator, { ValidationSchema } from 'fastest-validator'
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '..'

export const RequestCustomValidator = (validator: Validator) => {
	return (schema: ValidationSchema) => {
		const compiledValidator = validator.compile(schema)

		return async (req: Request, res: Response, next: NextFunction) => {
			const validationErrors = await compiledValidator(req)

			if (validationErrors !== true) {
				throw new ValidationError('Request validation error', validationErrors)
			}

			next()
		}
	}
}
