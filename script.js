// --- Supabase Setup ---
// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// For deployment (e.g., Vercel), use environment variables!
const SUPABASE_URL = 'https://rbsydvkhcbnjbjhtaqbs.supabase.co'; // Replace!
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJic3lkdmtoY2JuamJqaHRhcWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5ODIzMzMsImV4cCI6MjA2MDU1ODMzM30.nkpkT0MzbeOLfIdIxdCA1ijNL9v_DSoPL8oPga1yp7o'; // Replace!

let supabase = null;
try {
    // Ensure the createClient function is accessed correctly via the global Supabase object from the CDN
    if (window.supabase && SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
         supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
         console.log("Supabase client initialized.");
    } else if (!window.supabase) {
        console.error("Supabase client library not found. Ensure it's loaded via CDN.");
        supabase = null;
    } else {
        console.warn("Supabase URL and Key not provided in script.js. Auth and DB features will be disabled.");
        supabase = null;
    }
} catch (error) {
    console.error("Error initializing Supabase client:", error);
    supabase = null; // Ensure supabase is null if init fails
}

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

// Placeholder Move Data
const moveData = {
    'Tackle': { power: 40, type: 'Normal' },
    'Growl': { effect: 'lower_atk', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'atk', stages: -1 },
    'Vine Whip': { power: 45, accuracy: 100, type: 'Grass' },
    'Scratch': { power: 40, accuracy: 100, type: 'Normal' },
    'Ember': { power: 40, accuracy: 100, type: 'Fire' },
    'Tail Whip': { effect: 'lower_def', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'def', stages: -1 },
    'Water Gun': { power: 40, accuracy: 100, type: 'Water' },
    'Sand Attack': { effect: 'lower_acc', power: 0, accuracy: 100, type: 'Ground', target: 'opponent', stat: 'accuracy', stages: -1 },
    'Quick Attack': { power: 40, accuracy: 100, type: 'Normal', priority: 1 },
    'String Shot': { effect: 'lower_spe', power: 0, accuracy: 95, type: 'Bug', target: 'opponent', stat: 'speed', stages: -2 },
    'Poison Sting': { power: 15, accuracy: 100, type: 'Poison', effect: 'poison', chance: 0.3 },
    'Gust': { power: 40, accuracy: 100, type: 'Flying' },
    'Peck': { power: 35, accuracy: 100, type: 'Flying' },
    'Leer': { effect: 'lower_def', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'def', stages: -1 },
    'Wrap': { power: 15, accuracy: 90, type: 'Normal', effect: 'trap', duration: [4, 5] },
    'Defense Curl': { effect: 'raise_def', power: 0, accuracy: null, type: 'Normal', target: 'self', stat: 'def', stages: 1 },
    'Leech Life': { power: 20, accuracy: 100, type: 'Bug', effect: 'drain', drainPercent: 0.5 },
    'Supersonic': { effect: 'confuse', power: 0, accuracy: 55, type: 'Normal', target: 'opponent' },
    'Astonish': { power: 30, accuracy: 100, type: 'Ghost', effect: 'flinch', chance: 0.3 },
};

// Define Starter Pokémon IDs
const starterPokemonIds = ['pkm001', 'pkm004', 'pkm007'];

// Type Chart Data
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
};

// --- Game State Variables ---
let gameState = {
    currentUser: null, // Add field to track logged-in user
    playerParty: [],
    inventory: [],
    currentMapNode: null,
    mapProgress: 0,
    activeBattle: null,
};

