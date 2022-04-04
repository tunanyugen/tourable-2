const express = require("express");
const app = express();
const path = require("path");

const PORT = 8000;

app.use("/static", express.static(path.resolve(__dirname, "dist")));
app.use("/static", express.static(path.resolve(__dirname, "assets")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "index.html"))
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})