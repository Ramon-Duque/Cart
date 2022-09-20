import express from "express";
import routes from "./routes/cart"

const app = express()
const PORT = 3000;
app.use(express.json())
app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is runnig on port: ${PORT}`)
})