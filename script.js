const campoPais = document.getElementById("campo-pais");
const botaoBuscar = document.getElementById("botao-buscar");
const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");

async function buscarPais() {


const nomePais = campoPais.value.trim();

if (nomePais === "") {
    mensagem.innerHTML = "<p>Digite o nome de um país.</p>";
    resultado.innerHTML = "";
    return;
}

mensagem.innerHTML = "<p>🔎 Buscando país...</p>";
resultado.innerHTML = "";

try {

    const resposta = await fetch(
        "https://countries.dev/name/" + encodeURIComponent(nomePais)
    );

    if (!resposta.ok) {
        throw new Error("País não encontrado");
    }

    const dados = await resposta.json();

    console.log(dados);

    const pais = dados[0];

    mostrarPais(pais);

    mensagem.innerHTML = "";

} catch (erro) {

    mensagem.innerHTML =
        "<p>❌ Não encontramos esse país. Tente novamente.</p>";

    resultado.innerHTML = "";
}


}

function mostrarPais(pais) {


const moeda = pais.currencies && pais.currencies.length > 0
    ? pais.currencies[0].name
    : "Não informado";

const idioma = pais.languages && pais.languages.length > 0
    ? pais.languages[0].name
    : "Não informado";

resultado.innerHTML =
    "<div class='card-pais'>" +

        "<h2>" + pais.flag + " " + pais.nativeName + "</h2>" +

        "<img src='" + pais.flags.png +
        "' alt='Bandeira de " + pais.name + "'>" +

        "<div class='informacoes'>" +

            "<p><strong>Nome:</strong> " +
            pais.name + "</p>" +

            "<p><strong>Capital:</strong> " +
            pais.capital + "</p>" +

            "<p><strong>População:</strong> " +
            pais.population.toLocaleString("pt-BR") + "</p>" +

            "<p><strong>Região:</strong> " +
            pais.region + "</p>" +

            "<p><strong>Sub-região:</strong> " +
            pais.subregion + "</p>" +

            "<p><strong>Moeda:</strong> " +
            moeda + "</p>" +

            "<p><strong>Idioma:</strong> " +
            idioma + "</p>" +

            "<p><strong>Área:</strong> " +
            pais.area.toLocaleString("pt-BR") + " km²</p>" +

        "</div>" +

    "</div>";


}

botaoBuscar.addEventListener("click", buscarPais);

campoPais.addEventListener("keydown", function(event) {


if (event.key === "Enter") {
    buscarPais();
}


});
