function enviarDados() {
    const nome = document.querySelector('.nome');
    const idade = document.querySelector('.idade');
    const email = document.querySelector('.email');
    const senha = document.querySelector('.senha');

    const resultadoDiv = document.querySelector('.resultado');
    resultadoDiv.innerHTML = `<p>Nome: ${nome}</p><p>Idade: ${idade}</p><p>Email: ${email}</p><p>Senha: ${senha}</p>`;
}
