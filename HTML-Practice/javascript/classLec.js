<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Propagation</title>
</head>
<body>
    <div id="parent" style="background-color: rgb(160, 225, 225);">Parent Div
       <p id="child" style="background-color: rgb(149, 149, 229);">Child P
        <a href="https://www.google.com" target="_blank">Google</a>
       </p>
    </div>
</body>
<script>
    const child = document.querySelector('#child');
    child.addEventListener('click', function(e) {
        alert(`Child is clicked. Target: ${e.target.id}, This: ${this.id}`);
    }, true);

    const parent = document.querySelector('#parent');
    parent.addEventListener('click', function(e) {
        alert(`Parent is clicked. Target: ${e.target.id}, This: ${this.id}`);
        e.stopPropagation(); 
    }, true); 
</script>
</html>
