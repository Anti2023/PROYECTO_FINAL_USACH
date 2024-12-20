document.getElementById('new-fact-btn').addEventListener('click', fetchFact);
async function fetchFact() {
    const factContainer = document.getElementById('fact');
    factContainer.textContent = 'Cargando...';
    try {
        const response = await fetch('https://catfact.ninja/fact');
        if (!response.ok)
            throw new Error('Error al obtener datos');
        const data = await response.json();
        factContainer.textContent = data.fact;
    }
    catch (error) {
        factContainer.textContent = 'No se pudo obtener el dato. Intenta nuevamente.';
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    preloadCatImages(); // Cargar imágenes inicialmente
});

let cachedImages = []; // Array para almacenar las imágenes precargadas
let currentImageIndex = 0;

async function preloadCatImages() {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
        if (!response.ok) throw new Error("Error al obtener las imágenes de gatos");
        const data = await response.json();
        cachedImages = data.map(item => item.url); // Guardar URLs de las imágenes
        updateImages(); // Mostrar las primeras imágenes

        // Configurar cambio periódico
        setInterval(updateImages, 7000);
    } catch (error) {
        console.error("No se pudieron precargar las imágenes: ", error);
    }
}

function updateImages() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.style.backgroundImage = `url(${cachedImages[currentImageIndex]})`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        card.textContent = ""; // Elimina el texto de las cards
        currentImageIndex = (currentImageIndex + 1) % cachedImages.length; // Avanzar al siguiente índice
    });
}
const triviaQuestions = [
    { question: "¿Cuántos dedos tienen los gatos en sus patas delanteras?", answer: "5" },
    { question: "¿Qué sentido está más desarrollado en los gatos?", answer: "olfato" },
    { question: "¿Cuántas horas duermen los gatos al día en promedio?", answer: "15" },
    { question: "¿Cuál es la raza de gato doméstico más grande?", answer: "Maine Coon" },
    { question: "¿Qué órgano adicional utilizan los gatos para analizar los olores?", answer: "El órgano de Jacobson" },
    { question: "¿Cuántos dientes tienen los gatos adultos?", answer: "30" },
    { question: "¿Qué velocidad máxima puede alcanzar un gato doméstico al correr?", answer: "48 km/h" },
    { question: "¿Cuántas garras tienen los gatos en las patas traseras?", answer: "4" },
    { question: "¿Cuál es el nombre del gato que viajó al espacio en 1963?", answer: "Félicette" }
];

let currentQuestionIndex = null;

document.getElementById("start-trivia-btn").addEventListener("click", startTrivia);

function startTrivia() {
    loadNewQuestion(); // Carga la primera pregunta
}

function loadNewQuestion() {
    // Selecciona una nueva pregunta aleatoria
    currentQuestionIndex = Math.floor(Math.random() * triviaQuestions.length);
    const triviaContainer = document.getElementById("trivia-container");

    // Actualiza el contenido del contenedor
    triviaContainer.innerHTML = `
        <p id="trivia-question">${triviaQuestions[currentQuestionIndex].question}</p>
        <input type="text" id="trivia-answer" placeholder="Escribe tu respuesta">
        <button id="submit-answer-btn">Enviar respuesta</button>
        <p id="trivia-feedback"></p>
    `;

    // Agrega el evento al botón para verificar la respuesta
    document.getElementById("submit-answer-btn").addEventListener("click", checkAnswer);
}

function checkAnswer() {
    const userAnswer = document.getElementById("trivia-answer").value.trim().toLowerCase();
    const correctAnswer = triviaQuestions[currentQuestionIndex].answer.toLowerCase();
    const feedbackElement = document.getElementById("trivia-feedback");

    // Mostrar feedback según la respuesta
    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = "¡Correcto! 🐾 Se cargará una nueva pregunta.";
        feedbackElement.style.color = "green";
    } else {
        feedbackElement.textContent = `Incorrecto. La respuesta era: ${triviaQuestions[currentQuestionIndex].answer}. Se cargará una nueva pregunta.`;
        feedbackElement.style.color = "red";
    }

    // Limpiar el campo de entrada
    document.getElementById("trivia-answer").value = "";

    // Cargar una nueva pregunta después de 3 segundos
    setTimeout(loadNewQuestion, 3000);
}
