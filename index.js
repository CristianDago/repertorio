const fs = require('fs')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
    res.json(canciones);
});

app.post("/canciones", (req, res) => {

    const cancion = req.body 

    if (Object.values(cancion).some((value) => value === "")) {
      return res.status(400).json({message: "Campo esta vacío"});
    }

    const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"))
    fs.writeFileSync("repertorios.json", JSON.stringify([...canciones, cancion]))
    res.send("Cancion agregada con éxito")
})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"))
    const index = canciones.findIndex(p => p.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("repertorios.json", JSON.stringify(canciones))
    res.send("Producto eliminado con éxito")
})

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones= JSON.parse(fs.readFileSync("repertorios.json"))
    const index = canciones.findIndex(p => p.id == id)
    canciones[index] = cancion
    fs.writeFileSync("repertorios.json", JSON.stringify(canciones))
    res.send("Producto modificado con éxito")
    })
    

app.listen(port, (err) => {

    if(err) {
        console.error(err)
        throw err
    }
    console.log(`Servidor encendido`)
})