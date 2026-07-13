let menuOpen = false;

function toggleNav() {

    if (!menuOpen) {
        document.getElementById("menu").style.width = "30%";
        document.getElementById("bar").classList.add("active");
        menuOpen = true;
    } else {
        document.getElementById("menu").style.width = "0%";
        document.getElementById("bar").classList.remove("active");
        menuOpen = false;
    }
}