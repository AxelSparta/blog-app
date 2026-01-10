import app from './app.js'
import { connectDB } from './db.js'
import { PORT } from './envConfig.js'

// mongodb
connectDB()

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})
