// toggler
// timerForScroll
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            
            const targetSectionId = this.getAttribute("href");
            const targetSection = document.querySelector(targetSectionId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop;
                const scrollDuration = 1500;
                
                scrollToSection(offsetTop, scrollDuration);
            }
        });
    });
    
    function scrollToSection(offset, duration) {
        const startingY = window.pageYOffset;
        const diff = offset - startingY;
        const start = performance.now();
        
        function step(timestamp) {
            const timePassed = timestamp - start;
            const progress = Math.min(timePassed / duration, 1);
            window.scrollTo(0, startingY + diff * progress);
            
            if (timePassed < duration) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
});


const burger = document.querySelector('#toggler');
const bur = document.querySelector('.nav-toggler')
const navBar  = document.querySelector('.navbar');
const navList = document.querySelector('.nav-list')
const bunCrustTop = document.querySelector('.bun__crust--top');
const bunCrustMiddle = document.querySelector('.bun__crust--middle');
const bunCrustBottom = document.querySelector('.bun__crust--bottom');
bunCrustTop.style.top = '14px';
bunCrustTop.style.transform = 'translateY(-10px)';
bunCrustMiddle.style.top = '14px'
bunCrustMiddle.style.transform = 'translateY(0px)';
bunCrustBottom.style.bottom = '14px'
bunCrustBottom.style.transform = 'translateY(10px)';

const profileIcon = document.querySelector('.nav-img');
const navMenu = document.querySelector('#nav-menu');
const navMenu2 = document.querySelector('#nav-menu-2');

function resetBurgerAndNav() {
    const bunTop = document.querySelector('.bun--top');
    const bunMiddle = document.querySelector('.bun--middle');
    const bunBottom = document.querySelector('.bun--bottom');

    if (burger.contains(event.target)) {
        console.log(1);
    }

    if (!burger.contains(event.target) && burger.checked && navList.classList.contains('active')) {
        bunTop.style.transform = 'none';
        bunMiddle.style.transform = 'none';
        bunBottom.style.transform = 'none';
        bunCrustTop.style.top = '14px';
        bunCrustTop.style.transform = 'translateY(-10px)';
        bunCrustMiddle.style.top = '14px';
        bunCrustMiddle.style.transform = 'translateY(0px)';
        bunCrustBottom.style.bottom = '14px';
        bunCrustBottom.style.transform = 'translateY(10px)';
        const navItems = document.querySelectorAll('.nav-list li');
        navItems.forEach((item, index) => {
            item.style.animation = 'fade-in 0.5s ease-in-out forwards';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            item.style.animationDelay = `${0.1 * index}s`;
        });
        navList.classList.remove('active');
        timing = setTimeout(() => {
            navBar.classList.remove('disp');
            burger.disabled = false;
            burger.checked = false;
        }, 500);
    }
}

burger.addEventListener('click', (event) => {
    if (!burger.disabled) {
        burger.disabled = true;
        navMenu.classList.remove('open');
        navMenu2.classList.remove('open');
        const bunTop = document.querySelector('.bun--top');
        const bunMiddle = document.querySelector('.bun--middle');
        const bunBottom = document.querySelector('.bun--bottom');
        if (burger.checked) {
            bunMiddle.style.transform = 'scale(0)';
            bunMiddle.style.transition = 'none';
            bunTop.style.transform = 'rotate(45deg) translate(-3.5px, 5px)';
            bunTop.style.transition = 'none';
            bunTop.style.transition = 'transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.64)'
            bunBottom.style.transform = 'rotate(-45deg) translate(-7px, -3px)';
            bunBottom.style.transition = 'none';
            bunBottom.style.transition = 'transform 0.1806s cubic-bezier(0.04, 0.04, 0.12, 0.64)'
            bunCrustTop.style.transform = 'none';
            bunCrustMiddle.style.transform = 'none';
            bunCrustBottom.style.transform = 'none';
            console.log('menu open clicked')
            navBar.classList.add('disp')
            navList.classList.add('active')
            const navItems = document.querySelectorAll('.nav-list *');
            navItems.forEach((item, index) => {
                item.style.animation = 'fade-in 1s ease-in-out forwards';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
                item.style.animationDelay = `${0.1 * index}s`;
            });
            setTimeout(() => {
                burger.disabled = false;
            }, 500);
        } else {
            bunTop.style.transform = 'none';
            bunMiddle.style.transform = 'none';
            bunBottom.style.transform = 'none';
            bunCrustTop.style.top = '14px';
            bunCrustTop.style.transform = 'translateY(-10px)';
            bunCrustMiddle.style.top = '14px'
            bunCrustMiddle.style.transform = 'translateY(0px)';
            bunCrustBottom.style.bottom = '14px'
            bunCrustBottom.style.transform = 'translateY(10px)';
            console.log('menu closed clicked')
            const navItems = document.querySelectorAll('.nav-list *');
            navItems.forEach((item, index) => {
                item.style.animation = 'fade-in 0.5s ease-in-out forwards';
                item.style.opacity = '0';
                item.style.transform = 'translateY(-10px)';
                item.style.animationDelay = `${0.1 * index}s`;
            });
            navList.classList.remove('active')
            timing = setTimeout(() => {
                navBar.classList.remove('disp');
                burger.disabled = false;
            }, 500);
        }
    }
});

