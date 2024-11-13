let rotations = []
let numbers = []
let rot_index = 0
let code_index = 0

let codes = []
let remake_code = []

let first_click = true
let timer = null
window.addEventListener('keyup', (ev) => {
    if (first_click) {
        first_click = false
        StartTimer(30)
    }
    switch (ev.key) {
        case 'd':
            if (rot_index >= 0 && rot_index < 19) {
                rot_index += 1;
                document.getElementById('code').style.transform = `rotate(-${rotations[rot_index]}deg)`
                if (numbers[rot_index] == codes[code_index]) {
                    playAudio('good')
                } else {
                    playAudio('bad')
                }
            } else {
                rot_index = 0
                document.getElementById('code').style.transform = `rotate(-${rotations[rot_index]}deg)`
                if (numbers[rot_index] == codes[code_index]) {
                    playAudio('good')
                } else {
                    playAudio('bad')
                }
            }
            break;
        case 'q':
            if (rot_index == 0) {
                rot_index = 19;
                document.getElementById('code').style.transform = `rotate(-${rotations[rot_index]}deg)`
                if (numbers[rot_index] == codes[code_index]) {
                    playAudio('good')
                } else {
                    playAudio('bad')
                }
            } else {
                rot_index -= 1;
                document.getElementById('code').style.transform = `rotate(-${rotations[rot_index]}deg)`
                if (numbers[rot_index] == codes[code_index]) {
                    playAudio('good')
                } else {
                    playAudio('bad')
                }
            }
            break;
        case 'z':
            if (numbers[rot_index] == codes[code_index]) {
                code_index += 1
                if (code_index == codes.length) {
                    clearTimeout(timer)
                    document.getElementById('moved').innerText = "WIN"
                    document.getElementById('code').style.transform = `rotate(0deg)`
                    setTimeout(() => {
                        generateCode()
                    }, 10 * 1000)
                }
            } else {
                document.getElementById('moved').innerText = "Perdu"
                setTimeout(() => {
                    generateCode()
                }, 10 * 1000)
                rot_index = 0
                document.getElementById('code').style.transform = `rotate(0deg)`
            }
            break;
    }
})

window.addEventListener('load', () => {
    rotations = []
    numbers = []
    index = 0
    for (let i = 0; i <= 100; i = i + 5) {
        numbers.push(i)
        let rotation = 360 / 100
        rotations.push(i * rotation)
    }
    generateCode()
})
let possibilities = [3, 4]
function generateCode() {
    document.getElementById('moved').innerText = ""
    codes = []
    let code_length = possibilities[Math.floor(Math.random() * possibilities.length)]
    document.getElementById('codes_length').innerText = code_length + " chiffres a retrouvé"
    for (let i = 0; i < code_length; i++) {
        let code = numbers[Math.floor(Math.random() * numbers.length)];
        codes.push(code)
    }
    console.log("new code")
    console.log(codes)
    console.log("")
    first_click = true
    remake_code = []
    rot_index = 0;
    code_index = 0;
}
function playAudio(sound) {
    var audio = new Audio(`./${sound}.wav`);
    if (sound == "good") {
        audio.playbackRate = 1.5;
    } else {
        audio.playbackRate = 2;
    }
    audio.play();
}
function StartTimer(time) {
    document.getElementById('moved').innerText = 'Timer lancé : ' + time + ' secondes restantes pour finir !'
    timer = setTimeout(() => {
        document.getElementById('moved').innerText = "Temps écoulé !";
        document.getElementById('code').style.transform = `rotate(0deg)`
        clearTimeout(timer)
        setTimeout(() => {
            generateCode()
        }, 10 * 1000)
    }, time * 1000);
}