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

    const paragraph = document.querySelectorAll(".fam-row-text p");
    paragraph.forEach(p => {
        p.style.maxHeight = "0";
        p.style.overflow = "hidden";
        p.style.opacity = "0";
        p.style.padding = "0 20px";
        p.style.transition = "max-height 0.6s ease, opacity 0.5s ease, padding 0.4s ease";
    });

    const heading = document.querySelectorAll(".fam-row-text h2 span");
    heading.forEach(span => {
        span.style.cursor = "pointer";

        span.addEventListener("mouseenter", () => {
            span.style.transform = "scale(1.05)";
        });
        
        span.addEventListener("mouseleave", () => {
            span.style.transform = "scale(1)";
        });
        
        span.addEventListener("click", () => {
            const parentBlock = span.closest(".fam-row-text");
            const p = parentBlock.querySelector("p");
            const isOpen = p.style.opacity === "1";
            
            if (isOpen) {
                p.style.maxHeight = "0";
                p.style.opacity = "0";
                p.style.padding = "0 20px";
            } else {
                p.style.maxHeight = "2000px";
                p.style.opacity = "1";
                p.style.padding = "20px";
            }
        });
    });

});