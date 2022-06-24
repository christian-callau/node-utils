import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { methodNotAllowedMiddleware } from '../middlewares'

interface CreateExpressAppArgs {
	corsOrigin?: string
	requestBodySize?: string
	sentryDSN?: string
	tracesSampleRate?: number
}

export const createExpressApp = ({
	corsOrigin = '*',
	requestBodySize = '100kb',
	sentryDSN = '',
	tracesSampleRate = 0,
}: CreateExpressAppArgs) => {
	const app = express()

	app.use(helmet())
	app.use(cors({ origin: corsOrigin }))
	app.use(express.json({ limit: requestBodySize }))
	app.use(
		express.urlencoded({
			extended: true,
			limit: requestBodySize,
		})
	)

	Sentry.init({
		dsn: sentryDSN,
		integrations: [
			new Sentry.Integrations.Http({ tracing: true }),
			new Tracing.Integrations.Express({ app }),
		],
		tracesSampleRate,
	})

	app.use(Sentry.Handlers.requestHandler())
	app.use(Sentry.Handlers.tracingHandler())

	app
		.route('/health')
		.get((_req, res) => res.json({ status: 'UP' }))
		.all(methodNotAllowedMiddleware)

	return app
}
