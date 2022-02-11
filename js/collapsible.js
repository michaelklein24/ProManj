const collapsible = document.getElementsByClassName("collapsible");

for(let i = 0; i<collapsible.length;i++) {
    collapsible[i].addEventListener('click', function(e) {
        console.log(collapsible[i].nextElementSibling)
        let target = collapsible[i].nextElementSibling
        if(!target.style.display) {
        target.style.display = 'block'
        } else if (target.style.display === 'block') {
            target.style.display = 'none'
        } else if (target.style.display === 'none' ) {
            target.style.display = 'block'
        }
    })
}
