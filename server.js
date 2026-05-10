const express = require("express");

const { v4: uuidv4 } = require("uuid");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

let jogos = [
    {
        id: 1,
        nome: "The Legend of Zelda",
        tipo: "Aventura",
        nota: 10,
        review: "Um clássico absoluto."
    },
    {
        id: 2,
        nome: "FIFA 23",
        tipo: "Esporte",
        nota: 7,
        review: "Bom para jogar com amigos."
    }
];

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (
        email === "usuario@esoft.com" &&
        password === "Abc123"
    ) {

        return res.status(200).json({
            token: uuidv4()
        });

    }

    return res.status(401).json({
        mensagem: "Credenciais inválidas"
    });

});

app.get("/jogos", (req, res) => {

    return res.status(200).json(jogos);

});

app.get("/jogos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    return res.status(200).json(jogo);

});

app.post("/jogos", (req, res) => {

    const { nome, tipo, nota, review } = req.body;

    const novoJogo = {
        id: proximoId++,
        nome,
        tipo,
        nota,
        review
    };

    jogos.push(novoJogo);

    return res.status(201).json(novoJogo);

});

app.put("/jogos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { nome, tipo, nota, review } = req.body;

    if (!nome || !tipo || nota === undefined || !review) {
    return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios"
    });
}

    const jogo = jogos.find(j => j.id === id);

    if (!jogo) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    jogo.nome = nome;
    jogo.tipo = tipo;
    jogo.nota = nota;
    jogo.review = review;

    return res.status(200).json(jogo);

});

app.delete("/jogos/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const jogoIndex = jogos.findIndex(j => j.id === id);

    if (jogoIndex === -1) {
        return res.status(404).json({
            mensagem: "Jogo não encontrado"
        });
    }

    jogos.splice(jogoIndex, 1);

    return res.status(204).send();

});

app.get("/", (req, res) => {
    res.send("API funcionando!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});