import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.send("Hello World").end()
})

app.listen(3001, () => {
  console.log("Aplicação está rodando na porta 3001")
})
