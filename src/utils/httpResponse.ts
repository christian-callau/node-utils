import { Response } from 'express'

interface httpResponseArgs {
	res: Response
	status?: number
	body?: Object
}

export const httpResponse = ({ res, status = 200, body }: httpResponseArgs) => {
	return body ? res.status(status).json(body).end() : res.status(status).end()
}
