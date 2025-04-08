
let intervalid;
function change() {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
}
const changecolor = function () {
    if(!intervalid) {
        intervalid = setInterval(() => {
            document.body.style.backgroundColor = change();
       },1000)
    }
 }
 
document.querySelector('#start').addEventListener('click', changecolor)
document.querySelector('#stop').addEventListener('click', stopcolour);



function stopcolour() {
    clearInterval(intervalid);
    intervalid = null;
}