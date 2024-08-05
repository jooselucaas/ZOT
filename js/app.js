// Função para fazer a rolagem suave até o topo da página
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mostrar ou ocultar a seta conforme o usuário rola a página
window.addEventListener('scroll', function() {
    var backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Adicione aqui o código para o envio do formulário
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    fetch('/send-email', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Erro ao enviar email');
        }
    }).then(message => {
        // Seleciona a mensagem de sucesso e adiciona a classe 'visible'
        var successMessage = document.getElementById('success-message');
        var successMessageText = document.getElementById('success-message-text');
        successMessageText.textContent = message; // Atualiza o texto da mensagem de sucesso
        successMessage.style.display = 'block';
        successMessage.classList.add('visible'); // Mostra a mensagem de sucesso
        contactForm.reset();  // Limpa o formulário após envio
    }).catch(error => {
        console.error(error);
    });
});
