let chave = "46551cb2168b328d79639d4a9ae43c8c";

// Objeto com as siglas dos países e seus nomes
const paises = {
    'DE': 'Alemanha',
    'SA': 'Arábia Saudita',
    'AR': 'Argentina',
    'AU': 'Austrália',
    'AT': 'Áustria',
    'BE': 'Bélgica',
    'BO': 'Bolívia',
    'BR': 'Brasil',
    'BG': 'Bulgária',
    'CA': 'Canadá',
    'CL': 'Chile',
    'CN': 'China',
    'CO': 'Colômbia',
    'KR': 'Coreia do Sul',
    'CR': 'Costa Rica',
    'HR': 'Croácia',
    'DK': 'Dinamarca',
    'EC': 'Equador',
    'AE': 'Emirados Árabes Unidos',
    'ES': 'Espanha',
    'US': 'Estados Unidos',
    'FI': 'Finlândia',
    'FR': 'França',
    'GR': 'Grécia',
    'NL': 'Holanda',
    'HU': 'Hungria',
    'IN': 'Índia',
    'ID': 'Indonésia',
    'IE': 'Irlanda',
    'IS': 'Islândia',
    'IL': 'Israel',
    'IT': 'Itália',
    'JP': 'Japão',
    'KW': 'Kuwait',
    'MX': 'México',
    'NZ': 'Nova Zelândia',
    'NO': 'Noruega',
    'PY': 'Paraguai',
    'PE': 'Peru',
    'PL': 'Polônia',
    'PT': 'Portugal',
    'GB': 'Reino Unido',
    'CZ': 'República Tcheca',
    'RU': 'Rússia',
    'SG': 'Singapura',
    'SE': 'Suécia',
    'CH': 'Suíça',
    'TH': 'Tailândia',
    'TR': 'Turquia',
    'UA': 'Ucrânia',
    'UY': 'Uruguai',
    'VN': 'Vietnã',
    'ZA': 'África do Sul'
};


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

function colocarNaTela(dadosAtual, dadosPrevisao) {
    // Mostrar a seção de resultados
    document.querySelector(".result-section").style.display = "block";
    
    // Mostrar o container de previsão
    document.querySelector("#previsaoContainer").style.display = "flex";
    
    // Atualizar as datas
    const datas = obterDatas();
    
    // Atualizar números e dias da semana
    document.querySelector("#dataHoje").textContent = datas.dataHoje.data;
    document.querySelector("#diaSemanaHoje").textContent = datas.dataHoje.diaSemana;
    
    document.querySelector("#dataAmanha").textContent = datas.dataAmanha.data;
    document.querySelector("#diaSemanaAmanha").textContent = datas.dataAmanha.diaSemana;
    
    document.querySelector("#dataDepoisAmanha").textContent = datas.dataDepoisDeAmanha.data;
    document.querySelector("#diaSemanaDepoisAmanha").textContent = datas.dataDepoisDeAmanha.diaSemana;
    
    // Mostrar nome da cidade e país
    document.querySelector(".cidade-nome").style.display = "block";
    document.querySelector(".detalhes").style.display = "block";
    
    // Pegar o código do país e buscar o nome completo
    const codigoPais = dadosAtual.sys.country;
    const nomePais = paises[codigoPais] || codigoPais; // Usa o código se não encontrar o nome
    
    // Exibir cidade e país
    document.querySelector("#cidadeNome").textContent = `${dadosAtual.name}, ${nomePais} (${codigoPais})`;
    document.querySelector("#descricao").textContent = dadosAtual.weather[0].description;
    
    // Atualizar temperaturas e dados meteorológicos
    document.querySelector("#cidadeTemperatura").textContent = Math.floor(dadosAtual.main.temp) + "°C";
    document.querySelector("#cidadeVento").textContent = dadosAtual.wind.speed + " m/s";
    document.querySelector("#cidadeUmidade").textContent = dadosAtual.main.humidity + "%";
    
    const amanha = dadosPrevisao.list[8];
    const depoisDeAmanha = dadosPrevisao.list[16];
    
    document.querySelector("#amanhaTempMax").textContent = Math.floor(amanha.main.temp) + "°C";
    document.querySelector("#amanhaVento").textContent = amanha.wind.speed + " m/s";
    document.querySelector("#amanhaUmidade").textContent = amanha.main.humidity + "%";
    
    document.querySelector("#depoisAmanhaTempMax").textContent = Math.floor(depoisDeAmanha.main.temp) + "°C";
    document.querySelector("#depoisAmanhaVento").textContent = depoisDeAmanha.wind.speed + " m/s";
    document.querySelector("#depoisAmanhaUmidade").textContent = depoisDeAmanha.main.humidity + "%";
    
    document.querySelector("#mensagemErro").style.display = "none";
    
    alterarFundo(dadosAtual.weather[0].main);
}

async function buscarCidade(cidade) {
    try {
        // Buscar clima atual
        let respostaAtual = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`
        );
        
        if (!respostaAtual.ok) {
            throw new Error("Cidade não encontrada");
        }
        
        // Buscar previsão para amanhã
        let respostaPrevisao = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`
        );
        
        let dadosAtual = await respostaAtual.json();
        let dadosPrevisao = await respostaPrevisao.json();
        
        colocarNaTela(dadosAtual, dadosPrevisao);
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
        Fog: "url('/img/nevoa.jpg')",
        Haze: "url('/img/nevoa.jpg')"
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

document.querySelector("#clearButton").addEventListener("click", function() {
    // Limpar apenas o valor do input
    document.querySelector("#cidade").value = "";
});

document.addEventListener("DOMContentLoaded", function() {
    // Esconder a seção de resultados inicialmente
    document.querySelector(".result-section").style.display = "none";
    
    // Adicionar evento de clique no footer-brand
    document.querySelector(".footer-brand").addEventListener("click", function() {
        location.reload();
    });
});
