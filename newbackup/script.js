let currentPage = 1; // Página inicial
let selectedCategory = 'technology'; // Categoria inicial
const apiKey = 'fb766685cdfe4a54b35b8768afad6e90';

// Função para buscar as notícias da API
function fetchNews(page = 1) {
    const apiUrl = `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&page=${page}&pageSize=5&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.articles.length) {
                displayNews(data.articles);
                updatePaginationButtons(data.totalResults, page);
            } else {
                document.getElementById('news-container').innerHTML = '<p>Nenhuma notícia encontrada.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar notícias:', error);
            document.getElementById('news-container').innerHTML = '<p>Erro ao carregar notícias. Verifique o console para mais detalhes.</p>';
        });
}

// Função para exibir as notícias no HTML
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="Image" style="width:100%;">
            <p>${article.description || 'Descrição não disponível'}</p>
            <a href="${article.url}" target="_blank">Leia mais</a>
        `;
        
        newsContainer.appendChild(newsItem);
    });
}

// Função para atualizar os botões de paginação
function updatePaginationButtons(totalResults, page) {
    const totalPages = Math.ceil(totalResults / 5); // Supondo que há 5 notícias por página
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');

    prevPageButton.disabled = page === 1; // Desabilitar se estiver na primeira página
    nextPageButton.disabled = page >= totalPages; // Desabilitar se estiver na última página
}

// Evento para detectar cliques nas categorias do cabeçalho
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        selectedCategory = this.getAttribute('data-category'); // Atualiza a categoria selecionada
        currentPage = 1; // Reseta para a primeira página
        fetchNews(currentPage); // Busca as notícias da nova categoria
    });
});

// Evento para ir para a próxima página
document.getElementById('next-page').addEventListener('click', function () {
    currentPage++;
    fetchNews(currentPage);
});

// Evento para ir para a página anterior
document.getElementById('prev-page').addEventListener('click', function () {
    currentPage--;
    fetchNews(currentPage);
});

// Carrega as notícias ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    fetchNews(); // Carregar notícias inicialmente
});
// Selecionar o botão de alternância
const toggleButton = document.getElementById('toggle-theme');

// Adicionar evento de clique para alternar entre claro e escuro
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Alterar o texto do botão conforme o modo
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Modo Claro';
    } else {
        toggleButton.textContent = 'Modo Escuro';
    }
});
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="Image" style="width:100%;">
            <p>${article.description || 'Descrição não disponível'}</p>
            <a href="${article.url}" target="_blank">Leia mais</a>
            <button class="audio-button" onclick="readNews('${article.title}', '${article.description}')">Ouvir Notícia</button>
        `;
        
        newsContainer.appendChild(newsItem);
    });
}
function readNews(title, description) {
    const speechSynthesis = window.speechSynthesis;

    // Cria uma nova instância de SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance();

    // Define o texto que será falado
    utterance.text = `${title}. ${description}`;

    // Opcional: Configurações adicionais, como alterar a voz ou a velocidade
    utterance.lang = 'pt-BR'; // Define o idioma para português do Brasil
    utterance.rate = 1; // Velocidade da fala

    // Faz o navegador falar o texto
    speechSynthesis.speak(utterance);
}
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="Image" style="width:100%;">
            <p>${article.description || 'Descrição não disponível'}</p>
            <a href="${article.url}" target="_blank">Leia mais</a>
            <button class="audio-button" onclick="readNews('${article.title}', '${article.description}')">Ouvir Notícia</button>
            <button class="audio-button" onclick="togglePause()">Pausar</button>
        `;
        
        newsContainer.appendChild(newsItem);
    });
}
let isPaused = false; // Variável para controlar o estado da fala

function togglePause() {
    const speechSynthesis = window.speechSynthesis;

    if (!isPaused) {
        speechSynthesis.pause(); // Pausar o áudio
        isPaused = true;
        document.querySelectorAll('.audio-button').forEach(button => {
            if (button.textContent === 'Pausar') {
                button.textContent = 'Retomar'; // Alterar o texto do botão para "Retomar"
            }
        });
    } else {
        speechSynthesis.resume(); // Retomar o áudio
        isPaused = false;
        document.querySelectorAll('.audio-button').forEach(button => {
            if (button.textContent === 'Retomar') {
                button.textContent = 'Pausar'; // Alterar o texto do botão para "Pausar"
            }
        });
    }
}

