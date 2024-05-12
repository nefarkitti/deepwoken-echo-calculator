const echoCount = document.getElementById("echocount")
const PowerInpt = document.getElementById("powerinpt")
const modifCount = document.getElementById("modifier-total")
const finalRank = document.getElementById("finalrank")
const powerIndicator = document.getElementById("powerIndicator")
const ranktext = document.getElementById("ranktext")
const percentage = document.getElementById("percentage")
const powertriumph = document.getElementById("powertriumph")
const savesPopup = document.getElementById("saves-popup")
const popup = document.getElementById("reset-popup");
const savesCointainer = document.getElementById("savesContainer")
const createpopup = document.getElementById("create-popup")
const editpopup = document.getElementById("edit-popup")

const buildName = document.getElementById("buildName")
const buildLink = document.getElementById("buildLink")

savesCointainer.innerHTML = ``

let modifierToggle = 0

let showResetPopup = false;
let trashmode = false
let editmode = false
let trashing
let editting

function trashToggle(bool, thing) {
    trashmode = bool
    trashing = thing
}
function editToggle(bool, thing) {
    editmode = bool
    editting = thing
}

function resetPopup() {
    hidePopups()
    popup.style.display = ``
}
function editPopup() {
    hidePopups()

    let build = findSavedBuildWithIndex(editting)

    document.getElementById("editbuildName").value = build.buildname
    document.getElementById("editbuildLink").value = build.buildurl

    editpopup.style.display = ``
}


function saveEdit() {
    let build = findSavedBuildWithIndex(editting)

    if (document.getElementById("editbuildName").value.length < 3) return


    savedBuilds.builds[savedBuilds.builds.indexOf(build)].buildname = document.getElementById("editbuildName").value
    savedBuilds.builds[savedBuilds.builds.indexOf(build)].buildurl = document.getElementById("editbuildLink").value

    //saveEverything()
    loadSave(savedBuilds.builds[savedBuilds.builds.indexOf(build)].buildid)
}

function createPopup() {
    hidePopups()
    buildName.value = ``
    buildLink.value = ``
    createpopup.style.display = ``
}
function hidePopups() {
    popup.style.display = `none`
    savesPopup.style.display = `none`
    createpopup.style.display = `none`
    editpopup.style.display = `none`
}

