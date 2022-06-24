export class InternalServerError extends Error {
	status: number
	data: any

	constructor(message: string, data?: any) {
		super(message)
		this.name = this.constructor.name
		this.status = 500
		this.data = data
		Object.setPrototypeOf(this, new.target.prototype)
		Error.captureStackTrace(this, this.constructor)
	}
}
