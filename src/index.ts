import {clearDB, videos, videos_router} from "./routers/videos_router";
import {Request, Response} from "express";

const express = require('express')
const app = express()
const port = 3001

app.use(express.json())
app.use("/videos", videos_router)
app.get('/', (req:Request,res:Response)=>{
  res.sendStatus(200)
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
  clearDB()
  res.sendStatus(204)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})