const clock = document.querySelector('#clock');

function updateClock() {
    const currentTime = new Date().toLocaleTimeString(); 
    clock.innerHTML = currentTime; 
}
setInterval(updateClock, 1000);