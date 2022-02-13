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

for (i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}