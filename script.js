const apiKey = "628a3457bcc040d59f204705241412";

const form = document.getElementById("searchForm");
const cidadeInput = document.getElementById("cidade");
const cidadeNome = document.getElementById("cidadeNome");
const descricao = document.getElementById("descricao");
const cidadeTemperatura = document.getElementById("cidadeTemperatura");
const cidadeVento = document.getElementById("cidadeVento");
const cidadeUmidade = document.getElementById("cidadeUmidade");
const body = document.body;

async function getWeather(cidade) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt`
        );
        
        if (!response.ok) {
            throw new Error("Cidade não encontrada. Verifique o nome digitado.");
        }

        const data = await response.json();

        cidadeNome.textContent = `${data.name}, ${data.sys.country}`;
        descricao.textContent = data.weather[0].description;
        cidadeTemperatura.textContent = `Temperatura: ${data.main.temp}°C`;
        cidadeVento.textContent = `Vento: ${data.wind.speed} m/s`;
        cidadeUmidade.textContent = `Umidade: ${data.main.humidity}%`;

        updateBackground(data.weather[0].main);
    } catch (error) {
        alert(error.message);
    }
}

function updateBackground(clima) {
    switch (clima.toLowerCase()) {
        case "clear":
            body.style.backgroundImage = "url('img/ensolarado.jpg')";
            break;
        case "clouds":
            body.style.backgroundImage = "url('img/nublado.jpg')";
            break;
        case "rain":
        case "drizzle":
        case "thunderstorm":
            body.style.backgroundImage = "url('img/chuva.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('img/padrao.jpg')";
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cidade = cidadeInput.value.trim();
    if (cidade) {
        getWeather(cidade);
    } else {
        alert("Por favor, insira o nome de uma cidade.");
    }
});
