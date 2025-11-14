document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btn-vermas");
  const detalle = document.getElementById("detalleOrientacion");
  const titulo = document.getElementById("tituloDetalle");
  const descripcion = document.getElementById("descripcionDetalle");
  const cerrar = document.querySelector(".cerrar");

  const info = {
  programacion: {
    titulo: "Programación: Materias",
    materias: {
      "4° Año": ["Matemática", "Literatura", "Lab.Hardare", "Sistemas Operativos", "Ciudadania", "Programacion", "Ingles", "Tec.Elect", "Fisica", "Geografia", "Historia", "Quimica" ],
      "5° Año": ["Matematica", "Sist.Digitales", "Modelos y Sistemas", "Historia", "Lab.Redes", "Lab.Programacion", "Ingles", "Base de Datos", "Lab.Base de Datos", "Diseño Web", "Geografia", "Literatura", "Polit y Ciud"],
      "6° Año": ["Literatura", "Ingles", "Filofia", "Arte", "Matematica", "Sist.Digitales", "Sist.Gestion y Autogestion", "Seguridad Informatica", "Derechos Del Trabajo", "Lab.Programacion", "Lab.Procesos Industriales", "Diseño Web Estatico", "Diseño Web Dinamico"],
      "7° Año": ["Pract Prof", "Modelos y Sistemas", "Sist.Comp", "Em.Prod", "Eval. Proyectos", "Organizacion y Metodos", "Proy.Des.Soft", "Dis.Imp.Sitios Web"]
    }
  },
  multimedios: {
    titulo: "Multimedios: Materias",
    materias: {
      "4° Año": ["Dibujo y Diseño", "Fotografía Básica", "Comunicación Visual", "Lengua"],
      "5° Año": ["Diseño Gráfico", "Edición de Video", "Fotografía Avanzada", "Redacción"],
      "6° Año": ["Animación Digital", "Producción Audiovisual", "Marketing Digital", "Proyectos Integradores"],
      "7° Año": ["Cine y TV", "Diseño Multimedia", "Producción Profesional", "Proyecto Final"]
    }
  }
};

botones.forEach(btn => {
  btn.addEventListener("click", () => {
    const tipo = btn.getAttribute("data-info");
    titulo.textContent = info[tipo].titulo;

    const contenedor = document.getElementById("materiasDetalle");
    contenedor.innerHTML = "";

    const materias = info[tipo].materias;
    let delay = 0;
    for (const año in materias) {
      const columna = document.createElement("div");
      columna.classList.add("columna");
      columna.innerHTML = `<h4>${año}</h4><ul>${materias[año].map(mat => `<li>${mat}</li>`).join("")}</ul>`;
      contenedor.appendChild(columna);

      // Animación con retraso para efecto "wow"
      columna.style.animation = `aparecerColumna 0.6s ease forwards`;
      columna.style.animationDelay = `${delay}s`;
      delay += 0.15;
    }

    detalle.classList.add("activo");
    detalle.scrollIntoView({ behavior: "smooth" });
  });
});



  cerrar.addEventListener("click", () => {
    detalle.classList.remove("activo");
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