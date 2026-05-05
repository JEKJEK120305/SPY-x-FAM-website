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

    const canvas = document.querySelector('.ca');
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    window.addEventListener('resize', () => { resize(); buildScene(); });

    const wdth = () => window.innerWidth;
    const hght = () => window.innerHeight;

    let mouse = { x: wdth() / 2, y: hght() / 2};
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    let stars = [];
    function showStars() {
        return {
            x: Math.random() * wdth(),
            y: Math.random() * hght() * 0.55,
            r: Math.random() * Math.PI * 2
        };
    }

    let petals = [];
    function makePetal() {
        return {
            x: Math.random() * wdth() *1.2 - wdth() * 0.1,
            y: -20 - Math.random() * 200,
            size: 4 + Math.random() * 7,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.04,
            vx: -0.6 + Math.random() * 0.4,
            vy: 0.6 + Math.random() * 1.0,
            swing: Math.random() * Math.PI * 2,
            swingSpeed: 0.015 + Math.random() * 0.02,
            alpha: 0.6 + Math.random() * 0.4,
            hue: 340 + Math.random() * 20,
            type: Math.floor(Math.random() * 3)
        };
    }

    function scene() {
        stars = Array.from({ length: 80 }, showStars);
        petals = Array.from({ length: 55 }, makePetal);
    }

    scene();

    function drawMoon(t) {
        const mx = wdth() * 0.78 + Math.sin(t * 0.0003) * 6;
        const my = hght() * 0.14 + Math.cos(t * 0.0004) * 4;
        const mr = Math.min(wdth(), hght()) * 0.07;

        ctx.save();
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = '#fff8e7';
        ctx.beginPath();
        ctx.arc(mx, my, mr, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.08;
        ctx.strokeStyle = '#fff8e7';
        ctx.lineWidth = mr * 0.4;
        ctx.beginPath();
        ctx.arc(mx, my, mr * 1.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }

    function mountains() {
        const layers = [
            { color: '#1a0a2e', alpha: 1.0, scale: 1.0, yOff: 0 },
            { color: '#2d1040', alpha: 0.85, scale: 0.85, yOff: hght() * 0.06 },
            { color: '#3d1855', alpha: 0.6, scale: 0.7, yOff: hght() * 0.12 },
        ];
        const peaks = [0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1.0];
        const height = [0.42, 0.28, 0.38, 0.22, 0.35, 0.30, 0.45];

        layers.forEach(l => {
            ctx.save();
            ctx.globalAlpha = l.alpha;
            ctx.fillStyle = l.color;
            ctx.beginPath();
            ctx.moveTo(0, hght());
            ctx.lineTo(0, hght() * (1 - height[0] * l.scale) + l.yOff);
            
            for (let i = 0; i < peaks.length - 1; i++) {
                const x1 = peaks[i] * wdth(), y1 = hght() * (1 - height[i] * l.scale) + l.yOff;
                const x2 = peaks[i+1] * wdth(), y2 = hght() * (1 - height[i + 1] * l.scale) + l.yOff;
                const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - hght() * 0.04 * l.scale;
                
                ctx.quadraticCurveTo(mx, my, x2, y2);
            
            }
            
            ctx.lineTo(wdth(), hght()); ctx.closePath(); ctx.fill();
            ctx.restore();
        });
    }

    function drawTorii() {
        const cx = wdth() * 0.5, base = hght() * 0.88;
        const w = Math.min(wdth() * 0.32, 180);
        const beam = 10, cap = 14, h = w * 1.1;

        ctx.save();
        ctx.globalAlpha = 0.13;
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(cx - w / 2 - beam / 2, base - h, beam, h);
        ctx.fillRect(cx + w / 2 - beam / 2, base - h, beam, h);
        ctx.fillRect(cx - w / 2 - cap, base - h + cap * 0.6, w + cap * 2, beam);
        ctx.fillRect(cx - w / 2 - cap * 0.5, base - h + cap * 2.2, w + cap, beam * 0.75);
        ctx.globalAlpha = 0.06;
        ctx.fillRect(cx - w / 2 - cap * 1.4, base - h - cap * 0.5, w + cap * 2.8, cap * 1.2);
        ctx.restore();
    }

    function drawTree() {
        const tx = wdth() * 0.08, ty = hght();
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = '#4a1528';
        ctx.lineCap = 'round';

        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.quadraticCurveTo(tx + 10, ty - hght() * 0.3, tx + 25, ty - hght() * 0.48);
        ctx.stroke();

        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(tx + 25, ty - hght() * 0.48);
        ctx.quadraticCurveTo(tx + 55, ty - hght() * 0.58, tx + 80, ty - hght() * 0.52);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(tx + 25, ty - hght() * 0.48);
        ctx.quadraticCurveTo(tx, ty - hght() * 0.62, tx - 20, ty - hght() * 0.56);
        ctx.stroke();

        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(tx + 80, ty - hght() * 0.52);
        ctx.quadraticCurveTo(tx + 105, ty - hght() * 0.62, tx + 90, ty - hght() * 0.68);
        ctx.stroke();
        ctx.restore();
    }

    function drawPetalShape(p) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha * 0.85;
        ctx.fillStyle = `hsl(${p.hue}, 70%, 85%)`;

        if (p.type === 0) {
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.type === 1) {
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.bezierCurveTo( p.size * 0.8, -p.size * 0.5, p.size * 0.6, p.size *0.6, 0, p.size);
            ctx.bezierCurveTo( -p.size * 0.6, p.size *0.6, -p.size * 0.8, -p.size *0.5, 0, -p.size);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 0.5, p.size, Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    let frame = 0;

    function draw(t) {
        frame++;
        
        ctx.clearRect(0, 0, wdth(), hght());

        const sky = ctx.createLinearGradient(0, 0, 0, hght());

        sky.addColorStop(0, '#0a0015');
        sky.addColorStop(0.45, '#1c0535');
        sky.addColorStop(0.75, '#3d1040');
        sky.addColorStop(1, '#6b2255');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, wdth(), hght());

        stars.forEach(s => {
            s.phase += 0.015;
            const a = 0.3 + 0.7 * Math.abs(Math.sin(s.phase));
            ctx.save(); ctx.globalAlpha = a * 0.6; ctx.fillStyle = '#fff8e7';
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });

        drawMoon(t);
        mountains();
        drawTree();
        drawTorii();

        petals.forEach(p => {
            p.swing += p.swingSpeed;
            p.x += p.vx + Math.sin(p.swing) * 0.5 + (mouse.x - wdth() / 2) * 0.0008;
            p.y += p.vy;
            p.rot += p.rotSpeed;
            if (p.y > hght() + 30) {
                p.y = -20;
                p.x = Math.random() * wdth() * 1.2 - wdth() * 0.1;
            }
            drawPetalShape(p);
        });

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
});