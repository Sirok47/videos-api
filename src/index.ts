import {videos_router} from "./routers/videos_router";

const express = require('express')
export const app = express()
const port = 3000

app.use(express.json)
app.use("/videos", videos_router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})