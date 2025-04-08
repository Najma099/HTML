const insert = document.querySelector('#insert');


document.addEventListener('keydown', (e) => {
    insert.innerHTML = `
        <div class="color">
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Key Code</th> 
                        <th>Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${e.key === ' ' ? 'Space' : e.key}</td>
                        <td>${e.keyCode || e.which}</td> 
                        <td>${e.code}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
});
