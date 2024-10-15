// Initial game state
let bacteriaCount = 0;
let bacteriaPerClick = 1;
let autoGrowth = 0; // Automatically gained bacteria per second
let upgrade1Cost = 10; // Cost for faster replication
let upgrade2Cost = 100; // Cost for colonizing new environment
let upgrade3Cost = 50; // Cost for automated growth
let upgrade4Cost = 200; // Cost for enhanced replication speed
let upgrade5Cost = 300; // Cost for genetic modification
let upgrade1Purchased = false;
let upgrade2Purchased = false;
let upgrade3Purchased = false;
let upgrade4Purchased = false;
let upgrade5Purchased = false;

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

// Initialize the Leaflet map
const map = L.map('map').setView([20, 0], 2); // Set the initial view of the map

// Add a tile layer to the map (you can choose a different tile if you prefer)
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
    heat.setLatLngs(bacteriaHeatmapData); // Update heatmap data
    heat.redraw(); // Redraw the heatmap
}

// Function for replicating bacteria when clicking the button
replicateBtn.addEventListener('click', () => {
    bacteriaCount += bacteriaPerClick;
    updateBacteriaCount();
    replicateSound.currentTime = 0; // Reset sound to start
    replicateSound.play(); // Play the replicate sound

    // Update bacteria spread on the map
    const spreadLat = Math.random() * 180 - 90; // Random latitude between -90 and 90
    const spreadLng = Math.random() * 360 - 180; // Random longitude between -180 and 180

    bacteriaHeatmapData.push([spreadLat, spreadLng, Math.log(bacteriaPerClick + 1)]); // Log scale for better visualization

    updateHeatmap(); // Update the heatmap display
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
    if (!upgrade4Purchased) {
        buyUpgrade(upgrade4Cost, document.getElementById('buy-upgrade-4-env2'), null);
        bacteriaPerClick += 3; // Increase bacteria per click by 3
        upgrade4Purchased = true;
        document.getElementById('buy-upgrade-4-env2').innerText = 'Purchased';
        document.getElementById('buy-upgrade-4-env2').disabled = true;
    }
});

// Event listener for Mutation Chance in Environment 2
document.getElementById('buy-upgrade-5-env2').addEventListener('click', function() {
    if (!upgrade5Purchased) {
        buyUpgrade(upgrade5Cost, document.getElementById('buy-upgrade-5-env2'), null);
        
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
