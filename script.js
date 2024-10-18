const botao = document.getElementById('meuBotao');
    const imagem = document.getElementById('minhaImagem');
    const contador = document.getElementById('contador');
    let numeroCliques = 0;

    botao.addEventListener('click', () => {
        document.body.style.backgroundColor = document.body.style.backgroundColor === 'lightblue' ? 'white' : 'lightblue';
        numeroCliques++;
        contador.textContent = `Número de cliques: ${numeroCliques}`;
    });

    imagem.addEventListener('mouseover', () => {
        imagem.style.transform = 'scale(1.2)';
    });

    imagem.addEventListener('mouseout', () => {
        imagem.style.transform = 'scale(1)';
    });
