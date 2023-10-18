const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/salvar-relatorio') {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                // Leia os dados existentes do arquivo relatorio.json (se houver)
                let dadosExistentes = [];
                try {
                    const dadosExistentesJSON = fs.readFileSync('relatorio.json', 'utf8');
                    dadosExistentes = JSON.parse(dadosExistentesJSON);
                } catch (error) {
                    // Arquivo relatorio.json não existe, ou é a primeira vez que está sendo usado.
                }
                // Adicione os novos dados aos dados existentes
                dadosExistentes.push(jsonData);
                // Salve os dados atualizados no arquivo relatorio.json
                fs.writeFileSync('relatorio.json', JSON.stringify(dadosExistentes));

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Relatório salvo com sucesso' }));
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao salvar o relatório: ' + error.message);
            }
        });
    } else {
        if (req.url === '/') {
            // Servir o arquivo HTML principal
            const htmlFilePath = path.join(__dirname, 'index.html');
            const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlContent);
        } else {
            // Servir outros recursos, como arquivos CSS e scripts
            const resourcePath = path.join(__dirname, req.url);
            if (fs.existsSync(resourcePath)) {
                const contentType = getContentType(req.url);
                const resourceContent = fs.readFileSync(resourcePath);
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(resourceContent);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Recurso não encontrado');
            }
        }
    }
});

function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.js':
            return 'application/javascript';
        case '.css':
            return 'text/css';
        default:
            return 'text/plain';
    }
}

// Certifique-se de que o servidor está ouvindo em todas as interfaces (0.0.0.0)
server.listen(3000, '0.0.0.0', () => {
    console.log('Servidor escutando na porta 3000 em todas as interfaces.');
});
