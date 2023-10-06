const stars = document.querySelectorAll('.star');
const selectedRating = document.getElementById('selected-rating');
const commentInput = document.getElementById('comment');
const submitButton = document.getElementById('submit-button');

let rating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        rating = parseInt(star.getAttribute('data-rating'));
        updateRating();
    });
});

function updateRating() {
    selectedRating.textContent = rating ;
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

submitButton.addEventListener('click', () => {
    const comment = commentInput.value;
    console.log('Avaliação:', rating, 'estrelas');
    console.log('Comentário:', comment);
    
    // Limpar o campo de comentário
    commentInput.value = '';

   
});
