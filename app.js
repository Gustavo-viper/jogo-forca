const express = require("express");
const db = require("./database/database");
const path = require("path");

const app = express();
const PORT = 3000;

// Arquivos públicos
app.use(express.static(path.join(__dirname, "public")));

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use(express.json());

app.post("/ranking", (req, res) => {

    const { nome, pontos } = req.body;

    db.run(
        "INSERT INTO ranking(nome,pontos) VALUES(?,?)",
        [nome, pontos],
        (err) => {

            if(err){

                return res.status(500).json(err);

            }

            res.json({
                sucesso:true
            });

        }

    );

});

app.get("/ranking", (req,res)=>{

    db.all(

        "SELECT * FROM ranking ORDER BY pontos DESC LIMIT 10",

        (err,rows)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(rows);

        }

    );

});