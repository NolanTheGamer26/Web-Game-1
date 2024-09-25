console.log("Script loaded");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    const changeColorBtn = document.getElementById('changeColorBtn');
    const body = document.body;
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const applySettingsBtn = document.getElementById('applySettings');
    const closeSettingsBtn = document.getElementById('closeSettings');
    const headerColorInput = document.getElementById('headerColor');
    const buttonColorInput = document.getElementById('buttonColor');
    const resetColorsBtn = document.getElementById('resetColors');

    // Define original colors
    const originalHeaderColor = '#3498db';
    const originalButtonColor = '#2ecc71';
    const originalBackgroundColor = '#f0f0f0';

    // Existing background color change functionality
    changeColorBtn.addEventListener('click', function() {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        body.style.backgroundColor = "#" + randomColor;
    });

    // Open settings modal
    settingsBtn.addEventListener('click', function() {
        console.log("Settings button clicked");
        settingsModal.style.display = 'block';
    });

    console.log("Event listener attached to settings button");

    // Close settings modal
    closeSettingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    // Apply color changes
    applySettingsBtn.addEventListener('click', function() {
        const headerColor = headerColorInput.value;
        const buttonColor = buttonColorInput.value;

        document.querySelector('header').style.backgroundColor = headerColor;
        changeColorBtn.style.backgroundColor = buttonColor;
        settingsBtn.style.backgroundColor = buttonColor;

        settingsModal.style.display = 'none';
    });

    // Reset colors
    resetColorsBtn.addEventListener('click', function() {
        headerColorInput.value = originalHeaderColor;
        buttonColorInput.value = originalButtonColor;
        
        document.querySelector('header').style.backgroundColor = originalHeaderColor;
        changeColorBtn.style.backgroundColor = originalButtonColor;
        settingsBtn.style.backgroundColor = originalButtonColor;
        body.style.backgroundColor = originalBackgroundColor;

        console.log('Colors reset to original values, including background');
    });

    // Close modal if clicked outside
    window.addEventListener('click', function(event) {
        if (event.target == settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // Game logic
    const canvas = document.getElementById('gameCanvas');
    console.log("Canvas element:", canvas);

    const ctx = canvas.getContext('2d');
    console.log("Canvas context:", ctx);

    let player = {
        x: 50,
        y: canvas.height - 30,
        width: 20,
        height: 20,
        jumping: false,
        yVelocity: 0
    };

    let obstacles = [];
    let score = 0;
    let isGamePaused = false;
    let gameLoop;
    let lastObstacleTime = 0;
    const obstacleInterval = 2000; // Minimum time between obstacles in milliseconds
    const obstacleSpeed = 1; // Speed of obstacles

    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    function drawPlayer() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawObstacles() {
        ctx.fillStyle = 'red';
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    function drawScore() {
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }

    function togglePause() {
        isGamePaused = !isGamePaused;
        pauseBtn.textContent = isGamePaused ? 'Resume' : 'Pause';
        if (!isGamePaused) {
            gameLoop = requestAnimationFrame(updateGame);
        } else {
            cancelAnimationFrame(gameLoop);
        }
        console.log("Game paused:", isGamePaused);
    }

    function resetGame() {
        console.log("Resetting game");
        cancelAnimationFrame(gameLoop);
        score = 0;
        obstacles = [];
        player.x = 50;
        player.y = canvas.height - 30;
        player.jumping = false;
        player.yVelocity = 0;
        isGamePaused = false;
        pauseBtn.textContent = 'Pause';
        gameLoop = requestAnimationFrame(updateGame);
    }

    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetGame);

    function updateGame() {
        if (!isGamePaused) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Player jump logic
            if (player.jumping) {
                player.yVelocity += 0.05; // Further reduced gravity
                player.y += player.yVelocity;
                if (player.y > canvas.height - player.height) {
                    player.y = canvas.height - player.height;
                    player.jumping = false;
                }
            }

            // Move obstacles
            obstacles.forEach(obstacle => {
                obstacle.x -= obstacleSpeed;
            });

            // Remove off-screen obstacles
            obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

            // Add new obstacles
            const currentTime = Date.now();
            if (currentTime - lastObstacleTime > obstacleInterval) {
                obstacles.push({
                    x: canvas.width,
                    y: canvas.height - 20,
                    width: 20,
                    height: 20
                });
                lastObstacleTime = currentTime;
            }

            // Check for collisions
            obstacles.forEach(obstacle => {
                if (player.x < obstacle.x + obstacle.width &&
                    player.x + player.width > obstacle.x &&
                    player.y < obstacle.y + obstacle.height &&
                    player.y + player.height > obstacle.y) {
                    // Game over
                    alert('Game Over! Score: ' + score);
                    resetGame();
                    return;
                }
            });

            score++;

            drawPlayer();
            drawObstacles();
            drawScore();

            gameLoop = requestAnimationFrame(updateGame);
        }
    }

    // Start the game loop
    console.log("Starting game loop");
    gameLoop = requestAnimationFrame(updateGame);

    // Add jump event listener
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !player.jumping) {
            player.jumping = true;
            player.yVelocity = -15; // Super high initial jump velocity
        }
    });

    // Add this function at the end of your script
    function toggleModal() {
        var modal = document.getElementById('settingsModal');
        if (modal.style.display === 'none' || modal.style.display === '') {
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    }

    // Call this function from the browser console to test

    console.log("Settings button element:", settingsBtn);

    // Show video button functionality
    const showVideoBtn = document.getElementById('showVideoBtn');
    const videoContainer = document.getElementById('videoContainer');

    showVideoBtn.addEventListener('click', function() {
        videoContainer.style.display = 'block';
        showVideoBtn.style.display = 'none'; // Hide the button after showing the video
    });
});

