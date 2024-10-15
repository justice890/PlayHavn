// Initial game state
let bacteriaCount = 0;
let bacteriaPerClick = 1;
let autoGrowth = 0; // Automatically gained bacteria per second
let upgrade1Cost = 10; // Cost for faster replication
let upgrade2Cost = 100; // Cost for colonizing new environment
let upgrade3Cost = 50; // Cost for automated growth
let upgrade1Purchased = false;
let upgrade2Purchased = false;
let upgrade3Purchased = false; // For tracking if automated growth has been purchased

// DOM elements
const bacteriaCountElement = document.getElementById('bacteria-count');
const autoGrowthElement = document.getElementById('auto-growth');
const replicateBtn = document.getElementById('replicate-btn');

// Upgrade buttons for Environment 1
const buyUpgrade1Btn = document.getElementById('buy-upgrade-1-env1');
const buyUpgrade2Btn = document.getElementById('buy-upgrade-2-env1');
const buyUpgrade3Btn = document.getElementById('buy-upgrade-3-env1');

// Sound elements
const replicateSound = document.getElementById('replicate-sound');
const upgradeSound = document.getElementById('upgrade-sound');

// Function to update the bacteria count display
function updateBacteriaCount() {
    bacteriaCountElement.innerText = bacteriaCount;
}

// Function to update the automated growth display
function updateAutoGrowth() {
    autoGrowthElement.innerText = autoGrowth;
}

// Function for replicating bacteria when clicking the button
replicateBtn.addEventListener('click', () => {
    bacteriaCount += bacteriaPerClick;
    updateBacteriaCount();
    replicateSound.currentTime = 0; // Reset sound to start
    replicateSound.play(); // Play the replicate sound
});

// Generic function to buy an upgrade
function buyUpgrade(upgradeCost, upgradeElement, environment) {
    if (bacteriaCount >= upgradeCost) {
        bacteriaCount -= upgradeCost; // Deduct the cost from bacteria count
        updateBacteriaCount(); // Update display
        upgradeElement.style.display = 'none'; // Hide the upgrade option
        
        // Show new environment if purchased
        if (environment === 2) {
            document.getElementById('environment-2').style.display = 'block'; // Show Environment 2
        }

        upgradeSound.currentTime = 0; // Reset sound to start
        upgradeSound.play(); // Play the upgrade sound
    } else {
        alert("Not enough bacteria to purchase this upgrade!"); // Alert if not enough bacteria
    }
}

// Event listeners for upgrade buttons in Environment 1
buyUpgrade1Btn.addEventListener('click', () => {
    if (!upgrade1Purchased) {
        buyUpgrade(upgrade1Cost, buyUpgrade1Btn, null);
        bacteriaPerClick += 1; // Increase bacteria per click
        upgrade1Purchased = true;
        buyUpgrade1Btn.innerText = 'Purchased';
        buyUpgrade1Btn.disabled = true;
    }
});

buyUpgrade2Btn.addEventListener('click', () => {
    if (!upgrade2Purchased) {
        buyUpgrade(upgrade2Cost, buyUpgrade2Btn, 2); // Unlock Environment 2
        upgrade2Purchased = true;
        buyUpgrade2Btn.innerText = 'Purchased';
        buyUpgrade2Btn.disabled = true;
    }
});

buyUpgrade3Btn.addEventListener('click', () => {
    if (!upgrade3Purchased) {
        buyUpgrade(upgrade3Cost, buyUpgrade3Btn, null);
        autoGrowth += 1; // Increase automated growth rate
        upgrade3Purchased = true;
        buyUpgrade3Btn.innerText = 'Purchased';
        buyUpgrade3Btn.disabled = true;
        updateAutoGrowth(); // Update auto growth display
    }
});

// Automated bacteria growth
setInterval(() => {
    bacteriaCount += autoGrowth; // Increase bacteria count based on autoGrowth
    updateBacteriaCount();
}, 1000); // Update every second

