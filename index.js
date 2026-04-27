window.addEventListener("load", ()=>{

    let intro = document.querySelector(".intro-slide");

    setTimeout(()=>{
        intro.style.top="-100%"
    }, 2000)

    const sections = document.querySelectorAll("#webpage > section");
    const navLinks = document.querySelectorAll(".nav-bar a[href^='#']");
    let currentOpenId = null;

    sections.forEach(sec => {
        sec.style.display = "none";
    });


    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").replace("#", "");

            if (currentOpenId === targetId) {
                document.getElementById(targetId).style.display = "none";
                currentOpenId = null;
                return;
            }

            sections.forEach(sec => {
                sec.style.display = "none";
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = "block";
                currentOpenId = targetId;
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
            }
        );
    });

});