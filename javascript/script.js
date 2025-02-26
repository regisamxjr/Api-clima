let chave = "46551cb2168b328d79639d4a9ae43c8c";

document.addEventListener("DOMContentLoaded", function () {
    const mensagemErro = document.createElement("p");
    mensagemErro.id = "mensagemErro";
    mensagemErro.style.display = "none";
    mensagemErro.style.color = "#ff0000";
    mensagemErro.style.fontSize = "1.2rem";
    mensagemErro.style.fontWeight = "bold";
    mensagemErro.style.marginTop = "10px";
    document.querySelector(".result-section").appendChild(mensagemErro);
});

function colocarNaTela(dados) {
    console.log(dados);
    document.querySelector("#cidadeNome").textContent = dados.name;
    document.querySelector("#descricao").textContent = dados.weather[0].description;
    document.querySelector("#cidadeTemperatura").textContent = "Temperatura: " + Math.floor(dados.main.temp) + "°C";
    document.querySelector("#cidadeVento").textContent = "Vento: " + dados.wind.speed + " m/s";
    document.querySelector("#cidadeUmidade").textContent = "Umidade: " + dados.main.humidity + "%";
    document.querySelector("#mensagemErro").style.display = "none";
    
    alterarFundo(dados.weather[0].main);
}

async function buscarCidade(cidade) {
    try {
        let resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`
        );
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada");
        }
        let dados = await resposta.json();
        colocarNaTela(dados);
    } catch (erro) {
        mostrarErro("Cidade não encontrada. Tente novamente.");
    }
}

function mostrarErro(mensagem) {
    const erroElemento = document.querySelector("#mensagemErro");
    erroElemento.textContent = mensagem;
    erroElemento.style.display = "block";
}

function alterarFundo(clima) {
    const corpo = document.body;
    const fundos = {
        Clear: "url('/img/ensolarado.jpg')",
        Rain: "url('/img/chuva.jpg')",
        Clouds: "url('/img/nublado.jpg')",
        Snow: "url('/img/neve.jpg')",
        Thunderstorm: "url('/img/chuva.jpg')",
        Drizzle: "url('/img/chuva.jpg')",
        Mist: "url('/img/nevoa.jpg')", 
        Fog: "url('/img/nublado.jpg')", 
    };

    corpo.style.backgroundImage = fundos[clima] || "url('https://source.unsplash.com/1600x900/?weather')";
    corpo.style.backgroundSize = "cover";
    corpo.style.backgroundPosition = "center";
    corpo.style.transition = "background 0.5s ease-in-out";
}

document.querySelector("#searchForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let cidade = document.querySelector("#cidade").value;
    buscarCidade(cidade);
});