// --- DOM Element References ---
// Game Screens
const startScreen = document.getElementById('start-screen');
const mainGame = document.getElementById('main-game');
const gameOverScreen = document.getElementById('game-over-screen');
// Key Areas
const starterOptionsContainer = document.getElementById('starter-options');
const partyDisplayContainer = document.getElementById('party-display');
const mapArea = document.getElementById('map-area');
const battleArea = document.getElementById('battle-area');
const inventoryDisplay = document.getElementById('inventory-display');
const mapNodesContainer = document.getElementById('map-nodes'); // Reference for map nodes
// Battle UI
const opponentName = document.getElementById('opponent-name');
const opponentHpBar = document.getElementById('opponent-hp-bar');
const opponentHpValue = document.getElementById('opponent-hp-value');
const opponentSprite = document.getElementById('opponent-sprite');
const playerName = document.getElementById('player-name');
const playerHpBar = document.getElementById('player-hp-bar');
const playerHpValue = document.getElementById('player-hp-value');
const playerSprite = document.getElementById('player-sprite');
const actionButtonsContainer = document.getElementById('action-buttons');
const battleLog = document.getElementById('battle-log');
// Inventory UI
const itemListContainer = document.getElementById('item-list');
const closeInventoryButton = document.getElementById('close-inventory-button');
// Buttons (Original)
const loadGameButton = document.getElementById('load-game-button'); // Kept for potential re-use if needed
const saveGameButtonMap = document.getElementById('save-game-button-map');
const restartButton = document.getElementById('restart-button');
// Auth Elements (References kept for future use, but logic removed for now)
const authScreen = document.getElementById('auth-screen');
const authEmailInput = document.getElementById('auth-email');
const authPasswordInput = document.getElementById('auth-password');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const authError = document.getElementById('auth-error');
const userDisplayStart = document.getElementById('user-display-start');
const userDisplayMap = document.getElementById('user-display-map');
const userDisplayGameover = document.getElementById('user-display-gameover');
const logoutButtonMap = document.getElementById('logout-button');
const logoutButtonGameover = document.getElementById('logout-button-gameover');

// --- Initialization & Auth State Handling ---
function init() {
    console.log("Game initializing...");
    addEventListeners(); // Setup listeners including auth buttons

    if (!supabase) {
        console.warn("Supabase not initialized. Proceeding without auth/DB features.");
        // Show standard start screen, hide auth screen
        if(authScreen) authScreen.style.display = 'none';
        if(startScreen) startScreen.style.display = 'block';
        if(mainGame) mainGame.style.display = 'none';
        if(gameOverScreen) gameOverScreen.style.display = 'none';
        // Disable auth-related buttons
        if(loginButton) loginButton.disabled = true;
        if(registerButton) registerButton.disabled = true;
        if(logoutButtonMap) logoutButtonMap.disabled = true;
        if(logoutButtonGameover) logoutButtonGameover.disabled = true;
        // Setup non-auth save/load
        if (localStorage.getItem('pokerouge_save')) {
            if(loadGameButton) loadGameButton.style.display = 'inline-block';
        } else {
             if(loadGameButton) loadGameButton.style.display = 'none';
        }
        displayStarters();
        // Note: addEventListeners() already called
        return; // Exit init early
    }

    // --- If Supabase IS initialized, setup auth listeners and check session --- 
    console.log("Supabase initialized, setting up auth listeners...");

    // Listen for auth changes (login, logout, initial session)
    supabase.auth.onAuthStateChange((event, session) => {
        console.log("Auth state change event:", event, session);
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            if (session && session.user) {
                handleUserLoggedIn(session.user);
            } else {
                // This case might happen if INITIAL_SESSION returns null
                 handleUserLoggedOut();
            }
        } else if (event === 'SIGNED_OUT') {
            handleUserLoggedOut();
        }
        // Add handling for PASSWORD_RECOVERY, USER_UPDATED if needed later
    });

    // Check initial session state *after* the listener is set up.
    // onAuthStateChange will fire with INITIAL_SESSION, so we might not need a separate call here,
    // but calling it ensures we handle the initial state promptly if the listener setup is delayed.
    checkUserSession(); 

    // Initial UI state before session check completes (show auth screen)
    showAuthScreen(true);
    if(startScreen) startScreen.style.display = 'none';
    if(mainGame) mainGame.style.display = 'none';
    if(gameOverScreen) gameOverScreen.style.display = 'none';
}

