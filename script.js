// 1. Mapeamento do Fluxograma (Nós da história)
const fluxograma = {
    inicio: {
        texto: "Você está na entrada de um templo antigo escondido na floresta. O portal de pedra está semiaberto, e há uma trilha escura que desce pelas laterais.",
        escolhas: [
            { texto: "Entrar pelo portal de pedra", proximoNo: "sala_portal" },
            { texto: "Seguir a trilha escura externa", proximoNo: "trilha_externa" }
        ]
    },
    sala_portal: {
        texto: "Dentro do templo, você encontra uma sala com duas portas. Uma brilha com uma luz azul suave e a outra emite um som abafado de engrenagens.",
        escolhas: [
            { texto: "Entrar na porta de luz azul", proximoNo: "sala_tesouro" },
            { texto: "Entrar na porta com som de engrenagens", proximoNo: "armadilha" }
        ]
    },
    trilha_externa: {
        texto: "A trilha leva você até as costas do templo, onde um penhasco bloqueia o caminho. De repente, você ouve passos de criaturas se aproximando!",
        escolhas: [
            { texto: "Correr de volta para o portal", proximoNo: "inicio" },
            { texto: "Tentar se esconder nas sombras", proximoNo: "fim_capturado" }
        ]
    },
    sala_tesouro: {
        texto: "Parabéns! A luz azul vinha de runas mágicas que protegiam o tesouro perdido. Você encontrou o ouro e saiu rico e salvo!",
        escolhas: [
            { texto: "Jogar Novamente", proximoNo: "inicio", reiniciar: true }
        ]
    },
    armadilha: {
        texto: "Ao abrir a porta, você pisa em uma placa de pressão. As engrenagens disparam flechas mecânicas. Você teve que recuar correndo para a entrada!",
        escolhas: [
            { texto: "Voltar ao Início", proximoNo: "inicio" }
        ]
    },
    fim_capturado: {
        texto: "As sombras não foram suficientes para te esconder. Você foi capturado pelos guardiões do templo. Fim de jogo.",
        escolhas: [
            { texto: "Tentar Novamente", proximoNo: "inicio", reiniciar: true }
        ]
    }
};

// 2. Função para renderizar a história na tela
function mostrarCenario(idNo) {
    const cenario = fluxograma[idNo];
    
    // Atualiza o texto da história no HTML
    document.getElementById('texto-historia').innerText = cenario.texto;
    
    // Limpa os botões anteriores para colocar os novos
    const containerBotoes = document.getElementById('botoes');
    containerBotoes.innerHTML = '';
    
    // Cria os novos botões baseados nas escolhas do nó atual do fluxograma
    cenario.escolhas.forEach(escolha => {
        const botao = document.createElement('button');
        botao.innerText = escolha.texto;
        botao.classList.add('btn');
        
        // Se a escolha indicar reinício, aplica a classe CSS vermelha
        if (escolha.reiniciar) {
            botao.classList.add('btn-reiniciar');
        }
        
        // Configura a ação de clique para avançar para o próximo nó do fluxograma
        botao.onclick = () => mostrarCenario(escolha.proximoNo);
        
        // Insere o botão criado dentro da div correspondente no HTML
        containerBotoes.appendChild(botao);
    });
}

// 3. Inicializa o jogo apontando para o nó inicial do fluxograma
mostrarCenario('inicio');
