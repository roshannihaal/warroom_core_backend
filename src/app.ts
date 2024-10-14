import express, { json } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import { errorHandler, notFound } from './middlewares'
import { apiRouter } from './api'
import { httpLogger } from './utils'

const app = express()

app.use(json())
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(httpLogger)

app.get('/ping', (req, res) => {
  res.status(200).send({ message: 'pong' })
})

app.use('/api', apiRouter)

app.use(errorHandler)

app.use(notFound)

export default app