let savedBuilds = {
    "currentBuild": 0,
    "builds": []
}
let data = { // okay
    buildname: "default",
    buildrank: 0,
    buildid: 0,
    buildurl: "",
    power: 1,
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
let defaultData = {}
Object.assign(defaultData, data)


let echoes = 0
let additive = 0
let modifier = 100

//let calc = 0.75 * PowerInpt.value
let calc = 0.75 * 0
echoes = Math.ceil(calc)
echoCount.innerText = parseInt(echoes) + additive
modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
finalRank.innerHTML = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
percentage.innerText = `(${Math.round(((parseInt(echoes) + additive)/140)*100)}%)`

function checkRank(amount) {
    let rank = "E"
    ranktext.classList.remove("wrank")
    if (amount >= 441  && (parseInt(echoes) + additive) >= 140) {
        ranktext.classList.add("wrank")
        return "W"
    }
    if (amount >= 140 && (parseInt(echoes) + additive) >= 140) {
        return "S"
    }
    if (amount >= 115 && (parseInt(echoes) + additive) >= 115) {
        return "A"
    }
    if (amount >= 90 && (parseInt(echoes) + additive) >= 90) {    
        return "B"
    }
    if (amount >= 60 && (parseInt(echoes) + additive) >= 60) {
        return "C"
    }
    if (amount >= 30 && (parseInt(echoes) + additive) >= 30) {
        return "D"
    }
    if (amount >= 0 && (parseInt(echoes) + additive) >= 0) {
        return "E"
    }
}

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
    powerIndicator.innerHTML = data.power
    data.buildrank = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
    saveEverything()
    let calc = 0.75 * (data.power-1)
    echoes = Math.ceil(calc)

    if (data.power == 20) {
        powertriumph.classList.add("done")
    } else {
        powertriumph.classList.remove("done")
    }

    echoCount.innerText = parseInt(echoes) + additive
    
    modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`

    finalRank.innerHTML = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))

    percentage.innerText = `(${Math.round(((parseInt(echoes) + additive)/140)*100)}%)`
}

let checkboxes = document.querySelectorAll("#triumph");
for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", function() {  
        console.log(checkbox.dataset.value)
        let checked = false
        if (!checkbox.classList.contains("done")) {
            console.log("YES!")
            checked = true
            checkbox.classList.add("done");
            additive += parseInt(checkbox.dataset.value)
        } else {
            checkbox.classList.remove("done");
            checked = false
            additive -= parseInt(checkbox.dataset.value)
        }
        if (checkbox.dataset.dataname) {
            data[checkbox.dataset.dataname] = checked;
        }
        echoCount.innerText = parseInt(echoes) + additive
        modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
        finalRank.innerHTML = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        percentage.innerText = `(${Math.round(((parseInt(echoes) + additive)/140)*100)}%)`
        data.buildrank = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        saveEverything()
    
    })
}
let modifiers = document.querySelectorAll("[id='thing-item']");
for (const thinglol of modifiers) {
    thinglol.addEventListener("click", function(){  
        console.log(thinglol.classList.contains("thing-item-toggled"))
        if (thinglol.classList.contains("thing-item-toggled") == false) {
            modifier += parseFloat(thinglol.dataset.multiplier) * 100
            data.modifiers.push(thinglol.dataset.modifierid)
            thinglol.classList.add("thing-item-toggled");
        } else if (thinglol.classList.contains("thing-item-toggled") == true) {
            modifier -= parseFloat(thinglol.dataset.multiplier) * 100
            data.modifiers.splice(thinglol.dataset.modifierid)
            thinglol.classList.remove("thing-item-toggled");
        }
        modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
        finalRank.innerHTML = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        percentage.innerText = `(${Math.round(((parseInt(echoes) + additive)/140)*100)}%)`

        data.buildrank = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        saveEverything()
    
    })
}

function toggleAll() {
    for (const checkbox of checkboxes) {
        if (!checkbox.classList.contains("done")) {
            console.log("YES!")
            checked = true
            checkbox.classList.add("done");
            additive += parseInt(checkbox.dataset.value)
        }
        data[checkbox.dataset.dataname] = checked;
        echoCount.innerText = parseInt(echoes) + additive
        modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
        finalRank.innerHTML = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        percentage.innerText = `(${Math.round(((parseInt(echoes) + additive)/140)*100)}%)`
        PowerInpt.value = 20
        data.buildrank = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        test()
        saveEverything()
    }
}
function toggleAllModifiers() {
    for (const thinglol of modifiers) {
        console.log(thinglol.classList.contains("thing-item-toggled"))
        if (thinglol.classList.contains("thing-item-toggled") == false) {
            modifier += parseFloat(thinglol.dataset.multiplier) * 100
            data.modifiers.push(thinglol.dataset.modifierid)
            thinglol.classList.add("thing-item-toggled");
        } else if (thinglol.classList.contains("thing-item-toggled") == true) {
            modifier -= parseFloat(thinglol.dataset.multiplier) * 100
            delete data.modifiers[data.modifiers.indexOf(thinglol.dataset.modifierid)]
            thinglol.classList.remove("thing-item-toggled");
        }
        modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
        finalRank.innerHTML = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        percentage.innerText = `(${Math.round(((parseInt(echoes) + additive)/140)*100)}%)`
        data.buildrank = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        saveEverything()
    }
}

function loadEverything() {
    // this parts gonna be the hardest!
    const getSave = localStorage.getItem("buildtriumphs");
    const getBuildSaves = localStorage.getItem("buildtriumphsSaves")
    
    try {
        if (getSave != null && getBuildSaves != null) {
            data = JSON.parse(getSave); // magic things!
            savedBuilds = JSON.parse(getBuildSaves)
        }

        document.getElementById("powerinpt").value = data.power;
        document.getElementById("legacy").innerHTML = `${data.buildname}'s Legacy`
        if (data.buildname.length <= 1) {
            document.getElementById("legacy").innerHTML = `Your Legacy`
        }

        for (const checkbox of checkboxes) {
            if (checkbox.dataset.dataname && data[checkbox.dataset.dataname] == true) {
                checkbox.classList.add("done");
                additive += parseInt(checkbox.dataset.value)
                echoCount.innerText = parseInt(echoes) + additive
            } else {
                checkbox.classList.remove("done");
            }
        }

        for (const thinglol of modifiers) {
            if (thinglol.dataset.modifierid && data.modifiers.includes(thinglol.dataset.modifierid)) {
                modifier += parseFloat(thinglol.dataset.multiplier) * 100
                thinglol.classList.add("thing-item-toggled");
            }
        }

        let calc = 0.75 * (data.power-1)
        echoes = Math.ceil(calc)

        echoCount.innerText = parseInt(echoes) + additive
        modifCount.innerHTML = `with modifiers: ${parseInt(echoes) + additive} x ${modifier / 100} = ${Math.round((parseInt(echoes) + additive) * (modifier / 100))}`
        finalRank.innerHTML = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))
        percentage.innerText = `(${Math.round(((parseInt(echoes) + additive)/140)*100)}%)`
        powerIndicator.innerHTML = data.power
        data.buildrank = checkRank(Math.round((parseInt(echoes) + additive) * (modifier / 100)))

    } catch (e) {

    }
}

