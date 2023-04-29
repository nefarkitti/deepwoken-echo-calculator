const echoCount = document.getElementById("echocount")
const PowerInpt = document.getElementById("powerinpt")

let echoes = 0
let additive = 0

echoCount.innerText = echoes

document.querySelector("#powerinpt").addEventListener("input", test);

function test(e) {
    console.log("Detected an Update!\n")
    
    let calc = 0.75 * PowerInpt.value

    echoes = Math.ceil(calc)

    echoCount.innerText = parseInt(echoes) + additive
}

let checkboxes = document.querySelectorAll("input[type='checkbox']");
for (const checkbox of checkboxes) {
    checkbox.addEventListener("change", function(){  
        console.log(checkbox.value)
        if (checkbox.checked) {
            console.log("YES!")
            additive += parseInt(checkbox.value)
        } else {
            additive -= parseInt(checkbox.value)
        }
        echoCount.innerText = parseInt(echoes) + additive
    })
}