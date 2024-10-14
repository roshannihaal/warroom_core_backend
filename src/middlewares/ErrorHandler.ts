import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const HTTP_SERVER_ERROR = 500

  if (error instanceof ZodError) {
    // Handle Zod validation errors
    // TODO: https://github.com/causaly/zod-validation-error
    // return res.status(422).json({
    //   message: 'Validation error',
    //   details: error.issues.map((issue) => issue.message).join(', '),
    //   stack: isProduction ? undefined : error.stack,
    // })
    res.status(422).json({
      statusCode: 422,
      message: error.issues.map((issue) => issue.message).join(', '),
      name: error.name,
      stack: error.stack,
    })
    return
  }

  if (res.headersSent) {
    next(error)
    return
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : HTTP_SERVER_ERROR

  const errorResponse = {
    message: error.message,
    name: error.name,
    stack: error.stack,
  }

  res.status(statusCode).json(errorResponse)
}
