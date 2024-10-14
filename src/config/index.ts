import 'dotenv/config'
import { ConfigSchema } from './config.schema'

const result = ConfigSchema.safeParse(process.env)
if (!result.success) {
  throw new Error(`Dotenv Config Error: ${result.error}`)
}

export const config = result.data
