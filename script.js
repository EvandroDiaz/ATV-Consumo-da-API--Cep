async function consultarCEP() {
    const cepInput = document.getElementById("cep");
    const mensagem = document.getElementById("mensagem");
    const resultado = document.getElementById("resultado");


    // Remove tudo que não for número
    const cep = cepInput.value.replace(/\D/g, "");


    // Verifica se possui 8 números
    if (cep.length !== 8) {
        mensagem.textContent = "Digite um CEP válido com 8 números.";
        resultado.style.display = "none";
        return;
    }


    mensagem.textContent = "Consultando...";
    resultado.style.display = "none";


    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();


        // CEP válido, mas não encontrado
        if (dados.erro) {
            mensagem.textContent = "CEP não encontrado.";
            return;
        }


        mensagem.textContent = "CEP encontrado!";
        resultado.style.display = "block";


        document.getElementById("cepResultado").textContent = dados.cep;
        document.getElementById("bairro").textContent = dados.bairro;
        document.getElementById("cidade").textContent = dados.localidade;
        document.getElementById("estado").textContent = dados.estado;
     


    } catch (erro) {
        mensagem.textContent = "Erro ao consultar a API.";
        console.error(erro);
    }
}