// Event listeners for upgrade buttons in Environment 2
document.getElementById('buy-upgrade-1-env2').addEventListener('click', function() {
    buyUpgrade(10, document.getElementById('buy-upgrade-1-env2'), null);
});

document.getElementById('buy-upgrade-2-env2').addEventListener('click', function() {
    buyUpgrade(100, document.getElementById('buy-upgrade-2-env2'), null);
});

// Event listeners for upgrade buttons in Environment 2
document.getElementById('buy-upgrade-3-env2').addEventListener('click', function() {
    if (!upgrade3Purchased) {
        buyUpgrade(upgrade3Cost, document.getElementById('buy-upgrade-3-env2'), null);
        autoGrowth += 2; // Increase automated growth by 2
        upgrade3Purchased = true;
        document.getElementById('buy-upgrade-3-env2').innerText = 'Purchased';
        document.getElementById('buy-upgrade-3-env2').disabled = true;
        updateAutoGrowth(); // Update the auto growth display
    }
});


// Event listener for Enhanced Replication Speed in Environment 2
document.getElementById('buy-upgrade-4-env2').addEventListener('click', function() {
    const enhancedReplicationCost = 200; // Set the cost for this upgrade
    if (!upgrade4Purchased) {
        buyUpgrade(enhancedReplicationCost, document.getElementById('buy-upgrade-4-env2'), null);
        bacteriaPerClick += 3; // Increase bacteria per click by 3 (adjust as needed)
        upgrade4Purchased = true;
        document.getElementById('buy-upgrade-4-env2').innerText = 'Purchased';
        document.getElementById('buy-upgrade-4-env2').disabled = true;
    }
});


// Event listener for Genetic Modification in Environment 2
document.getElementById('buy-upgrade-5-env2').addEventListener('click', function() {
    const geneticModificationCost = 300; // Set the cost for this upgrade
    if (!upgrade5Purchased) {
        buyUpgrade(geneticModificationCost, document.getElementById('buy-upgrade-5-env2'), null);
        
        // Add mutation chance on each click (10% chance for 10x bacteria)
        replicateBtn.addEventListener('click', () => {
            const mutationChance = Math.random(); // Generate a random number between 0 and 1
            if (mutationChance < 0.1) { // 10% chance for mutation
                const mutationBonus = bacteriaPerClick * 10; // 10x the normal bacteria per click
                bacteriaCount += mutationBonus; // Add bonus bacteria
                updateBacteriaCount(); // Update the bacteria count display

                // Alert the player that a mutation occurred (optional)
                alert(`Mutation occurred! You gained an extra ${mutationBonus} bacteria!`);
            }
        });
        
        upgrade5Purchased = true;
        document.getElementById('buy-upgrade-5-env2').innerText = 'Purchased';
        document.getElementById('buy-upgrade-5-env2').disabled = true;
    }
});

// Map variables
const bacteriaMap = document.getElementById('bacteria-map');
const mapSize = 10; // Define the map size (10x10 grid)
let bacteriaCells = Array(mapSize).fill().map(() => Array(mapSize).fill(0)); // 2D array to track bacteria spread

// Function to render the bacteria map
function renderBacteriaMap() {
    bacteriaMap.innerHTML = ''; // Clear the current map
    for (let i = 0; i < mapSize; i++) {
        for (let j = 0; j < mapSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (bacteriaCells[i][j] > 0) {
                cell.classList.add('active'); // Add class if there's bacteria
            }
            bacteriaMap.appendChild(cell);
        }
    }
}

// Update the replicate button event listener to include map update
replicateBtn.addEventListener('click', () => {
    bacteriaCount += bacteriaPerClick;
    updateBacteriaCount();
    replicateSound.currentTime = 0; // Reset sound to start
    replicateSound.play(); // Play the replicate sound

    // Update bacteria spread on the map
    let spreadX = Math.floor(Math.random() * mapSize); // Random X position
    let spreadY = Math.floor(Math.random() * mapSize); // Random Y position
    bacteriaCells[spreadX][spreadY] += 1; // Increment bacteria count in that cell

    renderBacteriaMap(); // Render the updated map
});


