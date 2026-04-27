window.addEventListener("load", ()=>{

    let name = document.querySelector(".name")
    let intro = document.querySelector(".intro-loader");

    setTimeout(()=>{
        name.style.opacity='1'
        name.style.transform="translateY(0)"
    }, 300)

    setTimeout(()=>{
        intro.style.top="-100%"
    }, 2000)

    const sections = document.querySelectorAll("#webpage > section");
    const navLinks = document.querySelectorAll(".nav-bar a[href^='#']");

    sections.forEach(sec => {
        sec.style.display = "none";
        sec.style.transition = "opacity 0.4s ease";
        sec.style.opacity = "0";
    });


    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").replace("#", "");
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                sections.forEach(sec => {
                    sec.style.display = "none";
                    sec.style.opacity = "0";
                });

                targetSection.style.display = "block";
                setTimeout(() => {
                    targetSection.style.opacity = "1";
                }, 10);

                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

});