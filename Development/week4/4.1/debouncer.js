let debounceTimer;

function debouncer() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    getSum();
  }, 1000);
}
async function getSum() {
  const a = parseFloat(document.getElementById("firstNumber").value);
  const b = parseFloat(document.getElementById("secondNumber").value);
  
  //const sum = a + b;
  // document.getElementById("result").innerText = 
  //   isNaN(sum) ? "Please enter valid numbers" : `Sum: ${sum}`;
  // 
  
  // fetch(`https://sum-server.100xdevs.com/sum?a=${a}&b=${b}`)
  //    .then(response => response.text())
  //    .then(ans => {
  //      document.getElementById("result").innerText = 
  //        isNaN(ans) ? "Please enter valid numbers" : `Sum: ${ans}`;
  //    });

  const response = await fetch(`https://sum-server.100xdevs.com/sum?a=${a}&b=${b}`);
  const ans = await response.text();
  document.getElementById("result").innerText = isNaN(ans) ? 
    "Please enter valid numbers" : `Sum: ${ans}`;
}