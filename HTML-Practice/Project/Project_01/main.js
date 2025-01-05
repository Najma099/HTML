const button = document.querySelectorAll('.button');
const body = document.querySelector('body');

//console.log(button);
button.forEach( function (button) {
    console.log(button);
    button.addEventListener('click',function(e){
        body.style.backgroundColor = e.target.id;
    });
} 
);