// Code for main body content

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
        console.log(entry.intersectionRatio);
    });
}, {
    rootMargin: "-400px 0px -300px 0px"
});

const projects = document.querySelectorAll(".project");

projects.forEach(project => {
    observer.observe(project);
});