async function checkUserSession() {
    // This function primarily serves to trigger the INITIAL_SESSION event
    // in onAuthStateChange by checking the current session state.
    if (!supabase) return;
    try {
        console.log("Explicitly checking session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        console.log("getSession result:", session);
        // If no session, onAuthStateChange should have already handled SIGNED_OUT
        // or will handle INITIAL_SESSION with null.
        // If session exists, onAuthStateChange handles SIGNED_IN or INITIAL_SESSION.
    } catch (error) {
        console.error("Error during explicit session check:", error.message);
        // Ensure logged out state if check fails catastrophically
        handleUserLoggedOut();
        if(authError) {
            authError.textContent = `Session check error: ${error.message}`;
            authError.style.display = 'block';
        }
    }
}

function handleUserLoggedIn(user) {
    console.log("Handling user logged in:", user.email);
    gameState.currentUser = user;
    updateUserDisplay(user.email);
    showAuthScreen(false); // Hide auth screen

    // --- Attempt to load game state from DB --- 
    loadGameFromDatabase().then(loadedState => {
        if (loadedState) {
            console.log("Loaded game state found, resuming game.");
            resumeGame(loadedState); // Restore state and show main game
        } else {
            console.log("No saved game state found, showing starter selection.");
            showStarterSelectionScreen(); // Show starter selection for new game
        }
    }).catch(error => {
        console.error("Error during game load attempt:", error);
        alert(`Error loading game data: ${error.message}`);
        // Fallback to starter selection if loading fails
        showStarterSelectionScreen();
    });

    // Ensure other screens are hidden initially while loading
    if(startScreen) startScreen.style.display = 'none';
    if(mainGame) mainGame.style.display = 'none';
    if(gameOverScreen) gameOverScreen.style.display = 'none';

    // Clear auth error messages on successful login
    if(authError) {
        authError.textContent = '';
        authError.style.display = 'none';
    }
}

function handleUserLoggedOut() {
    console.log("Handling user logged out.");
    // Only reset if there was actually a user before
    if (gameState.currentUser) {
        gameState.currentUser = null;
        // Reset game state completely on logout
        gameState = {
            ...gameState, // Keep non-user specific stuff if any in future
            currentUser: null,
            playerParty: [],
            inventory: [],
            currentMapNode: null,
            mapProgress: 0,
            activeBattle: null,
        };
    }
    // Update UI
    updateUserDisplay(null);
    showAuthScreen(true); // Show auth screen
    if(startScreen) startScreen.style.display = 'none';
    if(mainGame) mainGame.style.display = 'none';
    if(gameOverScreen) gameOverScreen.style.display = 'none';
    // Clear auth form inputs
    if(authEmailInput) authEmailInput.value = '';
    if(authPasswordInput) authPasswordInput.value = '';
}

function updateUserDisplay(email) {
    const loggedIn = !!email;
    const userDisplays = [
        { display: userDisplayStart, emailEl: document.getElementById('user-email-start') },
        { display: userDisplayMap, emailEl: document.getElementById('user-email-map') },
        { display: userDisplayGameover, emailEl: document.getElementById('user-email-gameover') },
    ];
    userDisplays.forEach(ud => {
        if (ud.display) {
            ud.display.style.display = loggedIn ? 'block' : 'none'; // Or 'flex', 'inline-block' depending on style
            if (loggedIn && ud.emailEl) {
                ud.emailEl.textContent = email;
            }
        }
    });
}

function showAuthScreen(show = true) {
    if(authScreen) authScreen.style.display = show ? 'block' : 'none';
    if(!show && authError) {
         authError.textContent = '';
         authError.style.display = 'none'; // Hide error when hiding screen
    }
}

function showStarterSelectionScreen() {
    if(startScreen) startScreen.style.display = 'block';
    displayStarters(); // Populate starter options
}

// --- Helper Functions ---
function calculateStats(baseStats, level) {
    return {
        maxHp: Math.floor(baseStats.hp * level / 50) + level + 10,
        atk: Math.floor(baseStats.atk * level / 50) + 5,
        def: Math.floor(baseStats.def * level / 50) + 5,
        // Add Speed, SpAtk, SpDef later if needed
    };
}

function calculateExpToNextLevel(level) {
    // Simple scaling example - adjust for desired progression speed
    return Math.floor(Math.pow(level, 3) * 0.8) + 20;
}

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

// --- Core Game Logic Functions ---
function displayStarters() {
    if (!starterOptionsContainer) return;
    starterOptionsContainer.innerHTML = ''; // Clear existing options
    starterPokemonIds.forEach(id => {
        const pkm = pokemonData[id];
        if (pkm) {
            const starterDiv = document.createElement('div');
            starterDiv.classList.add('starter-choice');
            starterDiv.innerHTML = `
                // <img src="${pkm.sprite}" alt="${pkm.name}" onerror="this.src='assets/sprites/placeholder.png';">
                <p>${pkm.name}</p>
            `;
            starterDiv.addEventListener('click', () => startNewRun(id));
            starterOptionsContainer.appendChild(starterDiv);
        }
    });
}

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

function startNewRun(starterPokemonId) {
    console.log(`Starting new run with ${starterPokemonId}`);
    if (!gameState.currentUser) {
        console.error("Cannot start run: No user logged in.");
        handleUserLoggedOut(); // Go back to auth screen
        return;
    }

    // Initialize state for a fresh run
    gameState.playerParty = [];
    gameState.inventory = [
         { ...itemData['item001'], quantity: 3 },
         { ...itemData['item002'], quantity: 5 }
    ];
    gameState.currentMapNode = 'start';
    gameState.mapProgress = 0;
    gameState.activeBattle = null;

    const starterInstance = createPokemonInstance(starterPokemonId, 5);
    if (starterInstance) {
        gameState.playerParty.push(starterInstance);
    } else {
        console.error('Failed to create starter Pokémon instance!');
        return;
    }

    // Transition UI from starter selection to main game/map
    if(startScreen) startScreen.style.display = 'none';
    if(gameOverScreen) gameOverScreen.style.display = 'none';
    if(mainGame) mainGame.style.display = 'block';
    if(battleArea) battleArea.style.display = 'none';
    if(mapArea) mapArea.style.display = 'block';
    if(inventoryDisplay) inventoryDisplay.style.display = 'none';

    console.log("New run started:", gameState);

    renderMap();
    updatePartyDisplay();
    logMessage(`New run started for ${gameState.currentUser.email}!`);
    
    // --- Auto-save after starting new run? --- 
    // Consider saving the initial state immediately
    saveGameToDatabase().then(() => {
         console.log("Initial run state saved.")
    }).catch(err => {
         console.error("Failed to save initial run state:", err);
    });
}

function logMessage(message, className = null) {
    if (!battleLog) return;
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    if (className) {
        messageElement.classList.add(className);
    }
    battleLog.appendChild(messageElement);
    battleLog.scrollTop = battleLog.scrollHeight;
}

function updatePartyDisplay() {
    if (!partyDisplayContainer) return;
    partyDisplayContainer.innerHTML = '<h2>Your Party</h2>';
    gameState.playerParty.forEach((pkm, index) => {
        const pkmDiv = document.createElement('div');
        pkmDiv.classList.add('party-member');
        const expPercentage = pkm.expToNextLevel > 0 ? Math.min(100, (pkm.exp / pkm.expToNextLevel) * 100) : 0;
        pkmDiv.innerHTML = `
            // <img src="${pkm.sprite}" alt="${pkm.name}" onerror="this.src='assets/sprites/placeholder.png';">
            <p>${pkm.name} (Lvl ${pkm.level})</p>
            <p>HP: ${pkm.currentHp} / ${pkm.stats.maxHp}</p>
            <div class="exp-bar-container">
                <div class="exp-bar" style="width: ${expPercentage}%"></div>
            </div>
            <small>EXP: ${pkm.exp} / ${pkm.expToNextLevel}</small>
            ${index === 0 ? '<p><small>(Active)</small></p>' : ''}
        `;
        partyDisplayContainer.appendChild(pkmDiv);
    });
     partyDisplayContainer.innerHTML += `<p>Slots: ${gameState.playerParty.length} / 6</p>`;
}

function updateHpBar(element, currentHp, maxHp) {
    if (!element) return;
    const percentage = Math.max(0, (currentHp / maxHp) * 100);
    element.style.width = `${percentage}%`;
    element.classList.remove('low', 'critical');
    if (percentage <= 20) {
        element.classList.add('critical');
    } else if (percentage <= 50) {
        element.classList.add('low');
    }
}

// --- Map Progression ---
function renderMap() {
    if (!mapNodesContainer || !saveGameButtonMap) return;
    mapNodesContainer.innerHTML = ''; // Clear previous nodes

    const encounterNode = document.createElement('button');
    encounterNode.textContent = `Encounter ${gameState.mapProgress + 1} (Wild Pokémon)`;
    encounterNode.onclick = () => triggerEncounter();
    mapNodesContainer.appendChild(encounterNode);

    // Enable save button (using localStorage)
    saveGameButtonMap.disabled = false;
    saveGameButtonMap.textContent = 'Save Game';
    saveGameButtonMap.onclick = saveGame; // Attach localStorage save function
}

function triggerEncounter() {
    console.log("Triggering encounter...");
    if(mapArea) mapArea.style.display = 'none'; // Hide map during battle
    const wildPokemonKeys = Object.keys(pokemonData).filter(id => !starterPokemonIds.includes(id));
     const randomKey = wildPokemonKeys[Math.floor(Math.random() * wildPokemonKeys.length)];
     const level = Math.max(1, 3 + Math.floor(gameState.mapProgress / 2));
     const opponentInstance = createPokemonInstance(randomKey, level);

     if (opponentInstance && gameState.playerParty.length > 0) {
        startBattle(opponentInstance);
     } else {
         console.error("Could not start battle. No opponent or player Pokémon.");
         if(mapArea) mapArea.style.display = 'block'; // Show map again if battle fails
     }
}

// --- Battle System ---
function showMainBattleActions() {
    if (!actionButtonsContainer) return;
    actionButtonsContainer.innerHTML = '';
    const fightButton = document.createElement('button');
    fightButton.textContent = 'Fight';
    fightButton.onclick = () => { if (gameState.activeBattle) showMoveSelection(gameState.activeBattle.playerPokemon); };
    actionButtonsContainer.appendChild(fightButton);
    const itemsButton = document.createElement('button');
    itemsButton.textContent = 'Items';
    itemsButton.id = 'items-button';
    itemsButton.onclick = () => showInventory(true);
    actionButtonsContainer.appendChild(itemsButton);
    const runButton = document.createElement('button');
    runButton.textContent = 'Run';
    runButton.id = 'run-button';
    runButton.onclick = () => handlePlayerAction('run');
    actionButtonsContainer.appendChild(runButton);
}

function showMoveSelection(pokemon) {
    if (!actionButtonsContainer || !pokemon) return;
    actionButtonsContainer.innerHTML = '';
    pokemon.moves.forEach(moveName => {
        const move = moveData[moveName];
        const button = document.createElement('button');
        button.textContent = `${moveName} (${move ? move.type : '???'})`;
        button.onclick = () => handlePlayerAction('move', moveName);
        actionButtonsContainer.appendChild(button);
    });
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.onclick = showMainBattleActions;
    actionButtonsContainer.appendChild(backButton);
}

function startBattle(opponentPokemon) {
    console.log(`Starting battle against ${opponentPokemon.name}`);
    if(battleLog) battleLog.innerHTML = '';
    logMessage(`A wild ${opponentPokemon.name} (Lvl ${opponentPokemon.level}) appeared!`);

    const playerPokemon = gameState.playerParty[0];
    if (!playerPokemon || playerPokemon.currentHp <= 0) {
        logMessage("Your leading Pokémon has fainted!");
        endBattle('loss');
        return;
    }

    gameState.activeBattle = {
        playerPokemon: playerPokemon,
        opponentPokemon: opponentPokemon,
        turn: 'player',
        log: [],
        playerStatStages: { atk: 0, def: 0, speed: 0, accuracy: 0, evasion: 0 },
        opponentStatStages: { atk: 0, def: 0, speed: 0, accuracy: 0, evasion: 0 },
    };

    // Update Battle UI (Opponent)
    if(opponentName) opponentName.textContent = `${opponentPokemon.name} Lvl ${opponentPokemon.level}`;
    updateHpBar(opponentHpBar, opponentPokemon.currentHp, opponentPokemon.stats.maxHp);
    if(opponentHpValue) opponentHpValue.textContent = `${opponentPokemon.currentHp} / ${opponentPokemon.stats.maxHp}`;
    if(opponentSprite) {
        // opponentSprite.src = opponentPokemon.sprite;
        // opponentSprite.onerror = () => { opponentSprite.src = 'assets/sprites/placeholder.png'; };
    }

    // Update Battle UI (Player)
    if(playerName) playerName.textContent = `${playerPokemon.name} Lvl ${playerPokemon.level}`;
    updateHpBar(playerHpBar, playerPokemon.currentHp, playerPokemon.stats.maxHp);
    if(playerHpValue) playerHpValue.textContent = `${playerPokemon.currentHp} / ${playerPokemon.stats.maxHp}`;
    if(playerSprite) {
        // playerSprite.src = playerPokemon.sprite;
        // playerSprite.onerror = () => { playerSprite.src = 'assets/sprites/placeholder.png'; };
    }

    if(battleArea) battleArea.style.display = 'block';
    if(mapArea) mapArea.style.display = 'none';
    if(inventoryDisplay) inventoryDisplay.style.display = 'none';

    logMessage(`Go, ${playerPokemon.name}!`);
    if (gameState.activeBattle.turn === 'player') {
        logMessage("What will you do?");
        showMainBattleActions();
    }
}

function showInventory(isBattle = false) {
    // Implementation of showInventory function
}

function hideInventory() {
    if(inventoryDisplay) inventoryDisplay.style.display = 'none';
}

function useItem(itemIndex, targetPokemon) {
    // Implementation of useItem function
}

function handlePlayerAction(actionType, value = null) {
    const battle = gameState.activeBattle;
    if (!battle || battle.turn !== 'player') return;
    hideInventory();
    if (actionButtonsContainer) actionButtonsContainer.innerHTML = '<p>...</p>';
    if (actionType === 'move') { playerAttack(value); }
    else if (actionType === 'item') { showInventory(true); /* Turn proceeds via useItem */ }
    else if (actionType === 'run') { attemptRun(); /* Turn proceeds via attemptRun */ }
}

function playerAttack(moveName) {
    // Implementation of playerAttack function
}

function opponentTurn() {
    // Implementation of opponentTurn function
}

function attemptRun() {
    // Implementation of attemptRun function
}

function endBattle(outcome) {
    // Implementation of endBattle function
}

// --- EXP and Leveling ---
function grantExp(pokemon, amount) {
    // Implementation of grantExp function
}

function checkForLevelUp(pokemon) {
    // Implementation of checkForLevelUp function
}

// --- Game Over ---
function showGameOverScreen() {
    if(mainGame) mainGame.style.display = 'none';
    if(battleArea) battleArea.style.display = 'none';
    if(gameOverScreen) gameOverScreen.style.display = 'block';
    const finalScoreElement = document.getElementById('final-score');
    if(finalScoreElement) finalScoreElement.textContent = `Encounters Cleared: ${gameState.mapProgress}`;
}

function restartGame() {
    // Restart logic now reverts to Start Screen (not auth)
    if(gameOverScreen) gameOverScreen.style.display = 'none';
    if(mainGame) mainGame.style.display = 'none';
    if(startScreen) startScreen.style.display = 'block';
    if(loadGameButton) loadGameButton.style.display = localStorage.getItem('pokerouge_save') ? 'inline-block' : 'none';
    displayStarters(); // Refresh starter options
}

// --- Save/Load (using Supabase DB) ---
async function saveGameToDatabase() {
    if (!supabase || !gameState.currentUser) {
        logMessage("Cannot save: Not logged in or Supabase unavailable.");
        console.error("Save condition not met.");
        return; // Exit if no user or supabase client
    }

    // Disable button temporarily
    if (saveGameButtonMap) saveGameButtonMap.disabled = true;
    logMessage("Saving game...");

    try {
        // Prepare the data to save - only save relevant persistent state
        const stateToSave = {
             playerParty: gameState.playerParty,
             inventory: gameState.inventory,
             mapProgress: gameState.mapProgress,
             // Add other persistent fields as needed
         };

        // Upsert into the 'profiles' table
        const { error } = await supabase
            .from('profiles')
            .upsert({ 
                id: gameState.currentUser.id, // The user's UUID
                game_state: stateToSave,      // The JSONB data
                updated_at: new Date()        // Update timestamp
            }, {
                onConflict: 'id' // Specify the conflict column for upsert
            });

        if (error) {
            // Handle potential DB errors (e.g., RLS policy violation)
            console.error("Supabase save error:", error);
            throw new Error(error.message || "Database save failed.");
        }

        console.log("Game Saved to DB!");
        logMessage("Game Saved!");

    } catch (error) {
        console.error("Failed to save game to DB:", error);
        logMessage(`Save failed: ${error.message}`);
        alert(`Save failed: ${error.message}`); // Also show alert for save error
    } finally {
         // Re-enable button
         if (saveGameButtonMap) saveGameButtonMap.disabled = false;
    }
}

async function loadGameFromDatabase() {
    if (!supabase || !gameState.currentUser) {
        console.log("Cannot load: Not logged in or Supabase unavailable.");
        return null; // No user, no saved game to load
    }
    console.log("Attempting to load game state from DB for user:", gameState.currentUser.id);

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('game_state')
            .eq('id', gameState.currentUser.id)
            .single(); // Fetch the specific user's profile

        if (error) {
            // Handle specific errors. 'PGRST116' often means row not found.
            if (error.code === 'PGRST116') {
                console.log("No saved profile found for this user.");
                return null; // It's not an error, just no save file
            } else {
                // Other potential errors (RLS violation, connection issue)
                console.error("Supabase load error:", error);
                throw new Error(error.message || "Database load failed.");
            }
        }

        if (data && data.game_state) {
            console.log("Saved game state found:", data.game_state);
            return data.game_state; // Return the JSONB data
        } else {
            console.log("Profile found, but no game_state data saved.");
            return null; // No game state saved for this user
        }

    } catch (error) {
        console.error("Failed to load game from DB:", error);
        // Don't alert here, handle alert in the caller (handleUserLoggedIn)
        throw error; // Re-throw error to be caught by caller
    }
}

// NEW function to resume game from loaded state
function resumeGame(loadedState) {
     console.log("Resuming game from state:", loadedState);
     // Restore game state carefully
     // Ensure baseStats are present if needed for level ups
     const loadedParty = loadedState.playerParty || [];
     loadedParty.forEach(pkm => {
         if (!pkm.baseStats && pokemonData[pkm.id]) {
             pkm.baseStats = pokemonData[pkm.id].baseStats;
         }
         // Add any other necessary validation or defaults for loaded party members
     });

     // Update gameState - be careful not to overwrite currentUser
     gameState.playerParty = loadedParty;
     gameState.inventory = loadedState.inventory || [];
     gameState.mapProgress = loadedState.mapProgress || 0;
     // Reset transient state
     gameState.currentMapNode = 'map'; // Assume they are on the map
     gameState.activeBattle = null;

     // Update UI
     if(startScreen) startScreen.style.display = 'none';
     if(gameOverScreen) gameOverScreen.style.display = 'none';
     if(mainGame) mainGame.style.display = 'block';
     if(battleArea) battleArea.style.display = 'none';
     if(mapArea) mapArea.style.display = 'block';
     if(inventoryDisplay) inventoryDisplay.style.display = 'none';

     renderMap();
     updatePartyDisplay();
     logMessage(`Game resumed for ${gameState.currentUser.email}.`);
}

// --- Event Listeners Setup ---
function addEventListeners() {
    // Remove localStorage load button listener
    // if (loadGameButton) loadGameButton.removeEventListener('click', loadGame); 
    if (loadGameButton) loadGameButton.style.display = 'none'; // Hide the old load button

    // Gameplay Buttons
    if (restartButton) restartButton.addEventListener('click', restartGame);
    if (closeInventoryButton) closeInventoryButton.addEventListener('click', hideInventory);
    
    // Auth button listeners
    if (supabase) {
        if (loginButton) loginButton.addEventListener('click', handleLogin);
        if (registerButton) registerButton.addEventListener('click', handleRegister);
        if (logoutButtonMap) logoutButtonMap.addEventListener('click', handleLogout);
        if (logoutButtonGameover) logoutButtonGameover.addEventListener('click', handleLogout);
         // Add DB Save listener
         if (saveGameButtonMap) saveGameButtonMap.addEventListener('click', saveGameToDatabase);
    } else {
         // If no supabase, disable DB save button
         if (saveGameButtonMap) {
             saveGameButtonMap.disabled = true;
             saveGameButtonMap.textContent = "Save (Unavailable)";
         }
    }

    // Other listeners added dynamically
}

// --- Auth Functions ---
async function handleLogin() {
    if (!supabase || !authEmailInput || !authPasswordInput || !registerButton || !loginButton || !authError) {
        console.error("Auth elements or Supabase client not found.");
        return;
    }
    const email = authEmailInput.value;
    const password = authPasswordInput.value;
    authError.textContent = ''; // Clear previous errors
    authError.style.display = 'none';
    registerButton.disabled = true;
    loginButton.disabled = true;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Supabase signIn error:", error);
            // Handle specific auth errors like invalid login credentials
            if (error.message.includes("Invalid login credentials")) {
                 throw new Error("Invalid email or password.");
            } else if (error.message.includes("Email not confirmed")) {
                 throw new Error("Please confirm your email address first.");
            }
            throw new Error(error.message || "Login failed.");
        }

        console.log("Login successful, user:", data.user);
        // Login successful! The onAuthStateChange listener (added later)
        // will detect the SIGNED_IN event and update the UI accordingly.
        // We don't need to manually transition the UI here.

        // Clear form on success (optional, maybe clear only on SIGNED_IN event?)
        // authEmailInput.value = '';
        // authPasswordInput.value = '';

    } catch (error) {
        console.error("Login error:", error);
        authError.textContent = `Login failed: ${error.message}`;
        authError.style.display = 'block';
    } finally {
        // Re-enable buttons regardless of outcome
        registerButton.disabled = false;
        loginButton.disabled = false;
    }
}

