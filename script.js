const inputCidade = document.querySelector('#cidade');
const botaoBuscar = document.querySelector('#buscar');
const resultado = document.querySelector('#resultado');

const API_KEY = '5046c958b9c5bb13163018d42198cd0a';

botaoBuscar.addEventListener('click', buscarClima);

function buscarClima() {
    const cidade = inputCidade.value.trim();

    // 1️⃣ Validação
    if (cidade === '') {
        resultado.innerHTML = 'Digite uma cidade';
        return;
    }

    // 2️⃣ Requisição para API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${API_KEY}&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(dados => {

            // 3️⃣ Se a cidade não existir
            if (dados.cod === 404) {
                resultado.innerHTML = 'Cidade não encontrada';
                return;
            }

            // 4️⃣ Mostrar dados
            resultado.innerHTML = `
                <h2>${dados.name}</h2>
                <p>🌡 Temperatura: ${dados.main.temp}°C</p>
                <p>🌥 Clima: ${dados.weather[0].description}</p>
            `;
        })
        .catch(() => {
            resultado.innerHTML = 'Erro ao buscar dados 😢';
        });
}
