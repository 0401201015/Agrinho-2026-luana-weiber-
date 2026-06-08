/* =====================================================
   AGROWEIBER - SCRIPT.JS
   Produzir hoje, preservar para o amanhã
===================================================== */

/* =====================================================
   MENU MOBILE
===================================================== */

const menuBtn = document.querySelector(".menu-mobile");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {
        menuBtn.innerHTML = "✖";
    } else {
        menuBtn.innerHTML = "☰";
    }
});

/* Fecha o menu ao clicar em um link */

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuBtn.innerHTML = "☰";
    });
});

/* =====================================================
   ANIMAÇÃO REVEAL AO SCROLL
===================================================== */

const revealElements = document.querySelectorAll(
    ".section, .stat-card, .info-card, .timeline-item, .content-box"
);

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {
            element.classList.add("active");
            element.classList.add("reveal");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =====================================================
   CONTADORES ANIMADOS
===================================================== */

const counters = document.querySelectorAll(".counter");

function startCounters() {

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = target / 120;

        const updateCounter = () => {

            if (current < target) {

                current += increment;

                counter.innerText = Math.ceil(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target + "+";

            }

        };

        updateCounter();

    });

}

let countersStarted = false;

window.addEventListener("scroll", () => {

    const statsSection = document.querySelector(".stats");

    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight && !countersStarted) {

        countersStarted = true;
        startCounters();

    }

});

/* =====================================================
   TIMELINE INTERATIVA
===================================================== */

const timelineItems = document.querySelectorAll(".timeline-item");

timelineItems.forEach(item => {

    item.addEventListener("click", () => {

        timelineItems.forEach(card => {
            card.classList.remove("active");
        });

        item.classList.add("active");

    });

});

/* =====================================================
   BOTÃO VOLTAR AO TOPO
===================================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* =====================================================
   EFEITO PARALLAX SUAVE NO HERO
===================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    let offset = window.pageYOffset;

    if(hero){
        hero.style.backgroundPositionY = offset * 0.4 + "px";
    }

});

/* =====================================================
   DESTAQUE AUTOMÁTICO DO MENU
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("nav-active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {
            link.classList.add("nav-active");
        }

    });

});

/* =====================================================
   EFEITO 3D NOS CARDS
===================================================== */

const cards = document.querySelectorAll(
    ".info-card, .stat-card"
);

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";

    });

});

/* =====================================================
   DIGITAÇÃO NO HERO
===================================================== */

const heroTitle = document.querySelector(".hero h1");

if(heroTitle){

    const originalText = heroTitle.innerHTML;

    heroTitle.innerHTML = "";

    let i = 0;

    function typeWriter(){

        if(i < originalText.length){

            heroTitle.innerHTML += originalText.charAt(i);

            i++;

            setTimeout(typeWriter, 25);

        }

    }

    window.addEventListener("load", () => {

        setTimeout(typeWriter, 400);

    });

}

/* =====================================================
   BARRA DE PROGRESSO DE LEITURA
===================================================== */

const progressBar = document.createElement("div");

progressBar.id = "progress-bar";

document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (window.scrollY / totalHeight) * 100;

    progressBar.style.width = progress + "%";

});

progressBar.style.position = "fixed";
progressBar.style.top = "0";
progressBar.style.left = "0";
progressBar.style.height = "5px";
progressBar.style.width = "0";
progressBar.style.zIndex = "9999";
progressBar.style.background =
"linear-gradient(90deg,#2E7D32,#D4AF37)";

/* =====================================================
   FRASES EDUCATIVAS ROTATIVAS
===================================================== */

const frases = [

"Produzir alimentos é uma responsabilidade social.",

"Solo saudável significa agricultura sustentável.",

"Água preservada garante o futuro das próximas gerações.",

"Ciência e tecnologia ajudam a produzir com menos impacto.",

"Direitos trabalhistas fortalecem o desenvolvimento rural.",

"Sustentabilidade e produtividade podem caminhar juntas."

];

const subtitulo = document.createElement("div");

subtitulo.classList.add("frase-rotativa");

document.body.appendChild(subtitulo);

let fraseAtual = 0;

function trocarFrase(){

    subtitulo.innerText = frases[fraseAtual];

    fraseAtual++;

    if(fraseAtual >= frases.length){
        fraseAtual = 0;
    }

}

trocarFrase();

setInterval(trocarFrase, 4000);

subtitulo.style.position = "fixed";
subtitulo.style.bottom = "15px";
subtitulo.style.left = "15px";
subtitulo.style.padding = "10px 18px";
subtitulo.style.borderRadius = "30px";
subtitulo.style.background = "#2E7D32";
subtitulo.style.color = "#fff";
subtitulo.style.fontSize = "0.85rem";
subtitulo.style.zIndex = "999";
subtitulo.style.boxShadow =
"0 5px 20px rgba(0,0,0,0.15)";

/* =====================================================
   MENSAGEM DE BOAS-VINDAS
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        console.log(
            "%cBem-vindo ao AgroWeiber 🌱",
            "color:#2E7D32;font-size:18px;font-weight:bold;"
        );

    }, 1000);

});

/* =====================================================
   FIM DO SCRIPT
===================================================== */
