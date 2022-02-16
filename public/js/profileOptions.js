const profileCircle = document.querySelector('#profileCircle');
const profileOptions = document.querySelector('#profileOptions');

profileCircle.addEventListener('click', () => {
    if ([...profileOptions.classList].includes('hideDisplay')) {
        profileOptions.classList.remove('hideDisplay')
    } else {
        profileOptions.classList.add('hideDisplay')
    }
})

// document.addEventListener('click', () => {
//     if (![...profileOptions.classList].includes('hideDisplay')) {
//         profileOptions.classList.add('hideDisplay')
//     }
// })