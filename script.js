document.addEventListener('DOMContentLoaded', function() {
    const solveBtn = document.getElementById('solveBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultElement = document.getElementById('result');
    const numbersInput = document.getElementById('numbersInput');
    
    solveBtn.addEventListener('click', function() {
        try {
            // Obter os números digitados pelo usuário
            const inputText = numbersInput.value.trim();
            
            // Verificar se o campo está vazio
            if (!inputText) {
                throw new Error('Por favor, insira os números mágicos');
            }
            
            // Converter a string em array de números
            const numberStrings = inputText.split(',');
            
            // Verificar se tem exatamente 7 números
            if (numberStrings.length !== 7) {
                throw new Error('A caverna exige exatamente 7 números mágicos separados por vírgula');
            }
            
            // Converter para números inteiros
            const numbers = numberStrings.map(num => {
                const parsed = parseInt(num.trim(), 10);
                if (isNaN(parsed)) {
                    throw new Error(`"${num}" não é um número válido`);
                }
                return parsed;
            });
            
            // Verificar se há pelo menos 2 números únicos
            const numerosUnicos = [...new Set(numbers)];
            if (numerosUnicos.length < 2) {
                throw new Error('A caverna pede pelo menos 2 números diferentes para o desafio');
            }
            
            // Encontrar o segundo menor número único
            const segundoMenor = encontrarSegundoMenorUnico(numbers);
            
            // Exibir o resultado
            resultElement.textContent = segundoMenor;
            resultContainer.classList.remove('hidden');
            
            // Resetar animação
            resultElement.style.animation = 'none';
            setTimeout(() => {
                resultElement.style.animation = '';
            }, 10);
            
        } catch (error) {
            // Exibir mensagem de erro de forma amigável
            alert(`Erro mágico: ${error.message}`);
            console.error(error);
            resultContainer.classList.add('hidden');
        }
    });
    
    /**
     * Encontra o segundo menor número único em um array
     * @param {number[]} arr - Array de números para processar
     * @returns {number} O segundo menor número único
     */
    function encontrarSegundoMenorUnico(arr) {
        // Remover duplicatas e ordenar
        const numerosUnicos = [...new Set(arr)].sort((a, b) => a - b);
        
        // Retornar o segundo elemento (já validamos que existem pelo menos 2)
        return numerosUnicos[1];
    }
    
    // Validação enquanto digita
    numbersInput.addEventListener('input', function() {
        const value = this.value;
        // Verifica se há mais de 7 números
        if (value.split(',').length > 7) {
            this.setCustomValidity('Limite de 7 números atingido');
        } else {
            this.setCustomValidity('');
        }
    });
});