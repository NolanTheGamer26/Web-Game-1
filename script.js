document.addEventListener('DOMContentLoaded', function() {
    const changeColorBtn = document.getElementById('changeColorBtn');
    const body = document.body;

    changeColorBtn.addEventListener('click', function() {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        body.style.backgroundColor = "#" + randomColor;
    });
});