navList.addEventListener('click', (event) => {
    event.stopPropagation();
});
bur.addEventListener('click', (event) => {
    event.stopPropagation();
});

const navLinks = document.querySelectorAll('.nav-link');
const bunTop = document.querySelector('.bun--top');
const bunMiddle = document.querySelector('.bun--middle');
const bunBottom = document.querySelector('.bun--bottom');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        console.log('navlink - clicked')
        bunTop.style.transform = 'none';
        bunMiddle.style.transform = 'none';
        bunBottom.style.transform = 'none';
        bunCrustTop.style.top = '14px';
        bunCrustTop.style.transform = 'translateY(-10px)';
        bunCrustMiddle.style.top = '14px'
        bunCrustMiddle.style.transform = 'translateY(0px)';
        bunCrustBottom.style.bottom = '14px'
        bunCrustBottom.style.transform = 'translateY(10px)';
        const navItems = document.querySelectorAll('.nav-list li');
        navItems.forEach((item, index) => {
            item.style.animation = 'fade-in 0.5s ease-in-out forwards';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-10px)';
            item.style.animationDelay = `${0.1 * index}s`;
        });
        navList.classList.remove('active')
        console.log('menu - closed')
        timing = setTimeout(() => {
            navBar.classList.remove('disp');
            burger.disabled = false;
            burger.checked = false;
        }, 500);
    });
});
document.addEventListener('click', (event) => {
    resetBurgerAndNav()
});
function hideNavList() {
    const navItems = document.querySelectorAll('.nav-list li');
    navItems.forEach((item, index) => {
        item.style.animation = 'fade-in 1s ease-in-out forwards';
        item.style.opacity = '0';
        item.style.transform = 'translateY(-10px)';
        item.style.animationDelay = `${0.1 * index}s`;
    });
}

function hideNavList() {
    const navItems = document.querySelectorAll('.nav-list *');
    navItems.forEach((item, index) => {
        item.removeAttribute('style');
    });

}

window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && window.innerWidth <= 1440) {
        hideNavList()
    }
});



profileIcon.addEventListener('click', (event) => {
    if (navMenu2.style.display !== 'block') {
        if (!navMenu.classList.contains('open')) {
            resetBurgerAndNav()   
        navMenu.classList.add('open');
    } else {
        navMenu.classList.remove('open');
    }} if (navMenu2.style.display === 'block') {
        if (!navMenu2.classList.contains('open')) {
            resetBurgerAndNav()  
        navMenu2.classList.add('open');
    } else {
        navMenu2.classList.remove('open');
    }}
});

document.addEventListener('click', (event) => {
    if (getComputedStyle(navMenu).display === 'block') {
        navMenu.classList.remove('open');
    } else {
        navMenu2.classList.remove('open');
    }
})

profileIcon.addEventListener('click', (event) => {
    event.stopPropagation();
});

