import { createClient, RedisClientType } from 'redis'
import { logger } from './Logger'

const client: RedisClientType = createClient({ url: `redis://redis:6379` })

export const connectToRedis = async (): Promise<void> => {
  try {
    await client.connect()
    logger.info('Conntected to redis')
  } catch (error) {
    throw error
  }
}
