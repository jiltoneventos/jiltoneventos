const formulario = document.querySelector("#formulario-contato");
const mensagemFormulario = document.querySelector("#mensagem-formulario");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const dados = new FormData(formulario);

    const nome = dados.get("nome");
    const telefone = dados.get("telefone");
    const email = dados.get("email");
    const interesse = dados.get("interesse");
    const visita = dados.get("visita");
    const mensagem = dados.get("mensagem");

    const textoWhatsApp = `
Olá! Gostaria de obter informações sobre um evento.

Nome: ${nome}
Telefone: ${telefone}
E-mail: ${email}
Interesse: ${interesse}
Deseja agendar uma visita: ${visita}

Mensagem:
${mensagem}
    `.trim();

    const mensagemCodificada = encodeURIComponent(textoWhatsApp);
    const numeroWhatsApp = "5521991556171";

    const urlWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    mensagemFormulario.textContent =
        "Redirecionando para o WhatsApp...";

    mensagemFormulario.style.color = "#3D526C";

    window.open(urlWhatsApp, "_blank");
});