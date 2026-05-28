const express = require('express');
const cors = require('cors'); 
const fs = require('fs');
const path = require('path');
const app = express();

const ARQUIVO_BANCO = 'banco.json';

// Configurações necessárias para ler os dados do formulário
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

// Permite que o Node sirva a sua página HTML (coloque seu HTML na mesma pasta ou configure o caminho)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ROTA QUE RECEBE OS DADOS E SALVA PERMANENTEMENTE
app.post('/salvar', (req, res) => {
    const { nome, idade, email, senha } = req.body;

    // 1. Lê o arquivo existente ou cria uma array vazia se não existir
    let bancoDados = [];
    if (fs.existsSync(ARQUIVO_BANCO)) {
        const conteudo = fs.readFileSync(ARQUIVO_BANCO, 'utf-8');
        bancoDados = JSON.parse(conteudo || '[]');
    }

    // 2. Adiciona o novo usuário na array
    bancoDados.push({ nome, idade, email, senha });

    // 3. Grava de volta no arquivo JSON (Salvamento Permanente no HD)
    fs.writeFileSync(ARQUIVO_BANCO, JSON.stringify(bancoDados, null, 2));

    console.log("💾 Dados gravados permanentemente no banco.json!");
    
    // Retorna uma resposta para a sua página
    res.json({ status: "sucesso", mensagem: "Dados salvos no servidor!" });
});

// Inicia o servidor local na porta 3000
app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
});
