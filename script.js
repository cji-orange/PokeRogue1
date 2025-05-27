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
    'pkm001': { name: 'Bobasore', types: ['Grass', 'Poison'], baseStats: { hp: 45, atk: 49, def: 49 }, moves: ['Tackle', 'Growl', 'Vine Whip'], sprite: 'assets/sprites/001.png' },
    'pkm004': { name: 'Charamander', types: ['Fire'], baseStats: { hp: 39, atk: 52, def: 43 }, moves: ['Scratch', 'Growl', 'Ember'], sprite: 'assets/sprites/004.png' },
    'pkm007': { name: 'Squirtul', types: ['Water'], baseStats: { hp: 44, atk: 48, def: 65 }, moves: ['Tackle', 'Tail Whip', 'Water Gun'], sprite: 'assets/sprites/007.png' },
    // Non-Starters added:
     'pkm010': { name: 'Catrupi', types: ['Bug'], baseStats: { hp: 45, atk: 30, def: 35 }, moves: ['Tackle', 'String Shot'], sprite: 'assets/sprites/010.png' },
     'pkm013': { name: 'Widle', types: ['Bug', 'Poison'], baseStats: { hp: 40, atk: 35, def: 30 }, moves: ['Poison Sting', 'String Shot'], sprite: 'assets/sprites/013.png' },
     'pkm016': { name: 'Piggy', types: ['Normal', 'Flying'], baseStats: { hp: 40, atk: 45, def: 40 }, moves: ['Tackle', 'Sand Attack', 'Gust'], sprite: 'assets/sprites/016.png' },
     'pkm019': { name: 'Ratatta', types: ['Normal'], baseStats: { hp: 30, atk: 56, def: 35 }, moves: ['Tackle', 'Tail Whip', 'Quick Attack'], sprite: 'assets/sprites/019.png' },
     'pkm021': { name: 'Speerow', types: ['Normal', 'Flying'], baseStats: { hp: 40, atk: 60, def: 30 }, moves: ['Peck', 'Growl', 'Leer'], sprite: 'assets/sprites/021.png' },
     'pkm023': { name: 'Ikans', types: ['Poison'], baseStats: { hp: 35, atk: 60, def: 44 }, moves: ['Wrap', 'Leer', 'Poison Sting'], sprite: 'assets/sprites/023.png' },
     'pkm027': { name: 'Sandshrewd', types: ['Ground'], baseStats: { hp: 50, atk: 75, def: 85 }, moves: ['Scratch', 'Sand Attack', 'Defense Curl'], sprite: 'assets/sprites/027.png' },
     'pkm029': { name: 'Nidodaran♀', types: ['Poison'], baseStats: { hp: 55, atk: 47, def: 52 }, moves: ['Growl', 'Scratch', 'Poison Sting'], sprite: 'assets/sprites/029.png' },
     'pkm032': { name: 'Nidodaran♂', types: ['Poison'], baseStats: { hp: 46, atk: 57, def: 40 }, moves: ['Leer', 'Peck', 'Poison Sting'], sprite: 'assets/sprites/032.png' },
     'pkm041': { name: 'Zoobat', types: ['Poison', 'Flying'], baseStats: { hp: 40, atk: 45, def: 35 }, moves: ['Leech Life', 'Supersonic', 'Astonish'], sprite: 'assets/sprites/041.png' },
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
    'Growl': { effect: 'lower_stat', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'atk', stages: -1 },
    'Vine Whip': { power: 45, accuracy: 100, type: 'Grass' },
    'Scratch': { power: 40, accuracy: 100, type: 'Normal' },
    'Ember': { power: 40, accuracy: 100, type: 'Fire' },
    'Tail Whip': { effect: 'lower_stat', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'def', stages: -1 },
    'Water Gun': { power: 40, accuracy: 100, type: 'Water' },
    'Sand Attack': { effect: 'lower_stat', power: 0, accuracy: 100, type: 'Ground', target: 'opponent', stat: 'accuracy', stages: -1 },
    'Quick Attack': { power: 40, accuracy: 100, type: 'Normal', priority: 1 },
    'String Shot': { effect: 'lower_stat', power: 0, accuracy: 95, type: 'Bug', target: 'opponent', stat: 'speed', stages: -2 },
    'Poison Sting': { power: 15, accuracy: 100, type: 'Poison', effect: 'poison', chance: 0.3 },
    'Gust': { power: 40, accuracy: 100, type: 'Flying' },
    'Peck': { power: 35, accuracy: 100, type: 'Flying' },
    'Leer': { effect: 'lower_stat', power: 0, accuracy: 100, type: 'Normal', target: 'opponent', stat: 'def', stages: -1 },
    'Wrap': { power: 15, accuracy: 90, type: 'Normal', effect: 'trap', duration: [4, 5] },
    'Defense Curl': { effect: 'raise_stat', power: 0, accuracy: null, type: 'Normal', target: 'self', stat: 'def', stages: 1 },
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
// Add references for reward screen elements
const rewardSelectionArea = document.getElementById('reward-selection-area'); 
const rewardOptionsContainer = document.getElementById('reward-options'); 

// --- Animation Data and Control ---

// Data structure to hold animation details (derived from pokemon_sprites_sizes.txt)
// NOTE: Assumes pokemonData is loaded and contains lowercase names
const spriteAnimationData = {
    // Pokemon ID: { frameCount, pattern: [frame numbers in sequence], name: 'folder_name' }
    // Corrected Keys to use 'pkmXXX' format
    'pkm010': { frameCount: 6, pattern: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2], name: 'caterpie' },
    'pkm023': { frameCount: 12, pattern: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2], name: 'ekans' },
    'pkm029': { frameCount: 4, pattern: [1, 2, 3, 4, 3, 2], name: 'nidoran_female' }, // Name MUST match folder
    'pkm032': { frameCount: 4, pattern: [1, 2, 3, 4, 3, 2], name: 'nidoran_male' },   // Name MUST match folder
    'pkm016': { frameCount: 9, pattern: [1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2], name: 'pidgey' },
    'pkm019': { frameCount: 7, pattern: [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2], name: 'rattata' },
    'pkm027': { frameCount: 4, pattern: [1, 2, 3, 4, 3, 2], name: 'sandshrew' },
    'pkm021': { frameCount: 4, pattern: [1, 2, 3, 4, 3, 2], name: 'spearow' },
    'pkm013': { frameCount: 11, pattern: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2], name: 'weedle' },
    'pkm041': { frameCount: 4, pattern: [1, 2, 3, 4, 3, 2], name: 'zubat' },
    // Add entries for starters/Pikachu using 'pkmXXX' keys when data is available
    // e.g., 'pkm001': { frameCount: X, pattern: [...], name: 'bulbasaur' },
};

// Object to store active animation intervals
const activeSpriteIntervals = {};

