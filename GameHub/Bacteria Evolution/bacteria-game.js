// Initial game state
let bacteriaCount = 0;
let bacteriaPerClick = 1;
let autoGrowth = 0; // Automatically gained bacteria per second
let upgrade1Cost = 10;
let upgrade2Cost = 100;
let upgrade3Cost = 50; // Cost for automated growth
let upgrade1Purchased = false;
let upgrade2Purchased = false;
let upgrade3Purchased = false; // For tracking if automated growth has been purchased

// DOM elements
const bacteriaCountElement = document.getElementById('bacteria-count');
const autoGrowthElement = document.getElementById('auto-growth');
const replicateBtn = document.getElementById('replicate-btn');
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
        } else if (environment === 3) {
            document.getElementById('environment-3').style.display = 'block'; // Show Environment 3
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
document.getElementById('buy-upgrade-4-env2').addEventListener('click', function() {
    buyUpgrade(200, document.getElementById('upgrade-4-env2'), 3); // Update to correct environment
});

document.getElementById('buy-upgrade-5-env2').addEventListener('click', function() {
    buyUpgrade(300, document.getElementById('upgrade-5-env2'), 3); // Update to correct environment
});

