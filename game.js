/*
  game_explained.js

  This file is a commented copy of `game.js` where each important line or
  small group of lines has a simple, full-sentence explanation above it.

  Vocabulary (each sentence is short and clear):
  - variable: a named place where the program stores a value to use later.
  - array: a list of items stored together where each item has a position number.
  - object: a group of related values stored under named properties.
  - function: a block of code that can be run to perform a task.
  - method: a function that is stored inside an object and works with that object.
  - DOM: the set of page elements JavaScript can find and change.
  - getElementById: a DOM tool that finds an element by its unique id name.
  - innerText: a way to set or read only the text inside an element.
  - innerHTML: a way to set or read HTML content (tags and text) inside an element.
  - dataset: a built-in place to store small custom values on an element for later use.
*/

/* --- GAME DATA --- */

// This is a list (array) of emoji strings used as collectible items in the game.
const minecraftItems = ["💎", "⚔️", "🍎", "🛡️", "🏹", "🧨", "🥩", "🗺️", "⛏️", "🔮", "🧩", "🏺", "🕯️", "🥖", "🧭", "🧪", "🗝️", "🔱"];

// The `levels` variable is an array that holds objects describing each level.
// Each level object contains the id, opponent info, background, and questions.
const levels = [
    {
        // `id` is a number identifying the level.
        id: 1,
        // `opponentName` is the text shown for the opponent.
        opponentName: "Winston Churchill",
        // `opponentImg` points to an image file (if it exists) for the opponent.
        opponentImg: "churchill.jpg",
        // `opponentHtml` is a string containing HTML to visually show the opponent.
        opponentHtml: `
        <div class="spooky-opponent">
            <style>
            .spooky-opponent{position:relative;width:220px;height:220px;display:flex;align-items:center;justify-content:center;}
            .spooky-img{width:200px;height:200px;object-fit:cover;border-radius:10px;filter:grayscale(30%) contrast(120%) drop-shadow(0 0 12px purple);animation:float 4s ease-in-out infinite, hue 6s linear infinite;}
            .spooky-mouth{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);width:64px;height:12px;background:rgba(0,0,0,0.7);border-radius:12px;animation:talk 420ms steps(2) infinite;}
            .spooky-speech{
            position:absolute;
            top:-40px;
            left:30%;
            transform:translateX(-50%);
            background:rgba(0,0,0,0.65);
            color:var(--accent);
            padding:6px 10px;
            border:1px solid var(--accent);
            border-radius:6px;
            font-size:14px;
            opacity:0;
            pointer-events:none;
            white-space:nowrap;
            /* 9s cycle: visible 6s, hidden 3s */
            animation: ghostSpeak 9s linear infinite;
            }
            .spooky-speech::after{
            content:"";
            position:absolute;
            left:50%;
            top:100%;
            transform:translateX(-50%);
            width:0;
            height:0;
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-top:8px solid rgba(0,0,0,0.65);
            }

            @keyframes ghostSpeak{
            /* 0% - 9s cycle -> visible from ~0s to 6s (0% - 66.666%), hidden for last 3s */
            0%   { opacity:0; transform:translate(-50%,-10px) scale(0.95); }
            5%   { opacity:1; transform:translate(-50%,0)    scale(1); }  /* quick fade-in */
            66.666% { opacity:1; transform:translate(-50%,0) scale(1); } /* remain visible until 6s */
            77%  { opacity:0; transform:translate(-50%,-8px) scale(0.98); } /* fade-out */
            100% { opacity:0; transform:translate(-50%,-10px) scale(0.95); }
            }

            @keyframes talk{0%{transform:translateX(-50%) scaleY(1);}40%{transform:translateX(-50%) scaleY(0.28);}80%{transform:translateX(-50%) scaleY(1);}100%{transform:translateX(-50%) scaleY(1);}}
            @keyframes hue{0%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(25deg)}100%{filter:hue-rotate(0deg)}}
            </style>

            <img src="churchill.jpg" alt="Winston Churchill" class="spooky-img" />
            <div class="spooky-mouth" aria-hidden="true"></div>
            <div class="spooky-speech">"Think you got this? show me what you got"</div>
        </div>
        `,
        // `bg` is a string used to set the CSS background for the level scene.
        bg: "linear-gradient(to bottom, #000000, #434343)",
        // `questions` is an array of question objects for this level.
        questions: [
            {
                // `q` is the text of the question shown to the player.
                q: "When did World War II officially begin?",
                // `options` is an array of possible answers the player can choose.
                options: ["December 7, 1941", "September 1, 1939", "June 6, 1944", "August 14, 1947"],
                // `a` is the index of the correct option (0-based index: 1 means the second option).
                a: 1
            },
            {
                q: "Which nations primarily made up the Axis Powers?",
                options: ["USA, UK, USSR", "Germany, Italy, Japan", "France, China, Poland", "Germany, Austria, Turkey"],
                a: 1
            },
            {
                q: "The bombing of Pearl Harbor occurred on which date?",
                options: ["December 7, 1941", "September 2, 1945", "June 25, 1941", "May 8, 1945"],
                a: 0
            },
            {
                q: "What was the main purpose of Executive Order 8802 signed by FDR?",
                options: ["To declare war on Japan", "To ban discrimination in the defense industry", "To start the Manhattan Project", "To create the GI Bill"],
                a: 1
            },
            {
                q: "How many Americans were killed during the Pearl Harbor attack?",
                options: ["1,178", "3,500", "2,403", "129"],
                a: 2
            },
            {
                q: "Which countries lost the most citizens during WWII?",
                options: ["USA and UK", "Germany and Italy", "Soviet Union and China", "Japan and France"],
                a: 2
            }
        ]
    },
    // Level 2 object starts here; it follows the same structure as level 1 above.
    {
        id: 2,
        opponentName: "FDR's Spirit",
        opponentImg: "fdr.jpg",
        opponentHtml: `
        <div class="spooky-opponent">
            <style>
            .spooky-opponent{position:relative;width:220px;height:220px;display:flex;align-items:center;justify-content:center;}
            .spooky-img{width:200px;height:200px;object-fit:cover;border-radius:10px;filter:grayscale(30%) contrast(120%) drop-shadow(0 0 12px purple);animation:float 4s ease-in-out infinite, hue 6s linear infinite;}
            .spooky-mouth{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);width:64px;height:12px;background:rgba(0,0,0,0.7);border-radius:12px;animation:talk 420ms steps(2) infinite;}
            .spooky-speech{
            position:absolute;
            top:-40px;
            left:30%;
            transform:translateX(-50%);
            background:rgba(0,0,0,0.65);
            color:var(--accent);
            padding:6px 10px;
            border:1px solid var(--accent);
            border-radius:6px;
            font-size:14px;
            opacity:0;
            pointer-events:none;
            white-space:nowrap;
            /* 9s cycle: visible 6s, hidden 3s */
            animation: ghostSpeak 9s linear infinite;
            }
            .spooky-speech::after{
            content:"";
            position:absolute;
            left:50%;
            top:100%;
            transform:translateX(-50%);
            width:0;
            height:0;
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-top:8px solid rgba(0,0,0,0.65);
            }

            @keyframes ghostSpeak{
            /* 0% - 9s cycle -> visible from ~0s to 6s (0% - 66.666%), hidden for last 3s */
            0%   { opacity:0; transform:translate(-50%,-10px) scale(0.95); }
            5%   { opacity:1; transform:translate(-50%,0)    scale(1); }  /* quick fade-in */
            66.666% { opacity:1; transform:translate(-50%,0) scale(1); } /* remain visible until 6s */
            77%  { opacity:0; transform:translate(-50%,-8px) scale(0.98); } /* fade-out */
            100% { opacity:0; transform:translate(-50%,-10px) scale(0.95); }
            }

            @keyframes talk{0%{transform:translateX(-50%) scaleY(1);}40%{transform:translateX(-50%) scaleY(0.28);}80%{transform:translateX(-50%) scaleY(1);}100%{transform:translateX(-50%) scaleY(1);}}
            @keyframes hue{0%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(25deg)}100%{filter:hue-rotate(0deg)}}
            </style>

            <img src="fdr.jpg" alt="FDR's Spirit" class="spooky-img" />
            <div class="spooky-mouth" aria-hidden="true"></div>
            <div class="spooky-speech">"Looks like someone is blanking! Focus..."</div>
        </div>
        `,
        bg: "linear-gradient(to bottom, #200122, #6f0000)",
        questions: [
            { q: "The Servicemen’s Readjustment Act is commonly known as what?", options: ["The Draft", "The New Deal", "The G.I. Bill", "The Marshall Plan"], a: 2 },
            { q: "On what date did President Franklin D. Roosevelt die?", options: ["April 12, 1945", "May 8, 1945", "September 2, 1945", "June 22, 1944"], a: 0 },
            { q: "How did Adolf Hitler die?", options: ["Captured by Soviets", "Suicide by gunshot and cyanide", "Heart attack", "Plane crash"], a: 1 },
            { q: "The United Nations was founded on October 24, 1945, to maintain what?", options: ["International peace", "Global trade dominance", "Nuclear secrets", "Space exploration"], a: 0 },
            { q: "Who was sworn in as the 33rd President after FDR's death?", options: ["Dwight D. Eisenhower", "John F. Kennedy", "Harry S. Truman", "Herbert Hoover"], a: 2 },
            { q: "What benefits did the GI Bill provide?", options: ["Free cars", "Education aid and low-interest home loans", "Guaranteed government jobs", "Free healthcare for life"], a: 1 }
        ]
    },
    // Level 3 object
    {
        id: 3,
        opponentName: "Jawaharlal Nehru",
        opponentImg: "nehru.jpg",
        opponentHtml: `
        <div class="spooky-opponent">
            <style>
            .spooky-opponent{position:relative;width:220px;height:220px;display:flex;align-items:center;justify-content:center;}
            .spooky-img{width:200px;height:200px;object-fit:cover;border-radius:10px;filter:grayscale(30%) contrast(120%) drop-shadow(0 0 12px purple);animation:float 4s ease-in-out infinite, hue 6s linear infinite;}
            .spooky-mouth{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);width:64px;height:12px;background:rgba(0,0,0,0.7);border-radius:12px;animation:talk 420ms steps(2) infinite;}
            .spooky-speech{
            position:absolute;
            top:-40px;
            left:30%;
            transform:translateX(-50%);
            background:rgba(0,0,0,0.65);
            color:var(--accent);
            padding:6px 10px;
            border:1px solid var(--accent);
            border-radius:6px;
            font-size:14px;
            opacity:0;
            pointer-events:none;
            white-space:nowrap;
            /* 9s cycle: visible 6s, hidden 3s */
            animation: ghostSpeak 9s linear infinite;
            }
            .spooky-speech::after{
            content:"";
            position:absolute;
            left:50%;
            top:100%;
            transform:translateX(-50%);
            width:0;
            height:0;
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-top:8px solid rgba(0,0,0,0.65);
            }

            @keyframes ghostSpeak{
            /* 0% - 9s cycle -> visible from ~0s to 6s (0% - 66.666%), hidden for last 3s */
            0%   { opacity:0; transform:translate(-50%,-10px) scale(0.95); }
            5%   { opacity:1; transform:translate(-50%,0)    scale(1); }  /* quick fade-in */
            66.666% { opacity:1; transform:translate(-50%,0) scale(1); } /* remain visible until 6s */
            77%  { opacity:0; transform:translate(-50%,-8px) scale(0.98); } /* fade-out */
            100% { opacity:0; transform:translate(-50%,-10px) scale(0.95); }
            }

            @keyframes talk{0%{transform:translateX(-50%) scaleY(1);}40%{transform:translateX(-50%) scaleY(0.28);}80%{transform:translateX(-50%) scaleY(1);}100%{transform:translateX(-50%) scaleY(1);}}
            @keyframes hue{0%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(25deg)}100%{filter:hue-rotate(0deg)}}
            </style>

            <img src="nehru.jpg" alt="Jawaharlal Nehru" class="spooky-img" />
            <div class="spooky-mouth" aria-hidden="true"></div>
            <div class="spooky-speech">"I believe you can do it!"</div>
        </div>
        `,
        bg: "linear-gradient(to bottom, #1e3c72, #2a5298)",
        questions: [
            { q: "The Cold War (1947-1991) was primarily between which two powers?", options: ["USA and Germany", "UK and France", "USA and Soviet Union", "China and Japan"], a: 2 },
            { q: "When was the State of Israel officially declared independent?", options: ["May 14, 1948", "August 15, 1947", "December 7, 1941", "October 24, 1945"], a: 0 },
            { q: "The Indian Independence Act separated British India into which two countries?", options: ["India and Bangladesh", "India and Pakistan", "Kashmir and Punjab", "India and Nepal"], a: 1 },
            { q: "Who declared Israel's independence and became its first Prime Minister?", options: ["Harry S. Truman", "David Ben-Gurion", "Winston Churchill", "Albert Einstein"], a: 1 },
            { q: "The partition of India led to a mass migration of how many people?", options: ["1 million", "5-8 million", "12-20 million", "50 million"], a: 2 },
            { q: "How long after Israel's declaration did the US recognize the state?", options: ["11 minutes", "24 hours", "1 week", "1 month"], a: 0 }
        ]
    },
    // Boss level object (id: 4 in the data but used as index 3 in the array)
    {
        id: 4, // BOSS LEVEL
        opponentName: "Dragon Boss",
        opponentImg: "dragon.jpg",
        opponentHtml: `
        <div class="spooky-opponent">
            <style>
            .spooky-opponent{position:relative;width:220px;height:220px;display:flex;align-items:center;justify-content:center;}
            .spooky-img{width:200px;height:200px;object-fit:cover;border-radius:10px;filter:grayscale(30%) contrast(120%) drop-shadow(0 0 12px purple);animation:float 4s ease-in-out infinite, hue 6s linear infinite;}
            .spooky-mouth{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);width:64px;height:12px;background:rgba(0,0,0,0.7);border-radius:12px;animation:talk 420ms steps(2) infinite;}
            .spooky-speech{
            position:absolute;
            top:-40px;
            left:50%;
            transform:translateX(-50%);
            background:rgba(0,0,0,0.65);
            color:var(--accent);
            padding:6px 10px;
            border:1px solid var(--accent);
            border-radius:6px;
            font-size:14px;
            opacity:0;
            pointer-events:none;
            white-space:nowrap;
            /* 9s cycle: visible 6s, hidden 3s */
            animation: ghostSpeak 9s linear infinite;
            }
            .spooky-speech::after{
            content:"";
            position:absolute;
            left:50%;
            top:100%;
            transform:translateX(-50%);
            width:0;
            height:0;
            border-left:6px solid transparent;
            border-right:6px solid transparent;
            border-top:8px solid rgba(0,0,0,0.65);
            }

            @keyframes ghostSpeak{
            /* 0% - 9s cycle -> visible from ~0s to 6s (0% - 66.666%), hidden for last 3s */
            0%   { opacity:0; transform:translate(-50%,-10px) scale(0.95); }
            5%   { opacity:1; transform:translate(-50%,0)    scale(1); }  /* quick fade-in */
            66.666% { opacity:1; transform:translate(-50%,0) scale(1); } /* remain visible until 6s */
            77%  { opacity:0; transform:translate(-50%,-8px) scale(0.98); } /* fade-out */
            100% { opacity:0; transform:translate(-50%,-10px) scale(0.95); }
            }

            @keyframes talk{0%{transform:translateX(-50%) scaleY(1);}40%{transform:translateX(-50%) scaleY(0.28);}80%{transform:translateX(-50%) scaleY(1);}100%{transform:translateX(-50%) scaleY(1);}}
            @keyframes hue{0%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(25deg)}100%{filter:hue-rotate(0deg)}}
            </style>

            <img src="dragon.jpg" alt="Dragon Boss" class="spooky-img" />
            <div class="spooky-mouth" aria-hidden="true"></div>
            <div class="spooky-speech">"I am going to crush you!"</div>
        </div>
        `,
        bg: "linear-gradient(to bottom, #0f0c29, #302b63, #24243e)",
        questions: [
            { q: "BOSS BATTLE: Who threatened a mass march causing Executive Order 8802?", options: ["MLK Jr.", "A. Philip Randolph", "Rosa Parks", "Malcolm X"], a: 1 },
            { q: "BOSS BATTLE: Hitler's wife, who died with him, was named...?", options: ["Eva Braun", "Eleanor Roosevelt", "Elizabeth Shoumatoff", "Angela Merkel"], a: 0 },
            { q: "BOSS BATTLE: Where did FDR die?", options: ["The White House", "Hyde Park, NY", "Warm Springs, Georgia", "Washington D.C."], a: 2 },
            { q: "BOSS BATTLE: Which war immediately followed Israel's declaration?", options: ["The Six-Day War", "The First Arab-Israeli War", "World War II", "The Cold War"], a: 1 }
        ]
    }
];

