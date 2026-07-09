let menuOpen = false;

function toggleNav() {

    if (!menuOpen) {
        document.getElementById("menu").style.width = "30%";
        document.getElementById("navBtn").style.color = "black";
        document.getElementById("navBtn").style.backgroundColor = "white";
        document.getElementById("navBtn").style.borderColor = "black";
        document.getElementById("navBtn").innerHTML = "Close";
        menuOpen = true;
    } else {
        document.getElementById("menu").style.width = "0%";
        document.getElementById("navBtn").style.color = "white";
        document.getElementById("navBtn").style.backgroundColor = "black";
        document.getElementById("navBtn").style.borderColor = "white";
        document.getElementById("navBtn").innerHTML = "Open";
        menuOpen = false;
    }
}