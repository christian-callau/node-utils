import { Response } from 'express'
import {
	BadRequestError,
	ForbiddenError,
	InternalServerError,
	MethodNotAllowed,
	NotFoundError,
	UnauthorizedError,
	ValidationError,
} from '.'
import { httpResponse } from '..'
import sentry from '@sentry/node'

type Sentry = typeof sentry

export type ErrorHandlerType = (error: Error, res?: Response) => void

export const ErrorHandler = (sentry?: Sentry): ErrorHandlerType => {
	return (error: Error, res?: Response) => {
		if (
			sentry &&
			!(
				error instanceof BadRequestError ||
				error instanceof ValidationError ||
				error instanceof UnauthorizedError ||
				error instanceof ForbiddenError ||
				error instanceof NotFoundError ||
				error instanceof MethodNotAllowed
			)
		) {
			if (error instanceof InternalServerError && error.data) {
				sentry.setContext('data', { data: error.data })
			}
			sentry.captureException(error)
		}

		if (res) {
			if (
				error instanceof BadRequestError ||
				error instanceof UnauthorizedError ||
				error instanceof ForbiddenError ||
				error instanceof NotFoundError ||
				error instanceof MethodNotAllowed ||
				error instanceof InternalServerError
			) {
				httpResponse({
					res,
					status: error.status,
					body: { error: { type: error.name, message: error.message } },
				})
			} else if (error instanceof ValidationError) {
				httpResponse({
					res,
					status: error.status,
					body: {
						error: {
							type: error.name,
							message: error.message,
							errors: error.errors,
						},
					},
				})
			} else {
				httpResponse({
					res,
					status: 500,
					body: { error: { type: error.name, message: error.message } },
				})
			}
		}
	}
}
