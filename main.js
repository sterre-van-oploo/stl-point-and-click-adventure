document.getElementById("mainTitle").innerText = "Point and Click adventure game";

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


if(gameState.lostDragonFound) {
    document.getElementById("lostDragon").remove(); 
}

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

    switch (e.target.id) {
        case "lostDragonTrigger":
            console.log("pick up lostDragonTrigger")
            document.getElementById("lostDragon").remove();
            changeInventory('lostDragonTrigger', "add");//QUESTION QUESTION QUESTION!!! Is there a way that I can rename just the thing that goes in the inventory? (ALL THE QUESTIONS AB THIS WILL BE MARKED WITH A *)
            gameState.lostDragonFound = true;
            saveGameState(gameState);
            break;

        case "goldenDragonTrigger":
            if (checkItem("lostDragonTrigger")) {
                showMessage(heroSpeech, "here he is!", heroAudio);
                console.log("you give the baby back to the dragon");
                changeInventory('lostDragonTrigger', "remove");
            } else if (checkItem("redMushRoomTriggerOne", "redMushRoomTriggerTwo", "redMushRoomTriggerThree", "redMushRoomTriggerFour", "gardenBerryTriggerTop", "gardenBerryTriggerBottom")) {
                showMessage(counterSpeech, "Hey this is not my child?! but thanks for the food tho... scrumf scrumf I phwas hungphry", counterAudio);
                changeInventory("redMushRoomTriggerOne", "redMushRoomTriggerTwo", "redMushRoomTriggerThree", "redMushRoomTriggerFour", "gardenBerryTriggerTop", "gardenBerryTriggerBottom", "remove");  
                console.log("Hey this is not my child?! but thanks for the food tho... scrumf scrumf hmm I phwas hungphry", heroAudio);
            } else {
                showMessage(heroSpeech, "Hi there!... oh, why do you look so sad?", heroAudio);
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 4 * sec, counterSpeech, "oh, hello, I lost my kid. Can you help me find him?", counterAudio);
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 8 * sec, counterAvatar, "He is small, bronze and a bit silly", counterAudio);
                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                setTimeout(showMessage, 12 * sec, heroSpeech, "I can sure help you!", heroAudio);
            }
            break;
    }

        showMessage(heroSpeech, "Hey a statue.. Looks okay.", heroAudio);
        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
        setTimeout(showMessage, 4.1 * sec, counsterSpeech, "I can talk you know..", counterAudio);
        setTimeout(showMessage, 8.1 * sec, heroSpeech, "Wait what? That's not normal", heroAudio);
        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "Just shut up.. You want a key.. Check the graves.", counterAudio);
        setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);




//     switch (e.target.id) {
//     case "goldenDragonTrigger":
//         if (checkItem("lostDragonTrigger")) {
//             showMessage(heroSpeech, "here he is!", heroAudio);
//             console.log("you give the baby back to the dragon");
//             changeInventory('lostDragonTrigger', "remove");
//         } else if (checkItem("redMushRoomTriggerOne", "redMushRoomTriggerTwo", "redMushRoomTriggerThree", "redMushRoomTriggerFour", "gardenBerryTriggerTop", "gardenBerryTriggerBottom")) {
//             showMessage(counterSpeech, "Hey this is not my child?! but thanks for the food tho... scrumf scrumf I phwas hungphry", counterAudio);
//             changeInventory("redMushRoomTriggerOne", "redMushRoomTriggerTwo", "redMushRoomTriggerThree", "redMushRoomTriggerFour", "gardenBerryTriggerTop", "gardenBerryTriggerBottom", "remove");  
//             console.log("Hey this is not my child?! but thanks for the food tho... scrumf scrumf I phwas hungphry", heroAudio);
//         } else {
//             showMessage(heroSpeech, "Hi there!... oh, why do you look so sad?", heroAudio);
//             setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
//             setTimeout(showMessage, 4 * sec, counterSpeech, "oh, hello, I lost my kid. Can you help me find him?", counterAudio);
//             setTimeout(showMessage, 8 * sec, counterAvatar, "He is small, bronze and a bit silly"), counterAudio;
//             setTimeout(showMessage, 12 * sec, heroSpeech, "I can sure help you!", heroAudio);
//             setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
//         }
//         break;
// }


switch (e.target.id) {
    case "roadSignTriggerTop":
        console.log ("go here right to find the gold dragon")
    break;
    case "roadSignTriggerBottom":
        console.log ("go here left and follow the path to find the garden and home")
    break;
}
        
    switch (e.target.id) {
        case "redMushRoomTriggerOne":
            console.log("pick up a mushroom")
            // If I have time to spare I can make it so the mushrooms actually dissapear
            changeInventory('redMushRoomTriggerOne', "add"); //*
            gameState.mushroomsPickedUp = true;
            saveGameState(gameState);
            break;
    }
    
    switch (e.target.id) {
        case "redMushRoomTriggerTwo":
            console.log("pick up a mushroom")
            // If I have time to spare I can make it so the mushrooms actually dissapear
            changeInventory('redMushRoomTriggerOne', "add");//*
            gameState.mushroomsPickedUp = true;
            saveGameState(gameState);
            break;
    }
 
    switch (e.target.id) {
        case "redMushRoomTriggerThree":
            console.log("pick up a mushroom")
            // If I have time to spare I can make it so the mushrooms actually dissapear
            changeInventory('redMushRoomTriggerOne', "add");//*
            gameState.mushroomsPickedUp = true;
            saveGameState(gameState);
            break;
    }

    switch (e.target.id) {
        case "redMushRoomTriggerFour":
            console.log("pick up a mushroom")
            // If I have time to spare I can make it so the mushrooms actually dissapear
            changeInventory('redMushRoomTriggerOne', "add");//*
            gameState.mushroomsPickedUp = true;
            saveGameState(gameState);
            break;
    }

    switch (e.target.id) {
        case "gardenBerryTriggerTop":
            console.log("you pick a berry")
            changeInventory('gardenBerryTriggerTop', "add");//*
            gameState.gardenBerry = true; 
            saveGameState(gameState);
            break;
    }

    switch (e.target.id) {
        case "gardenBerryTriggerBottom":
            console.log("you pick a berry")
            changeInventory('gardenBerryTriggerBottom', "add");//*
            gameState.gardenBerry = true;
            saveGameState(gameState);
            break;
    }

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
        // case "lostDragonTrigger":
        //     console.log ("this is the lost dragon");
        // break;
        // case "goldenDragonTrigger":
        //     console.log ("mruwah I'm a big dragon");
        // break;
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
// function showMessage(targetBubble, message, targetSound) {
//     targetSound.currentTime = 0;    
//     targetSound.play();
//     targetBubble.innerText = message;
//     targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound) //GITHUB FIX HIDEMESSAGE
// }

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
 *                                                   
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

// ITEM MUST INTERACT WITH OTHER ITEMS
// the dragon: its okay the soup will warm in my stomach
// you are going to cook the soup over the fire in the camp