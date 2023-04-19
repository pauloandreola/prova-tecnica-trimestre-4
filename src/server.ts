import * as dotenv from 'dotenv'
import express from 'express'

import { router } from './shared/routes'
import { connectMongoDB } from './shared/database/connection'

dotenv.config()

const app = express()

const port = process.env.PORT || process.env.LOCAL_PORT

app.use(express.json())

app.use(router)

connectMongoDB().then(() => {
  app.listen(port, () => (console.log(`Server running at port => ${port}`)))
})
