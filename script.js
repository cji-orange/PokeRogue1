// Placeholder Pokémon Data
const pokemonData = {
    'pkm001': { name: 'Bulbasaur', types: ['Grass', 'Poison'], baseStats: { hp: 45, atk: 49, def: 49 }, moves: ['Tackle', 'Growl', 'Vine Whip'], sprite: 'assets/sprites/001.png' },
    'pkm004': { name: 'Charmander', types: ['Fire'], baseStats: { hp: 39, atk: 52, def: 43 }, moves: ['Scratch', 'Growl', 'Ember'], sprite: 'assets/sprites/004.png' },
    'pkm007': { name: 'Squirtle', types: ['Water'], baseStats: { hp: 44, atk: 48, def: 65 }, moves: ['Tackle', 'Tail Whip', 'Water Gun'], sprite: 'assets/sprites/007.png' },
    // Non-Starters added:
     'pkm010': { name: 'Caterpie', types: ['Bug'], baseStats: { hp: 45, atk: 30, def: 35 }, moves: ['Tackle', 'String Shot'], sprite: 'assets/sprites/010.png' },
     'pkm013': { name: 'Weedle', types: ['Bug', 'Poison'], baseStats: { hp: 40, atk: 35, def: 30 }, moves: ['Poison Sting', 'String Shot'], sprite: 'assets/sprites/013.png' },
     'pkm016': { name: 'Pidgey', types: ['Normal', 'Flying'], baseStats: { hp: 40, atk: 45, def: 40 }, moves: ['Tackle', 'Sand Attack', 'Gust'], sprite: 'assets/sprites/016.png' },
     'pkm019': { name: 'Rattata', types: ['Normal'], baseStats: { hp: 30, atk: 56, def: 35 }, moves: ['Tackle', 'Tail Whip', 'Quick Attack'], sprite: 'assets/sprites/019.png' },
     'pkm021': { name: 'Spearow', types: ['Normal', 'Flying'], baseStats: { hp: 40, atk: 60, def: 30 }, moves: ['Peck', 'Growl', 'Leer'], sprite: 'assets/sprites/021.png' },
     'pkm023': { name: 'Ekans', types: ['Poison'], baseStats: { hp: 35, atk: 60, def: 44 }, moves: ['Wrap', 'Leer', 'Poison Sting'], sprite: 'assets/sprites/023.png' },
     'pkm027': { name: 'Sandshrew', types: ['Ground'], baseStats: { hp: 50, atk: 75, def: 85 }, moves: ['Scratch', 'Sand Attack', 'Defense Curl'], sprite: 'assets/sprites/027.png' },
     'pkm029': { name: 'Nidoran♀', types: ['Poison'], baseStats: { hp: 55, atk: 47, def: 52 }, moves: ['Growl', 'Scratch', 'Poison Sting'], sprite: 'assets/sprites/029.png' },
     'pkm032': { name: 'Nidoran♂', types: ['Poison'], baseStats: { hp: 46, atk: 57, def: 40 }, moves: ['Leer', 'Peck', 'Poison Sting'], sprite: 'assets/sprites/032.png' },
     'pkm041': { name: 'Zubat', types: ['Poison', 'Flying'], baseStats: { hp: 40, atk: 45, def: 35 }, moves: ['Leech Life', 'Supersonic', 'Astonish'], sprite: 'assets/sprites/041.png' },
};

// Placeholder Item Data
const itemData = {
    'item001': { name: 'Potion', effect: 'heal', power: 20, description: 'Restores 20 HP.' },
    'item002': { name: 'Poké Ball', effect: 'catch', power: 1, description: 'Used to catch wild Pokémon.' },
    // Add more item data here...
};

