document.getElementById("mainTitle").innerText = "Point and Click adventure game";

// Game State
let gameState = {
    "inventory": [],
    "coinPickedUp": false,
    "keyPickedUp": false
}

localStorage.removeItem("gameState");
if (Storage) {
    if (localStorage.gameState) {
        //uses localStorage gameState string and convert it to an onject. The store it inro gameState.
        gameState = JSON.parse(localStorage.gameState);
    } else {
        // convert local object variable to a string. then store it in the localStorage
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }
}


//Game window reference
const gameWindow = document.getElementById("gameWindow");
const inventoryList = document.getElementById("inventoryList");
const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

//speechbubbles
const heroSpeech = document.getElementById("heroSpeech");
const counterSpeech = document.getElementById("counterSpeech");

//audio for dialog
const heroAudio = document.getElementById("heroAudio")
const counterAudio = document.getElementById("counterAudio")

//avatar
const counterAvatar = document.getElementById("counteravatar")

//objects
const tree1 = document.getElementById("squareTree");


// in dialog
let checkDialog = false;

if(gameState.keyPickedUp) {
    document.getElementById("key").remove();
}

updateInventory(gameState.inventory, inventoryList);

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //TODO: calc offset based on character size
    //TODO: making dialog functionality



    if (checkDialog = true)
        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }
    switch (e.target.id) {
        case "key":
            console.log("pick up key")
            document.getElementById("key").remove();
            changeInventory('key', "add");
            gameState.keyPickedUp = true;
            saveGameState(gameState);
            break;
        case "well":
            if (gameState.coinPickedUp == false) {
                changeInventory("coin", "add");
                gameState.coinPickedUp = true;
            } else {
                console.log("There are no more coins in this well!");
            }
            break;
        case "doorWizardHut":
            if (checkItem("key")) {
                showMessage(heroSpeech, "YIPPEE the door is open!!", heroAudio);
                console.log("YIPPEE the door is open!!");
            } else if (checkItem("coin")) {
                changeInventory("coin", "remove");  // FIX THIS BIT
                console.log("(you try to open the locked door with a coin, but it just breaks the coin) Oh no, my coin D:", heroAudio);
            } else {
                showMessage(heroSpeech, "dammit, this door is locked... Maybe there is a key somewhere.", heroAudio);
                console.log("dammit, this door is locked... Maybe there is a key somewhere.");
            }
            break;
        case "goldenDragonTrigger":
            showMessage(heroSpeech, "hey that sure is a goldenDragon... I'm glad it doesn't speak because I have a really serious phobia foor talking goldenDragon!", heroAudio);
            setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
            setTimeout(showMessage, 4 * sec, counterSpeech, "I actually CAN talk you know?", counterAudio);
            setTimeout(showMessage, 8 * sec, heroSpeech, "WHAAAAAAAA!!! NO NO NO I'M SO SCARED!"), heroAudio;
            setTimeout(showMessage, 12 * sec, counterSpeech, "whoah chill dude, I am just going to help you... If you need a key, look by the graves.", counterAudio);
            setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
            // console.log("TIS I, THE TALKING goldenDragon! oh, what? where the key is? oh yeah it lies with the graves...");
            break;
        default:
            break;
    }
}

/**
 * Add or remove item in inventory
 * @param {string} itemName 
 * @param {string} action 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("Wrong parameters given to changeInventory()");
        return;
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break;
        case 'remove':
            gameState.inventory = gameState.inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });
            document.getElementById("inv-" + itemName).remove();
            break;

    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * This returns string value if it exist within the array
 * @param {string} itemName 
 * @returns 
 */
function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}

function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv-' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * if will show dialog and trigger sound.
 * @param {getElementById} targetBubble 
 * @param {string} message 
 * @param {getElementById} targetSound
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;    
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound) //GITHUB FIX HIDEMESSAGE
}

/**
 *                                                   
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "..."
    targetBubble.style.opacity = 0;
};

/**
 * 
 * @param {*} gameState 
 */
function saveGameState(gameState){
    localStorage.gameState = JSON.stringify(gameState)
};