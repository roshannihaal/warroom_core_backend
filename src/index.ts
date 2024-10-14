import app from './app'
import { config } from './config'
import { logger } from './utils'

const port = config.PORT
const nodeEnv = config.NODE_ENV

app.listen(port, () => {
  logger.info(`App (${nodeEnv}) listening on ${port}`)
})