// Placeholder Move Data (Could be expanded with power, accuracy, type, effect)
const moveData = {
    'Tackle': { power: 40, type: 'Normal' },
    'Growl': { effect: 'lower_atk', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'atk', stages: -1 }, // Added details for effect
    'Vine Whip': { power: 45, accuracy: 100, type: 'Grass' },
    'Scratch': { power: 40, accuracy: 100, type: 'Normal' },
    'Ember': { power: 40, accuracy: 100, type: 'Fire' },
    'Tail Whip': { effect: 'lower_def', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'def', stages: -1 }, // Added details
    'Water Gun': { power: 40, accuracy: 100, type: 'Water' },
    'Sand Attack': { effect: 'lower_acc', power: 0, accuracy: 100, type: 'Ground', target: 'opponent', stat: 'accuracy', stages: -1 }, // Added details (accuracy needs implementation)
    'Quick Attack': { power: 40, accuracy: 100, type: 'Normal', priority: 1 },
    'String Shot': { effect: 'lower_spe', power: 0, accuracy: 95, type: 'Bug', target: 'opponent', stat: 'speed', stages: -2 }, // Added details (speed needs implementation)
    'Poison Sting': { power: 15, accuracy: 100, type: 'Poison', effect: 'poison', chance: 0.3 }, // Added effect + chance (needs implementation)
    'Gust': { power: 40, accuracy: 100, type: 'Flying' },
    'Peck': { power: 35, accuracy: 100, type: 'Flying' },
    'Leer': { effect: 'lower_def', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'def', stages: -1 }, // Same as Tail Whip essentially
    'Wrap': { power: 15, accuracy: 90, type: 'Normal', effect: 'trap', duration: [4, 5] }, // Added effect + duration (needs implementation)
    'Defense Curl': { effect: 'raise_def', power: 0, accuracy: null, type: 'Normal', target: 'self', stat: 'def', stages: 1 }, // Added details (accuracy null means always hits self)
    'Leech Life': { power: 20, accuracy: 100, type: 'Bug', effect: 'drain', drainPercent: 0.5 }, // Added effect + drain % (needs implementation)
    'Supersonic': { effect: 'confuse', power: 0, accuracy: 55, type: 'Normal', target: 'opponent' }, // Added effect + accuracy (needs implementation)
    'Astonish': { power: 30, accuracy: 100, type: 'Ghost', effect: 'flinch', chance: 0.3 }, // Added effect + chance (needs implementation)
};

// Define Starter Pokémon IDs
const starterPokemonIds = ['pkm001', 'pkm004', 'pkm007'];

// Game State Variables
let gameState = {
    playerParty: [],
    inventory: [],
    currentMapNode: null,
    mapProgress: 0, // Example: number of encounters cleared
    activeBattle: null, // Holds details of the current battle
};


// DOM Element References (Additions)
const startScreen = document.getElementById('start-screen');
const mainGame = document.getElementById('main-game');
const gameOverScreen = document.getElementById('game-over-screen');
const starterOptionsContainer = document.getElementById('starter-options');
const loadGameButton = document.getElementById('load-game-button');
const partyDisplayContainer = document.getElementById('party-display'); // Assuming a container inside #party-display
const mapArea = document.getElementById('map-area');
const battleArea = document.getElementById('battle-area');
const inventoryDisplay = document.getElementById('inventory-display');
const itemsButton = document.getElementById('items-button');
const closeInventoryButton = document.getElementById('close-inventory-button');
const itemListContainer = document.getElementById('item-list');
const battleLog = document.getElementById('battle-log');
// ... add references for battle UI elements (sprites, names, HP bars, action buttons, etc.)
const opponentName = document.getElementById('opponent-name');
const opponentHpBar = document.getElementById('opponent-hp-bar');
const opponentHpValue = document.getElementById('opponent-hp-value');
const opponentSprite = document.getElementById('opponent-sprite');
const playerName = document.getElementById('player-name');
const playerHpBar = document.getElementById('player-hp-bar');
const playerHpValue = document.getElementById('player-hp-value');
const playerSprite = document.getElementById('player-sprite');
const actionButtonsContainer = document.getElementById('action-buttons'); // Container for move buttons etc.