// Function to start/update sprite animation
function startSpriteAnimation(spriteElement, pokemonId, uniqueIntervalId) {
    console.log(`[Sprite Anim] Start request for ID: ${pokemonId}, Element ID: ${uniqueIntervalId}`); // Debug Log

    // Clear existing animation for this element, if any
    if (activeSpriteIntervals[uniqueIntervalId]) {
        console.log(`[Sprite Anim] Clearing existing interval: ${uniqueIntervalId}`); // Debug Log
        clearInterval(activeSpriteIntervals[uniqueIntervalId]);
        delete activeSpriteIntervals[uniqueIntervalId];
    }

    const animData = spriteAnimationData[pokemonId]; // Lookup with correct 'pkmXXX' ID
    let pkmName = null;

    if (animData) {
        pkmName = animData.name; // Use name directly from animData if found
        console.log(`[Sprite Anim] Found animData for ${pokemonId}. Name: ${pkmName}`); // Debug Log
    } else {
        // Fallback: Try to get name from pokemonData if animData is missing
        const basePkmData = pokemonData[pokemonId];
        if (basePkmData) {
            // Special handling for names that don't map directly to folders
            // Use the NEW names from pokemonData
            if (basePkmData.name === 'Nidodaran♀') pkmName = 'nidoran_female'; 
            else if (basePkmData.name === 'Nidodaran♂') pkmName = 'nidoran_male';
            // Generic fallback (might be incorrect for some names)
            else pkmName = basePkmData.name.toLowerCase().replace(' ', '_');
             console.log(`[Sprite Anim] No animData. Using fallback name from pokemonData: ${pkmName}`); // Debug Log
        } else {
            console.error(`[Sprite Anim] ERROR: No animData or pokemonData found for ID: ${pokemonId}`); // Debug Log
            spriteElement.style.backgroundImage = ''; // Clear potentially wrong image
            return; // Cannot proceed without data
        }
    }
    
    // Double-check if pkmName is valid
    if (!pkmName) {
         console.error(`[Sprite Anim] ERROR: Could not determine pokemon name/folder for ID: ${pokemonId}`); // Debug Log
         spriteElement.style.backgroundImage = '';
         return;
    }

    const basePath = `pokemon_sprites/${pkmName}_sprites/${pkmName}_`; // Construct base path
    const defaultFramePath = `${basePath}1.png`; // Path for frame 1

    // If no animation data, just set frame 1 and return
    if (!animData || animData.pattern.length <= 1) {
        console.log(`[Sprite Anim] Setting static frame 1 for ${pokemonId}: ${defaultFramePath}`); // Debug Log
        spriteElement.style.backgroundImage = `url('${defaultFramePath}')`;
        // You might want to add an error handler here in case frame 1 doesn't load
        // e.g., check if the image exists before setting
        return;
    }

    // --- Animation Logic --- 
    let currentPatternIndex = 0;
    const patternLength = animData.pattern.length;
    const frameInterval = 250; // ms between frames (Increased from 150 for slower FPS)

    // Function to update the frame
    const updateFrame = () => {
        const frameNumber = animData.pattern[currentPatternIndex];
        const framePath = `${basePath}${frameNumber}.png`;
        // console.log(`[Sprite Anim] Setting frame for ${uniqueIntervalId}: ${framePath}`); // Verbose Debug Log
        spriteElement.style.backgroundImage = `url('${framePath}')`;
        currentPatternIndex = (currentPatternIndex + 1) % patternLength;
    };

    // Set initial frame immediately
    console.log(`[Sprite Anim] Setting initial frame for ${uniqueIntervalId}: ${defaultFramePath}`); // Debug Log
    updateFrame(); 

    // Start interval
    console.log(`[Sprite Anim] Starting interval ${uniqueIntervalId} with ${patternLength} frames.`); // Debug Log
    activeSpriteIntervals[uniqueIntervalId] = setInterval(updateFrame, frameInterval);
}

// --- Gameplay State & Initialization ---
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

    // Ensure all main game screens are hidden initially
    if(authScreen) authScreen.style.display = 'none'; // Hide auth screen initially too
    if(startScreen) startScreen.style.display = 'none';
    if(mainGame) mainGame.style.display = 'none';
    if(gameOverScreen) gameOverScreen.style.display = 'none';
    // Let onAuthStateChange handle showing the correct screen based on session
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

// --- Stat Stage Calculation Helper ---
const stageMultipliers = {
    '-6': 2 / 8, // 0.25
    '-5': 2 / 7, // ~0.28
    '-4': 2 / 6, // ~0.33
    '-3': 2 / 5, // 0.4
    '-2': 2 / 4, // 0.5
    '-1': 2 / 3, // ~0.66
    '0': 1,
    '1': 3 / 2, // 1.5
    '2': 4 / 2, // 2.0
    '3': 5 / 2, // 2.5
    '4': 6 / 2, // 3.0
    '5': 7 / 2, // 3.5
    '6': 8 / 2, // 4.0
};

// Gets the actual stat multiplier based on the stage (-6 to +6)
function getStatModifier(statStage) {
    const stage = Math.max(-6, Math.min(6, statStage)); // Clamp stage between -6 and +6
    return stageMultipliers[stage.toString()] || 1;
}

