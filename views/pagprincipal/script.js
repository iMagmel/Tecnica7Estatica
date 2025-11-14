document.addEventListener("DOMContentLoaded", () => {
  const faqs = document.querySelectorAll(".faq-item");

  faqs.forEach(faq => {
    const pregunta = faq.querySelector(".faq-pregunta");
    pregunta.addEventListener("click", () => {
      faq.classList.toggle("activo");
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
    // Añadimos una clase fallback si JS está activo
    document.body.classList.remove("no-js");

    const elementos = document.querySelectorAll(".animado, .animado-izq, .animado-abajo, .faq-item.animado, footer.animado");

    // Verificamos que existan elementos
    if (elementos.length > 0) {
        const observador = new IntersectionObserver((entradas, obs) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    obs.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.2 });

        elementos.forEach(el => observador.observe(el));
    }
});



// Efecto al hacer scroll: cambia el estilo del header
        window.addEventListener("scroll", () => {
            const header = document.getElementById("header");
            if (window.scrollY > 60) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });