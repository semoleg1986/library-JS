// const buyButtons = document.querySelectorAll('.card-button');

// buyButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         button.classList.add('own');
//         button.textContent = 'Own'; 
//         button.disabled = true; 
//     });
// });
class User {
    constructor(userId, firstname, lastname, email, password) {
        this.userId = userId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.visits = 1;
        this.books = 0;
        this.bonuses = 0;
        this.isAuth = false;
        this.isPaid = false;
        this.myBooks = []; 
    }
}

class Book {
    constructor(id, title, author) {
        this.id = id,
        this.title = title;
        this.author = author;
    }
}


function addIdToCardButtons() {
    const cardButtons = document.querySelectorAll('.card-button');
    cardButtons.forEach((button, index ) => {
        button.classList.add('log');
        button.setAttribute('data-bookid', index + 1);
    });
}

addIdToCardButtons();

const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

const regButton = document.querySelectorAll('.reg');
const loginButton = document.querySelectorAll('.log');
const logoutButton = document.getElementById('logout');
const profileButton = document.querySelectorAll('.profile');
const overlay = document.getElementById('overlay');

const regModal = document.querySelector('.modal-reg');
const logModal = document.querySelector('.modal-login');
const myProfile = document.querySelector('.profile-menu')

const closeButton = document.querySelectorAll('.reg-close');
const closeMyProfile = document.querySelector('.profile-close');
const closeBuyModal = document.querySelector('.buy-card-close');

const copyButton = document.getElementById('copyButton');

const getCard = document.querySelector('.get-card')
const getCardAuth = document.querySelector('.get-card-auth')
const findCardTitle = document.querySelector('#find-card-title');

const buyModal = document.querySelector('.buy-card')

const ccnumber = document.getElementById('ccnumber');
const buyForm = document.querySelector('.buy-form');
const submitButton = buyForm.querySelector('.auth');
const submitRegButton = document.querySelector('#reg-button')


let cardNumberSpan = document.getElementById('cardNumber');
let firstName = document.getElementById('fname');
let lastName = document.getElementById('lname');
let email = document.getElementById('email');
let password = document.getElementById('password');

let loginEmail = document.getElementById('login-email');
let loginPassword = document.getElementById('login-password');

let registerForm = document.getElementById('register');
let loginForm = document.getElementById('login');
let libraryCardButton = document.getElementById('library-card');

let userName = document.getElementById('username');
let cardNumber = document.getElementById('card-number');
let cardButton = document.querySelector('.library-card-button');
let libraryCard = document.querySelector('.library-card-media')




regButton.forEach((button, index) => {
    button.addEventListener('click', () => {
        overlay.classList.add('active');
        regModal.style.display = 'block';
        logModal.style.display = 'none';
    })
})

function userExistsName(firstName, lastName, cardId){
    const userIndex = existingUsers.findIndex((user) => (user.userId === cardId));
    if (userIndex !== -1) {
        currentUser = existingUsers[userIndex];
        if (currentUser.firstname === firstName && currentUser.lastname === lastName) {
            const visits = document.querySelector('.visits-count');
            const bonuses = document.querySelector('.bonus-count');
            const books = document.querySelector('.books-count');
            visits.textContent = currentUser.visits;
            bonuses.textContent = currentUser.bonuses;
            books.textContent = currentUser.books;
            return true;
        } 
        else {
            return false;
        }
    } else {
        return false;
    }
} 


loginButton.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            let checkUser = sessionStorage.getItem("userId");
            if (!checkUser) {
                overlay.classList.add('active');
                logModal.style.display = 'block';
                regModal.style.display = 'none';
            } else {
                if (!currentUser.isPaid){
                    overlay.classList.add('active');
                    buyModal.style.display = 'grid'
                    buyForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        currentUser.isPaid = true;
                        localStorage.setItem('users', JSON.stringify(existingUsers))
                        overlay.classList.remove('active');
                        buyModal.style.display = 'none'
                    });
                } else {
                    const bookId = button.getAttribute('data-bookid');
                    const bookCard = button.closest('.book-card');
                    const title = bookCard.querySelector('.book-title').textContent;
                    const bookName = title.split('By')[0].trim()
                    const author = title.split('By')[1].trim()
                    const addBook = new Book(bookId, bookName, author)
                    currentUser.myBooks.push(addBook);
                    currentUser.books += 1
                    currentUser.bonuses += 100
                    localStorage.setItem('users', JSON.stringify(existingUsers));
                    button.classList.add('own');
                    button.textContent = 'Own'; 
                    button.disabled = true; 
                }
            }
        })
})

function closeModalAndClearFields() {
    overlay.classList.remove('active');
    regModal.style.display = 'none';
    logModal.style.display = 'none';
    myProfile.style.display = 'none';
    buyModal.style.display = 'none'
    loginEmail.value = '';
    loginPassword.value = '';
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';
}

overlay.addEventListener('click', () => {
    closeModalAndClearFields();
});

closeButton.forEach((button, index) => {
    button.addEventListener('click', () => {
        closeModalAndClearFields();
    });
});

closeBuyModal.addEventListener('click', () => {
    overlay.classList.remove('active');
    buyModal.style.display = 'none'
});

// --------------Authentication-----------------


function userExists(email){
    return existingUsers.some((user) => user.email === email);
}

function userExistsId(cardId){
    return existingUsers.some((user) => user.userId === cardId);
}



function generateRandomNineDigitHexNumber() {
    const min = 0x100000000;
    const max = 0x1FFFFFFFF;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber.toString(16).toUpperCase();
}

const ResetPage = () => {
    const cardId = sessionStorage.getItem("userId");
    if (cardId){
        const userIndex = existingUsers.findIndex((user) => (user.userId === cardId));
        if (userIndex !== -1) {
            currentUser = existingUsers[userIndex];
            authenticateUser(cardId, currentUser.password)
            setToOwnCardButtons()
        }
    }
}
ResetPage()

function setToOwnCardButtons() {
    const cardButtons = document.querySelectorAll('.card-button');
    const cardId = sessionStorage.getItem("userId");
    if (cardId){
        const userIndex = existingUsers.findIndex((user) => (user.userId === cardId));
        if (userIndex !== -1) {
            currentUser = existingUsers[userIndex];
            cardButtons.forEach((button, index ) => {
                const bookId = button.getAttribute('data-bookid');
                const isBookPurchased = currentUser.myBooks.some(book => book.id === bookId);
                if (isBookPurchased) {
                    button.classList.add('own');
                    button.textContent = 'Own';
                    button.disabled = true;
                } 
            });}
}}


function registerUser(firstname, lastname, email, password) {
    const userId = generateRandomNineDigitHexNumber();
    const newUser = new User(userId, firstname, lastname, email, password);
    existingUsers.push(newUser);

    // const usersObject = JSON.parse(localStorage.getItem('users')) || {};
    
    // usersObject[email] = newUser;

    localStorage.setItem('users', JSON.stringify(existingUsers));

    return existingUsers;
}

function authenticateUser(email, password) {
    const userIndex = existingUsers.findIndex((user) => (user.userId === email || user.email === email) && user.password === password);
    if (userIndex !== -1) {
        currentUser = existingUsers[userIndex]
        currentUser.isAuth = true;
        sessionStorage.setItem('userId', currentUser.userId);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        const profileIcon = document.querySelector('.nav-img');
        const navMenu = document.querySelector('#nav-menu');
        const navMenu2 = document.querySelector('#nav-menu-2');
        function createProfileLogo(firstName, lastName) {
            const canvas = document.createElement('canvas');
            canvas.width = 28;
            canvas.height = 28;
            const context = canvas.getContext('2d');
        
            context.fillStyle = '#ffffff';
            context.beginPath();
            context.arc(14, 14, 14, 0, Math.PI * 2);
            context.fill();
        
            context.fillStyle = '#BB945F';
            context.font = '15px Inter';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            
            context.fillText((firstName.charAt(0)+lastName.charAt(0)).toUpperCase(), 14, 14);
            const logoUrl = canvas.toDataURL();
            profileIcon.src = logoUrl;
            profileIcon.title = `${firstName} ${lastName}`;
        }
        createProfileLogo(currentUser.firstname, currentUser.lastname);
        navMenu.style.display = 'none';
        navMenu2.style.display = 'block';
        navMenu2.classList.remove('open');
        const profileTitle = navMenu2.querySelector('.profile-title.login');
        profileTitle.textContent = currentUser.userId;
        findCardTitle.textContent = 'Your Library card';

        userName.value = `${currentUser.firstname} ${currentUser.lastname}`;
        cardNumber.value = currentUser.userId;
        cardButton.style.display = 'none';
        getCard.style.display = 'none';
        getCardAuth.style.display = 'block'
        libraryCard.style.display = 'flex'
        userExistsName(currentUser.firstname, currentUser.lastname, currentUser.userId)
        setToOwnCardButtons()
        return { success: true, userIndex };
    } else {
        return { success: false, errorText: 'Authentication failed' };
    }
}

function displayError(errorMessage) {
    const topError = document.querySelector('.top-error');
    topError.classList.remove('logger')
    topError.textContent = errorMessage;
    topError.style.display = 'block';

    setTimeout(() => {
        topError.style.display = 'none';
    }, 3000);
}

function displayLog(logMessage) {
    const topLog = document.querySelector('.top-error');
    topLog.classList.add('logger')
    topLog.textContent = logMessage;
    topLog.style.display = 'block';

    setTimeout(() => {
        topLog.style.display = 'none';
    }, 3000);
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim() || !password.value.trim()) {
        displayError('All fields are required');
        return;
    }
    if (userExists(email.value)) {
        displayError('User already exists');
    }
    else {
        const result = registerUser(firstName.value.trim(), lastName.value.trim(), email.value.toLowerCase(), password.value);
        if (result.error) {
            displayError(result.errorText);
        } else {
            displayLog('Registration successful');
            authenticateUser(email.value, password.value)
            regModal.style.display = 'none';
            overlay.classList.remove('active');
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            password.value = '';
        }
    }
});

function handleLoginFormSubmit(event) {
    event.preventDefault();
    const result = authenticateUser(loginEmail.value, loginPassword.value);
    if (result.success) {
        currentUser.visits+=1
        localStorage.setItem('users', JSON.stringify(existingUsers))
        displayLog('Authentication successful');
        overlay.classList.remove('active');
        logModal.style.display = 'none';
        loginEmail.value = '';
        loginPassword.value = '';
    } else {
        displayError(result.errorText);
    }
}

loginForm.addEventListener('submit', handleLoginFormSubmit);


function logoutUser() {
    if (currentUser) {
        currentUser.isAuth = false;
        sessionStorage.removeItem('userId');
        localStorage.setItem('users', JSON.stringify(existingUsers));
        const cardButtons = document.querySelectorAll('.card-button');        
        const profileIcon = document.querySelector('.nav-img');
        const navMenu = document.querySelector('.nav-menu');
        profileIcon.src = 'assets/icons/icon_profile.svg'; 
        profileIcon.title = 'Profile';
        navMenu.style.display = 'block'
        navMenu2.style.display = 'none'
        userName.value = '';
        cardNumber.value = '';
        cardButton.style.display = 'inline';
        libraryCard.style.display = 'none'
        getCard.style.display = 'block';
        getCardAuth.style.display = 'none'
        findCardTitle.textContent = 'Find your Library card';
        currentUser = null;
        cardButtons.forEach(button => {
            button.classList.remove('own');
            button.textContent = 'Buy'; 
            button.disabled = false; 
        });
        displayLog('Logout successful');
    }
}

libraryCardButton.addEventListener('submit', (e) => {
    e.preventDefault();
    if (userExistsName(userName.value.split(' ')[0],userName.value.split(' ')[1], cardNumber.value)){
        cardButton.style.display = 'none';
        libraryCard.style.display = 'flex'
        setTimeout(() => {
            userName.value = '';
            cardNumber.value = '';
            cardButton.style.display = 'inline';
            libraryCard.style.display = 'none'
        }, 10000);
    } 
});


logoutButton.addEventListener('click', logoutUser);



closeMyProfile.addEventListener('click', ()=>{
    overlay.classList.remove('active');
    myProfile.style.display = 'none';
})




copyButton.addEventListener('click', () => {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = cardNumberSpan.innerText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    
    copyButton.classList.add('active');
    
    setTimeout(() => {
        copyButton.classList.remove('active');
    }, 500);
});

profileButton.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        const cardId = sessionStorage.getItem("userId");
        let userInit = document.querySelector('.user-init')
        let userName = document.querySelector('.user-fullname')
        let userVisits = document.getElementById("my-profile-visits")
        let userBonuses = document.getElementById("my-profile-bonuses")
        let userBooks = document.getElementById("my-profile-books")
        const userIndex = existingUsers.findIndex((user) => (user.userId === cardId));
        if (userIndex !== -1) {
            currentUser = existingUsers[userIndex];
            userVisits.textContent = currentUser.visits
            userBonuses.textContent = currentUser.bonuses
            userBooks.textContent = currentUser.books
            userInit.textContent = (currentUser.firstname.charAt(0)+currentUser.lastname.charAt(0)).toUpperCase()
            userName.textContent = `${currentUser.firstname} ${currentUser.lastname}`
            const bookRentList = document.querySelector('.book-rent-list');
            bookRentList.innerHTML = '';
            currentUser.myBooks.forEach(book => {
                const newBookItem = document.createElement('li');
                newBookItem.textContent = `${book.title}, ${book.author}`;
                bookRentList.appendChild(newBookItem);
            });
        }
        cardNumberSpan.textContent = cardId
        overlay.classList.add('active');
        myProfile.style.display = 'flex';  
    })
})



ccnumber.addEventListener('input', formatCardCode);

function formatCardCode(event) {
    let cardCode = event.target.value.replace(/[^\d]/g, '').substring(0, 16);
    cardCode = cardCode !== '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    event.target.value = cardCode;
}


const requiredInputs = buyForm.querySelectorAll('[required]');

function checkInputs() {
  let allInputsFilled = true;
  requiredInputs.forEach(input => {
    if (input.value.trim() === '') {
      allInputsFilled = false;
    }
  });
  return allInputsFilled;
}

function handleInputChange() {
  if (checkInputs()) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'disabled');

  }
}

requiredInputs.forEach(input => {
  input.addEventListener('input', handleInputChange);
});

submitButton.setAttribute('disabled', 'disabled');


// const firstNameInput = document.getElementById('fname');
// const lastNameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');

// function checkFields() {
//     const firstName = firstNameInput.value.trim();
//     const lastName = lastNameInput.value.trim();
//     const email = emailInput.value.trim();
//     const password = passwordInput.value.trim();
    

//     if (firstName === '' || lastName === '' || email === '' || password === '') {
//         submitRegButton.setAttribute('disabled', 'disabled');
//     } else {
//         submitRegButton.removeAttribute('disabled');
//     }
// }



function lowercase(event) {
  const input = event.target;
  input.value = input.value.toLowerCase();
}
// firstNameInput.addEventListener('input', checkFields);
// lastNameInput.addEventListener('input', checkFields);
emailInput.addEventListener('input', lowercase);
// passwordInput.addEventListener('input', checkFields);


// submitRegButton.setAttribute('disabled', 'disabled');