// --- Core Game Logic Functions ---
function displayStarters() {
    if (!starterOptionsContainer) return;
    starterOptionsContainer.innerHTML = ''; // Clear existing options

    // Clear any lingering starter animation intervals
    Object.keys(activeSpriteIntervals).forEach(key => {
        if (key.startsWith('starter-sprite-')) {
            clearInterval(activeSpriteIntervals[key]);
            delete activeSpriteIntervals[key];
        }
    });

    starterPokemonIds.forEach(id => {
        const pkmData = pokemonData[id]; // Use pokemonData for name consistency
        if (pkmData) {
            const starterDiv = document.createElement('div');
            starterDiv.classList.add('starter-choice');
            starterDiv.dataset.pokemonId = id;

            const spriteContainer = document.createElement('div');
            spriteContainer.classList.add('sprite-container');
            const spriteDiv = document.createElement('div');
            // Add specific class for dimensions, but animation handles image
            spriteDiv.classList.add('pokemon-sprite', `sprite-${id}`); 
            spriteContainer.appendChild(spriteDiv);

            const nameP = document.createElement('p');
            nameP.textContent = pkmData.name;

            starterDiv.appendChild(spriteContainer);
            starterDiv.appendChild(nameP);
            
            starterDiv.addEventListener('click', () => startNewRun(id));
            starterOptionsContainer.appendChild(starterDiv);

            // Start animation for this starter sprite
            startSpriteAnimation(spriteDiv, id, `starter-sprite-${id}`);
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
    if(inventoryDisplay) inventoryDisplay.style.display = 'none'; // Explicitly hide inventory

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
    if (!battleLog) { 
        console.error("logMessage ERROR: battleLog element not found!");
        return; 
    }
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    if (className) {
        messageElement.classList.add(className);
    }
    battleLog.appendChild(messageElement);
    // Scroll to the bottom
    battleLog.scrollTop = battleLog.scrollHeight;
}

function updatePartyDisplay() {
    if (!partyDisplayContainer) return;
    partyDisplayContainer.innerHTML = '<h2>Your Party</h2>';

    // Clear any lingering party animation intervals
    Object.keys(activeSpriteIntervals).forEach(key => {
        if (key.startsWith('party-sprite-')) {
            clearInterval(activeSpriteIntervals[key]);
            delete activeSpriteIntervals[key];
        }
    });

    gameState.playerParty.forEach((pkm, index) => {
        const pkmDiv = document.createElement('div');
        pkmDiv.classList.add('party-member');
        
        const spriteContainer = document.createElement('div');
        spriteContainer.classList.add('sprite-container');
        const spriteDiv = document.createElement('div');
        spriteDiv.classList.add('pokemon-sprite', `sprite-${pkm.id}`);
        spriteContainer.appendChild(spriteDiv);

        const expPercentage = pkm.expToNextLevel > 0 ? Math.min(100, (pkm.exp / pkm.expToNextLevel) * 100) : 0;
        
        const infoHtml = `
            <p>${pkm.name} (Lvl ${pkm.level})</p>
            <p>HP: ${pkm.currentHp} / ${pkm.stats.maxHp}</p>
            <div class="exp-bar-container">
                <div class="exp-bar" style="width: ${expPercentage}%"></div>
            </div>
            <small>EXP: ${pkm.exp} / ${pkm.expToNextLevel}</small>
            ${index === 0 ? '<p><small>(Active)</small></p>' : ''}
        `;

        pkmDiv.appendChild(spriteContainer); 
        pkmDiv.innerHTML += infoHtml; 

        partyDisplayContainer.appendChild(pkmDiv);

        // Start animation for this party member sprite
        startSpriteAnimation(spriteDiv, pkm.id, `party-sprite-${index}`);
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

    // Enable save button (using Supabase)
    saveGameButtonMap.disabled = false;
    saveGameButtonMap.textContent = 'Save Game';
    // saveGameButtonMap.onclick = saveGame; // REMOVE THIS LINE - Listener added in addEventListeners
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
    if (!battleArea) return;
    logMessage("Battle started!");
    
    const playerPokemon = gameState.playerParty[0]; // Assume first party member fights
    if (!playerPokemon) {
        logMessage("Error: No player Pokémon available for battle!");
        return; 
    }

    // Initialize battle state
    gameState.activeBattle = {
        playerPokemon: playerPokemon, 
        opponentPokemon: opponentPokemon,
        turn: 'player',
        playerStatStages: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0, acc: 0, eva: 0 },
        opponentStatStages: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0, acc: 0, eva: 0 }
    };

    // --- Update Battle UI (Opponent) --- 
    if(opponentName) opponentName.textContent = `${opponentPokemon.name} Lvl ${opponentPokemon.level}`;
    updateHpBar(opponentHpBar, opponentPokemon.currentHp, opponentPokemon.stats.maxHp);
    if(opponentHpValue) opponentHpValue.textContent = `${opponentPokemon.currentHp} / ${opponentPokemon.stats.maxHp}`;
    const opponentSpriteContainer = document.getElementById('opponent-sprite-container');
    if (opponentSpriteContainer) {
        const spriteDiv = opponentSpriteContainer.querySelector('.pokemon-sprite');
        if (spriteDiv) {
            spriteDiv.className = 'pokemon-sprite'; // Reset classes first
            spriteDiv.classList.add(`sprite-${opponentPokemon.id}`); // Add specific class for dimensions
            // Start animation
            startSpriteAnimation(spriteDiv, opponentPokemon.id, 'opponent-sprite'); 
        }
    }

    // --- Update Battle UI (Player) --- 
    if(playerName) playerName.textContent = `${playerPokemon.name} Lvl ${playerPokemon.level}`;
    updateHpBar(playerHpBar, playerPokemon.currentHp, playerPokemon.stats.maxHp);
    if(playerHpValue) playerHpValue.textContent = `${playerPokemon.currentHp} / ${playerPokemon.stats.maxHp}`;
    const playerSpriteContainer = document.getElementById('player-sprite-container');
    if (playerSpriteContainer) {
        const spriteDiv = playerSpriteContainer.querySelector('.pokemon-sprite');
        if (spriteDiv) {
            spriteDiv.className = 'pokemon-sprite'; // Reset classes first
            spriteDiv.classList.add(`sprite-${playerPokemon.id}`); // Add specific class for dimensions
            // Start animation
            startSpriteAnimation(spriteDiv, playerPokemon.id, 'player-sprite'); 
        }
    }
    
    // Show battle area and initial options
    if(startScreen) startScreen.style.display = 'none';
    if(mapArea) mapArea.style.display = 'none'; 
    battleArea.style.display = 'grid'; 
    logMessage(`Go, ${playerPokemon.name}!`);
    logMessage(`Wild ${opponentPokemon.name} appeared!`);
    showMainBattleActions();
}

function showInventory(isBattle = false) {
    console.log("[Debug] showInventory called. isBattle:", isBattle);
    // Ensure main container is valid
    if (!inventoryDisplay) {
        console.error("[Debug] Inventory display element (#inventory-display) NOT found!"); return;
    }
    // --- ADDED DIAGNOSTIC LOG ---
    console.log("[Debug] innerHTML of #inventory-display before finding #item-list:", inventoryDisplay.innerHTML);
    // --- END DIAGNOSTIC LOG ---

    // Ensure item list UL element is valid
    const ulItemList = document.getElementById('item-list'); // Re-fetch to be absolutely sure
    if (!ulItemList) {
        console.error("[Debug] Item list UL element (#item-list) NOT found within #inventory-display (or globally)! Retrying querySelector within inventoryDisplay...");
        // Try finding it specifically within inventoryDisplay
        const ulItemListScoped = inventoryDisplay.querySelector('#item-list');
        if(!ulItemListScoped){
            console.error("[Debug] Item list UL element (#item-list) STILL NOT found using querySelector within #inventory-display!"); 
            return;
        } else {
            console.log("[Debug] Found #item-list using querySelector within #inventory-display.");
            // If found this way, it implies the global getElementById might be stale or there's an ID conflict.
            // For now, we can proceed with ulItemListScoped, but this indicates a potential issue.
            // The original `ulItemList` will still be null here, so we need to use ulItemListScoped for this call.
            ulItemListScoped.innerHTML = ''; // Clear previous items from the UL

            if (!gameState.inventory || gameState.inventory.length === 0) {
                 const noItemsLi = document.createElement('li');
                 noItemsLi.textContent = 'No items.';
                 ulItemListScoped.appendChild(noItemsLi);
                 console.log("[Debug] Inventory empty, showing 'No items'.");
            } else {
                console.log(`[Debug] Populating inventory with ${gameState.inventory.length} items.`);
                gameState.inventory.forEach((item, index) => {
                    const listItem = document.createElement('li');
                    const itemTextSpan = document.createElement('span');
                    itemTextSpan.textContent = `${item.name} x${item.quantity} - ${item.description || ''}`;
                    listItem.appendChild(itemTextSpan);
                    if (item.effect === 'heal' || item.effect === 'catch') { 
                        const useButton = document.createElement('button');
                        useButton.textContent = "Use";
                        useButton.classList.add('use-item-button');
                        useButton.style.marginLeft = '10px'; 
                        useButton.onclick = () => {
                            let target = null;
                            if (isBattle && gameState.activeBattle) target = gameState.activeBattle.playerPokemon;
                            useItem(index, target); 
                        };
                        listItem.appendChild(useButton);
                    }
                    ulItemListScoped.appendChild(listItem);
                });
            }
        }
    } else {
        // This block executes if the original document.getElementById('item-list') succeeded.
        ulItemList.innerHTML = ''; // Clear previous items from the UL
        if (!gameState.inventory || gameState.inventory.length === 0) {
            const noItemsLi = document.createElement('li');
            noItemsLi.textContent = 'No items.';
            ulItemList.appendChild(noItemsLi);
            console.log("[Debug] Inventory empty, showing 'No items'.");
        } else {
            console.log(`[Debug] Populating inventory with ${gameState.inventory.length} items.`);
            gameState.inventory.forEach((item, index) => {
                const listItem = document.createElement('li');
                const itemTextSpan = document.createElement('span');
                itemTextSpan.textContent = `${item.name} x${item.quantity} - ${item.description || ''}`;
                listItem.appendChild(itemTextSpan);
                if (item.effect === 'heal' || item.effect === 'catch') { 
                    const useButton = document.createElement('button');
                    useButton.textContent = "Use";
                    useButton.classList.add('use-item-button');
                    useButton.style.marginLeft = '10px'; 
                    useButton.onclick = () => {
                        let target = null;
                        if (isBattle && gameState.activeBattle) target = gameState.activeBattle.playerPokemon;
                        useItem(index, target); 
                    };
                    listItem.appendChild(useButton);
                }
                ulItemList.appendChild(listItem);
            });
        }
    }

    // Ensure close button is valid and assign onclick
    const btnCloseInventory = document.getElementById('close-inventory-button'); 
    if (!btnCloseInventory) {
        console.error("[Debug] Close inventory button (#close-inventory-button) NOT found when trying to assign handler!"); 
    } else {
        btnCloseInventory.onclick = () => hideInventory(isBattle);
        console.log("[Debug] Assigned onclick handler to close button.");
    }

    // Show the main inventory panel
    inventoryDisplay.style.display = 'block';
}

function hideInventory(wasInBattle = false) {
    console.log("[Debug] hideInventory called. wasInBattle:", wasInBattle);
    if(inventoryDisplay) inventoryDisplay.style.display = 'none';

    // If we hid the inventory while in battle, show the main actions again
    if (wasInBattle && gameState.activeBattle) {
        showMainBattleActions();
    }
}

function useItem(itemIndex, targetPokemon) {
    console.log(`Attempting to use item at index: ${itemIndex}`, gameState.inventory[itemIndex]);
    const itemToUse = gameState.inventory[itemIndex];
    const battle = gameState.activeBattle; // Reference active battle
    let itemUsed = false; // Flag to track if item was successfully used
    let advanceTurn = false; // Flag to track if turn should advance

    if (!itemToUse) {
        logMessage("Invalid item selection.");
        return;
    }

    // --- Potion Logic --- 
    if (itemToUse.effect === 'heal') {
        if (!targetPokemon) {
            logMessage("Cannot use this item outside of battle or without a target.");
        } else if (targetPokemon.currentHp >= targetPokemon.stats.maxHp) {
            logMessage(`${targetPokemon.name}'s HP is already full!`);
        } else if (targetPokemon.currentHp <= 0) {
             logMessage(`${targetPokemon.name} has fainted and cannot be healed with this item.`);
        } else {
            const hpToRestore = itemToUse.power;
            const oldHp = targetPokemon.currentHp;
            targetPokemon.currentHp = Math.min(targetPokemon.stats.maxHp, targetPokemon.currentHp + hpToRestore);
            const restoredAmount = targetPokemon.currentHp - oldHp;
            logMessage(`${targetPokemon.name}'s HP was restored by ${restoredAmount}.`);
            updateHpBar(playerHpBar, targetPokemon.currentHp, targetPokemon.stats.maxHp);
            if(playerHpValue) playerHpValue.textContent = `${targetPokemon.currentHp} / ${targetPokemon.stats.maxHp}`;
            updatePartyDisplay(); // Update display in case HP changed
            itemUsed = true;
            advanceTurn = true; // Using a Potion uses your turn
        }
    }
    // --- Poke Ball Logic --- 
    else if (itemToUse.effect === 'catch') {
        if (!battle || !battle.opponentPokemon) {
            logMessage("Cannot use this item outside of battle or on a non-wild Pokémon.");
        } else {
            logMessage(`You threw a ${itemToUse.name}!`);
            itemUsed = true; // Throwing the ball uses the item
            advanceTurn = true; // Throwing a ball uses your turn

            // Calculate catch chance
            const catchChance = calculateCatchChance(battle.opponentPokemon, itemToUse.power); // item.power acts as ballModifier
            
            // Simulate the catch attempt
            // TODO: Add visual shaking effect later?
            if (Math.random() < catchChance) {
                // Catch Success!
                // End the battle - endBattle handles adding Pokemon etc.
                setTimeout(() => endBattle('catch_success'), 1000); 
                 // Don't hide inventory or advance turn here, endBattle handles it
                 advanceTurn = false; // Battle ends, no opponent turn
            } else {
                // Catch Failed
                logMessage("Oh no! The Pokémon broke free!");
                // Turn proceeds to opponent
            }
        }
    }
    // --- TODO: Add other item effects (TMs, status healers, etc.) --- 
    else {
        logMessage(`Cannot use ${itemToUse.name} right now.`);
    }

    // --- Consume Item if Used --- 
    if (itemUsed) {
        itemToUse.quantity--;
        if (itemToUse.quantity <= 0) {
            gameState.inventory.splice(itemIndex, 1); // Remove item from array
        }
        // Update inventory display immediately after use/consumption
        // Note: showInventory might be called again if still in inventory view
        updateInventoryDisplay(); 
    }

    // --- Hide Inventory and Advance Turn (if applicable) --- 
    if (advanceTurn) {
        hideInventory(true); // Hide inventory, restore battle actions initially
        if(battle) { 
            // Ensure turn proceeds AFTER hiding inventory
            setTimeout(() => {
                 if(actionButtonsContainer) actionButtonsContainer.innerHTML = '...'; // Clear actions
                 battle.turn = 'opponent'; 
                 opponentTurn(); // Call opponent turn directly (no extra delay needed)
            }, 100); // Short delay to ensure UI updates
        } else {
             // If item used outside battle, just hide inventory
              hideInventory(false);
        }
    } else if (!itemUsed) {
        // If item wasn't used (e.g., failed Potion), just hide the inventory
        // Don't advance turn
        hideInventory(!!battle); // Pass battle status correctly
    }
    // If battle ended due to catch, endBattle takes over.
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
    console.log(`--- playerAttack START: ${moveName} ---`); // Debug Log
    const battle = gameState.activeBattle;
    if (!battle) {
        console.error("playerAttack ERROR: No active battle found!"); // Debug Log
        return;
    }

    const attacker = battle.playerPokemon;
    const defender = battle.opponentPokemon;
    const move = moveData[moveName];
    console.log("Player Attack Details:", { attacker: attacker?.name, defender: defender?.name, moveName, move }); // Debug Log

    if (!attacker || !defender) {
        console.error("playerAttack ERROR: Attacker or Defender is missing!"); // Debug Log
        return; // Should ideally not happen if battle exists
    }

    console.log(`Logging message: ${attacker.name} used ${moveName}!`); // Debug Log
    logMessage(`${attacker.name} used ${moveName}!`);

    if (!move) {
        console.error(`playerAttack ERROR: Move data not found for ${moveName}!`); // Debug Log
        logMessage(`Move data error for ${moveName}!`); // Let user know
        // Proceed to opponent's turn even if move data is missing
        battle.turn = 'opponent';
        setTimeout(opponentTurn, 1000);
        return;
    }

    // TODO: Add accuracy check here
    console.log("Accuracy check placeholder..."); // Debug Log

    let damage = 0;
    let effectivenessMultiplier = 1;

    if (move.power > 0) {
        console.log("Calculating damage..."); // Debug Log
        effectivenessMultiplier = getTypeEffectiveness(move.type, defender.types);
        
        // --- Incorporate Stat Stages --- 
        const atkStat = 'atk'; // TODO: Use SpAtk for special moves later
        const defStat = 'def'; // TODO: Use SpDef for special moves later
        const attackerAtkStage = battle.playerStatStages[atkStat] || 0;
        const defenderDefStage = battle.opponentStatStages[defStat] || 0;
        const atkModifier = getStatModifier(attackerAtkStage);
        const defModifier = getStatModifier(defenderDefStage);
        
        // Apply modifiers to base stats for calculation
        const effectiveAtk = attacker.stats[atkStat] * atkModifier;
        const effectiveDef = defender.stats[defStat] * defModifier;
        
        damage = Math.max(1, Math.floor((move.power * (effectiveAtk / effectiveDef) / 5) * effectivenessMultiplier));
        console.log(`Damage calc: Pwr:${move.power}, Atk:${effectiveAtk}(Mod:${atkModifier}), Def:${effectiveDef}(Mod:${defModifier}), Type:${effectivenessMultiplier} => Dmg:${damage}`); // Detailed log
        // --- End Stat Stage Mod --- 

        console.log(`Logging damage: ${damage}`); // Debug Log
        logMessage(`It dealt ${damage} damage.`);

        if (effectivenessMultiplier > 1) {
            logMessage("It's super effective!");
        } else if (effectivenessMultiplier < 1 && effectivenessMultiplier > 0) {
            logMessage("It's not very effective...");
        } else if (effectivenessMultiplier === 0) {
            logMessage(`It doesn't affect ${defender.name}...`);
        }

    } else if (move.effect) {
        console.log("Move has effect (not implemented)"); // Debug Log
        applyMoveEffect(move, attacker, defender, battle);
    } else {
        console.log("Move has no power or effect."); // Debug Log
        logMessage("But it failed! (No power or effect)");
    }

    console.log(`Applying ${damage} damage. Defender HP before: ${defender.currentHp}`); // Debug Log
    defender.currentHp = Math.max(0, defender.currentHp - damage);
    console.log(`Defender HP after: ${defender.currentHp}`); // Debug Log

    console.log("Updating opponent HP bar..."); // Debug Log
    updateHpBar(opponentHpBar, defender.currentHp, defender.stats.maxHp);
    if(opponentHpValue) opponentHpValue.textContent = `${defender.currentHp} / ${defender.stats.maxHp}`;

    if (defender.currentHp <= 0) {
        console.log("Defender fainted. Ending battle (win)..."); // Debug Log
        logMessage(`${defender.name} fainted!`);
        endBattle('win'); // endBattle handles resetting state and UI transitions
    } else {
        console.log("Setting turn to opponent and scheduling opponentTurn..."); // Debug Log
        battle.turn = 'opponent';
        setTimeout(opponentTurn, 1000);
    }
    console.log(`--- playerAttack END: ${moveName} ---`); // Debug Log
}

function opponentTurn() {
    console.log("--- opponentTurn START ---"); // Debug Log
    const battle = gameState.activeBattle;
    if (!battle) {
        console.error("opponentTurn ERROR: No active battle!"); // Debug Log
        return; 
    }
    if (battle.turn !== 'opponent') { 
        console.warn(`opponentTurn WARNING: Called when turn was ${battle.turn}`); // Debug Log
        return; // Don't proceed if it's not the opponent's turn
    }

    if(actionButtonsContainer) actionButtonsContainer.innerHTML = '<p>Opponent is thinking...</p>'; // Show thinking message

    const attacker = battle.opponentPokemon;
    const defender = battle.playerPokemon;
    console.log("Opponent Turn Details:", { attacker: attacker?.name, defender: defender?.name }); // Debug Log

    if (!attacker || !defender) {
        console.error("opponentTurn ERROR: Attacker or Defender is missing!"); // Debug Log
        // Attempt to recover by setting turn back to player?
        battle.turn = 'player';
        logMessage("Error occurred. Your turn.");
        showMainBattleActions();
        return;
    }

    // Simple AI: Choose a random move
    const moveName = attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
    const move = moveData[moveName];
    console.log(`Opponent chose move: ${moveName}`, move); // Debug Log

    console.log(`Logging message: Wild ${attacker.name} used ${moveName}!`); // Debug Log
    logMessage(`Wild ${attacker.name} used ${moveName}!`);

    if (!move) {
        console.error(`opponentTurn ERROR: Move data not found for ${moveName}!`); // Debug Log
        logMessage("Opponent move data error!");
        // Skip turn if move is invalid, pass back to player
        battle.turn = 'player';
        logMessage("What will you do?");
        showMainBattleActions(); // Regenerate player actions
        return;
    }

     // TODO: Add accuracy check here
     console.log("Opponent Accuracy check placeholder..."); // Debug Log

    let damage = 0;
    let effectivenessMultiplier = 1;

    if (move.power > 0) {
        console.log("Opponent calculating damage..."); // Debug Log
        effectivenessMultiplier = getTypeEffectiveness(move.type, defender.types);
        
        // --- Incorporate Stat Stages --- 
        const atkStat = 'atk'; // TODO: Use SpAtk for special moves later
        const defStat = 'def'; // TODO: Use SpDef for special moves later
        const attackerAtkStage = battle.opponentStatStages[atkStat] || 0;
        const defenderDefStage = battle.playerStatStages[defStat] || 0;
        const atkModifier = getStatModifier(attackerAtkStage);
        const defModifier = getStatModifier(defenderDefStage);
        
        const effectiveAtk = attacker.stats[atkStat] * atkModifier;
        const effectiveDef = defender.stats[defStat] * defModifier;

        damage = Math.max(1, Math.floor((move.power * (effectiveAtk / effectiveDef) / 5) * effectivenessMultiplier));
         console.log(`Opponent Dmg calc: Pwr:${move.power}, Atk:${effectiveAtk}(Mod:${atkModifier}), Def:${effectiveDef}(Mod:${defModifier}), Type:${effectivenessMultiplier} => Dmg:${damage}`); // Detailed log
        // --- End Stat Stage Mod --- 

        console.log(`Logging opponent damage: ${damage}`); // Debug Log
        logMessage(`It dealt ${damage} damage.`);

        if (effectivenessMultiplier > 1) {
            logMessage("It's super effective!");
        } else if (effectivenessMultiplier < 1 && effectivenessMultiplier > 0) {
            logMessage("It's not very effective...");
        } else if (effectivenessMultiplier === 0) {
            logMessage(`It doesn't affect ${defender.name}...`);
        }
    } else if (move.effect) {
        console.log("Opponent move has effect (not implemented)"); // Debug Log
        applyMoveEffect(move, attacker, defender, battle);
    } else {
        console.log("Opponent move has no power or effect."); // Debug Log
        logMessage("But it failed! (No power or effect)");
    }

    console.log(`Applying ${damage} damage to player. Player HP before: ${defender.currentHp}`); // Debug Log
    defender.currentHp = Math.max(0, defender.currentHp - damage);
    console.log(`Player HP after: ${defender.currentHp}`); // Debug Log

    console.log("Updating player HP bar and party display..."); // Debug Log
    updateHpBar(playerHpBar, defender.currentHp, defender.stats.maxHp);
    if(playerHpValue) playerHpValue.textContent = `${defender.currentHp} / ${defender.stats.maxHp}`;
    updatePartyDisplay(); // Update party display in case HP changed

    if (defender.currentHp <= 0) {
        console.log("Player Pokémon fainted. Checking for others / Ending battle (loss)..."); // Debug Log
        logMessage(`${defender.name} fainted!`);
        // TODO: Check if player has other usable Pokémon
        logMessage("You have no more usable Pokémon!"); // Placeholder
        endBattle('loss'); // endBattle handles resetting state
    } else {
        console.log("Setting turn to player and showing main actions..."); // Debug Log
        battle.turn = 'player';
        logMessage("What will you do?");
        showMainBattleActions(); // Regenerate player actions
    }
    console.log("--- opponentTurn END ---"); // Debug Log
}

function attemptRun() {
    // Simple run logic: 50% chance for now
    const battle = gameState.activeBattle;
    if (!battle) return;
    logMessage("You attempt to run...");
    if (Math.random() < 0.5) { // 50% success rate
        logMessage("Got away safely!");
        // Clear battle state and return to map
        setTimeout(() => endBattle('run_success'), 1000); // Use outcome 'run_success' or similar
    } else {
        logMessage("Can't escape!");
        // Proceed to opponent's turn
        battle.turn = 'opponent';
        setTimeout(opponentTurn, 1000);
    }
}

function endBattle(outcome) {
    console.log(`--- endBattle START: Outcome: ${outcome} ---`);
    const battle = gameState.activeBattle;
    if (!battle) {
        console.warn("endBattle called but no active battle.");
        return; // No battle to end
    }

    // Stop battle animations
    if (activeSpriteIntervals['player-sprite']) {
        clearInterval(activeSpriteIntervals['player-sprite']);
        delete activeSpriteIntervals['player-sprite'];
    }
    if (activeSpriteIntervals['opponent-sprite']) {
        clearInterval(activeSpriteIntervals['opponent-sprite']);
        delete activeSpriteIntervals['opponent-sprite'];
    }

    if (outcome === 'win') {
        logMessage("You won the battle!");

        // --- Grant EXP --- 
        // Simple EXP calculation (e.g., base amount * opponent level / player level)
        // Adjust this logic as needed for better balance
        const baseExpYield = 50; // Placeholder base yield
        const expGained = Math.max(10, Math.floor((baseExpYield * battle.opponentPokemon.level) / battle.playerPokemon.level));
        grantExp(battle.playerPokemon, expGained);

        // --- Update Game State --- 
        gameState.mapProgress++;

        // --- Passive Healing every 5 battles ---
        if (gameState.mapProgress > 0 && gameState.mapProgress % 5 === 0) {
            logMessage("Your Pokémon feel refreshed after a series of battles!", "system-message");
            gameState.playerParty.forEach(pkm => {
                if (pkm.currentHp > 0) { // Only heal if not fainted
                    const healAmount = Math.floor(pkm.stats.maxHp * 0.10);
                    const oldHp = pkm.currentHp;
                    pkm.currentHp = Math.min(pkm.stats.maxHp, pkm.currentHp + healAmount);
                    if (pkm.currentHp > oldHp) {
                        logMessage(`${pkm.name} recovered ${pkm.currentHp - oldHp} HP!`);
                    }
                }
            });
            updatePartyDisplay(); // Update display to show HP changes
        }
        // --- End Passive Healing ---

        gameState.activeBattle = null; // Clear battle state immediately

        // --- Show Reward Selection --- 
        console.log("[Debug] Preparing to show reward selection screen after delay..."); // <<< ADDED LOG
        setTimeout(() => { 
            if(battleArea) battleArea.style.display = 'none';
            showRewardSelection(); 
        }, 1500); 

    } else if (outcome === 'loss') {
        logMessage("You lost the battle...");
        gameState.activeBattle = null; // Clear battle state
        setTimeout(showGameOverScreen, 1500); // Transition after delay

    } else if (outcome === 'run_success') {
        // Outcome used by attemptRun
        gameState.activeBattle = null; // Clear battle state
        // --- Transition UI --- 
        setTimeout(() => { // Delay transition slightly
            if(battleArea) battleArea.style.display = 'none';
            if(mapArea) mapArea.style.display = 'block';
            renderMap(); // Show the same map node again
            updatePartyDisplay();
        }, 1000); // 1 second delay
    } else if (outcome === 'catch_success') {
        logMessage(`Gotcha! ${battle.opponentPokemon.name} was caught!`);
        // Add caught Pokemon to party (if space)
        if (gameState.playerParty.length < 6) {
            logMessage(`${battle.opponentPokemon.name} was added to your party.`);
            // Ensure the caught Pokemon instance is complete before adding
            const caughtPokemon = { ...battle.opponentPokemon }; // Shallow copy is likely fine here
            gameState.playerParty.push(caughtPokemon);
        } else {
            logMessage("Your party is full! The caught Pokémon was sent to the box (not implemented).");
            // TODO: Implement PC Box logic later
        }
        
        // Update game state
        gameState.mapProgress++; // Count catch as progress
        gameState.activeBattle = null; // Clear battle state

        // Transition UI back to map
        setTimeout(() => { 
            if(battleArea) battleArea.style.display = 'none';
            if(mapArea) mapArea.style.display = 'block';
            renderMap(); 
            updatePartyDisplay(); // Show new party member
            updateInventoryDisplay(); // Refresh inventory (pokeball used)
            saveGameToDatabase().catch(err => console.error("Failed to auto-save after catch:", err));
        }, 1500); 

    } else {
        // Handle other outcomes? Flee failed implicitly proceeds to opponent turn.
        console.warn(`endBattle called with unknown outcome: ${outcome}`);
        gameState.activeBattle = null; // Clear battle state anyway?
        // Default transition back to map?
         setTimeout(() => {
            if(battleArea) battleArea.style.display = 'none';
            if(mapArea) mapArea.style.display = 'block';
            renderMap();
            updatePartyDisplay();
        }, 1000);
    }
     console.log(`--- endBattle END ---`);
}

// --- EXP and Leveling ---
function grantExp(pokemon, amount) {
    if (!pokemon || amount <= 0) return;
    
    logMessage(`${pokemon.name} gained ${amount} EXP!`);
    pokemon.exp += amount;
    
    checkForLevelUp(pokemon);
    updatePartyDisplay(); // Update EXP bar display
}

function checkForLevelUp(pokemon) {
    if (!pokemon) return;
    
    // Check if current EXP meets or exceeds amount needed for next level
    if (pokemon.exp >= pokemon.expToNextLevel) {
        pokemon.level++;
        logMessage(`${pokemon.name} grew to Level ${pokemon.level}!`, 'level-up');
        
        // Subtract EXP used for this level
        pokemon.exp -= pokemon.expToNextLevel;
        
        // Calculate EXP needed for the *new* next level
        pokemon.expToNextLevel = calculateExpToNextLevel(pokemon.level);
        
        // Recalculate stats based on new level
        const oldMaxHp = pokemon.stats.maxHp;
        pokemon.stats = calculateStats(pokemon.baseStats, pokemon.level);
        const hpGain = pokemon.stats.maxHp - oldMaxHp;
        pokemon.currentHp += hpGain; // Increase current HP by the max HP gain
        pokemon.currentHp = Math.min(pokemon.currentHp, pokemon.stats.maxHp); // Ensure HP doesn't exceed new max

        // TODO: Check for new move learning here

        // Log stat increases (optional)
        // console.log(`${pokemon.name}'s stats increased! New Max HP: ${pokemon.stats.maxHp}`);

        // Check again in case of multiple level-ups from one EXP gain
        checkForLevelUp(pokemon); 
    }
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
     if(inventoryDisplay) inventoryDisplay.style.display = 'none'; // Explicitly hide inventory

     renderMap();
     updatePartyDisplay();
     updateInventoryDisplay(); // Update content without showing
     logMessage(`Game resumed for ${gameState.currentUser.email}.`);
}

// NEW function to apply status move effects
function applyMoveEffect(move, attacker, defender, battle) {
    console.log(`Applying effect: ${move.effect} for move ${move.name}`); // Use move.name if available, or fallback
    let targetPokemon;
    let targetStages;
    let targetName;
    let attackerName = (attacker === battle.playerPokemon) ? attacker.name : `Wild ${attacker.name}`;

    // Determine target and stage object
    if (move.target === 'self') {
        targetPokemon = attacker;
        targetStages = (attacker === battle.playerPokemon) ? battle.playerStatStages : battle.opponentStatStages;
        targetName = attackerName;
    } else { // Assume 'opponent' if not 'self'
        targetPokemon = defender;
        targetStages = (defender === battle.playerPokemon) ? battle.playerStatStages : battle.opponentStatStages;
        targetName = (defender === battle.playerPokemon) ? defender.name : `Wild ${defender.name}`;
    }

    if (!targetPokemon || !targetStages) {
        console.error("applyMoveEffect: Invalid target or stages object.");
        logMessage("But it failed! (Target error)");
        return;
    }

    // --- Handle Stat Changes --- 
    if (move.effect === 'lower_stat' || move.effect === 'raise_stat') {
        const stat = move.stat; // e.g., 'atk', 'def'
        const stages = move.stages; // e.g., -1, +1, -2

        if (!targetStages.hasOwnProperty(stat)) {
            console.error(`applyMoveEffect: Target stages object does not have stat: ${stat}`);
            logMessage("But it failed! (Stat error)");
            return;
        }

        const currentStage = targetStages[stat];
        // Use a more comprehensive mapping for stat names
        const statNameMap = { atk: 'Attack', def: 'Defense', spa: 'Sp. Atk', spd: 'Sp. Def', spe: 'Speed', acc: 'Accuracy', eva: 'Evasion' };
        const statName = statNameMap[stat] || stat.toUpperCase();

        if (stages < 0) { // Lowering stat
            if (currentStage <= -6) {
                logMessage(`${targetName}'s ${statName} won't go any lower!`);
            } else {
                targetStages[stat] = Math.max(-6, currentStage + stages);
                const verb = (stages <= -2) ? "harshly fell" : "fell";
                logMessage(`${targetName}'s ${statName} ${verb}!`);
            }
        } else { // Raising stat
             if (currentStage >= 6) {
                logMessage(`${targetName}'s ${statName} won't go any higher!`);
            } else {
                targetStages[stat] = Math.min(6, currentStage + stages);
                 const verb = (stages >= 2) ? "sharply rose" : "rose";
                logMessage(`${targetName}'s ${statName} ${verb}!`);
            }
        }
        console.log("Updated target stages:", targetStages);
    }
    // --- TODO: Handle other effects --- 
    else if (move.effect === 'poison') {
        // Check type immunity (Steel, Poison)
        // Apply poison status if Math.random() < move.chance
        logMessage(`(${move.effect} effect not fully implemented)`);
    }
    else if (move.effect === 'trap') {
         logMessage(`(${move.effect} effect not fully implemented)`);
    }
     else if (move.effect === 'drain') {
         // Calculate drain amount based on damage dealt (needs damage calculation access)
         logMessage(`(${move.effect} effect not fully implemented)`);
    }
    else if (move.effect === 'confuse') {
        // Apply confusion status
         logMessage(`(${move.effect} effect not fully implemented)`);
    }
     else if (move.effect === 'flinch') {
         // Check if attacker went first, apply flinch status for the turn
         logMessage(`(${move.effect} effect not fully implemented)`);
    }
    // ... other effects ...
    else {
        logMessage("(Unknown effect)");
    }
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

// --- Reward System --- 
const rewardPool = [
    { itemId: 'item001', quantity: 1 }, // Potion
    { itemId: 'item001', quantity: 2 }, // Potion x2
    { itemId: 'item002', quantity: 1 }, // Poke Ball
    { itemId: 'item002', quantity: 3 }, // Poke Ball x3
    // TODO: Add TMs or other items later
];

function showRewardSelection() {
    console.log("[Debug] showRewardSelection() called."); // <<< ADDED LOG
    if (!rewardSelectionArea || !rewardOptionsContainer) {
        console.error("[Debug] Reward selection area or options container not found!"); // <<< ADDED LOG
        return;
    }
    if (!itemData) {
        console.error("[Debug] itemData is not defined!"); // <<< ADDED LOG
        return;
    }
    console.log("[Debug] Required elements and itemData found."); // <<< ADDED LOG
    
    // Generate 3 unique reward choices
    const availableRewards = [...rewardPool]; // Copy pool to avoid modifying original
    const choices = [];
    const numChoices = Math.min(3, availableRewards.length); // Show up to 3 choices

    for (let i = 0; i < numChoices; i++) {
        if (availableRewards.length === 0) break; // Stop if we run out of unique rewards
        const randomIndex = Math.floor(Math.random() * availableRewards.length);
        choices.push(availableRewards.splice(randomIndex, 1)[0]); // Remove chosen reward from pool
    }

    // Display choices as buttons
    rewardOptionsContainer.innerHTML = ''; // Clear previous options
    if (choices.length === 0) {
        rewardOptionsContainer.innerHTML = '<p>No rewards available this time.</p>';
        // Automatically proceed if no rewards? Or show a button?
        const proceedButton = document.createElement('button');
        proceedButton.textContent = "Continue";
        proceedButton.onclick = () => finishPostBattleFlow(); 
        rewardOptionsContainer.appendChild(proceedButton);
    } else {
        choices.forEach(reward => {
            const itemInfo = itemData[reward.itemId];
            if (itemInfo) {
                const button = document.createElement('button');
                button.classList.add('reward-choice');
                button.textContent = `${itemInfo.name} x${reward.quantity}`;
                button.onclick = () => claimReward(reward.itemId, reward.quantity);
                rewardOptionsContainer.appendChild(button);
            } else {
                console.warn(`Reward item ID ${reward.itemId} not found in itemData.`);
            }
        });
    }

    // Show the reward screen
    console.log("[Debug] Setting rewardSelectionArea display to 'block'."); // <<< ADDED LOG
    rewardSelectionArea.style.display = 'block';
}

function claimReward(itemId, quantity) {
    if (!rewardSelectionArea || !itemData[itemId]) return;

    const itemInfo = itemData[itemId];
    logMessage(`You received ${itemInfo.name} x${quantity}!`);

    // Add item to inventory (handle stacking)
    const existingItem = gameState.inventory.find(invItem => invItem.itemId === itemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        // Need to find the base item data again to add all properties
        const baseItem = itemData[itemId]; 
        if(baseItem) {
             // Add itemId explicitly when creating the inventory entry
             gameState.inventory.push({ ...baseItem, itemId: itemId, quantity: quantity }); 
        } else {
            console.error("Could not find base item data for", itemId);
        }
    }

    // Hide reward screen and proceed
    rewardSelectionArea.style.display = 'none';
    finishPostBattleFlow();
}

// New function to handle steps after reward claimed (or skipped)
function finishPostBattleFlow() {
     updateInventoryDisplay(); // Update inventory display *after* claiming
     // Transition back to map and save
     if(mapArea) mapArea.style.display = 'block';
     renderMap(); 
     saveGameToDatabase().catch(err => console.error("Failed to auto-save after reward:", err));
}

// --- UI Update Functions ---
function updateInventoryDisplay() {
    if (!inventoryDisplay) return;
    inventoryDisplay.innerHTML = '<h2>Inventory</h2>'; // Clear and add header

    if (!gameState.inventory || gameState.inventory.length === 0) {
        inventoryDisplay.innerHTML += '<p>No items.</p>';
    } else {
        const itemList = document.createElement('ul');
        gameState.inventory.forEach(item => {
            // Defensive check for item properties
            const itemName = item?.name || 'Unknown Item';
            const itemQuantity = item?.quantity || 0;
            const itemDescription = item?.description || '';
            
            const listItem = document.createElement('li');
            listItem.textContent = `${itemName} x${itemQuantity} - ${itemDescription}`;
            // TODO: Add 'Use' button if implementing item use from this display
            itemList.appendChild(listItem);
        });
        inventoryDisplay.appendChild(itemList);
    }
     // DO NOT force display: block here. Visibility handled elsewhere.
     // if (inventoryDisplay) inventoryDisplay.style.display = 'block'; 
}

function updateUserDisplay(email) {
    // ... (Existing function)
}

function showAuthScreen(show = true) {
    // ... (Existing function)
}

function showStarterSelectionScreen() {
    // ... (Existing function)
}

// --- Helper function for catch chance ---
function calculateCatchChance(opponent, ballModifier = 1) {
    // Basic formula approximation - Gen 1 style, simplified
    // Max HP and Current HP are crucial
    const maxHp = opponent.stats.maxHp;
    const currentHp = opponent.currentHp;
    // TODO: Add status conditions later (e.g., sleep/paralysis increase rate)
    // TODO: Add base catch rate for the species later
    const baseRate = 150; // Placeholder base rate (adjust per species later)

    // Ensure HP values are valid
    if (maxHp <= 0 || currentHp < 0) return 0;

    // Formula component: Higher rate the lower the HP
    const hpFactor = Math.max(1, Math.floor(((maxHp * 3 - currentHp * 2) * baseRate) / (maxHp * 3)));
    
    // Apply ball modifier (e.g., Great Ball = 1.5, Ultra Ball = 2)
    const modifiedRate = Math.min(255, hpFactor * ballModifier); // Cap at 255

    // Simplified probability check
    const probability = modifiedRate / 255;
    console.log(`[Catch Calc] MaxHP:${maxHp}, CurrHP:${currentHp}, BaseRate:${baseRate}, HPFactor:${hpFactor}, BallMod:${ballModifier}, ModRate:${modifiedRate}, Prob:${probability.toFixed(3)}`);
    return probability;
}