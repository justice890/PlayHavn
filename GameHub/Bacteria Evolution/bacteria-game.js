// Initial game state
let bacteriaCount = 0;
let bacteriaPerClick = 1;
let autoGrowth = 0; // Automatically gained bacteria per second
let currentEnvironment = 1; // Track current environment
const upgrades = {
    env1: {
        upgrade1Cost: 10,
        upgrade2Cost: 100,
        upgrade3Cost: 50,
        upgrade1Purchased: false,
        upgrade2Purchased: false,
        upgrade3Purchased: false,
    },
    env2: {
        upgrade1Cost: 20,
        upgrade2Cost: 150,
        upgrade3Cost: 75,
        upgrade1Purchased: false,
        upgrade2Purchased: false,
        upgrade3Purchased: false,
    }
};

// DOM elements
const bacteriaCountElement = document.getElementById('bacteria-count');
const autoGrowthElement = document.getElementById('auto-growth');
const replicateBtn = document.getElementById('replicate-btn');

// Upgrade buttons for Environment 1
const buyUpgrade1Btn = document.getElementById('buy-upgrade-1-env1');
const buyUpgrade2Btn = document.getElementById('buy-upgrade-2-env1');
const buyUpgrade3Btn = document.getElementById('buy-upgrade-3-env1');

// Upgrade buttons for Environment 2
const buyUpgrade1Env2Btn = document.getElementById('buy-upgrade-1-env2');
const buyUpgrade2Env2Btn = document.getElementById('buy-upgrade-2-env2');
const buyUpgrade3Env2Btn = document.getElementById('buy-upgrade-3-env2');

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

// Function to switch environments
function switchEnvironment(newEnvironment) {
    currentEnvironment = newEnvironment;
    updateUpgradeVisibility();
}

// Function to update upgrade visibility based on the current environment
function updateUpgradeVisibility() {
    if (currentEnvironment === 1) {
        document.getElementById('environment-1').style.display = 'block';
        document.getElementById('environment-2').style.display = 'none';
    } else {
        document.getElementById('environment-1').style.display = 'none';
        document.getElementById('environment-2').style.display = 'block';
    }
}

// Initialize the Leaflet map
const map = L.map('map').setView([20, 0], 2);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Initialize the heatmap layer
const heat = L.heatLayer([], { radius: 25, blur: 15 }).addTo(map);

// Array to hold heatmap data
let bacteriaHeatmapData = [];

// Function to update the heatmap with bacteria spread
function updateHeatmap() {
    heat.setLatLngs(bacteriaHeatmapData);
    heat.redraw();
}

// Function for replicating bacteria when clicking the button
replicateBtn.addEventListener('click', () => {
    bacteriaCount += bacteriaPerClick;
    updateBacteriaCount();
    replicateSound.currentTime = 0;
    replicateSound.play();

    // Update bacteria spread on the map
    const spreadLat = Math.random() * 180 - 90;
    const spreadLng = Math.random() * 360 - 180;

    bacteriaHeatmapData.push([spreadLat, spreadLng, Math.log(bacteriaPerClick + 1)]);
    updateHeatmap();
});

// Generic function to buy an upgrade
function buyUpgrade(upgradeCost, upgradeElement, environment) {
    if (bacteriaCount >= upgradeCost) {
        bacteriaCount -= upgradeCost;
        updateBacteriaCount();
        upgradeElement.style.display = 'none';
        
        // Handle environment upgrades
        if (environment === 1) {
            upgrades.env1.upgrade1Purchased = true; // Set purchase status
            bacteriaPerClick += 1; // Increase bacteria per click for Upgrade 1
        } else if (environment === 2) {
            upgrades.env2.upgrade1Purchased = true; // Set purchase status
            bacteriaCount += 5; // Bonus for Upgrade 1 in Environment 2
        }
        
        upgradeSound.currentTime = 0;
        upgradeSound.play();
    } else {
        alert("Not enough bacteria to purchase this upgrade!");
    }
}

// Event listeners for upgrade buttons in Environment 1
buyUpgrade1Btn.addEventListener('click', () => {
    if (!upgrades.env1.upgrade1Purchased) {
        buyUpgrade(upgrades.env1.upgrade1Cost, buyUpgrade1Btn, 1);
    }
});

buyUpgrade2Btn.addEventListener('click', () => {
    if (!upgrades.env1.upgrade2Purchased) {
        buyUpgrade(upgrades.env1.upgrade2Cost, buyUpgrade2Btn, 1);
        switchEnvironment(2); // Unlock Environment 2
    }
});

buyUpgrade3Btn.addEventListener('click', () => {
    if (!upgrades.env1.upgrade3Purchased) {
        buyUpgrade(upgrades.env1.upgrade3Cost, buyUpgrade3Btn, 1);
        autoGrowth += 1; // Increase automated growth rate
        updateAutoGrowth();
    }
});

// Event listeners for upgrade buttons in Environment 2
buyUpgrade1Env2Btn.addEventListener('click', () => {
    if (!upgrades.env2.upgrade1Purchased) {
        buyUpgrade(upgrades.env2.upgrade1Cost, buyUpgrade1Env2Btn, 2);
    }
});

buyUpgrade2Env2Btn.addEventListener('click', () => {
    if (!upgrades.env2.upgrade2Purchased) {
        buyUpgrade(upgrades.env2.upgrade2Cost, buyUpgrade2Env2Btn, 2);
    }
});

buyUpgrade3Env2Btn.addEventListener('click', () => {
    if (!upgrades.env2.upgrade3Purchased) {
        buyUpgrade(upgrades.env2.upgrade3Cost, buyUpgrade3Env2Btn, 2);
        // Additional effects can be added here for Upgrade 3
    }
});

// Automated bacteria growth
setInterval(() => {
    bacteriaCount += autoGrowth;
    updateBacteriaCount();
}, 1000); // Update every second

// Initialize the game
updateUpgradeVisibility();
