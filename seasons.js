document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[name="season"]');
    const seasonBooks = document.querySelectorAll('.season-block');

    for (let i = 1; i < seasonBooks.length; i++) {
        seasonBooks[i].classList.add('hidden');
        }
    radioButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            seasonBooks.forEach((section) => {
                section.classList.add('mute');
            });
            setTimeout(() => {
                seasonBooks.forEach((section) => {
                    section.classList.add('hidden');
                    section.classList.remove('mute');
                })
                
                seasonBooks[index].classList.remove('hidden');
            }, 500);
        })
    })

    const seasonsElement = document.querySelector('.favorites-nav');
    const favoritesSection = document.querySelector('.favorites-section');

    const seasonsOffsetTop = seasonsElement.offsetTop;

    const favoritesSectionHeight = favoritesSection.offsetHeight;

    function updateStickySeasons() {
        const scrollY = window.pageYOffset;

        if (scrollY >= seasonsOffsetTop && scrollY <= seasonsOffsetTop + favoritesSectionHeight) {
            seasonsElement.classList.add('sticky');
            // document.body.style.overflowX = 'visible'; 
        } else {
            seasonsElement.classList.remove('sticky');
            // document.body.style.overflowX = 'hidden';
        }
    }

    window.addEventListener('scroll', updateStickySeasons);

    updateStickySeasons();

});
