window.addEventListener("load", ()=>{

    let intro = document.querySelector(".intro-slide");

    setTimeout(()=>{
        intro.style.top="-100%"
    }, 2000)

    const sections = document.querySelectorAll("#webpage > section");
    const navLinks = document.querySelectorAll(".nav-bar a[href^='#']");
    let openId = null;

    sections.forEach(sec => {
        sec.style.display = "block";
        sec.style.overflow = "hidden";
        sec.style.transition = "max-height 0.5s ease, opacity 0.5s ease";
        sec.style.maxHeight = "0";
        sec.style.opacity = "0";
    });

    function openSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        targetSection.style.display = "block";
        targetSection.getBoundingClientRect();

        targetSection.style.maxHeight = targetSection.scrollHeight + "px";
        targetSection.style.opacity = "1";
        openId = targetId;

        setTimeout(() => {
            targetSection.scrollIntoView({behavior: "smooth"});
        }, 200);
    }

    function closeSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        targetSection.style.maxHeight = "0";
        targetSection.style.opacity = "0";

        setTimeout(() => {
            targetSection.style.display = "none";
        }, 500);

        openId = null;
    }


    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").replace("#", "");

            if (openId === targetId) {
                closeSection(targetId);
                return;
            }

            if (openId) {
                closeSection(openId);
            }

            setTimeout(() => {
                openSection(targetId);
            }, openId ? 200 : 0);
            }
        );
    });

});