// Type Chart Data (Effectiveness Multiplier)
// Stores how effective the attacking type (key) is against the defending type (value in nested object)
const typeChart = {
    Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
    Fire: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
    Water: { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
    Electric: { Water: 2, Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
    Grass: { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
    Ice: { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
    Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
    Poison: { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
    Ground: { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
    Flying: { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
    Psychic: { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
    Bug: { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
    Rock: { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
    Ghost: { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
    Dragon: { Dragon: 2, Steel: 0.5, Fairy: 0 },
    Dark: { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
    Steel: { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
    Fairy: { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 },
    // Add other types if needed
};

// Helper function to get type effectiveness multiplier
function getTypeEffectiveness(moveType, defenderTypes) {
    let multiplier = 1;
    if (!moveType || !defenderTypes || defenderTypes.length === 0) {
        return 1; // Return neutral if types are missing
    }

    const attackChart = typeChart[moveType];
    if (!attackChart) {
        return 1; // Unknown attack type, treat as neutral
    }

    defenderTypes.forEach(defType => {
        const effectiveness = attackChart[defType];
        if (effectiveness !== undefined) { // Check if an entry exists
            multiplier *= effectiveness;
        }
    });

    return multiplier;
}

// Helper function to calculate stats based on base stats and level
function calculateStats(baseStats, level) {
    return {
        maxHp: Math.floor(baseStats.hp * level / 50) + level + 10,
        atk: Math.floor(baseStats.atk * level / 50) + 5,
        def: Math.floor(baseStats.def * level / 50) + 5,
        // Add Speed, SpAtk, SpDef later if needed
    };
}

// Function to calculate EXP needed for the next level (example curve)
function calculateExpToNextLevel(level) {
    // Simple scaling example - adjust for desired progression speed
    return Math.floor(Math.pow(level, 3) * 0.8) + 20;
}

// Initialization
function init() {
    console.log("Game initializing...");
    // In a real game, load data from external source here
    // For now, data is hardcoded above

    // Check for saved game
    if (localStorage.getItem('pokerouge_save')) {
        loadGameButton.style.display = 'inline-block'; // Show load button
    }

    displayStarters();
    addEventListeners(); // Setup initial listeners
}

// Display Starter Pokémon Options
function displayStarters() {
    starterOptionsContainer.innerHTML = ''; // Clear existing options
    starterPokemonIds.forEach(id => {
        const pkm = pokemonData[id];
        if (pkm) {
            const starterDiv = document.createElement('div');
            starterDiv.classList.add('starter-choice'); // Add class for styling
            starterDiv.innerHTML = `
                <img src="${pkm.sprite}" alt="${pkm.name}" onerror="this.src='assets/sprites/placeholder.png';"> <!-- Add placeholder -->
                <p>${pkm.name}</p>
            `;
            starterDiv.addEventListener('click', () => startGame(id));
            starterOptionsContainer.appendChild(starterDiv);
        }
    });
}

// Function to create a unique instance of a Pokémon for the party
function createPokemonInstance(pokemonId, level = 5) {
    const baseData = pokemonData[pokemonId];
    if (!baseData) return null;

    const calculatedStats = calculateStats(baseData.baseStats, level);

    const instance = {
        id: pokemonId,
        name: baseData.name,
        level: level,
        types: [...baseData.types],
        moves: [...baseData.moves], // TODO: Implement learning moves on level up
        sprite: baseData.sprite,
        baseStats: baseData.baseStats, // Store base stats for recalculation
        stats: calculatedStats,
        currentHp: calculatedStats.maxHp, // Start with full HP
        status: null, // e.g., 'poisoned', 'paralyzed'
        exp: 0, // Start with 0 EXP towards next level
        expToNextLevel: calculateExpToNextLevel(level)
    };
    // instance.currentHp = instance.stats.maxHp; // Already set above
    return instance;
}


// Starting the Game
function startGame(starterPokemonId) {
    console.log(`Starting game with ${starterPokemonId}`);

    // Reset game state for a new game
    gameState = {
        playerParty: [],
        inventory: [ // Start with some basic items
             { ...itemData['item001'], quantity: 3 }, // 3 Potions
             { ...itemData['item002'], quantity: 5 }  // 5 Poké Balls
        ],
        currentMapNode: 'start', // Or generate initial map state
        mapProgress: 0,
        activeBattle: null,
    };

    // Add starter to party
    const starterInstance = createPokemonInstance(starterPokemonId, 5); // Start at level 5
    if (starterInstance) {
        gameState.playerParty.push(starterInstance);
    } else {
        console.error("Failed to create starter Pokémon instance!");
        return; // Don't start the game if starter creation fails
    }


    // Transition UI
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    mainGame.style.display = 'block';
    battleArea.style.display = 'none'; // Hide battle area initially
    mapArea.style.display = 'block'; // Show map area
    inventoryDisplay.style.display = 'none'; // Hide inventory

    console.log("Initial Game State:", gameState);

    renderMap(); // Render the initial map view
    updatePartyDisplay(); // Show the initial party
    // Potentially trigger the first node action automatically or wait for player input
     logMessage("Your adventure begins!");
}

// Log messages to the battle log area
function logMessage(message, className = null) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    if (className) {
        messageElement.classList.add(className); // Optional class for styling messages
    }
    battleLog.appendChild(messageElement);
    // Scroll to the bottom
    battleLog.scrollTop = battleLog.scrollHeight;
}

// UI Update Functions
function updatePartyDisplay() {
    partyDisplayContainer.innerHTML = '<h2>Your Party</h2>'; // Clear and add title
    gameState.playerParty.forEach((pkm, index) => {
        const pkmDiv = document.createElement('div');
        pkmDiv.classList.add('party-member');
        // Add EXP bar visualization (optional)
        const expPercentage = Math.min(100, (pkm.exp / pkm.expToNextLevel) * 100);
        pkmDiv.innerHTML = `
            <img src="${pkm.sprite}" alt="${pkm.name}" onerror="this.src='assets/sprites/placeholder.png';">
            <p>${pkm.name} (Lvl ${pkm.level})</p>
            <p>HP: ${pkm.currentHp} / ${pkm.stats.maxHp}</p>
            <div class="exp-bar-container">
                <div class="exp-bar" style="width: ${expPercentage}%"></div>
            </div>
            <small>EXP: ${pkm.exp} / ${pkm.expToNextLevel}</small>
            ${index === 0 ? '<p><small>(Active)</small></p>' : ''}
        `;
        // Add click listener to switch active Pokémon (outside battle)? - More complex logic
        partyDisplayContainer.appendChild(pkmDiv);
    });
     // Add indicator for max party size if needed
     partyDisplayContainer.innerHTML += `<p>Slots: ${gameState.playerParty.length} / 6</p>`;
}

function updateHpBar(element, currentHp, maxHp) {
    const percentage = Math.max(0, (currentHp / maxHp) * 100);
    element.style.width = `${percentage}%`;
    // Change color class based on percentage
    element.classList.remove('low', 'critical');
    if (percentage <= 20) {
        element.classList.add('critical'); // Add .critical class for red
    } else if (percentage <= 50) {
        element.classList.add('low'); // Add .low class for yellow
    }
    // Default green is applied if no class is added
}

// --- Map Progression (Basic Placeholder) ---
function renderMap() {
    mapArea.innerHTML = '<h2>Progression Map</h2>';
    // Simple linear progression for now
    const encounterNode = document.createElement('button');
    encounterNode.textContent = `Encounter ${gameState.mapProgress + 1} (Wild Pokémon)`;
    encounterNode.onclick = () => triggerEncounter();
    mapArea.appendChild(encounterNode);

    // Add save button
     const saveButton = document.createElement('button');
     saveButton.textContent = 'Save Game';
     saveButton.onclick = saveGame;
     mapArea.appendChild(saveButton);
}

// Placeholder for triggering encounters
function triggerEncounter() {
    console.log("Triggering encounter...");
    mapArea.style.display = 'none'; // Hide map during battle
    // Select a random wild Pokémon (example)
    const wildPokemonKeys = Object.keys(pokemonData).filter(id => !starterPokemonIds.includes(id)); // Exclude starters
     const randomKey = wildPokemonKeys[Math.floor(Math.random() * wildPokemonKeys.length)];
     // Determine level based on progress (simple example)
     const level = Math.max(1, 3 + Math.floor(gameState.mapProgress / 2));
     const opponentInstance = createPokemonInstance(randomKey, level);

     if (opponentInstance && gameState.playerParty.length > 0) {
        startBattle(opponentInstance);
     } else {
         console.error("Could not start battle. No opponent or player Pokémon.");
         mapArea.style.display = 'block'; // Show map again if battle fails
     }

}

// --- Battle System (Basic Structure) ---

// NEW function to show Fight / Items / Run
function showMainBattleActions() {
    actionButtonsContainer.innerHTML = ''; // Clear previous buttons

    const fightButton = document.createElement('button');
    fightButton.textContent = 'Fight';
    fightButton.onclick = () => {
        if (gameState.activeBattle) {
            showMoveSelection(gameState.activeBattle.playerPokemon);
        }
    };
    actionButtonsContainer.appendChild(fightButton);

    const itemsButton = document.createElement('button');
    itemsButton.textContent = 'Items';
    itemsButton.id = 'items-button'; // Keep ID for potential future use
    itemsButton.onclick = () => showInventory(true); // Pass flag indicating it's during battle
    actionButtonsContainer.appendChild(itemsButton);

    const runButton = document.createElement('button');
    runButton.textContent = 'Run';
    runButton.id = 'run-button'; // Keep ID for potential future use
    runButton.onclick = () => handlePlayerAction('run');
    actionButtonsContainer.appendChild(runButton);
}

// RENAMED from generateMoveButtons - shows only moves + back button
function showMoveSelection(pokemon) {
    actionButtonsContainer.innerHTML = ''; // Clear previous buttons (Fight/Items/Run)

    pokemon.moves.forEach(moveName => {
        const move = moveData[moveName]; // Get move details
        const button = document.createElement('button');
        button.textContent = `${moveName} (${move ? move.type : '???'})`;
        button.onclick = () => handlePlayerAction('move', moveName);
        actionButtonsContainer.appendChild(button);
    });

    // Add Back button
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.onclick = showMainBattleActions; // Go back to Fight/Items/Run
    actionButtonsContainer.appendChild(backButton);
}

function startBattle(opponentPokemon) {
    console.log(`Starting battle against ${opponentPokemon.name}`);
    battleLog.innerHTML = ''; // Clear previous battle logs
    logMessage(`A wild ${opponentPokemon.name} (Lvl ${opponentPokemon.level}) appeared!`);

    const playerPokemon = gameState.playerParty[0]; // Use the first Pokémon in the party
    if (!playerPokemon || playerPokemon.currentHp <= 0) {
        logMessage("Your leading Pokémon has fainted!");
        endBattle('loss');
        return;
    }

    gameState.activeBattle = {
        playerPokemon: playerPokemon,
        opponentPokemon: opponentPokemon,
        turn: 'player', // Assume player starts for now
        log: [],
        // Add stat stage tracking if implementing stat moves
        playerStatStages: { atk: 0, def: 0, speed: 0, accuracy: 0, evasion: 0 },
        opponentStatStages: { atk: 0, def: 0, speed: 0, accuracy: 0, evasion: 0 },
    };

    // Update Battle UI (Opponent)
    opponentName.textContent = `${opponentPokemon.name} Lvl ${opponentPokemon.level}`;
    updateHpBar(opponentHpBar, opponentPokemon.currentHp, opponentPokemon.stats.maxHp);
    opponentHpValue.textContent = `${opponentPokemon.currentHp} / ${opponentPokemon.stats.maxHp}`;
    opponentSprite.src = opponentPokemon.sprite;
    opponentSprite.onerror = () => { opponentSprite.src = 'assets/sprites/placeholder.png'; };

    // Update Battle UI (Player)
    playerName.textContent = `${playerPokemon.name} Lvl ${playerPokemon.level}`;
    updateHpBar(playerHpBar, playerPokemon.currentHp, playerPokemon.stats.maxHp);
    playerHpValue.textContent = `${playerPokemon.currentHp} / ${playerPokemon.stats.maxHp}`;
    playerSprite.src = playerPokemon.sprite;
    playerSprite.onerror = () => { playerSprite.src = 'assets/sprites/placeholder.png'; };

    // Show Battle Area, hide map
    battleArea.style.display = 'block';
    mapArea.style.display = 'none';
    inventoryDisplay.style.display = 'none'; // Ensure inventory is hidden

    // Initial turn message and action display
    logMessage(`Go, ${playerPokemon.name}!`);
    if (gameState.activeBattle.turn === 'player') {
        logMessage("What will you do?");
        showMainBattleActions(); // <<< CHANGED: Show main actions instead of moves directly
    } else {
        // Handle opponent starting first (requires speed/priority logic)
        // opponentTurn();
    }
}

// generateMoveButtons is removed / replaced by showMoveSelection

// --- Inventory System ---
function showInventory(isBattle = false) {
     inventoryDisplay.style.display = 'block';
     itemListContainer.innerHTML = ''; // Clear previous items

     if (gameState.inventory.length === 0) {
         itemListContainer.innerHTML = '<p>Inventory is empty.</p>';
     } else {
         gameState.inventory.forEach((item, index) => {
             const itemDiv = document.createElement('div');
             itemDiv.classList.add('item-card');
             itemDiv.innerHTML = `
                 <span>${item.name} (x${item.quantity})</span>
                 <small>${item.description}</small>
             `;
             if (item.effect === 'heal' && isBattle) { // Only allow using healing items in battle for now
                const useButton = document.createElement('button');
                useButton.textContent = 'Use';
                useButton.onclick = () => useItem(index, gameState.activeBattle?.playerPokemon); // Pass target
                itemDiv.appendChild(useButton);
             }
             // Add logic for other item types (e.g., Poké Balls)
             itemListContainer.appendChild(itemDiv);
         });
     }

     // Position close button inside if it wasn't already
     inventoryDisplay.appendChild(closeInventoryButton); // Ensure close button is visible
}


function hideInventory() {
    inventoryDisplay.style.display = 'none';
}

function useItem(itemIndex, targetPokemon) {
     const itemRef = gameState.inventory[itemIndex];
     if (!itemRef || itemRef.quantity <= 0) {
         logMessage("Cannot use item.");
         return;
     }

     let itemUsed = false;
     if (itemRef.effect === 'heal' && targetPokemon) {
         if (targetPokemon.currentHp === targetPokemon.stats.maxHp) {
             logMessage(`${targetPokemon.name}'s HP is already full!`);
         } else if (targetPokemon.currentHp <= 0) {
             logMessage(`${targetPokemon.name} has fainted and cannot be healed by this item!`);
              // Need Revive logic later
         } else {
             const healAmount = itemRef.power;
             const healedHp = Math.min(targetPokemon.stats.maxHp, targetPokemon.currentHp + healAmount);
             const actualHeal = healedHp - targetPokemon.currentHp;
             targetPokemon.currentHp = healedHp;
             logMessage(`${targetPokemon.name} restored ${actualHeal} HP!`);
             updateHpBar(playerHpBar, targetPokemon.currentHp, targetPokemon.stats.maxHp);
             playerHpValue.textContent = `${targetPokemon.currentHp} / ${targetPokemon.stats.maxHp}`;
             updatePartyDisplay(); // Update party display in case HP changed
             itemUsed = true;
         }
     }
     // Add logic for Poké Balls (check battle context, catch rate calc, etc.)
     // else if (itemRef.effect === 'catch' && gameState.activeBattle) { ... }

     if (itemUsed) {
         itemRef.quantity--;
         if (itemRef.quantity <= 0) {
             gameState.inventory.splice(itemIndex, 1); // Remove item if quantity is zero
         }
         hideInventory();
         // If used during battle, proceed to opponent's turn
         if (gameState.activeBattle) {
            gameState.activeBattle.turn = 'opponent';
            setTimeout(opponentTurn, 1000); // Delay opponent turn slightly
         }
     }
}


// --- Action Handling ---
function handlePlayerAction(actionType, value = null) {
    const battle = gameState.activeBattle;
    if (!battle || battle.turn !== 'player') {
        console.warn("Not player's turn or not in battle.");
        return;
    }

    hideInventory(); // Ensure inventory is hidden when selecting a main action
    actionButtonsContainer.innerHTML = '<p>...</p>'; // Disable buttons during action resolution

    let turnProceeds = true; // Assume turn proceeds unless an action that doesn't use the turn is selected (like viewing items but not using one)

    if (actionType === 'move') {
        playerAttack(value);
        // playerAttack now handles the check for battle end and opponent turn trigger
    } else if (actionType === 'item') {
        showInventory(true);
        turnProceeds = false; // Turn only proceeds IF an item is successfully USED via useItem()
    } else if (actionType === 'run') {
        attemptRun();
        // attemptRun handles battle end or triggering opponent turn if run fails
        turnProceeds = false; // Turn progression handled within attemptRun/endBattle
    }

    // Note: Turn progression to opponent is now handled within playerAttack, useItem, or attemptRun(fail case)
    // We clear the buttons here, and they get regenerated when it becomes the player's turn again via opponentTurn()
}


function playerAttack(moveName) {
    const battle = gameState.activeBattle;
    if (!battle) return;

    const attacker = battle.playerPokemon;
    const defender = battle.opponentPokemon;
    const move = moveData[moveName];

    logMessage(`${attacker.name} used ${moveName}!`);

    if (!move) {
        logMessage("Move data not found!");
        // Turn should still pass to opponent even if move fails
        battle.turn = 'opponent';
        setTimeout(opponentTurn, 1000);
        return;
    }

    // TODO: Add accuracy check here

    let damage = 0;
    let effectivenessMultiplier = 1;

    if (move.power > 0) {
        effectivenessMultiplier = getTypeEffectiveness(move.type, defender.types);
        // TODO: Incorporate stat stages into damage calculation
        damage = Math.max(1, Math.floor((move.power * (attacker.stats.atk / defender.stats.def) / 5) * effectivenessMultiplier));
        logMessage(`It dealt ${damage} damage.`);
        // ... (effectiveness logging) ...
         if (effectivenessMultiplier > 1) {
            logMessage("It's super effective!");
        } else if (effectivenessMultiplier < 1 && effectivenessMultiplier > 0) {
            logMessage("It's not very effective...");
        } else if (effectivenessMultiplier === 0) {
            logMessage(`It doesn't affect ${defender.name}...`);
        }
    } else if (move.effect) {
        logMessage(`It affected the opponent! (Effect logic not implemented)`);
        // TODO: Implement applyMoveEffect(move, attacker, defender, battle)
    } else {
        logMessage("But it failed! (No power or effect)");
    }

    defender.currentHp = Math.max(0, defender.currentHp - damage);
    updateHpBar(opponentHpBar, defender.currentHp, defender.stats.maxHp);
    opponentHpValue.textContent = `${defender.currentHp} / ${defender.stats.maxHp}`;

    if (defender.currentHp <= 0) {
        logMessage(`${defender.name} fainted!`);
        endBattle('win'); // endBattle handles resetting state and UI transitions
    } else {
        // Proceed to opponent's turn
        battle.turn = 'opponent';
        setTimeout(opponentTurn, 1000);
    }
}

function opponentTurn() {
    const battle = gameState.activeBattle;
    if (!battle || battle.turn !== 'opponent') return;

    actionButtonsContainer.innerHTML = '<p>Opponent is thinking...</p>'; // Show thinking message

    const attacker = battle.opponentPokemon;
    const defender = battle.playerPokemon;

    // Simple AI: Choose a random move
    const moveName = attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
    const move = moveData[moveName];

    logMessage(`Wild ${attacker.name} used ${moveName}!`);

    if (!move) {
        logMessage("Opponent move data not found!");
        // Skip turn if move is invalid, pass back to player
        battle.turn = 'player';
        logMessage("What will you do?");
        showMainBattleActions(); // <<< Regenerate player actions
        return;
    }

     // TODO: Add accuracy check here

    let damage = 0;
    let effectivenessMultiplier = 1;

    if (move.power > 0) {
        effectivenessMultiplier = getTypeEffectiveness(move.type, defender.types);
        // TODO: Incorporate stat stages into damage calculation
        damage = Math.max(1, Math.floor((move.power * (attacker.stats.atk / defender.stats.def) / 5) * effectivenessMultiplier));
        logMessage(`It dealt ${damage} damage.`);
         // ... (effectiveness logging) ...
        if (effectivenessMultiplier > 1) {
            logMessage("It's super effective!");
        } else if (effectivenessMultiplier < 1 && effectivenessMultiplier > 0) {
            logMessage("It's not very effective...");
        } else if (effectivenessMultiplier === 0) {
            logMessage(`It doesn't affect ${defender.name}...`);
        }
    } else if (move.effect) {
        logMessage(`It affected ${defender.name}! (Effect logic not implemented)`);
        // TODO: Implement applyMoveEffect(move, attacker, defender, battle)
    } else {
        logMessage("But it failed! (No power or effect)");
    }

    defender.currentHp = Math.max(0, defender.currentHp - damage);
    updateHpBar(playerHpBar, defender.currentHp, defender.stats.maxHp);
    playerHpValue.textContent = `${defender.currentHp} / ${defender.stats.maxHp}`;
    updatePartyDisplay(); // Update party display in case HP changed

    if (defender.currentHp <= 0) {
        logMessage(`${defender.name} fainted!`);
        // TODO: Check if player has other usable Pokémon
        logMessage("You have no more usable Pokémon!"); // Placeholder
        endBattle('loss'); // endBattle handles resetting state
    } else {
        // Proceed to player's turn
        battle.turn = 'player';
        logMessage("What will you do?");
        showMainBattleActions(); // <<< Regenerate player actions
    }
}

function attemptRun() {
    logMessage("You attempt to run...");
    // TODO: Implement actual run chance (e.g., based on speed)
    const success = true; // Assume success for now

    if (success) {
        logMessage("Got away safely!");
        endBattle('run');
    } else {
        logMessage("Couldn't get away!");
        // Proceed to opponent's turn if run fails
        gameState.activeBattle.turn = 'opponent';
        setTimeout(opponentTurn, 1000);
    }
}

function endBattle(outcome) {
    const battle = gameState.activeBattle;
    if (!battle) return;

    logMessage(`Battle ended. Outcome: ${outcome}`);
    const playerPokemon = battle.playerPokemon;
    const opponentPokemon = battle.opponentPokemon;

    if (outcome === 'win') {
        // Grant experience points
        // Simple EXP formula: base value (e.g., 50) * opponent level / player level (adjust formula as needed)
        // For now, simpler: opponentLevel * baseExpYield (e.g., 10)
        const baseExpYield = 15; // Base amount per level
        const expGained = Math.floor(opponentPokemon.level * baseExpYield);
        grantExp(playerPokemon, expGained); // Grant EXP to the active Pokémon
        // TODO: Distribute EXP among participants if implementing switching

        gameState.mapProgress++; // Advance map progress
        logMessage("You won the battle!");
        // TODO: Add chance to catch the defeated Pokémon
    } else if (outcome === 'loss') {
        // Game Over
        showGameOverScreen();
        gameState.activeBattle = null; // Clear battle state before showing game over
        return; // Don't proceed further
    } else if (outcome === 'run') {
        // Just end the battle, no rewards/progress
    }

    // Reset battle state
    gameState.activeBattle = null;
    // Short delay before showing map again to allow reading messages
    setTimeout(() => {
         if (outcome !== 'loss') { // Don't show map if game over screen is shown
            battleArea.style.display = 'none';
            mapArea.style.display = 'block'; // Show map again
            renderMap(); // Re-render map (e.g., to show next node)
            updatePartyDisplay(); // Update party display in case of faints/level ups
         }
    }, 1500); // 1.5 second delay

}


// --- Game Over ---
function showGameOverScreen() {
    mainGame.style.display = 'none';
    battleArea.style.display = 'none';
    gameOverScreen.style.display = 'block';
    document.getElementById('final-score').textContent = `Encounters Cleared: ${gameState.mapProgress}`;
}

function restartGame() {
    // Optionally clear saved game: localStorage.removeItem('pokerouge_save');
    gameOverScreen.style.display = 'none';
    startScreen.style.display = 'block';
    loadGameButton.style.display = 'none'; // Hide load button until next save
    init(); // Re-initialize the game setup
}


// --- Local Storage ---
function saveGame() {
    try {
        // Ensure EXP is saved correctly within the playerParty objects
         const stateToSave = {
             playerParty: gameState.playerParty,
             inventory: gameState.inventory,
             mapProgress: gameState.mapProgress,
         };
        localStorage.setItem('pokerouge_save', JSON.stringify(stateToSave));
        console.log("Game Saved!", stateToSave);
        logMessage("Game Saved!");
        loadGameButton.style.display = 'inline-block';
    } catch (error) {
        console.error("Failed to save game:", error);
        logMessage("Failed to save game.");
    }
}

function loadGame() {
    const savedStateJSON = localStorage.getItem('pokerouge_save');
    if (savedStateJSON) {
        try {
             const loadedState = JSON.parse(savedStateJSON);
             console.log("Loading game state:", loadedState);

             // Restore game state carefully
             // IMPORTANT: When loading, ensure the loaded pokemon objects have the necessary methods
             // or structure if you switch to using classes. For now, plain objects work.
             // Also, ensure baseStats are present if needed for future level ups.
             const loadedParty = loadedState.playerParty || [];
             loadedParty.forEach(pkm => { // Example: Ensure baseStats are present if missing from old save
                 if (!pkm.baseStats && pokemonData[pkm.id]) {
                     pkm.baseStats = pokemonData[pkm.id].baseStats;
                 }
             });

             gameState = {
                 ...gameState, // Keep non-saved parts like functions
                 playerParty: loadedParty,
                 inventory: loadedState.inventory || [],
                 mapProgress: loadedState.mapProgress || 0,
                 activeBattle: null, // Always start outside a battle when loading
             };

             // Transition UI
             startScreen.style.display = 'none';
             gameOverScreen.style.display = 'none';
             mainGame.style.display = 'block';
             battleArea.style.display = 'none';
             mapArea.style.display = 'block';
             inventoryDisplay.style.display = 'none';

             renderMap();
             updatePartyDisplay();
             logMessage("Game Loaded Successfully!");

        } catch (error) {
            console.error("Failed to load game:", error);
             logMessage("Failed to load saved game. Starting new game.");
             localStorage.removeItem('pokerouge_save');
             loadGameButton.style.display = 'none';
             // Stay on start screen to let user start anew
        }
    } else {
        console.log("No saved game found.");
        logMessage("No saved game found.");
    }
}


// Event Listeners Setup
function addEventListeners() {
    // Load game button (already handled in init checking localStorage)
    if (loadGameButton) {
         loadGameButton.addEventListener('click', loadGame);
    }

     // Restart button on Game Over screen
     const restartButton = document.getElementById('restart-button');
     if (restartButton) {
         restartButton.addEventListener('click', restartGame);
     }

     // Close inventory button
     if (closeInventoryButton) {
         closeInventoryButton.addEventListener('click', hideInventory);
     }

     // Note: Starter selection listeners are added in displayStarters()
     // Note: Move/Item/Run listeners are added in generateMoveButtons()
     // Note: Map node listeners are added in renderMap()
}


// --- Game Start ---
// Call init() when the script loads and the DOM is ready
document.addEventListener('DOMContentLoaded', init);

// --- EXP and Leveling --- 

function grantExp(pokemon, amount) {
    if (pokemon.level >= 100) return; // Max level cap

    logMessage(`${pokemon.name} gained ${amount} EXP!`);
    pokemon.exp += amount;
    checkForLevelUp(pokemon);
}

function checkForLevelUp(pokemon) {
    if (pokemon.level >= 100) return; // Already max level

    let leveledUp = false;
    while (pokemon.exp >= pokemon.expToNextLevel) {
        leveledUp = true;
        pokemon.level++;
        logMessage(`${pokemon.name} grew to Level ${pokemon.level}!`, 'level-up');

        // Carry over remaining exp
        const remainingExp = pokemon.exp - pokemon.expToNextLevel;
        pokemon.exp = remainingExp;
        pokemon.expToNextLevel = calculateExpToNextLevel(pokemon.level);

        // Recalculate stats
        const oldStats = pokemon.stats;
        pokemon.stats = calculateStats(pokemon.baseStats, pokemon.level);

        // Increase HP proportionally
        const hpIncrease = pokemon.stats.maxHp - oldStats.maxHp;
        pokemon.currentHp += hpIncrease;
        // Ensure current HP doesn't exceed new max HP, but don't heal fully unless specified
        pokemon.currentHp = Math.min(pokemon.currentHp, pokemon.stats.maxHp);

        logMessage(`Max HP +${hpIncrease}, Atk +${pokemon.stats.atk - oldStats.atk}, Def +${pokemon.stats.def - oldStats.def}`);

        // TODO: Check for new moves learned at this level

        if (pokemon.level >= 100) {
            pokemon.exp = 0; // Cap EXP at max level
            pokemon.expToNextLevel = 0;
            logMessage(`${pokemon.name} reached the maximum level!`);
            break; // Exit loop if max level reached
        }
    }

    // Update UI if a level up occurred
    if (leveledUp) {
        updatePartyDisplay();
        // If this pokemon is currently in battle, update its battle display
        if (gameState.activeBattle && pokemon === gameState.activeBattle.playerPokemon) {
             playerName.textContent = `${pokemon.name} Lvl ${pokemon.level}`;
             updateHpBar(playerHpBar, pokemon.currentHp, pokemon.stats.maxHp);
             playerHpValue.textContent = `${pokemon.currentHp} / ${pokemon.stats.maxHp}`;
        }
    }
} 