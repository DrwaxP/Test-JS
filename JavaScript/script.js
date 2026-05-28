// A sua array local na memória do navegador (opcional se for usar só o banco)
let data = []; 

async function enviarDados() {
    let nome = document.querySelector('.nome').value;
    let age = document.querySelector('.idade').value;
    let adress = document.querySelector('.email').value;
    let password = document.querySelector('.senha').value; // Correção do .value
    let result = document.querySelector('.resultado');

    // Monta o objeto com os dados atuais
    let novoUsuario = { nome: nome, idade: age, email: adress, senha: password };

    try {
        // Envia os dados da tela diretamente para o seu servidor Node.js
        let resposta = await fetch('http://localhost:3000/salvar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoUsuario)
        });

        let dadosServidor = await resposta.json();

        if (dadosServidor.status === "sucesso") {
            // Se o servidor salvou com sucesso, adicionamos na array local da tela também
            data.push(novoUsuario);
            result.innerHTML = `✅ Salvo com sucesso no HD!<br>${nome}<br>${age}`;
        }
    } catch (erro) {
        console.error("Erro ao conectar com o banco local:", erro);
        result.innerHTML = "❌ Erro ao salvar os dados permanentemente.";
    }
}



