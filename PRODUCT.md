# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Clientes potenciales de desarrollo de software a medida: fundadores de startups, dueños de negocios (restaurantes, comercios, fintech) y managers que buscan un desarrollador Full Stack de confianza para construir productos digitales escalables. Llegan por recomendación o búsqueda y evalúan en segundos si este desarrollador es serio, capaz y premium. Secundariamente: reclutadores técnicos y colaboradores.

## Product Purpose

Landing page / portfolio personal de Enrique A. Pacheco ("Kike Dev's"), Full Stack Developer freelance. Existe para convertir visitantes en conversaciones de proyecto: comunicar nivel técnico, generar confianza y mover al visitante a contactar. El éxito es un mensaje de contacto cualificado.

## Positioning

Desarrollador Full Stack del ecosistema JavaScript que entrega productos completos y multiplataforma (web, desktop/Electron, móvil) con arquitecturas escalables de nivel producción — no solo "sitios", sino sistemas de negocio reales (POS, fintech). Combina criterio técnico con ejecución de alta calidad y uso fluido de herramientas de IA en su flujo.

## Operating Context

Sitio de una sola página con navegación por anclas (Inicio, Sobre Mí, Skills, Proyectos, Contacto). Se evalúa en escritorio y móvil, a menudo en una primera visita corta. Desplegado como sitio estático en GitHub Pages bajo base path `/kikedevs-lp` en producción.

## Capabilities and Constraints

- Stack existente: SvelteKit 5 (runes), Tailwind 4, `adapter-static`, prerender. Se mantiene.
- Base path condicional: `base` de `$app/paths` debe usarse en todos los assets internos (ej. `logo.png`) para GitHub Pages.
- Sin backend: el contacto no puede depender de servidor. Decisión del usuario: formulario visual que al enviar abre el cliente de correo con `mailto` precargado.
- Debe respetar `prefers-reduced-motion` dado el alto nivel de animación deseado.

## Brand Commitments

- Nombre / marca: **Kike Dev's** — "web developments". Autor: Enrique A. Pacheco.
- Logo: `static/logo.png` (texto blanco + acento verde esmeralda/neón `#00FF88`), diseñado para fondo oscuro. Único asset de imagen de marca.
- Color de firma: verde esmeralda `#00FF88` sobre fondo oscuro. Decisión del usuario: usarlo con disciplina luxury (acento quirúrgico sobre negro ónix estratificado), no como neón saturado omnipresente.
- Voz: profesional, segura, orientada a resultados, en español. Frase insignia: "Transformando ideas en código, código en soluciones, soluciones en éxito."

## Evidence on Hand

- Dos proyectos reales (sin imágenes ni enlaces públicos disponibles): **WiseGold Capital** (fintech de metales preciosos — React, TypeScript, NestJS, PostgreSQL, Socket.io, Docker, Material-UI) y **AltivoPOS** (POS multiplataforma para restaurantes/comercios — React, TypeScript, Electron, Node.js, MongoDB, Socket.io, Material-UI). No hay screenshots ni demos: NO inventar imágenes de producto ni enlaces de demo.
- Skills con niveles declarados (React 95, Node 93, TypeScript 92, etc.) en `src/lib/utils/constants.ts`.
- Stats declaradas: 5+ años de experiencia, 50+ proyectos exitosos, 30+ clientes satisfechos, 100% compromiso. Tratar como contenido existente del usuario (conservar).
- Contacto: email `kikedevelopers@gmail.com`, GitHub `github.com/kikedevelopers`, LinkedIn `linkedin.com/in/kikepacheco`.
- No hay testimonios, logos de clientes, benchmarks ni precios: NO fabricar ninguno.

## Product Principles

1. Confianza antes que espectáculo: cada efecto debe reforzar la percepción de nivel y rigor, nunca distraer del mensaje de que este desarrollador es capaz y serio.
2. Prueba sobre promesa: mostrar proyectos reales, stack real y capacidad real; no afirmar lo que no existe (clientes, cifras, demos).
3. Rendimiento es parte del lujo: un sitio que se siente premium debe cargar y responder impecable; las animaciones no pueden costar fluidez.
4. Una sola conversión: todo el recorrido empuja suavemente hacia "Hablemos" / contacto.
5. Coherencia de marca: fondo oscuro + esmeralda, logo intacto, español en toda la UI visible.

## Accessibility & Inclusion

Respetar `prefers-reduced-motion` (reducir movimiento/parallax, conservar opacidad/color). Contraste suficiente del texto sobre fondos oscuros. Navegación por teclado y foco visibles. Objetivos táctiles cómodos en móvil.