function findSavedBuildWithIndex(index) {
    let foundBuild
    savedBuilds.builds.forEach(build=>{
        if (build.buildid == index) {
            console.log("found build!!")
            foundBuild = build
        }
    })
    return foundBuild
}

//saveEverything()
loadEverything()
function saveEverything() {
    localStorage.setItem("buildtriumphs", JSON.stringify(data));

    if (savedBuilds.builds[0]) {
        console.log("default exists") 
    } else {
        console.log("build data not found, inserting new")
        savedBuilds.builds.push(data)
    }

    let build = findSavedBuildWithIndex(savedBuilds.currentBuild)
    //console.log(build)

    console.log(`SAVING TO ${savedBuilds.currentBuild}`)
    if (build) {
        Object.assign(build, data)
    }

    /*savedBuilds.forEach(build=>{
        if (build.id == data.buildid) {

            build.rank = data.buildrank

            Object.assign(savedBuilds[savedBuilds.indexOf(build)].triumphs, data)

            return
        }
    })*/


    localStorage.setItem("buildtriumphsSaves", JSON.stringify(savedBuilds));
}
let reset = false;
function resetEverything() {
    reset = true;
    localStorage.removeItem("buildtriumphs")
    localStorage.removeItem("buildtriumphsSaves")
    //alert("Data has been reset! Reloading page")
    window.location.reload()
}

function createSave() {

    if (buildName.value.length < 3) return;

    let now = Date.now()

    defaultData.buildname = buildName.value
    defaultData.buildurl = buildLink.value
    defaultData.buildid = now

    savedBuilds.builds.push(defaultData)

    savedBuilds.currentBuild = now

    loadSave(now)

}


function handleClick(buildid) {
    if (trashmode == true) {
        let build = findSavedBuildWithIndex(buildid)
        
        if (build.buildname == "default") return;

        savedBuilds.builds.splice(savedBuilds.builds.indexOf(build), 1)

        loadSave(0)

    } else if (editmode == true) {

        let build = findSavedBuildWithIndex(buildid)
        
        editPopup()

    } else {
        loadSave(buildid)
    }
}

function showSaved() {
    hidePopups()
    savesPopup.style.display = ``
    savesCointainer.innerHTML = ``

    savedBuilds.builds.forEach(build=>{

        let containerdiv = document.createElement("div")

        let span = document.createElement("span")
        span.id = `savedbuild-${build.buildurl}`
        span.innerHTML = build.buildname

        let btns = document.createElement("span")
        btns.classList.add("btns")

        let edit = document.createElement("span")

        let bin = document.createElement("span")
        if (build.buildname != "default") {
            edit.innerHTML = `<i class="fa-solid fa-pencil"></i>`
            bin.innerHTML = `<i class="fa-solid fa-trash-can"></i>`

            bin.setAttribute("onmouseenter", `trashToggle(true, "${build.buildid}")`)
            bin.setAttribute("onmouseleave", `trashToggle(false, "${build.buildid}")`)

            edit.setAttribute("onmouseenter", `editToggle(true, "${build.buildid}")`)
            edit.setAttribute("onmouseleave", `editToggle(false, "${build.buildid}")`)
        }

        containerdiv.appendChild(span)

        containerdiv.appendChild(btns)
        if (build.buildname != "default") {
            btns.appendChild(edit)
            btns.appendChild(bin)
        }

        savesCointainer.appendChild(containerdiv)

        console.log("test")

        containerdiv.setAttribute("onclick", `handleClick("${build.buildid}", "${build.url}")`)

        console.log("saved build")
        console.log(build.buildname, build.buildid)
    })
}
function loadSave(index) {
    let found = ""

    savedBuilds.currentBuild = index
    console.log("loading save")
    console.log(index)
    Object.assign(data, findSavedBuildWithIndex(index))
    saveEverything()
    window.location.href = `index.html`
    window.location.reload()
}

function findBuildThroughURL(url) {
    let foundBuild
    savedBuilds.builds.forEach(build=>{
        if (build.buildurl == url) {
            console.log("found build!!")
            foundBuild = build
        }
    })
    return foundBuild
}

function loadSaveFromURL(url, params) {

    if (!findBuildThroughURL(url)) {
        createPopup()
        buildName.value = params
        buildLink.value = url
    }

    /*let found = false
    savedBuilds.forEach(build => {
        if (build.url == url) {
            console.log("found build!")
            found = true
            return
        }
    })

    if (found == false) {

        createPopup()
        buildName.value = params
        buildLink.value = url

    }*/

}

let windowIndex = window.location.search
const urlParams = new URLSearchParams(windowIndex);

try {
    if (urlParams.get("url").length > 1) {
        loadSaveFromURL(`https://deepwoken.co/builder?id=${urlParams.get("url")}`, urlParams.get("url"))
    }
} catch (e) {
    console.log(e)
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