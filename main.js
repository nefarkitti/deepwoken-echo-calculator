const echoCount = document.getElementById("echocount")
const PowerInpt = document.getElementById("powerinpt")
const modifCount = document.getElementById("modifier-total")

let showResetPopup = false;

function resetPopup() {
    const popup = document.getElementById("reset-popup");
    if (!popup) return;
    showResetPopup = !showResetPopup;
    if (showResetPopup) {
        popup.style = ""
    } else {
        popup.style = "display: none"
    }
}

let data = { // okay
    power: 0,
    // checkmarks
    caughtFish: false,
    refinedPureOre: false,
    consumedLotusFlask: false,
    bargainedShrines: false,
    unbounded: false,
    soulboundedWeapon: false,
    cookedMeal: false,
    modifiedMantra: false,
    wonArenaMatch: false,
    craftedMasterOutfit: false,
    bargainedMiserables: false,
    oath: false,
    murmur: false,
    usedEnchantStone: false,
    tradedLaplace: false,
    alloyUsed: false,
    dukeDefeated: false,
    primadonDefeated: false,
    ferrymanDefeated: false,
    kaidoDefeated: false,
    chaserDefeated: false,
    deepshore: false,
    defeatedEthiron: false,
    hellmode: false,
    hookless: false,
    resonance: false,
    bargainedYunshul: false,
    modifiers: []
}

let echoes = 0
let additive = 0
let modifier = 100

//let calc = 0.75 * PowerInpt.value
let calc = 0.75 * 0
echoes = Math.ceil(calc)
echoCount.innerText = parseInt(echoes) + additive
modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`



/*let initCheckboxes = document.querySelectorAll("input[type='checkbox']");
for (const checkbox of initCheckboxes) {
    console.log(checkbox.value)
    if (checkbox.checked) {
        console.log("YES!")
        additive += parseInt(checkbox.value)
    }
    echoCount.innerText = parseInt(echoes) + additive
    modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
}*/


document.querySelector("#powerinpt").addEventListener("input", test);

function test(e) {
    console.log("Detected an Update!\n")
    data.power = parseInt(PowerInpt.value)
    saveEverything()
    let calc = 0.75 * data.power
    echoes = Math.ceil(calc)

    echoCount.innerText = parseInt(echoes) + additive
    
    modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
}

let checkboxes = document.querySelectorAll("input[type='checkbox']");
for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", function() {  
        console.log(checkbox.value)
        if (checkbox.dataset.dataname) {
            data[checkbox.dataset.dataname] = checkbox.checked;
            saveEverything()
        }
        if (checkbox.checked) {
            console.log("YES!")
            
            additive += parseInt(checkbox.value)
        } else {
            additive -= parseInt(checkbox.value)
        }
        echoCount.innerText = parseInt(echoes) + additive
        modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
    })
}
let modifiers = document.querySelectorAll("[id='thing-item']");
for (const thinglol of modifiers) {
    thinglol.addEventListener("click", function(){  
        console.log(thinglol.classList.contains("thing-item-toggled"))
        if (thinglol.classList.contains("thing-item-toggled") == false) {
            modifier += parseFloat(thinglol.dataset.multiplier) * 100
            data.modifiers.push(thinglol.dataset.modifierid)
            saveEverything()
            thinglol.classList.add("thing-item-toggled");
        } else if (thinglol.classList.contains("thing-item-toggled") == true) {
            modifier -= parseFloat(thinglol.dataset.multiplier) * 100
            data.modifiers.splice(thinglol.dataset.modifierid)
            saveEverything()
            thinglol.classList.remove("thing-item-toggled");
        }
        modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
    })
}

function loadEverything() {
    // this parts gonna be the hardest!
    const getSave = localStorage.getItem("save");
    
    try {
        if (getSave != null) {
            data = JSON.parse(getSave); // magic things!
        }
        document.getElementById("powerinpt").value = data.power;
        for (const checkbox of checkboxes) {
            if (checkbox.dataset.dataname && data[checkbox.dataset.dataname] == true) {
                checkbox.checked = true
                additive += parseInt(checkbox.value)
                echoCount.innerText = parseInt(echoes) + additive
            } else {
                checkbox.checked = false
            }
        }
        for (const thinglol of modifiers) {
            if (thinglol.dataset.modifierid && data.modifiers.includes(thinglol.dataset.modifierid)) {
                modifier += parseFloat(thinglol.dataset.multiplier) * 100
                thinglol.classList.add("thing-item-toggled");
            }
        }
        let calc = 0.75 * data.power
        echoes = Math.ceil(calc)

        echoCount.innerText = parseInt(echoes) + additive
        modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
    } catch (e) {

    }
}
loadEverything()
function saveEverything() {
    localStorage.setItem("save", JSON.stringify(data));
}
let reset = false;
function resetEverything() {
    reset = true;
    localStorage.removeItem("save")
    //alert("Data has been reset! Reloading page")
    window.location.reload()
}

/*
window.addEventListener('beforeunload', function(e) {
    if (!reset) {
        e.preventDefault();
        e.returnValue = '';
        saveEverything()
        //alert("this is uh something!")
    }
})*/