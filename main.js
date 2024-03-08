document.getElementById("mainTitle").innerText = "silly dragon game";

// Game State
let gameState = {
    "inventory": [],
    "coinPickedUp": false,
    "lostDragonFound": false,
    "mushroomsPickedUp": false,
    "gardenBerry" : false,
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
const counterAvatar = document.getElementById("counterAvatar")

//objects
const tree1 = document.getElementById("squareTree");


// in dialog
let checkDialog = false;


const lostDragonTrigger = document.getElementById("lostDragonTrigger");

// with this you can pick up the baby dragon and it makes the toot toot sound
lostDragonTrigger.addEventListener("click", function() {
    const lostDragonAudio = document.getElementById("lostDragonAudio");
    lostDragonAudio.currentTime = 0; 
    lostDragonAudio.play();

    document.getElementById("lostDragon").remove(); 
    console.log("pick up lostDragonTrigger");
    changeInventory('the child', "add");
    gameState.lostDragonFound = true;
    saveGameState(gameState);
});


updateInventory(gameState.inventory, inventoryList);

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (checkDialog = true)
        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }

// this is puts the baby in your inventory
    switch (e.target.id) {
        case "lostDragonTrigger":
            console.log("pick up lostDragonTrigger")
            changeInventory('the child', "add");
            gameState.lostDragonFound = true;
            saveGameState(gameState);
            break;

// if you have the child, trigger the found child dialogue, if not, is there food in the inventory, trigger that dialogue, if not, trigger the starter dialogue.
        case "goldenDragonTrigger":
            if (checkItem("the child")) {
                showMessage(heroSpeech, "here he is!", heroAudio);
                console.log("you give the baby back to the dragon");
                changeInventory('the child', "remove");
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 4 * sec, counterSpeech, "MY BABY! thank you so much!", counterAudio);
                setTimeout(function () { counterAvatar.style.opacity = 0; }, 9 * sec);
                // showMessage(counterSpeech, "I hate to ask more but I was making soup", counterAudio);
                // showMessage(counterSpeech, "And I just need mushrooms and some berries from the garden", counterAudio);                
                // showMessage(counterSpeech, "could be get thos as well please?", counterAudio);
            } else if (checkItem("mushroom", "berry", "vegetable")) {
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 0 * sec);
                showMessage(counterSpeech, "This is not my child?! thanks for the food tho...", counterAudio);                
                setTimeout(1 * sec, heroSpeech, "", heroAudio);
                setTimeout(showMessage, 4 * sec, counterSpeech, "scrumf scrumf I phwas hungphry", counterAudio);
                setTimeout(function () { counterAvatar.style.opacity = 0; }, 9 * sec);
                changeInventory('mushroom', 'remove');
                changeInventory('berry', 'remove');
                changeInventory('vegetable', 'remove');            
            } else {
                showMessage(heroSpeech, "Hi there!... oh, why do you look so sad?", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 4 * sec, counterSpeech, "oh, hello, I lost my kid. Can you help me find him?", counterAudio);
                setTimeout(showMessage, 8 * sec, heroSpeech, "yeah ofcourse, what does he look like?", heroAudio);
                setTimeout(showMessage, 12 * sec, counterSpeech, "He is small, bronze and a bit silly", counterAudio);
                setTimeout(showMessage, 16 * sec, heroSpeech, "I can sure help you!", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 0; }, 21 * sec);
            }
            break;
    }

// raodsign dialogue
switch (e.target.id) {
    case "roadSignTriggerTop":
        showMessage(heroSpeech, "let's see what this says,", heroAudio);                
        setTimeout(1 * sec, counterSpeech, "", counterAudio);
        setTimeout(showMessage, 4 * sec, heroSpeech, "'go here right to find the gold dragon'", heroAudio);
    break;
    case "roadSignTriggerBottom":
        showMessage(heroSpeech, "let's see what this says,", heroAudio);                
        setTimeout(1 * sec, counterSpeech, "", counterAudio);
        setTimeout(showMessage, 4 * sec, heroSpeech, "'follow the path to find the garden and the camp'", heroAudio);    
    break;
}

// picking up the items
    switch (e.target.id) {
        case "redMushRoomTriggerOne":
            console.log("pick up a mushroom")
            changeInventory('mushroom', "add"); 
            gameState.mushroomsPickedUp = true;
            saveGameState(gameState);
            break;
    }
    
    switch (e.target.id) {
        case "redMushRoomTriggerTwo":
            console.log("pick up a mushroom")
            changeInventory('mushroom', "add");
            gameState.mushroomsPickedUp = true;
            saveGameState(gameState);
            break;
    }
 
    switch (e.target.id) {
        case "redMushRoomTriggerThree":
            console.log("pick up a mushroom")
            changeInventory('mushroom', "add");
            gameState.mushroomsPickedUp = true;
            saveGameState(gameState);
            break;
    }

    switch (e.target.id) {
        case "redMushRoomTriggerFour":
            console.log("pick up a mushroom")
            changeInventory('mushroom', "add");
            gameState.mushroomsPickedUp = true;
            saveGameState(gameState);
            break;
    }

    switch (e.target.id) {
        case "gardenBerryTriggerTop":
            console.log("you pick a berry")
            changeInventory('berry', "add");
            gameState.gardenBerry = true; 
            saveGameState(gameState);
            break;
    }

    switch (e.target.id) {
        case "gardenBerryTriggerBottom":
            console.log("you pick a berry")
            changeInventory('vegetable', "add");
            gameState.gardenBerry = true;
            saveGameState(gameState);
            break;
    }

// console.log tests
    switch (e.target.id){
        case "redMushRoomTriggerOne":
            console.log ("hmmmm yummy in my tummy, shrooms");
        break;
        case "redMushRoomTriggerTwo":
            console.log ("hmmmm yummy in my tummy, shrooms");
        break;
        case "redMushRoomTriggerThree":
            console.log ("hmmmm yummy in my tummy, shrooms");
        break;
        case "redMushRoomTriggerFour":
            console.log ("hmmmm yummy in my tummy, shrooms");
        break;
        case "gardenBerryTriggerTop":
            console.log ("this is the top berry bush");
        break;
        case "gardenBerryTriggerBottom":
            console.log ("this is the bottom berry bush");
        break;
        case "roadSignTriggerTop":
            console.log ("go here right to find the gold dragon")
        break;
        case "roadSignTriggerBottom":
            console.log ("go here left and follow the path to find the garden and home")
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

// a switch case to add or remove items in the array called inventory
    switch (action) {
        case 'add':
            if (!gameState.inventory.includes(itemName)) {
                gameState.inventory.push(itemName);
            }
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
 * this will show the dialogue and trigger the sound
 * @param {getElementById} targetBubble 
 * @param {string} message 
 * @param {getElementById} targetSound
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;    
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    mainTitle(hideMessage, 4 * sec, targetBubble, targetSound)
}

function showMessage(targetBubble, message, targetSound) {
    if (targetSound && typeof targetSound.play === 'function') {
        targetSound.currentTime = 0;
        targetSound.play();
    }

    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
}
/**
 * the name hideMessage kinda says it all                                                   
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.style.opacity = 0;
};

/**
 * 
 * @param {*} gameState 
 */
function saveGameState(gameState){
    localStorage.gameState = JSON.stringify(gameState)
};