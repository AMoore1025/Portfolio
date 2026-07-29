// Code to toggle galaxy settings menu
let isHidden = true;

function toggleMenu() {
    if (isHidden == true) {
        document.getElementById("slider").classList.remove("slideHide");
        isHidden = false;
    } else {
        document.getElementById("slider").classList.add("slideHide");
        isHidden = true;
    }

    console.log("Im running");
}

// Code for main body content

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, {
    //rootMargin: "-400px 0px -300px 0px"
    threshold: 0.6
});

const projects = document.querySelectorAll(".project");

projects.forEach(project => {
    observer.observe(project);
});