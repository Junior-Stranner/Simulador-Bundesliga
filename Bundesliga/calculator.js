const teams = [
    "Bayern Múnchen", 
    "Borussia Dortmund", 
    "RB Leipzig", 
    "Bayer Leverkusen", 
    "VfL Wolfsburg", 
    "Eintracht Frankfurt", 
    "Union Berlin", 
    "SC Freiburg", 
    "VfB Stuttgart", 
    "Borussia Mönchengladbach", 
    "TSG Hoffenheim", 
    "1. FC Köln", 
    "Werder Bremen", 
    "Mainz 05", 
    "FC Augsburg", 
    "VfL Bochum", 
    "Heidenheim", 
    "Darmstadt 98"
];
const matchList = document.getElementById('matchList');
const resultsTableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

// Inicializa os times e resultados
function generateMatches() {
    matchList.innerHTML = ''; // Limpa a lista de jogos existente
    const results = {}; // Para armazenar os resultados dos times

    // Inicializa os resultados de cada time
    teams.forEach(team => {
        results[team] = {
            matches: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            points: 0,
        };
    });

    // Gera todas as partidas possíveis e simula os resultados
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            simulateMatch(teams[i], teams[j], results); // Partida de ida
            simulateMatch(teams[j], teams[i], results); // Partida de volta
        }
    }

    // Atualiza a tabela de resultados
    updateResultsTable(results);
}

// Simula um jogo entre dois times
function simulateMatch(homeTeam, awayTeam, results) {
    const homeScore = Math.floor(Math.random() * 5); // Placar do time da casa (0-4)
    const awayScore = Math.floor(Math.random() * 5); // Placar do time visitante (0-4)

    // Armazena o resultado da partida
    let matchResult = `${homeTeam} ${homeScore} - ${awayScore} ${awayTeam}`;

    // Atualiza as estatísticas do time da casa e visitante
    const homeTeamResult = results[homeTeam];
    const awayTeamResult = results[awayTeam];

    // Atualiza o número de partidas jogadas
    homeTeamResult.matches++;
    awayTeamResult.matches++;

    // Atualiza os resultados com base no placar
    if (homeScore > awayScore) {
        homeTeamResult.wins++;
        homeTeamResult.points += 3;
        awayTeamResult.losses++;
    } else if (homeScore < awayScore) {
        awayTeamResult.wins++;
        awayTeamResult.points += 3;
        homeTeamResult.losses++;
    } else {
        homeTeamResult.draws++;
        awayTeamResult.draws++;
        homeTeamResult.points += 1;
        awayTeamResult.points += 1;
    }

    // Exibe o resultado da partida na lista de jogos
    const li = document.createElement('li');
    li.innerHTML = `${homeTeam} <strong>${homeScore}</strong> x <strong>${awayScore}</strong> ${awayTeam}`;
    matchList.appendChild(li);
}

// Atualiza a tabela de resultados com base nos dados simulados
function updateResultsTable(results) {
    resultsTableBody.innerHTML = ''; // Limpa a tabela existente

    // Converte o objeto 'results' em um array e ordena por pontos (maior -> menor)
    const sortedResults = Object.entries(results).sort(([, a], [, b]) => b.points - a.points);

    // Preenche a tabela com os times ordenados por posição
    sortedResults.forEach(([team, result], index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td> <!-- Posição -->
            <td>${team}</td> <!-- Time -->
            <td>${result.matches}</td> <!-- Partidas -->
            <td>${result.wins}</td> <!-- Vitórias -->
            <td>${result.draws}</td> <!-- Empates -->
            <td>${result.losses}</td> <!-- Derrotas -->
            <td>${result.points}</td> <!-- Pontos -->
        `;

        resultsTableBody.appendChild(row);
    });
}


// calculator.js

function toggleMatches() {
    const matchList = document.getElementById('matchList');
    const toggleMatchesBtn = document.getElementById('toggleMatchesBtn');

    if (matchList.classList.contains('hidden')) {
        matchList.classList.remove('hidden');
        toggleMatchesBtn.textContent = 'Ocultar Jogos';
    } else {
        matchList.classList.add('hidden');
        toggleMatchesBtn.textContent = 'Mostrar Jogos';
    }
}

    document.getElementById('showInstructionsBtn').addEventListener('click', function() {
        var instructionsDiv = document.getElementById('instructions');
        if (instructionsDiv.classList.contains('hidden')) {
            fetch('Tutorial.html')
                .then(response => response.text())
                .then(data => {
                    instructionsDiv.innerHTML = data;
                    instructionsDiv.classList.remove('hidden');
                })
                .catch(error => console.error('Erro ao carregar o tutorial:', error));
        } else {
            instructionsDiv.classList.add('hidden');
        }
    });