async function handleRegister() {
    if (!supabase || !authEmailInput || !authPasswordInput || !registerButton || !loginButton || !authError) {
        console.error("Auth elements or Supabase client not found.");
        return;
    }
    const email = authEmailInput.value;
    const password = authPasswordInput.value;
    authError.textContent = ''; // Clear previous errors
    authError.style.display = 'none';
    registerButton.disabled = true;
    loginButton.disabled = true;

    try {
        // Attempt to sign up the user
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            // Handle specific errors if needed, otherwise show generic message
            console.error("Supabase signUp error:", error);
            throw new Error(error.message || "Registration failed.");
        }

        // Check if user object exists and if confirmation is needed
        if (data.user && data.user.identities && data.user.identities.length === 0) {
             // This state might indicate confirmation is required but user not fully created yet.
            console.log("Registration pending confirmation for:", email);
            alert("Registration successful! Please check your email for a confirmation link.");
        } else if (data.user) {
            console.log("Registration successful and user created:", data.user);
            // If email confirmation is disabled, the user might be logged in automatically.
            // onAuthStateChange listener should handle the UI transition if a session is created.
            alert("Registration successful!");
        } else {
            // Unexpected state - should usually have data.user or an error
            console.warn("Registration completed but no user data returned immediately.");
            alert("Registration processed. You might need to confirm your email or try logging in.");
        }

        // Clear form on success
        authEmailInput.value = '';
        authPasswordInput.value = '';

    } catch (error) {
        console.error("Registration error:", error);
        authError.textContent = `Registration failed: ${error.message}`;
        authError.style.display = 'block';
    } finally {
        // Re-enable buttons regardless of outcome
        registerButton.disabled = false;
        loginButton.disabled = false;
    }
}

async function handleLogout() {
    if (!supabase) {
        console.error("Supabase client not available for logout.");
        return;
    }
    // Disable buttons temporarily
    const logoutButtons = [logoutButtonMap, logoutButtonGameover];
    logoutButtons.forEach(btn => { if(btn) btn.disabled = true; });

    try {
        console.log("Attempting logout...");
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        console.log("Logout successful via signOut call.");
        // The onAuthStateChange listener will handle the SIGNED_OUT event
        // and trigger handleUserLoggedOut() to reset UI and game state.
    } catch (error) {
        console.error("Logout error:", error.message);
        alert(`Logout failed: ${error.message}`);
        // Re-enable buttons only if logout fails, otherwise UI changes
        logoutButtons.forEach(btn => { if(btn) btn.disabled = false; });
    }
}

// --- Game Start Call ---
document.addEventListener('DOMContentLoaded', init); 
document.addEventListener('DOMContentLoaded', init); 