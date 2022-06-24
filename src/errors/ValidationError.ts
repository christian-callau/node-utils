import { ValidationError as FastestValidationError } from 'fastest-validator'

export class ValidationError extends Error {
	status: number
	errors: FastestValidationError[]

	constructor(message: string, errors: FastestValidationError[]) {
		super(message)
		this.name = this.constructor.name
		this.status = 400
		this.errors = errors
		Object.setPrototypeOf(this, new.target.prototype)
		Error.captureStackTrace(this, this.constructor)
	}
}
