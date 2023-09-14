# Este é um exemplo de código Python que conta o número de ocorrências de cada palavra em um arquivo de texto

# Abre o arquivo de texto
with open('arquivo.txt', 'r') as file:
    # Lê o conteúdo do arquivo
    data = file.read()

# Remove caracteres especiais e converte todas as letras para minúsculas
data = ''.join(e for e in data if e.isalnum() or e.isspace())
data = data.lower()

# Separa as palavras em uma lista
words = data.split()

# Cria um dicionário para armazenar as contagens de palavras
word_counts = {}

# Conta o número de ocorrências de cada palavra
for word in words:
    if word in word_counts:
        word_counts[word] += 1
    else:
        word_counts[word] = 1

# Imprime as contagens de palavras
for word, count in word_counts.items():
    print(word, count)
