const phrases = [
    "Web Developer",
    "AI Enthusiast",
    "Student",
    "Problem Solver"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
    current = phrases[i];

    if (!isDeleting) {
        document.getElementById("typed-text").innerText = current.substring(0, j++);
        if (j > current.length) {
            isDeleting = true;
            setTimeout(type, 1000);
            return;
        }
    } else {
        document.getElementById("typed-text").innerText = current.substring(0, j--);
        if (j === 0) {
            isDeleting = false;
            i = (i + 1) % phrases.length;
        }
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();