/* --- GAME ENGINE --- */

// The `game` object keeps the current game state and contains methods to run the game.
const game = {
    // `levelIndex` stores which level we are on (0 means first level in the `levels` array).
    levelIndex: 0,
    // `qIndex` stores which question inside the level we are currently showing.
    qIndex: 0,
    // `inventory` is an array that will hold items the player collects during play.
    inventory: [],
    // `state` holds a word that describes the current step in the game flow.
    state: 'start', // possible states include: start, study, intro, level, boss, win

    // `init` is the method that starts the gameplay when called.
    init: function () {
        // Hide the study (mission logs) screen because the player has launched the mission.
        document.getElementById('study-screen').classList.add('hidden');
        // Unhide the main game scene so gameplay is visible.
        document.getElementById('game-scene').classList.remove('hidden');
        // Unhide the HUD so level and inventory are visible.
        document.getElementById('hud').classList.remove('hidden');
        // Start the intro dialog to explain the story.
        this.playIntro();
    },


    // `showLogs` displays the study-screen with the mission logs.
    showLogs: function () {
        // Hide the start-screen so only the logs are shown.
        document.getElementById('start-screen').classList.add('hidden');
        // Show the study-screen where the user can read the missions.
        document.getElementById('study-screen').classList.remove('hidden');
    },

    // `playIntro` shows the short story intro in the dialog box and sets the state.
    playIntro: function () {
        this.setDialog("Mac", "Woah... my head. We hit that button and crashed! I'm Mac, from the 5th Dimension.", ["Next"]);
        // Update the game state so other code knows we're in the intro step.
        this.state = 'intro';
    },

    // `nextLevel` moves the game to the next level and decides if the boss starts.
    nextLevel: function () {
        // Increase the index to point to the next level.
        this.levelIndex++;
        // Reset the question index so new level starts at its first question.
        this.qIndex = 0;

        // If the new level index is 3 or greater, that means the boss should start.
        if (this.levelIndex >= 3) {
            this.startBossBattle();
        } else {
            // Otherwise setup a normal level.
            this.startLevel();
        }
    },

    // `startLevel` prepares a normal level's visuals and shows a pre-level dialog.
    startLevel: function () {
        // Read the level data for the current `levelIndex`.
        const levelData = levels[this.levelIndex];
        // Change the game scene background to the level's background.
        document.getElementById('game-scene').style.background = levelData.bg;
        // Insert the opponent's HTML to show the opponent in the scene.
        document.getElementById('opponent').innerHTML = levelData.opponentHtml;
        // Update the level number shown in the HUD (add 1 so players see 1-based numbering).
        document.getElementById('level-display').innerText = this.levelIndex + 1;

        // Animation visual: set opponent invisible then fade it in for effect.
        const opp = document.getElementById('opponent');
        opp.style.opacity = 0; // make transparent immediately
        setTimeout(() => opp.style.opacity = 1, 500); // fade in after 500ms

        // Show a dialog telling the player which zone they are entering.
        this.setDialog("Mac", `Okay, we're in Zone ${this.levelIndex + 1}. That looks like ${levelData.opponentName}! We need to pass this zone.`, ["Start Battle of Wits"]);
        // Set the state so the dialog button will trigger the next action 'pre-level'.
        this.state = 'pre-level';
    },

    // `showQuestion` displays the current question and creates answer buttons.
    showQuestion: function () {
        // Get the current level and question data.
        const levelData = levels[this.levelIndex];
        const qData = levelData.questions[this.qIndex];

        // If it's the boss level, label the speaker "The Dragon"; otherwise use the opponent name.
        const speaker = (this.levelIndex === 3) ? "The Dragon" : levelData.opponentName;

        // Put the speaker name and the question text in the dialog UI.
        document.getElementById('speaker-name').innerText = speaker;
        document.getElementById('dialog-text').innerText = qData.q;

        // Clear old choices and create a button for each option.
        const container = document.getElementById('choices-container');
        container.innerHTML = '';

        // For each option create a button that calls handleAnswer with the option index.
        qData.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = opt;
            // This arrow function captures `this` from the surrounding object so `handleAnswer` runs on `game`.
            btn.onclick = () => this.handleAnswer(idx);
            container.appendChild(btn);
        });
    },

    // `handleAnswer` checks whether the player's chosen answer is correct and responds.
    handleAnswer: function (selectedIndex) {
        // Read current level and question for checking the correct answer.
        const levelData = levels[this.levelIndex];
        const qData = levelData.questions[this.qIndex];

        // Compare the chosen index to the correct index stored in `qData.a`.
        if (selectedIndex === qData.a) {
            // Correct answer path: reward the player and move forward.
            this.rewardPlayer();
            this.qIndex++; // go to next question

            // If we are on the boss level, apply damage effects to the boss.
            if (this.levelIndex === 3) {
                this.damageBoss();
            }

            // If we've finished all questions in this level, either win or move to next.
            if (this.qIndex >= levelData.questions.length) {
                if (this.levelIndex === 3) {
                    // If boss level finished, trigger win sequence.
                    this.winGame();
                } else {
                    // For normal levels, show a completion dialog and set state.
                    this.setDialog("Mac", "Great job! We crossed this zone. Let's move on to find the Mystic Gem.", ["Next Zone"]);
                    this.state = 'level-complete';
                }
            } else {
                // If more questions remain, show the next one after a short delay for pacing.
                setTimeout(() => this.showQuestion(), 1000); // 1000ms = 1 second
            }
        } else {
            // Wrong answer path: show a retry message and set state so player can try again.
            this.setDialog("Mac", "That's not right! Think back to the mission logs!", ["Try Again"]);
            this.state = 'retry';
        }
    },

    // `rewardPlayer` chooses a random item and shows it in the HUD inventory.
    rewardPlayer: function () {
        // Pick a random index from 0 to minecraftItems.length-1 and get that item.
        const item = minecraftItems[Math.floor(Math.random() * minecraftItems.length)];
        // Add the item to the player's inventory array for later use.
        this.inventory.push(item);

        // Create a new visual slot in the HUD and insert the emoji.
        const invBox = document.getElementById('inventory-box');
        const slot = document.createElement('div');
        slot.className = 'item-slot';
        slot.innerText = item;
        invBox.appendChild(slot);

        // Animate the Mac element briefly as visual feedback for a correct answer.
        const mac = document.getElementById('mac');
        mac.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-30px)' },
            { transform: 'translateY(0)' }
        ], { duration: 300 });
    },

    // `startBossBattle` prepares and shows the dragon boss and updates the HUD background.
    startBossBattle: function () {
        // Hide the normal opponent area.
        document.getElementById('opponent').classList.add('hidden'); // Hide normal opponents
        // Find the dragon element and slide it into view by changing its `right` style.
        const dragon = document.getElementById('dragon');
        dragon.style.right = "50px"; // Slide in

        // Change the game scene background to the boss background.
        document.getElementById('game-scene').style.background = levels[3].bg;
        // Show "FINAL BOSS" text in the HUD.
        document.getElementById('level-display').innerText = "FINAL BOSS";

        // Show a boss-intro dialog and set the game state accordingly.
        this.setDialog("The Dragon", "ROAR! I hold the Mystic Gem! You carry many trinkets, but do you possess KNOWLEDGE?", ["Face the Dragon"]);
        this.state = 'boss-start';
    },

    // `damageBoss` visually shows the boss taking damage and shrinks it slightly.
    damageBoss: function () {
        // Get the dragon element and add a CSS class that triggers a short shake animation.
        const dragon = document.getElementById('dragon');
        dragon.classList.add('dragon-shake');

        // Flash the dragon with a bright filter for a hit effect.
        dragon.style.filter = "brightness(500%) sepia(100%) hue-rotate(-50deg)";
        // After a short delay restore the glow and remove the shake class.
        setTimeout(() => {
            dragon.style.filter = "drop-shadow(0 0 20px orange)";
            dragon.classList.remove('dragon-shake');
            // Use the element's dataset to remember its scale across hits.
            const prevScale = parseFloat(dragon.dataset.scale) || 1;
            // Reduce the scale by 20% (multiply by 0.8) and round to 3 decimals.
            const newScale = +(prevScale * 0.8).toFixed(3);
            // Store the new scale value back on the element so future hits are cumulative.
            dragon.dataset.scale = newScale;
            // Smoothly animate the transform and filter changes.
            dragon.style.transition = "transform 300ms ease, filter 300ms ease";
            // Apply the visual shrinking.
            dragon.style.transform = `scale(${newScale})`;
        }, 300);
    },

    // `winGame` shows the victory screen, lists collected items, and starts the ship landing.
    winGame: function () {
        // Hide main game elements and reveal the victory screen.
        document.getElementById('game-scene').classList.add('hidden');
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('victory-screen').classList.remove('hidden');

        // Populate the treasures area with each item from the inventory array.
        const treasureContainer = document.getElementById('final-treasures');
        treasureContainer.innerHTML = ''; // clear old
        this.inventory.forEach(item => {
            const span = document.createElement('span');
            span.className = 'final-item';
            span.innerText = item;
            treasureContainer.appendChild(span);
        });

        // Prepare the ship element for a JS-controlled landing animation.
        const ship = document.getElementById('mac-spaceship');
        ship.style.transform = '';
        ship.style.transition = '';
        // Set the ship's left position in pixels so the JS animation controls it precisely.
        ship.style.left = (ship.offsetLeft) + 'px';

        // Start an animation that moves the ship until it's 1 pixel away from the planet.
        this.startShipLandingToOffset(1); // 1 pixel away
    },

    /* Move the mac-spaceship horizontally until it is `offsetPx` pixels away from the home-planet */
    startShipLandingToOffset: function (offsetPx) {
        // Find the ship, planet, and their containing scene.
        const ship = document.getElementById('mac-spaceship');
        const planet = document.getElementById('home-planet');
        const scene = document.querySelector('.scene-space');
        // If any required element is missing, stop early to avoid errors.
        if (!ship || !planet || !scene) return;

        // Ensure the ship's `left` style is set to its current pixel position.
        ship.style.left = ship.offsetLeft + 'px';

        // Measure positions and sizes of the scene, planet, and ship relative to the screen.
        const sceneRect = scene.getBoundingClientRect();
        const planetRect = planet.getBoundingClientRect();
        const shipRect = ship.getBoundingClientRect();

        // Compute the target left position so the ship's right edge sits `offsetPx` pixels left of the planet.
        let targetLeft = (planetRect.left - sceneRect.left) - shipRect.width - offsetPx;

        // Prevent the target from being negative (off-screen to the left).
        targetLeft = Math.max(targetLeft, 0);

        // Start the animation from the ship's current left position.
        let currentLeft = ship.offsetLeft;

        // If already very close to the target, snap into place and finish.
        if (Math.abs(currentLeft - targetLeft) < 1) {
            ship.style.left = targetLeft + 'px';
            return;
        }

        // Setup variables for the animation loop.
        let lastTime = null;
        const duration = 1200; // ms approximate easing duration (not strictly used below)
        const startLeft = currentLeft;

        // `animate` will be called each frame by requestAnimationFrame for smooth motion.
        const animate = (timestamp) => {
            if (!lastTime) lastTime = timestamp;
            const elapsed = timestamp - lastTime;
            // Calculate how far is left to move.
            const dx = targetLeft - currentLeft;
            // If very close, snap to the target and finish.
            if (Math.abs(dx) < 0.5) {
                ship.style.left = targetLeft + 'px';
                return;
            }

            // Move by a fraction of the remaining distance for an ease-out feel.
            const step = Math.max(Math.min(Math.abs(dx) * 0.18, 18), 1); // clamp between 1 and 18 px
            currentLeft += (dx > 0 ? step : -step);
            ship.style.left = currentLeft + 'px';

            // Ask the browser to call this function again on the next frame.
            requestAnimationFrame(animate);
        };

        // Start the animation loop.
        requestAnimationFrame(animate);
    },

    // Handling the dialog flow: create the dialog content with buttons.
    setDialog: function (name, text, buttons) {
        // Set who is speaking and what they say.
        document.getElementById('speaker-name').innerText = name;
        document.getElementById('dialog-text').innerText = text;
        const container = document.getElementById('choices-container');
        // Remove any old buttons.
        container.innerHTML = '';

        // Create a button for each label provided and make it call advanceState when clicked.
        buttons.forEach(btnText => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.innerText = btnText;
            // The action for these dialog buttons is determined by the game's `state` via advanceState.
            btn.onclick = () => this.advanceState();
            container.appendChild(btn);
        });
    },

    // `advanceState` decides the next step when the user clicks a dialog button.
    advanceState: function () {
        if (this.state === 'intro') {
            // From the intro dialog, start the first level.
            this.startLevel();
        } else if (this.state === 'pre-level') {
            // From the pre-level dialog, show the first question.
            this.showQuestion();
        } else if (this.state === 'retry') {
            // From retry, show the same question again.
            this.showQuestion();
        } else if (this.state === 'level-complete') {
            // From level complete, move to the next level.
            this.nextLevel();
        } else if (this.state === 'boss-start') {
            // From boss start, show boss questions.
            this.showQuestion();
        }
    }
};
