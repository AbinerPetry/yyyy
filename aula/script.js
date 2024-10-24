// Seleciona o canvas pelo ID e armazena na variável 'canvas'
const canvas = document.getElementById('gameCanvas');

// Obtém o contexto 2D do canvas, que permite desenhar nele
const ctx = canvas.getContext('2d');

// Seleciona o elemento de exibição da pontuação
const scoreDisplay = document.getElementById('placar');

// Seleciona o elemento de exibição da mensagem de "Game Over"
const gameOverMessage = document.getElementById('gameOverMessage');

// Define o tamanho de cada quadrado (para a cobra e a comida)
const box = 20;

// Inicializa a cobra como um array com um segmento na posição (100, 100)
let snake = [{ x: box * 5, y: box * 5 }];

// Define a direção inicial da cobra como 'RIGHT'
let direction = 'RIGHT';

// Gera a posição inicial da comida aleatoriamente dentro do canvas
let food = {
    x: Math.floor(Math.random() * 20) * box, // Coordenada X da comida
    y: Math.floor(Math.random() * 20) * box  // Coordenada Y da comida
};

// Inicializa a pontuação
let score = 0;

// Inicializa a velocidade do jogo (em milissegundos)
let speed = 150;

// Adiciona um ouvinte para eventos de tecla que chama a função changeDirection
document.addEventListener('keydown', changeDirection);

// Função para mudar a direção da cobra com base na tecla pressionada
function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

// Função que desenha todos os elementos do jogo
function draw() {
    ctx.fillStyle = '#00afdb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
        score++;
        placar.innerHTML = `Pontuação: ${score}`;

        // Aumenta a velocidade do jogo
        speed = Math.max(50, speed - 10); // Diminui o intervalo, mas não menos que 50ms
        clearInterval(game);
        game = setInterval(draw, speed);
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over!');
    }

    snake.unshift(newHead);

    
}

// Função para verificar colisão da cobra com ela mesma
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Inicia o jogo chamando a função draw a cada 150ms
let game = setInterval(draw, speed);
