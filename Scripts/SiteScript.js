// Code for main body content
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

        if (!entry.isIntersecting) {
            entry.target.classList.remove("show");
        }
    });
});

const projects = document.querySelectorAll(".project");

projects.forEach(project => {
    observer.observe(project);
});