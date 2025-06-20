document.querySelectorAll('.login-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const arrow = this.querySelector('.arrow');
        const entrarContainer = this.parentElement.querySelector('.entrar-container');
        const isOpen = entrarContainer.style.display === 'block';

        // Fecha todos os outros
        document.querySelectorAll('.entrar-container').forEach(cont => cont.style.display = 'none');
        document.querySelectorAll('.arrow').forEach(a => a.classList.remove('down'));

        // Se já estava aberto, fecha. Se não, abre.
        if (!isOpen) {
            entrarContainer.style.display = 'block';
            arrow.classList.add('down');
        } else {
            entrarContainer.style.display = 'none';
            arrow.classList.remove('down');
        }
    });
});