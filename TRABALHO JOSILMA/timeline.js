const timeline = document.getElementById("timeline");

// Função para criar um item de relatório na linha do tempo
function createReportItem(report, index) {
    const reportItem = document.createElement("div");
    reportItem.classList.add("report-item");
    reportItem.innerHTML = `
        <h2>Relatório ${index + 1}</h2>
        <p><strong>Nome:</strong> ${report.nome}</p>
        <p><strong>Número de WhatsApp:</strong> ${report.numero}</p>
        <p><strong>Descrição:</strong> ${report.descricao}</p>
    `;
    return reportItem;
}

// Função para carregar relatórios do arquivo JSON
function loadReports() {
    fetch("relatorio.json") // Certifique-se de que o arquivo JSON esteja na mesma pasta que seu HTML
        .then((response) => response.json())
        .then((data) => {
            data.forEach((report, index) => {
                const reportItem = createReportItem(report, index);
                timeline.appendChild(reportItem);
            });
        })
        .catch((error) => console.error("Erro ao carregar relatórios:", error));
}

// Carregar os relatórios quando a página carregar
window.addEventListener("load", loadReports);
