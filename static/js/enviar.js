const form = document.getElementById('contactoForm');
const feedback = document.getElementById('mensagemFeedback');
const btn = document.getElementById('btnEnviar');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    // Bloquear o botão para evitar múltiplos cliques
    btn.innerText = "A enviar...";
    btn.disabled = true;

    // Capturar os dados do formulário
    const formData = new FormData(form);
    const dados = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        servico: formData.get('servico'),
        mensagem: formData.get('mensagem')
    };

    // Enviar os dados para o teu backend Python local
    // Nota: O URL '/' local do backend
    fetch('http://localhost:5000/api/contacto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados) // Converter objeto para JSON
    })
    .then(response => response.json()) // Converter resposta do Python para JS
    .then(data => {
        feedback.style.display = 'block';
        if (data.sucesso) {
            feedback.innerText = data.sucesso;
            feedback.style.color = 'green';
            form.reset(); // Limpar o formulário
        } else if (data.erro) {
            feedback.innerText = data.erro;
            feedback.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        feedback.style.display = 'block';
        feedback.innerText = "Erro ao conectar ao servidor backend. Verifica se ele está a correr.";
        feedback.style.color = 'red';
    })
    .finally(() => {
        // Reativar o botão
        btn.innerText = "Enviar Pedido de Proposta";
        btn.disabled = false;
    });
});
