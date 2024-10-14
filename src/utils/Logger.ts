import pino, { TransportTargetOptions } from 'pino'
import pinoHttp from 'pino-http'

import { config } from '../config'

const isProduction = config.NODE_ENV === 'production'

type TargetOptions = TransportTargetOptions[] &
  {
    target: string
    /**
     * Levels in target sets minimum log level to log
     *
     * // REF: https://getpino.io/#/docs/api?id=logger-level
     *
     * Level: 	trace 	debug 	info 	warn 	error 	fatal 	silent
     *
     * Value: 	10 	     20 	   30 	40 	   50 	  60 	   Infinity
     */
    level: string
    options:
      | {
          destination: string
          mkdir: boolean
        }
      | {
          sourceToken: string
        }
      | {
          sentry: {
            dsn: string
          }
          withLogRecord: boolean
          tags: string[]
          context: string[]
          minLevel: number
        }
  }[]

let targets: TargetOptions = []

if (isProduction) {
  targets = [
    {
      target: 'pino/file',
      level: 'info',
      options: { destination: './logs/app.log', mkdir: true },
    },
    {
      target: 'pino/file',
      level: 'error',
      options: { destination: './logs/error.log', mkdir: true },
    },
    {
      target: 'pino/file',
      level: 'fatal',
      options: { destination: './logs/fatal.log', mkdir: true },
    },
  ]
}

const prodLogger = pino({
  transport: {
    targets: targets,
  },
})

const devLogger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid,hostname',
      colorize: true,
    },
  },
})

export const logger = isProduction ? prodLogger : devLogger

export const httpLogger = pinoHttp({ logger })
