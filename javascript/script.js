let chave = "46551cb2168b328d79639d4a9ae43c8c";

function colocarNaTela(dados) {
    console.log(dados);
    document.querySelector("#cidadeNome").textContent = dados.name;
    document.querySelector("#descricao").textContent = dados.weather[0].description;
    document.querySelector("#cidadeTemperatura").textContent = "Temperatura: " + Math.floor(dados.main.temp) + "°C";
    document.querySelector("#cidadeVento").textContent = "Vento: " + dados.wind.speed + " m/s";
    document.querySelector("#cidadeUmidade").textContent = "Umidade: " + dados.main.humidity + "%";

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
        alert(erro.message);
    }
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
