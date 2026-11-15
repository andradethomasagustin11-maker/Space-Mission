/* =========================================================
   SPACE MISSION 3.0
   - 12 roles con fortalezas y debilidades · 10 mundos con galería de fotos
   - Puntos (XP), rachas, sonidos y respuestas rápidas
   - Cinemática y fondo con asteroides y meteoritos
   Abrí index.html en el navegador para jugar.
   ========================================================= */
'use strict';
(() => {
  // src/assets/planets/luna.jpg
  var luna_default = "./img/luna.jpg";

  // src/assets/planets/marte.jpg
  var marte_default = "./img/marte.jpg";

  // src/assets/planets/venus.jpg
  var venus_default = "./img/venus.jpg";

  // src/assets/planets/europa.jpg
  var europa_default = "./img/europa.jpg";

  // src/assets/planets/titan.jpg
  var titan_default = "./img/titan.jpg";

  // src/assets/planets/encelado.jpg
  var encelado_default = "./img/encelado.jpg";

  // src/assets/planets/kepler.jpg
  var kepler_default = "./img/kepler.jpg";

  // src/assets/geo/luna-geo.jpg
  var luna_geo_default = "./img/luna-geo.jpg";

  // src/assets/geo/marte-geo.jpg
  var marte_geo_default = "./img/marte-geo.jpg";

  // src/assets/geo/venus-geo.jpg
  var venus_geo_default = "./img/venus-geo.jpg";

  // src/assets/geo/europa-geo.jpg
  var europa_geo_default = "./img/europa-geo.jpg";

  // src/assets/geo/titan-geo.jpg
  var titan_geo_default = "./img/titan-geo.jpg";

  // src/assets/geo/encelado-geo.jpg
  var encelado_geo_default = "./img/encelado-geo.jpg";

  // src/assets/geo/kepler-geo.jpg
  var kepler_geo_default = "./img/kepler2-planet.jpg";

  // nuevos mundos y galerías
  var mercurio_default = "./img/mercurio.jpg";
  var mercurio_geo_default = "./img/mercurio-geo.jpg";
  var io_default = "./img/io.jpg";
  var io_geo_default = "./img/io-geo.jpg";
  var pluton_default = "./img/pluton.jpg";
  var pluton_geo_default = "./img/pluton-geo.jpg";
  var luna_vista_default = "./img/luna-vista.jpg";
  var marte_vista_default = "./img/marte-vista.jpg";
  var venus_vista_default = "./img/venus-vista.jpg";
  var europa_vista_default = "./img/europa-vista.jpg";
  var titan_vista_default = "./img/titan-vista.jpg";
  var encelado_vista_default = "./img/encelado-vista.jpg";
  var kepler_vista_default = "./img/kepler-planet.jpg";
  var mercurio_vista_default = "./img/mercurio-vista.jpg";
  var io_vista_default = "./img/io-vista.jpg";
  var pluton_vista_default = "./img/pluton-vista.jpg";

  // src/assets/scenes/prep.jpg
  var prep_default = "./img/prep.jpg";

  // src/assets/scenes/travel.jpg
  var travel_default = "./img/travel.jpg";

  // src/assets/scenes/crisis.jpg
  var crisis_default = "./img/crisis.jpg";

  // src/assets/scenes/return.jpg
  var return_default = "./img/return.jpg";

  // src/game/data.ts
  var ROLES = {
    cmd: {
      id: "cmd",
      name: "Comandante",
      short: "Mando",
      icon: "★",
      dom: "trust",
      tagline: "Líder bajo presión",
      strong: "+4% a todo el equipo",
      weak: "Si falla, −4 Confianza extra",
      start: { trust: 8 },
      mods: { all: 0.04, onOwnFail: { trust: -4 } }
    },
    pil: {
      id: "pil",
      name: "Piloto",
      short: "Pilotaje",
      icon: "✈",
      dom: "energy",
      tagline: "Maniobras imposibles",
      strong: "+10% en jugadas arriesgadas",
      weak: "Impulsivo: −6% en prudentes",
      start: { energy: 5 },
      mods: { ownRisk: [-0.06, 0, 0.1] }
    },
    eng: {
      id: "eng",
      name: "Ingeniero/a",
      short: "Ingeniería",
      icon: "⚙",
      dom: "energy",
      tagline: "Repara lo imposible",
      strong: "+10 Energía inicial",
      weak: "Perfeccionista: −2 Presupuesto por éxito",
      start: { energy: 10 },
      mods: { onOwnSuccess: { budget: -2 } }
    },
    med: {
      id: "med",
      name: "Médico/a",
      short: "Salud",
      icon: "✚",
      dom: "trust",
      tagline: "Cuerpo y mente",
      strong: "Los fallos dañan la moral a la mitad",
      weak: "Botiquín caro: −6 Presupuesto",
      start: { trust: 5, budget: -6 },
      mods: { halveMoral: true }
    },
    bio: {
      id: "bio",
      name: "Astrobiólogo/a",
      short: "Biología",
      icon: "❖",
      dom: "science",
      tagline: "Caza vida",
      strong: "+10 Ciencia inicial",
      weak: "Se distrae: −5 Energía",
      start: { science: 10, energy: -5 },
      mods: { onOwnSuccess: { science: 2 } }
    },
    geo: {
      id: "geo",
      name: "Geólogo/a",
      short: "Geología",
      icon: "◆",
      dom: "science",
      tagline: "Lee las rocas",
      strong: "+5 Ciencia +5 Presupuesto",
      weak: "Lento en crisis: −8%",
      start: { science: 5, budget: 5 },
      mods: { chapter: { 2: -0.08 } }
    },
    com: {
      id: "com",
      name: "Comunicaciones",
      short: "Comms",
      icon: "⌁",
      dom: "communication",
      tagline: "La voz con la Tierra",
      strong: "+12 Comunicación",
      weak: "Inútil en Kepler: −12% allí",
      start: { communication: 12 },
      mods: { planet: { kepler: -0.12 } }
    },
    rob: {
      id: "rob",
      name: "Robotista",
      short: "Robótica",
      icon: "⬢",
      dom: "energy",
      tagline: "Drones y rovers",
      strong: "Sus fallos no bajan Confianza",
      weak: "Sin energía (<40) −10%",
      start: { science: 3 },
      mods: { noTrustLoss: true, lowEnergy: -0.1 }
    },
    bot: {
      id: "bot",
      name: "Botánico/a",
      short: "Botánica",
      icon: "✿",
      dom: "trust",
      tagline: "Cultiva en el espacio",
      strong: "+3 Confianza cada capítulo",
      weak: "Frágil en el viaje: −6%",
      start: {},
      mods: { perChapter: { trust: 3 }, chapter: { 1: -0.06 } }
    },
    qui: {
      id: "qui",
      name: "Químico/a",
      short: "Química",
      icon: "⚗",
      dom: "science",
      tagline: "Reacciones al límite",
      strong: "+8% en llegada",
      weak: "Si falla, −4 Energía extra",
      start: { science: 4 },
      mods: { chapter: { 3: 0.08 }, onOwnFail: { energy: -4 } }
    },
    ast: {
      id: "ast",
      name: "Navegante",
      short: "Navegación",
      icon: "✧",
      dom: "energy",
      tagline: "Rutas entre estrellas",
      strong: "+8% en viaje y regreso",
      weak: "En superficie −6%",
      start: { energy: 4 },
      mods: { chapter: { 1: 0.08, 4: 0.08, 3: -0.06 } }
    },
    hack: {
      id: "hack",
      name: "Hacker de IA",
      short: "Sistemas IA",
      icon: "⌬",
      dom: "communication",
      tagline: "Código a contrarreloj",
      strong: "+8 Comunicación +6% arriesgadas",
      weak: "Desconfían: −6 Confianza",
      start: { communication: 8, trust: -6 },
      mods: { ownRisk: [0, 0, 0.06] }
    }
  };
  var ROLE_IDS = Object.keys(ROLES);
  var DEFAULT_NAMES = {
    cmd: "Alex",
    pil: "Sam",
    eng: "Noa",
    med: "Luz",
    bio: "Iván",
    geo: "Mía",
    com: "Teo",
    rob: "Kai",
    bot: "Flor",
    qui: "Leo",
    ast: "Vega",
    hack: "Zoe"
  };
  var STAT = {
    science: { label: "CIENCIA", icon: "⌕" },
    energy: { label: "ENERGÍA", icon: "ϟ" },
    communication: { label: "COMMS", icon: "⌁" },
    budget: { label: "FONDOS", icon: "$" },
    trust: { label: "MORAL", icon: "♡" }
  };
  var BASE_STATS = { science: 40, energy: 70, communication: 45, budget: 65, trust: 55 };
  var PLANETS = [
    {
      id: "luna",
      name: "La Luna",
      tag: "El primer paso",
      img: luna_default,
      geoImg: luna_geo_default,
      gallery: [luna_geo_default, luna_vista_default],
      c1: "#e3e5ea",
      c2: "#6c7380",
      dif: 1,
      dist: 3,
      mod: 0.06,
      hazard: "polvo lunar",
      rec: ["pil", "geo", "rob"],
      start: { budget: 5 },
      risks: ["Polvo abrasivo", "Baja gravedad", "Cráteres en sombra"],
      geology: ["Regolito basáltico", "Mares de lava antigua", "Hielo en los polos"],
      outro: "La Luna vuelve a ser el escalón hacia mundos lejanos."
    },
    {
      id: "mercurio",
      name: "Mercurio",
      tag: "Junto al Sol",
      img: mercurio_default,
      geoImg: mercurio_geo_default,
      gallery: [mercurio_geo_default, mercurio_vista_default],
      c1: "#cdbba6",
      c2: "#5a4a3e",
      dif: 2,
      dist: 5,
      mod: 0.02,
      hazard: "calor solar extremo",
      rec: ["eng", "med", "ast"],
      start: { energy: 6 },
      risks: ["430 °C de día", "−180 °C de noche", "Viento solar"],
      geology: ["Escarpes gigantes", "Cráteres con rayos", "Hielo en los polos"],
      outro: "Mercurio demostró que se puede trabajar a la sombra del Sol."
    },
    {
      id: "marte",
      name: "Marte",
      tag: "El planeta rojo",
      img: marte_default,
      geoImg: marte_geo_default,
      gallery: [marte_geo_default, marte_vista_default],
      c1: "#e58a5f",
      c2: "#7a2d1b",
      dif: 2,
      dist: 9,
      mod: 0,
      hazard: "tormentas de polvo",
      rec: ["geo", "eng", "bio", "bot"],
      start: {},
      risks: ["Tormentas de polvo", "Percloratos tóxicos", "Regreso corto"],
      geology: ["Cauces de ríos secos", "Volcán Olympus Mons", "Óxido de hierro"],
      outro: "Las huellas en el polvo rojo ya son historia humana."
    },
    {
      id: "venus",
      name: "Venus",
      tag: "El infierno nublado",
      img: venus_default,
      geoImg: venus_geo_default,
      gallery: [venus_geo_default, venus_vista_default],
      c1: "#f1d58a",
      c2: "#9a6a1f",
      dif: 4,
      dist: 7,
      mod: -0.1,
      hazard: "ácido sulfúrico",
      rec: ["eng", "qui", "rob"],
      start: { energy: -8, budget: -3 },
      risks: ["Lluvia ácida", "Presión extrema", "460 °C"],
      geology: ["Llanuras volcánicas", "Lava activa", "Volcanes en panqueque"],
      outro: "Sobrevivir en Venus probó que la ingeniería puede con todo."
    },
    {
      id: "europa",
      name: "Europa",
      tag: "Océano bajo el hielo",
      img: europa_default,
      geoImg: europa_geo_default,
      gallery: [europa_geo_default, europa_vista_default],
      c1: "#cfe9f5",
      c2: "#476f91",
      dif: 3,
      dist: 14,
      mod: -0.06,
      hazard: "hielo y radiación",
      rec: ["bio", "rob", "med"],
      start: { science: 3 },
      risks: ["Radiación de Júpiter", "Grietas", "Géiseres"],
      geology: ["Corteza de hielo", "Grietas rojizas", "Océano salado"],
      outro: "Bajo el hielo de Europa quedó abierta la gran pregunta."
    },
    {
      id: "io",
      name: "Ío",
      tag: "La luna volcánica",
      img: io_default,
      geoImg: io_geo_default,
      gallery: [io_geo_default, io_vista_default],
      c1: "#f2d34f",
      c2: "#8a5a12",
      dif: 4,
      dist: 15,
      mod: -0.09,
      hazard: "erupciones volcánicas",
      rec: ["geo", "qui", "rob", "pil"],
      start: { science: 4, energy: -6 },
      risks: ["Volcanes activos", "Radiación de Júpiter", "Lluvia de azufre"],
      geology: ["Lagos de lava", "Llanuras de azufre", "Penachos de 300 km"],
      outro: "Los volcanes de Ío revelaron el corazón ardiente de Júpiter."
    },
    {
      id: "titan",
      name: "Titán",
      tag: "Lagos de metano",
      img: titan_default,
      geoImg: titan_geo_default,
      gallery: [titan_geo_default, titan_vista_default],
      c1: "#f0b36a",
      c2: "#7a4a1a",
      dif: 3,
      dist: 18,
      mod: -0.04,
      hazard: "metano líquido",
      rec: ["qui", "bio", "eng"],
      start: { energy: -5 },
      risks: ["−180 °C", "Atmósfera densa", "Lagos de metano"],
      geology: ["Dunas orgánicas", "Guijarros de hielo", "Mares de metano"],
      outro: "Los lagos de Titán cambiaron lo que sabemos del origen de la vida."
    },
    {
      id: "encelado",
      name: "Encélado",
      tag: "Géiseres de hielo",
      img: encelado_default,
      geoImg: encelado_geo_default,
      gallery: [encelado_geo_default, encelado_vista_default],
      c1: "#f4fbff",
      c2: "#5a86a8",
      dif: 3,
      dist: 20,
      mod: -0.05,
      hazard: "géiseres de hielo",
      rec: ["bio", "geo", "pil"],
      start: {},
      ring: true,
      risks: ["Gravedad casi nula", "Géiseres", "Contaminación"],
      geology: ["Rayas de tigre", "Géiseres de agua", "Hielo joven"],
      outro: "Los géiseres de Encélado dejaron muestras para décadas."
    },
    {
      id: "pluton",
      name: "Plutón",
      tag: "El corazón helado",
      img: pluton_default,
      geoImg: pluton_geo_default,
      gallery: [pluton_geo_default, pluton_vista_default],
      c1: "#ead6c2",
      c2: "#7a3a2a",
      dif: 5,
      dist: 26,
      mod: -0.12,
      hazard: "frío extremo",
      rec: ["ast", "com", "eng", "med"],
      start: { communication: -8, budget: -6 },
      risks: ["−230 °C", "Señal de 5 horas", "Sol casi invisible"],
      geology: ["Llanura de nitrógeno", "Montañas de hielo", "Neblina azul"],
      outro: "En el borde del sistema solar, la humanidad dejó su huella más lejana."
    },
    {
      id: "kepler",
      name: "Kepler-442b",
      tag: "Otra estrella (ficción)",
      img: kepler_default,
      geoImg: kepler_geo_default,
      gallery: [kepler_geo_default, kepler_vista_default],
      c1: "#9ad8c0",
      c2: "#2b4a72",
      dif: 5,
      dist: 30,
      mod: -0.14,
      hazard: "radiación desconocida",
      rec: ["cmd", "ast", "bio", "med"],
      start: { budget: -10, communication: -10 },
      risks: ["Aire desconocido", "Sin contacto", "Gravedad mayor"],
      geology: ["Basalto gigante", "Océanos turquesa", "Flora alienígena"],
      outro: "Al otro lado de la galaxia empezó una nueva especie viajera."
    }
  ];
  var planetById = (id) => PLANETS.find((p) => p.id === id);
  var CIRC = [
    { label: "Retraso de señal", skill: "com", d: -0.08 },
    { label: "Energía ajustada", skill: "eng", d: -0.08 },
    { label: "Equipo descansado", skill: null, d: 0.05 },
    { label: "Tripulación agotada", skill: null, d: -0.06 },
    { label: "Instrumentos calibrados", skill: "bio", d: 0.07 },
    { label: "Visibilidad baja", skill: "pil", d: -0.08 },
    { label: "Moral alta", skill: "cmd", d: 0.07 },
    { label: "Radiación elevada", skill: "med", d: -0.07 },
    { label: "Terreno complejo", skill: "geo", d: -0.07 },
    { label: "Repuestos a mano", skill: "eng", d: 0.07 },
    { label: "Ventana de vuelo ideal", skill: "pil", d: 0.07 },
    { label: "Presión de Tierra", skill: "cmd", d: -0.06 },
    { label: "Cielo despejado", skill: null, d: 0.04 },
    { label: "Interferencia solar", skill: null, d: -0.04 },
    { label: "Botiquín completo", skill: "med", d: 0.07 },
    { label: "Contacto estable", skill: "com", d: 0.07 },
    { label: "Suelo firme", skill: "geo", d: 0.07 },
    { label: "Drones cargados", skill: "rob", d: 0.07 },
    { label: "Cosecha lista", skill: "bot", d: 0.07 },
    { label: "Reactivos vencidos", skill: "qui", d: -0.07 },
    { label: "Estrellas visibles", skill: "ast", d: 0.07 },
    { label: "Firewall caído", skill: "hack", d: -0.07 },
    { label: "Lluvia de meteoritos", skill: "pil", d: -0.06 }
  ];
  var CHAPTERS = [
    { name: "PREPARACIÓN", type: "BASE DE LANZAMIENTO", sub: "Cuenta regresiva.", img: prep_default },
    { name: "TRAYECTORIA", type: "VIAJE ESPACIAL", sub: "La Tierra queda atrás.", img: travel_default },
    { name: "CRISIS", type: "ALERTA ROJA", sub: "Algo sale mal.", img: crisis_default },
    { name: "LLEGADA", type: "SUPERFICIE", sub: "Mundo nuevo.", img: null },
    { name: "REGRESO", type: "ETAPA FINAL", sub: "Volver a casa.", img: return_default }
  ];
  var RISK_LABEL = ["SEGURA", "MEDIA", "ARRIESGADA"];
  var PER_CHAPTER = 4;
  var WIN_LINES = ["¡CLAVADO!", "¡PERFECTO!", "¡BRUTAL!", "¡IMPECABLE!", "¡ASÍ SE HACE!", "¡NIVEL PRO!"];
  var LUCK_LINES = ["¡DE SUERTE!", "¡IMPROVISADO!", "¡ZAFAMOS!"];
  var FAIL_LINES = ["¡AUCH!", "¡SALIÓ MAL!", "¡FALLO!", "¡UPS!"];

  // src/game/i18n.ts
  var LANG = "es";
  try {
    LANG = localStorage.getItem("sm-lang") === "en" ? "en" : "es";
  } catch {}
  var UI = {
    es: {
      tagline: "MÁS ALLÁ DE LA TIERRA, TODO DEPENDE DE VOS", skip: "OMITIR ▸", live: "EN VIVO",
      heroKicker: "12 ROLES · 10 MUNDOS · {n} DECISIONES",
      heroTitle: "EL COSMOS<br><em>TE LLAMA.</em>", play: "JUGAR <span>→</span>", intro: "▶ INTRO",
      noRecord: "SIN RÉCORD AÚN", record: "RÉCORD {n} XP", newRecord: "¡NUEVO RÉCORD!",
      step1: "PASO 1 / 2", step2: "PASO 2 / 2", buildCrew: "ARMÁ TU TRIPULACIÓN", pickWorld: "ELEGÍ TU MUNDO",
      solo: "◉ SOLO", team: "◎ EQUIPO", random: "🎲 AL AZAR", destination: "DESTINO →", launch: "DESPEGAR 🚀",
      status: "ESTADO", crew: "TRIPULACIÓN", again: "OTRA VEZ ↻", home: "INICIO",
      player: "Jugador", tapWorld: "Tocá un mundo", photos: "FOTOS", geology: "GEOLOGÍA", travel: "VIAJE", days: "días",
      difficulty: "DIFICULTAD", affinity: "AFINIDAD", rolesWord: "ROLES",
      chapter: "CAPÍTULO", day: "DÍA", turnOf: "TURNO DE", without: "SIN",
      stSCIENCE: "CIENCIA", stENERGY: "ENERGÍA", stCOMMS: "COMMS", stBUDGET: "FONDOS", stTRUST: "MORAL",
      abortEnergy: "Sin energía. La nave quedó a la deriva.", abortTrust: "La moral se rompió. Nadie obedece más.",
      abortBudget: "Sin fondos. La agencia ordenó volver.",
      streakLost: "Racha perdida", missed: "Faltó {r}", tapNext: "TOCÁ O ESPACIO PARA SEGUIR", lostTap: "MISIÓN PERDIDA · TOCÁ",
      lost: "MISIÓN PERDIDA", legend: "¡LEYENDA!", done: "MISIÓN CUMPLIDA", barely: "VOLVIMOS… APENAS",
      doneText: "Ida y vuelta a {p}.", barelyText: "{p} nos dio pelea.",
      tipMissing: "Faltó {r} en {n} decisiones.", tipCover: "Tu equipo cubría {a}/{b} roles clave de {p}.",
      tipGood: "Especialista correcto + riesgo correcto = éxito.", tipSafe: "Sin especialista, la jugada segura suele ganar.",
      hits: "ACIERTOS", bestStreak: "MEJOR RACHA", missionWord: "MISIÓN", mute: "Silenciar", unmute: "Activar sonido",
      c1: "AÑO 2045", c2: "10 MUNDOS", c3: "12 ESPECIALISTAS", c4: "TU DECISIÓN", liftoff: "¡DESPEGUE!"
    },
    en: {
      tagline: "BEYOND EARTH, EVERYTHING DEPENDS ON YOU", skip: "SKIP ▸", live: "LIVE",
      heroKicker: "12 ROLES · 10 WORLDS · {n} DECISIONS",
      heroTitle: "THE COSMOS<br><em>IS CALLING.</em>", play: "PLAY <span>→</span>", intro: "▶ INTRO",
      noRecord: "NO RECORD YET", record: "RECORD {n} XP", newRecord: "NEW RECORD!",
      step1: "STEP 1 / 2", step2: "STEP 2 / 2", buildCrew: "BUILD YOUR CREW", pickWorld: "PICK YOUR WORLD",
      solo: "◉ SOLO", team: "◎ TEAM", random: "🎲 RANDOM", destination: "DESTINATION →", launch: "LAUNCH 🚀",
      status: "STATUS", crew: "CREW", again: "PLAY AGAIN ↻", home: "HOME",
      player: "Player", tapWorld: "Tap a world", photos: "PHOTOS", geology: "GEOLOGY", travel: "TRIP", days: "days",
      difficulty: "DIFFICULTY", affinity: "AFFINITY", rolesWord: "ROLES",
      chapter: "CHAPTER", day: "DAY", turnOf: "TURN OF", without: "NO",
      stSCIENCE: "SCIENCE", stENERGY: "ENERGY", stCOMMS: "COMMS", stBUDGET: "BUDGET", stTRUST: "TRUST",
      abortEnergy: "Out of energy. The ship drifted away.", abortTrust: "Morale collapsed. Nobody obeys anymore.",
      abortBudget: "Out of funds. The agency ordered you home.",
      streakLost: "Streak lost", missed: "{r} was missing", tapNext: "TAP OR PRESS SPACE TO CONTINUE", lostTap: "MISSION LOST · TAP",
      lost: "MISSION LOST", legend: "LEGEND!", done: "MISSION COMPLETE", barely: "WE MADE IT… BARELY",
      doneText: "Round trip to {p}.", barelyText: "{p} put up a fight.",
      tipMissing: "{r} was missing in {n} decisions.", tipCover: "Your crew covered {a}/{b} key roles for {p}.",
      tipGood: "Right specialist + right risk = success.", tipSafe: "Without a specialist, the safe play usually wins.",
      hits: "HITS", bestStreak: "BEST STREAK", missionWord: "MISSION", mute: "Mute", unmute: "Unmute",
      c1: "YEAR 2045", c2: "10 WORLDS", c3: "12 SPECIALISTS", c4: "YOUR CALL", liftoff: "LIFTOFF!"
    }
  };
  var tr = (k, vars) => {
    let s = UI[LANG]?.[k] ?? UI.es[k] ?? k;
    if (vars)
      for (const [a, b] of Object.entries(vars))
        s = s.split("{" + a + "}").join(String(b));
    return s;
  };
  var EN_TEXT = {
 "Calor abrasador del Sol": "Scorching sunlight",
 "La cara diurna supera los 400 °C y los escudos térmicos crujen.": "The day side tops 400 °C and the heat shields creak.",
 "Refugiarse en la sombra": "Take cover in the shade",
 "Mover la base al lado nocturno.": "Move the base to the night side.",
 "Trabajar al amanecer": "Work at dawn",
 "Calcular la franja templada.": "Calculate the mild strip.",
 "Forzar la refrigeración": "Push the cooling",
 "Gastar refrigerante extra.": "Spend extra coolant.",
 "Hielo en cráteres polares": "Ice in polar craters",
 "Un cráter polar en sombra eterna guarda hielo de agua.": "A polar crater in eternal shadow holds water ice.",
 "Bajar a perforar": "Go down and drill",
 "Extraer muestras de hielo.": "Extract ice samples.",
 "Enviar un rover": "Send a rover",
 "Exploración a distancia.": "Remote exploration.",
 "Mapear con radar": "Map with radar",
 "Desde la órbita.": "From orbit.",
 "Una eyección de masa coronal viaja directo hacia la nave.": "A coronal mass ejection is heading straight for the ship.",
 "Blindar la cabina": "Shield the cabin",
 "Proteger a la tripulación.": "Protect the crew.",
 "Esquivarla con una maniobra": "Dodge it with a maneuver",
 "Cambiar de órbita a tiempo.": "Change orbit in time.",
 "Apagar la electrónica": "Shut down electronics",
 "Evitar daños en los sistemas.": "Avoid system damage.",
 "Escape de la gravedad solar": "Escaping solar gravity",
 "Salir de Mercurio exige frenar contra la atracción del Sol.": "Leaving Mercury means fighting the Sun's pull.",
 "Asistencia gravitatoria con Venus": "Venus gravity assist",
 "Ruta larga pero eficiente.": "Long but efficient route.",
 "Impulso directo": "Direct burn",
 "Rápido y costoso.": "Fast and costly.",
 "Esperar la ventana ideal": "Wait for the ideal window",
 "Paciencia y margen.": "Patience and margin.",
 "Erupción en vivo": "Live eruption",
 "Un volcán lanza un penacho de azufre a cientos de kilómetros.": "A volcano hurls a sulfur plume hundreds of kilometers high.",
 "Volar a través del penacho": "Fly through the plume",
 "Capturar gases frescos.": "Capture fresh gases.",
 "Medir desde lejos": "Measure from afar",
 "Sensores a distancia.": "Remote sensors.",
 "Analizar el azufre": "Analyze the sulfur",
 "Química volcánica.": "Volcanic chemistry.",
 "Lago de lava": "Lava lake",
 "El módulo aterrizó cerca de un lago de lava que se expande.": "The lander touched down near a spreading lava lake.",
 "Mover el campamento": "Move the camp",
 "Alejarse a tiempo.": "Get away in time.",
 "Tomar muestras del borde": "Sample the edge",
 "Roca recién formada.": "Freshly formed rock.",
 "Mandar un dron": "Send a drone",
 "Que el robot se arriesgue.": "Let the robot take the risk.",
 "Tubo de flujo de Júpiter": "Jupiter's flux tube",
 "Una corriente eléctrica entre Ío y Júpiter castiga los sistemas.": "An electric current between Io and Jupiter hammers the systems.",
 "Escudo electromagnético": "Electromagnetic shield",
 "Desviar la corriente.": "Divert the current.",
 "Reiniciar con IA": "Reboot with AI",
 "Recuperar los sistemas a tiempo.": "Recover the systems in time.",
 "Esperar que pase.": "Wait it out.",
 "Despegue entre cenizas": "Liftoff through ash",
 "Una lluvia de azufre cubre la plataforma de despegue.": "Sulfur fallout covers the launch pad.",
 "Antes de que empeore.": "Before it gets worse.",
 "Limpiar los motores": "Clean the engines",
 "Revisar cada tobera.": "Check every nozzle.",
 "Esperar a que se asiente": "Wait for it to settle",
 "Más lento, más seguro.": "Slower, safer.",
 "Llanura del corazón": "The heart plain",
 "La enorme llanura de nitrógeno helado se mueve lentamente.": "The huge frozen nitrogen plain slowly moves.",
 "Estudiar los glaciares": "Study the glaciers",
 "Hielo que fluye.": "Flowing ice.",
 "Perforar el nitrógeno": "Drill the nitrogen",
 "Química del frío.": "Chemistry of the cold.",
 "Fotografiar desde un dron": "Photograph from a drone",
 "Vista completa.": "Full view.",
 "Señal de cinco horas": "Five-hour signal",
 "Cada mensaje a la Tierra tarda cinco horas en llegar.": "Every message to Earth takes five hours to arrive.",
 "Decidir sin esperar": "Decide without waiting",
 "Antena de alta ganancia": "High-gain antenna",
 "Mejorar el enlace.": "Improve the link.",
 "Comprimir los datos con IA": "Compress data with AI",
 "Enviar más en menos tiempo.": "Send more in less time.",
 "Frío que rompe metales": "Metal-breaking cold",
 "A −230 °C los metales se vuelven frágiles como vidrio.": "At −230 °C metals turn as brittle as glass.",
 "Calentar las juntas": "Heat the joints",
 "Cambiar a piezas compuestas": "Switch to composite parts",
 "Repuestos especiales.": "Special spares.",
 "Seguir y vigilar": "Keep going and watch",
 "Asumir el riesgo.": "Accept the risk.",
 "Regreso desde el borde": "Return from the edge",
 "Volver desde Plutón es el viaje más largo de la historia.": "Coming back from Pluto is the longest trip in history.",
 "Hibernación de la tripulación": "Crew hibernation",
 "Dormir el viaje.": "Sleep through the trip.",
 "Ruta de máxima velocidad": "Max-speed route",
 "Asistencias gravitatorias.": "Gravity assists.",
 "Raciones y rutinas": "Rations and routines",
 "Sostener la moral.": "Keep morale up.",
 "Retraso de señal": "Signal delay",
 "Energía ajustada": "Tight energy",
 "Equipo descansado": "Rested crew",
 "Tripulación agotada": "Exhausted crew",
 "Instrumentos calibrados": "Calibrated instruments",
 "Visibilidad baja": "Low visibility",
 "Moral alta": "High morale",
 "Radiación elevada": "High radiation",
 "Terreno complejo": "Rough terrain",
 "Repuestos a mano": "Spare parts at hand",
 "Ventana de vuelo ideal": "Ideal flight window",
 "Presión de Tierra": "Pressure from Earth",
 "Cielo despejado": "Clear sky",
 "Interferencia solar": "Solar interference",
 "Botiquín completo": "Full medkit",
 "Contacto estable": "Stable contact",
 "Suelo firme": "Solid ground",
 "Drones cargados": "Drones charged",
 "Cosecha lista": "Harvest ready",
 "Reactivos vencidos": "Expired reagents",
 "Estrellas visibles": "Stars visible",
 "Firewall caído": "Firewall down",
 "Lluvia de meteoritos": "Meteor shower",
 "Ventana de lanzamiento": "Launch window",
 "El pronóstico hacia {p} marca una ventana corta. Cada hora de espera consume presupuesto.": "The forecast to {p} shows a short window. Every hour of waiting burns budget.",
 "Lanzar en esta ventana": "Launch in this window",
 "Aprovechar el clima ideal sin demoras.": "Take advantage of the ideal weather with no delays.",
 "Esperar la siguiente ventana": "Wait for the next window",
 "Ganar margen de seguridad a cambio de recursos.": "Gain a safety margin at the cost of resources.",
 "Recalcular la trayectoria": "Recalculate the trajectory",
 "Nueva ruta orbital.": "New orbital route.",
 "Carga de suministros": "Supply loading",
 "La nave no puede llevar todo. Hay que decidir qué entra en la bodega antes de partir hacia {p}.": "The ship can't carry everything. Decide what goes in the hold before leaving for {p}.",
 "Priorizar agua y alimentos": "Prioritize water and food",
 "Comida y cultivos primero.": "Food and crops first.",
 "Priorizar instrumental científico": "Prioritize scientific instruments",
 "Más datos, menos margen.": "More data, less margin.",
 "Priorizar repuestos y herramientas": "Prioritize spares and tools",
 "Prepararse para posibles fallas.": "Prepare for possible failures.",
 "Prueba de antenas": "Antenna test",
 "Las antenas de largo alcance muestran ruido en las pruebas finales.": "The long-range antennas show noise in the final tests.",
 "Recalibrar todo el sistema": "Recalibrate the whole system",
 "Ajuste fino que lleva tiempo.": "Fine tuning that takes time.",
 "Instalar una antena de respaldo": "Install a backup antenna",
 "Más peso, más seguridad.": "More weight, more safety.",
 "Aceptar el margen de error": "Accept the margin of error",
 "Seguir adelante con el cronograma.": "Stick to the schedule.",
 "Simulacro de emergencia": "Emergency drill",
 "Antes del despegue, el centro de control propone un simulacro de evacuación y descompresión.": "Before liftoff, mission control proposes an evacuation and decompression drill.",
 "Hacer el simulacro completo": "Run the full drill",
 "Entrenar a todos, aunque demore.": "Train everyone, even if it takes time.",
 "Simulacro médico específico": "Specific medical drill",
 "Practicar primeros auxilios en gravedad cero.": "Practice first aid in zero gravity.",
 "Saltear el simulacro": "Skip the drill",
 "Confiar en el entrenamiento previo.": "Trust prior training.",
 "Selección de instrumentos": "Instrument selection",
 "El presupuesto solo alcanza para una parte del instrumental científico destinado a {p}.": "The budget only covers part of the scientific instruments meant for {p}.",
 "Espectrómetro de superficie": "Surface spectrometer",
 "Ideal para analizar materiales.": "Ideal for analyzing materials.",
 "Kit de detección de biofirmas": "Biosignature detection kit",
 "Buscar rastros de vida.": "Look for traces of life.",
 "Sensores de uso general": "General-purpose sensors",
 "Menos específicos, más confiables.": "Less specific, more reliable.",
 "Examen médico final": "Final medical exam",
 "Un integrante presenta valores irregulares el día previo al lanzamiento.": "A crew member shows irregular readings the day before launch.",
 "Tratarlo y seguir": "Treat and continue",
 "Ajustar la medicación y continuar.": "Adjust the medication and move on.",
 "Reemplazarlo en el equipo": "Replace them on the team",
 "Decisión dura pero segura.": "A hard but safe decision.",
 "Ocultarlo para no demorar": "Hide it to avoid delays",
 "Lanzar sin informar.": "Launch without reporting.",
 "Presión de los medios": "Media pressure",
 "Los medios quieren detalles de la misión a {p}. Lo que se diga puede afectar el financiamiento.": "The media want details on the mission to {p}. What is said may affect funding.",
 "Conferencia de prensa abierta": "Open press conference",
 "Ganar apoyo público.": "Win public support.",
 "Comunicado breve y prudente": "Short, careful statement",
 "Mantener un perfil bajo.": "Keep a low profile.",
 "Prometer descubrimientos históricos": "Promise historic discoveries",
 "Atraer fondos elevando expectativas.": "Attract funds by raising expectations.",
 "Lluvia de micrometeoritos": "Micrometeorite shower",
 "Un enjambre de partículas cruza la trayectoria hacia {p}.": "A swarm of particles crosses the path to {p}.",
 "Maniobra evasiva": "Evasive maneuver",
 "Esquivar el enjambre con un giro brusco.": "Dodge the swarm with a sharp turn.",
 "Reforzar el escudo": "Reinforce the shield",
 "Redirigir energía a la protección.": "Redirect power to protection.",
 "Atravesar a velocidad reducida": "Cross at reduced speed",
 "Aceptar impactos leves.": "Accept minor impacts.",
 "Falla en el reciclador de agua": "Water recycler failure",
 "El sistema que recicla el agua pierde eficiencia día a día.": "The water recycling system loses efficiency day by day.",
 "Reparar el reciclador": "Repair the recycler",
 "Desarmar y cambiar piezas.": "Take apart and swap parts.",
 "Biofiltro de plantas": "Plant biofilter",
 "El invernadero limpia el agua.": "The greenhouse cleans the water.",
 "Robot de mantenimiento": "Maintenance robot",
 "Que lo arregle un bot.": "Let a bot fix it.",
 "Corrección de curso": "Course correction",
 "Los cálculos muestran una desviación pequeña que crece con los días.": "The calculations show a small deviation that grows with the days.",
 "Corrección manual": "Manual correction",
 "Usar los propulsores con precisión.": "Use the thrusters precisely.",
 "Delegar en el piloto automático": "Leave it to autopilot",
 "Menos esfuerzo, menos control.": "Less effort, less control.",
 "Navegar por estrellas": "Navigate by the stars",
 "Cálculo astronómico.": "Astronomical calculation.",
 "Silencio de radio": "Radio silence",
 "Pasan horas sin respuesta del centro de control y crece la inquietud.": "Hours pass with no reply from mission control and unease grows.",
 "Revisar el canal principal": "Check the main channel",
 "Buscar la falla en la señal.": "Look for the fault in the signal.",
 "Reprogramar el enrutador": "Reprogram the router",
 "Código a contrarreloj.": "Code against the clock.",
 "Mantener la calma y esperar": "Stay calm and wait",
 "Tranquilizar al equipo.": "Calm the crew down.",
 "Fatiga de la tripulación": "Crew fatigue",
 "Los turnos largos pasan factura. Hay errores pequeños y discusiones.": "Long shifts take their toll. Small mistakes and arguments pile up.",
 "Reorganizar los turnos": "Reorganize the shifts",
 "Equilibrar el trabajo.": "Balance the workload.",
 "Programa de descanso y ejercicio": "Rest and exercise program",
 "Recuperar el ritmo biológico.": "Recover the body clock.",
 "Comida fresca del invernadero": "Fresh food from the greenhouse",
 "Ánimo por el estómago.": "Morale through the stomach.",
 "Señal desconocida": "Unknown signal",
 "Los sensores captan una señal periódica sin origen claro.": "The sensors pick up a periodic signal with no clear origin.",
 "Decodificar con IA": "Decode it with AI",
 "¿Natural o artificial?": "Natural or artificial?",
 "Rastrear su origen": "Trace its origin",
 "Triangular con las antenas.": "Triangulate with the antennas.",
 "Ignorarla y continuar": "Ignore it and carry on",
 "No desviar la misión.": "Don't divert the mission.",
 "Fuga de presión menor": "Minor pressure leak",
 "Una microfisura en un módulo pierde aire lentamente.": "A micro-crack in a module slowly loses air.",
 "Sellar desde adentro": "Seal it from inside",
 "Parche rápido con resina.": "Quick resin patch.",
 "Aislar el módulo": "Isolate the module",
 "Cerrar la puerta y seguir.": "Close the door and move on.",
 "Enviar un robot afuera": "Send a robot outside",
 "Reparación remota.": "Remote repair.",
 "Debate sobre el rumbo": "Debate over the course",
 "La tripulación discute si seguir el plan o modificarlo. Hay dos bandos.": "The crew argues whether to follow the plan or change it. There are two camps.",
 "Votación formal": "Formal vote",
 "Decidir entre todos.": "Everyone decides together.",
 "Mediar con datos": "Mediate with data",
 "Presentar evidencias científicas.": "Present scientific evidence.",
 "Dejar que decida el piloto": "Let the pilot decide",
 "Quien vuela, define.": "Whoever flies, decides.",
 "Tormenta solar": "Solar storm",
 "Una eyección de masa coronal viaja hacia la nave.": "A coronal mass ejection is heading for the ship.",
 "Refugiar a todos en el módulo blindado": "Shelter everyone in the shielded module",
 "Proteger primero a las personas.": "Protect people first.",
 "Girar la nave detrás del escudo": "Turn the ship behind the shield",
 "Usar el casco como protección.": "Use the hull as protection.",
 "Mantener todos los sistemas activos": "Keep all systems running",
 "Intentar no perder instrumentos.": "Try not to lose instruments.",
 "Incendio en el módulo": "Fire in the module",
 "Hay humo en el módulo de servicio. La alarma suena.": "There is smoke in the service module. The alarm sounds.",
 "Cortar la ventilación": "Cut the ventilation",
 "Ahogar el fuego sin oxígeno.": "Smother the fire without oxygen.",
 "Evacuar y sellar": "Evacuate and seal",
 "Salvar al equipo.": "Save the crew.",
 "Espuma química": "Chemical foam",
 "Sofocar con reactivos.": "Smother it with reagents.",
 "Cortocircuito en el panel principal": "Short circuit in the main panel",
 "Se pierde energía en dos sistemas críticos.": "Power is lost in two critical systems.",
 "Redirigir la energía": "Reroute the power",
 "Puentear el panel dañado.": "Bypass the damaged panel.",
 "Apagar lo no esencial": "Shut down non-essentials",
 "Priorizar el soporte vital.": "Prioritize life support.",
 "Reinicio con IA": "AI reboot",
 "Reescribir el firmware.": "Rewrite the firmware.",
 "Apagón de comunicaciones": "Communications blackout",
 "Se pierde todo contacto con la Tierra.": "All contact with Earth is lost.",
 "Activar canales de emergencia": "Activate emergency channels",
 "Frecuencias de respaldo.": "Backup frequencies.",
 "Seguir el protocolo autónomo": "Follow the autonomous protocol",
 "Decidir sin ayuda externa.": "Decide without outside help.",
 "Reorientar la nave": "Reorient the ship",
 "Alinear las antenas moviendo todo.": "Align the antennas by moving everything.",
 "Emergencia médica a bordo": "Medical emergency on board",
 "Un integrante sufre un cuadro agudo sin causa clara.": "A crew member suffers an acute episode with no clear cause.",
 "Diagnóstico y tratamiento": "Diagnose and treat",
 "Usar el botiquín avanzado.": "Use the advanced medkit.",
 "Consultar a Tierra": "Consult Earth",
 "Pedir asesoramiento médico.": "Ask for medical advice.",
 "Análisis toxicológico": "Toxicology analysis",
 "Buscar el veneno.": "Look for the poison.",
 "Escombros espaciales": "Space debris",
 "Restos de satélites se acercan a la ruta de la nave.": "Satellite wreckage approaches the ship's route.",
 "Cálculo fino de trayectoria": "Fine trajectory calculation",
 "Esquivar con precisión.": "Dodge with precision.",
 "Usar el escudo": "Use the shield",
 "Absorber con protección.": "Absorb it with protection.",
 "Cambiar de órbita": "Change orbit",
 "Alejarse de la zona.": "Move away from the area.",
 "Recorte de presupuesto": "Budget cut",
 "Desde Tierra avisan que el financiamiento se reducirá si no hay resultados pronto.": "Earth warns funding will shrink if there are no results soon.",
 "Enviar datos preliminares": "Send preliminary data",
 "Mostrar avances científicos.": "Show scientific progress.",
 "Negociar con la agencia": "Negotiate with the agency",
 "Pedir un plazo mayor.": "Ask for more time.",
 "Reducir gastos a bordo": "Cut onboard spending",
 "Ajustar el consumo de recursos.": "Adjust resource consumption.",
 "Aproximación a {p}": "Approach to {p}",
 "La nave entra en la órbita de {p}. Los sensores detectan {h}.": "The ship enters {p} orbit. The sensors detect {h}.",
 "Frenado gradual": "Gradual braking",
 "Más seguro, más combustible.": "Safer, more fuel.",
 "Ingreso directo": "Direct entry",
 "Ahorrar tiempo con mayor riesgo.": "Save time at higher risk.",
 "Calibrar motores durante la maniobra": "Calibrate engines during the maneuver",
 "Ajuste en vuelo.": "In-flight adjustment.",
 "Zona de descenso": "Landing zone",
 "Hay que elegir dónde aterrizar en {p}.": "You must choose where to land on {p}.",
 "Terreno llano y seguro": "Flat, safe terrain",
 "Evaluar la estabilidad del suelo.": "Assess the ground stability.",
 "Cerca de un punto científico": "Near a science site",
 "Más datos, más riesgo.": "More data, more risk.",
 "Aterrizaje de precisión": "Precision landing",
 "Exigir al máximo la nave.": "Push the ship to the limit.",
 "Muestras de superficie": "Surface samples",
 "Las primeras muestras de {p} revelan una composición inesperada.": "The first samples from {p} reveal an unexpected composition.",
 "Análisis completo en el laboratorio": "Full lab analysis",
 "Procesar con calma.": "Process it calmly.",
 "Buscar biofirmas": "Search for biosignatures",
 "Priorizar la búsqueda de vida.": "Prioritize the search for life.",
 "Análisis químico rápido": "Quick chemical analysis",
 "Reactivos en campo.": "Field reagents.",
 "Base temporal": "Temporary base",
 "Hay que montar un campamento en {p}, con {h} alrededor.": "A camp must be set up on {p}, with {h} all around.",
 "Montaje rápido y compacto": "Quick, compact setup",
 "Menos tiempo expuestos.": "Less time exposed.",
 "Montaje reforzado": "Reinforced setup",
 "Bases sólidas, más recursos.": "Solid foundations, more resources.",
 "Usar el módulo de aterrizaje como refugio": "Use the lander as shelter",
 "Sin construir nada nuevo.": "Build nothing new.",
 "Clima hostil": "Hostile weather",
 "Una tormenta de {h} se acerca al campamento.": "A storm of {h} approaches the camp.",
 "Asegurar todo el equipo": "Secure all the equipment",
 "Anclar y proteger los sistemas.": "Anchor and protect the systems.",
 "Aprovechar para medir": "Take the chance to measure",
 "Tomar datos del fenómeno.": "Collect data on the phenomenon.",
 "Refugiarse y esperar": "Shelter and wait",
 "Priorizar a la tripulación.": "Put the crew first.",
 "Eco bajo la superficie": "Echo beneath the surface",
 "Los sensores detectan estructuras o movimiento bajo el suelo.": "The sensors detect structures or movement underground.",
 "Perforar para investigar": "Drill to investigate",
 "Acceder al subsuelo.": "Access the subsurface.",
 "Escanear sin tocar": "Scan without touching",
 "Medir a distancia.": "Measure from a distance.",
 "Enviar un dron": "Send a drone",
 "Explorar sin riesgo humano.": "Explore with no human risk.",
 "Traje dañado": "Damaged suit",
 "Un traje presenta una pérdida en plena excursión.": "A suit springs a leak in the middle of an excursion.",
 "Volver de inmediato": "Return immediately",
 "Regreso a la base sin demora.": "Back to base without delay.",
 "Reparar en el lugar": "Repair on the spot",
 "Parche de emergencia.": "Emergency patch.",
 "Atención médica en campo": "Field medical care",
 "Estabilizar al afectado.": "Stabilize the casualty.",
 "Primer informe a Tierra": "First report to Earth",
 "El mundo espera noticias del primer día en {p}.": "The world awaits news of the first day on {p}.",
 "Transmisión en vivo": "Live broadcast",
 "Compartir imágenes y datos.": "Share images and data.",
 "Informe técnico": "Technical report",
 "Resultados medidos y precisos.": "Measured, precise results.",
 "Mensaje breve del comandante": "Short message from the commander",
 "Tranquilizar y agradecer.": "Reassure and give thanks.",
 "Preparar el ascenso": "Prepare the ascent",
 "El despegue desde {p} exige combustible y sistemas al límite.": "Liftoff from {p} demands fuel and systems at their limit.",
 "Revisión completa": "Full inspection",
 "Cada sistema, uno por uno.": "Every system, one by one.",
 "Despegue anticipado": "Early liftoff",
 "Aprovechar la ventana orbital.": "Use the orbital window.",
 "Reducir la carga": "Reduce the load",
 "Dejar parte de las muestras.": "Leave part of the samples behind.",
 "Qué llevamos a casa": "What we bring home",
 "El peso limitado obliga a elegir entre muestras, equipos y registros.": "Limited weight forces a choice between samples, equipment and records.",
 "Priorizar muestras biológicas": "Prioritize biological samples",
 "Lo más valioso para la ciencia.": "Most valuable for science.",
 "Priorizar muestras geológicas": "Prioritize geological samples",
 "Rocas y minerales.": "Rocks and minerals.",
 "Solo datos digitales": "Digital data only",
 "Transmitir y viajar liviano.": "Transmit and travel light.",
 "Reentrada atmosférica": "Atmospheric reentry",
 "El escudo térmico muestra desgaste en los últimos cálculos.": "The heat shield shows wear in the latest calculations.",
 "Ángulo de entrada preciso": "Precise entry angle",
 "Controlar manualmente.": "Control it manually.",
 "Seguir el protocolo de Tierra": "Follow Earth's protocol",
 "Con guía remota.": "With remote guidance.",
 "Conferencia de prensa final": "Final press conference",
 "Todo el mundo espera escuchar a la tripulación.": "The whole world wants to hear the crew.",
 "Presentación abierta": "Open presentation",
 "Contar la historia completa.": "Tell the whole story.",
 "Resultados científicos": "Scientific results",
 "Centrarse en lo hallado.": "Focus on what was found.",
 "Homenaje al equipo": "Tribute to the team",
 "Reconocer a cada integrante.": "Recognize every member.",
 "Tripulante agotado": "Exhausted crew member",
 "El cansancio acumulado se hace sentir justo antes del regreso.": "Accumulated fatigue hits right before the return.",
 "Descanso obligatorio": "Mandatory rest",
 "Frenar y recuperar.": "Stop and recover.",
 "Relevo de tareas": "Task handover",
 "Redistribuir responsabilidades.": "Redistribute responsibilities.",
 "Apoyo emocional desde Tierra": "Emotional support from Earth",
 "Mensajes de la familia.": "Messages from family.",
 "Hallazgo contra seguridad": "Discovery versus safety",
 "Quedan datos por recoger, pero la ventana de regreso se cierra.": "There is data left to collect, but the return window is closing.",
 "Un último estudio rápido": "One last quick study",
 "Recoger lo posible.": "Collect what you can.",
 "Regresar ya": "Return now",
 "No arriesgar la ventana.": "Don't risk the window.",
 "Dejar un robot midiendo": "Leave a robot measuring",
 "Sigue sin vos.": "It carries on without you.",
 "Autoridad cuestionada": "Authority challenged",
 "Un integrante desafía una orden frente a todo el equipo.": "A crew member defies an order in front of the whole team.",
 "Hablar a solas": "Talk in private",
 "Resolverlo en privado.": "Settle it privately.",
 "Reafirmar la orden": "Reaffirm the order",
 "Mostrar firmeza.": "Show firmness.",
 "Pedir mediación médica": "Ask for medical mediation",
 "Que un tercero ayude.": "Let a third party help.",
 "Decisión sin consenso": "Decision without consensus",
 "Nadie quiere cargar con la decisión más difícil del viaje.": "Nobody wants to carry the hardest decision of the trip.",
 "Asumir la responsabilidad": "Take responsibility",
 "Decidir y responder.": "Decide and answer for it.",
 "Consultar a la tripulación": "Consult the crew",
 "Buscar consenso.": "Seek consensus.",
 "Pedir directivas a Tierra": "Ask Earth for directives",
 "Con demora.": "With a delay.",
 "Informe al centro de control": "Report to mission control",
 "Tierra exige explicaciones sobre un gasto no autorizado.": "Earth demands explanations for an unauthorized expense.",
 "Explicar con transparencia": "Explain transparently",
 "Honestidad ante la agencia.": "Be honest with the agency.",
 "Justificar con resultados": "Justify with results",
 "Mostrar datos.": "Show data.",
 "Minimizar el gasto": "Downplay the expense",
 "Presentarlo como menor.": "Present it as minor.",
 "Un momento de duda": "A moment of doubt",
 "La tripulación duda del sentido de la misión.": "The crew doubts the purpose of the mission.",
 "Un discurso inspirador": "An inspiring speech",
 "Recordar el objetivo.": "Remember the goal.",
 "Compartir los números": "Share the numbers",
 "Mostrar los avances.": "Show the progress.",
 "Una actividad en equipo": "A team activity",
 "Fortalecer al grupo.": "Strengthen the group.",
 "Campo de asteroides": "Asteroid field",
 "Un cinturón de rocas bloquea la ruta directa.": "A belt of rocks blocks the direct route.",
 "Vuelo manual entre rocas": "Manual flight among the rocks",
 "Precisión extrema.": "Extreme precision.",
 "Rodear el cinturón": "Go around the belt",
 "Más largo y seguro.": "Longer but safer.",
 "Pasaje calculado con ingeniería": "Engineered calculated passage",
 "Ruta asistida.": "Assisted route.",
 "Asistencia gravitacional": "Gravity assist",
 "Hay una oportunidad de ahorrar combustible usando la gravedad de un cuerpo cercano.": "There's a chance to save fuel using the gravity of a nearby body.",
 "Aprovechar la asistencia": "Use the assist",
 "Ahorrar combustible.": "Save fuel.",
 "Ignorarla": "Ignore it",
 "Seguir el plan.": "Stick to the plan.",
 "Verificar el cálculo con ingeniería": "Verify the calculation with engineering",
 "Doble chequeo.": "Double check.",
 "Falla de aterrizaje": "Landing failure",
 "El sistema automático falla a baja altura.": "The automatic system fails at low altitude.",
 "Tomar el control manual": "Take manual control",
 "Aterrizar a mano.": "Land by hand.",
 "Abortar y reintentar": "Abort and retry",
 "Gastar más combustible.": "Burn more fuel.",
 "Reiniciar el sistema": "Restart the system",
 "Rápido y arriesgado.": "Fast and risky.",
 "Maniobra de acoplamiento": "Docking maneuver",
 "Para volver hay que acoplarse al módulo orbital con poco margen.": "To return, you must dock with the orbital module with little margin.",
 "Acoplamiento manual": "Manual docking",
 "Precisión de piloto.": "Pilot's precision.",
 "Acoplamiento automático": "Automatic docking",
 "Seguro pero lento.": "Safe but slow.",
 "Guiado desde Tierra": "Guided from Earth",
 "Con demora de señal.": "With signal delay.",
 "Sobrecalentamiento del reactor": "Reactor overheating",
 "La temperatura del reactor supera lo previsto.": "The reactor temperature exceeds the forecast.",
 "Reducir la potencia": "Reduce the power",
 "Más fresco, menos energía.": "Cooler, less energy.",
 "Reparar el circuito de refrigeración": "Repair the cooling circuit",
 "Intervención compleja.": "Complex intervention.",
 "Pedir diagnóstico a Tierra": "Ask Earth for a diagnosis",
 "Asesoramiento remoto.": "Remote advice.",
 "Pieza crítica rota": "Critical part broken",
 "Se rompe una pieza que no tiene repuesto.": "A part with no spare breaks.",
 "Fabricarla con la impresora 3D": "Make it with the 3D printer",
 "Usar los recursos de a bordo.": "Use onboard resources.",
 "Improvisar con otro material": "Improvise with another material",
 "Adaptar un componente.": "Adapt a component.",
 "Operar sin la pieza": "Operate without the part",
 "Reducir el uso del sistema.": "Reduce use of the system.",
 "Paneles solares ineficientes": "Inefficient solar panels",
 "Los paneles rinden por debajo de lo esperado.": "The panels perform below expectations.",
 "Reorientar los paneles": "Reorient the panels",
 "Ajuste fino con la nave.": "Fine adjustment with the ship.",
 "Limpiarlos en una caminata espacial": "Clean them on a spacewalk",
 "Salida de riesgo.": "A risky outing.",
 "Reducir la demanda": "Reduce demand",
 "Menos consumo.": "Less consumption.",
 "Auditoría de sistemas": "Systems audit",
 "Hay que evaluar el estado general de la nave.": "The overall state of the ship must be assessed.",
 "Auditoría exhaustiva": "Exhaustive audit",
 "Detectar todo.": "Catch everything.",
 "Auditoría rápida": "Quick audit",
 "Solo lo urgente.": "Only the urgent.",
 "Que cada rol revise lo suyo": "Let each role check their own",
 "Delegar el chequeo.": "Delegate the check.",
 "Mareo espacial": "Space sickness",
 "Varios integrantes sufren náuseas y desorientación.": "Several crew members suffer nausea and disorientation.",
 "Medicación específica": "Specific medication",
 "Tratamiento farmacológico.": "Drug treatment.",
 "Ejercicios de adaptación": "Adaptation exercises",
 "Sin fármacos, más lento.": "No drugs, slower.",
 "Reducir las tareas": "Reduce the tasks",
 "Descanso para todos.": "Rest for everyone.",
 "Radiación acumulada": "Accumulated radiation",
 "Los dosímetros muestran una dosis superior a la prevista.": "The dosimeters show a higher dose than expected.",
 "Protocolo de protección": "Protection protocol",
 "Refugio y suplementos.": "Shelter and supplements.",
 "Seguir con el plan": "Stick with the plan",
 "Aceptar el riesgo.": "Accept the risk.",
 "Análisis de sangre completo": "Full blood analysis",
 "Medir el impacto real.": "Measure the real impact.",
 "Aislamiento psicológico": "Psychological isolation",
 "Un integrante muestra señales de angustia y aislamiento.": "A crew member shows signs of distress and isolation.",
 "Sesión de apoyo": "Support session",
 "Escucha profesional.": "Professional listening.",
 "Conectarlo con su familia": "Connect them with their family",
 "Mensaje diferido.": "Delayed message.",
 "Asignarle una tarea clave": "Give them a key task",
 "Darle propósito.": "Give them purpose.",
 "Síntomas desconocidos": "Unknown symptoms",
 "Aparecen síntomas extraños que podrían venir de las muestras.": "Strange symptoms appear that could come from the samples.",
 "Aislar y analizar": "Isolate and analyze",
 "Cuarentena.": "Quarantine.",
 "Estudiar el microorganismo": "Study the microorganism",
 "Oportunidad científica.": "Scientific opportunity.",
 "Reportar a Tierra": "Report to Earth",
 "Pedir protocolo.": "Ask for a protocol.",
 "Colonias en la nave": "Colonies on the ship",
 "Se detectan colonias de microbios en el módulo habitable.": "Microbe colonies are detected in the habitat module.",
 "Esterilizar todo": "Sterilize everything",
 "Limpieza total.": "Total cleaning.",
 "Estudiar las colonias": "Study the colonies",
 "¿Se adaptaron al espacio?": "Did they adapt to space?",
 "Aislar el sector": "Isolate the sector",
 "Sellar y observar.": "Seal and observe.",
 "Biofirma dudosa": "Doubtful biosignature",
 "Un análisis da positivo para compuestos orgánicos, pero podría ser contaminación.": "An analysis is positive for organic compounds, but it could be contamination.",
 "Repetir el análisis": "Repeat the analysis",
 "Verificar con cuidado.": "Verify carefully.",
 "Publicar el hallazgo ya": "Publish the finding now",
 "Compartir con Tierra.": "Share with Earth.",
 "Comparar con muestras de control": "Compare with control samples",
 "Descartar contaminación.": "Rule out contamination.",
 "Ambiente extremo": "Extreme environment",
 "Algo parece vivir en un lugar donde no debería.": "Something seems to live where it shouldn't.",
 "Cultivarlo en el laboratorio": "Grow it in the lab",
 "Con riesgo biológico.": "With biohazard risk.",
 "Observarlo en el lugar": "Observe it on site",
 "Sin tocarlo.": "Without touching it.",
 "Recoger una muestra sellada": "Collect a sealed sample",
 "Protocolo de seguridad.": "Safety protocol.",
 "Protocolo de cuarentena": "Quarantine protocol",
 "Hay que decidir si las muestras vuelven selladas o no.": "You must decide whether the samples return sealed or not.",
 "Cuarentena estricta": "Strict quarantine",
 "Seguridad ante todo.": "Safety above all.",
 "Contenedores especiales": "Special containers",
 "Muestras protegidas.": "Protected samples.",
 "Transmitir solo los datos": "Transmit only the data",
 "Dejar las muestras.": "Leave the samples.",
 "Terreno inestable": "Unstable ground",
 "El suelo bajo el campamento muestra grietas.": "The ground under the camp shows cracks.",
 "Reforzar el suelo": "Reinforce the ground",
 "Compactar y anclar.": "Compact and anchor.",
 "Trasladar el campamento": "Move the camp",
 "Mover el módulo.": "Relocate the module.",
 "Estudiar la grieta": "Study the crack",
 "Una oportunidad científica.": "A scientific opportunity.",
 "Veta de minerales": "Mineral vein",
 "Hay depósitos de minerales de gran valor científico y económico.": "There are mineral deposits of great scientific and economic value.",
 "Extraer muestras": "Extract samples",
 "Perforación controlada.": "Controlled drilling.",
 "Mapear sin extraer": "Map without extracting",
 "Solo registrar.": "Just record.",
 "Reportarlo a Tierra": "Report it to Earth",
 "Antes de actuar.": "Before acting.",
 "Mapa geológico": "Geological map",
 "Hay que decidir hacia dónde se amplía la exploración.": "You must decide where to expand the exploration.",
 "Explorar un cráter": "Explore a crater",
 "Buscar capas antiguas.": "Look for ancient layers.",
 "Una zona cercana": "A nearby area",
 "Seguir las lecturas de un dron": "Follow a drone's readings",
 "Que los datos guíen.": "Let the data guide.",
 "Sismo": "Quake",
 "Un temblor sacude la zona de trabajo.": "A tremor shakes the work area.",
 "Evacuar": "Evacuate",
 "Salir del área.": "Leave the area.",
 "Medir la actividad": "Measure the activity",
 "Datos únicos.": "Unique data.",
 "Asegurar el equipo": "Secure the equipment",
 "Proteger instrumentos.": "Protect instruments.",
 "La demora de transmisión complica cada conversación con Tierra.": "The transmission delay complicates every conversation with Earth.",
 "Mensajes grabados": "Recorded messages",
 "Automatizar el contacto.": "Automate the contact.",
 "Protocolo comprimido": "Compressed protocol",
 "Menos datos, más velocidad.": "Less data, more speed.",
 "Canal de baja frecuencia": "Low-frequency channel",
 "Lento pero estable.": "Slow but stable.",
 "Interferencia": "Interference",
 "Algo bloquea parte de la banda de comunicación.": "Something blocks part of the communication band.",
 "Cambiar de frecuencia": "Change frequency",
 "Saltos de banda.": "Band hopping.",
 "Aumentar la potencia": "Increase the power",
 "Más fuerza, más energía.": "More strength, more energy.",
 "Mover la antena": "Move the antenna",
 "Cambiar la orientación.": "Change the orientation.",
 "Mensaje del mundo": "Message from home",
 "Llega un mensaje inesperado de la Tierra con noticias difíciles.": "An unexpected message arrives from Earth with hard news.",
 "Contarlo con cuidado": "Tell it carefully",
 "Compartir con tacto.": "Share with tact.",
 "Que decida el comandante": "Let the commander decide",
 "Control del mensaje.": "Control of the message.",
 "Esperar un mejor momento": "Wait for a better moment",
 "Cuidar el ánimo.": "Protect morale.",
 "Datos en cola": "Queued data",
 "Hay más datos que ancho de banda disponible.": "There is more data than available bandwidth.",
 "Comprimir y priorizar": "Compress and prioritize",
 "Elegir lo clave.": "Pick the key parts.",
 "Enviar todo por tandas": "Send everything in batches",
 "Más lento y seguro.": "Slower and safer.",
 "Consultar prioridades científicas": "Consult scientific priorities",
 "Que ciencia decida.": "Let science decide.",
 "Polvo lunar": "Lunar dust",
 "El fino polvo se pega a los trajes y a los equipos.": "The fine dust clings to suits and equipment.",
 "Cepillar y sellar": "Brush and seal",
 "Limpieza constante.": "Constant cleaning.",
 "Trabajar rápido": "Work fast",
 "Revisar los filtros": "Check the filters",
 "Proteger los pulmones.": "Protect the lungs.",
 "Hielo en los polos": "Ice at the poles",
 "Un cráter en sombra permanente podría guardar agua.": "A permanently shadowed crater could hold water.",
 "Perforar el cráter": "Drill the crater",
 "Extraer núcleos.": "Extract cores.",
 "Escanear desde órbita": "Scan from orbit",
 "Con radar.": "With radar.",
 "Bajar un rover": "Lower a rover",
 "Exploración guiada.": "Guided exploration.",
 "Falla cerca de la Luna": "Failure near the Moon",
 "Una falla breve de motor ocurre cerca de la superficie lunar.": "A brief engine failure occurs near the lunar surface.",
 "Corrección inmediata": "Immediate correction",
 "Reaccionar con precisión.": "React with precision.",
 "Reiniciar el motor": "Restart the engine",
 "Una pausa de seguridad.": "A safety pause.",
 "Pedir apoyo a la base": "Ask base for support",
 "Esperar ayuda.": "Wait for help.",
 "Despegue lunar": "Lunar liftoff",
 "Hay que despegar con baja gravedad y poco margen de energía.": "You must lift off in low gravity with little energy margin.",
 "Impulso fuerte": "Strong thrust",
 "Gastar energía.": "Burn energy.",
 "Impulso calculado": "Calculated thrust",
 "Aligerar la carga": "Lighten the load",
 "Dejar peso.": "Drop weight.",
 "Tormenta de polvo global": "Global dust storm",
 "El cielo se vuelve rojo y los paneles dejan de cargar.": "The sky turns red and the panels stop charging.",
 "Hibernar los sistemas": "Hibernate the systems",
 "Ahorrar energía.": "Save energy.",
 "Seguir trabajando": "Keep working",
 "Celdas de combustible": "Fuel cells",
 "Energía química.": "Chemical energy.",
 "Antiguos cauces secos": "Ancient dry riverbeds",
 "Se ven formas de antiguos ríos.": "Shapes of ancient rivers are visible.",
 "Estudiar sedimentos": "Study sediments",
 "Leer la historia del agua.": "Read the history of water.",
 "Buscar microfósiles": "Search for microfossils",
 "Rastros de vida pasada.": "Traces of past life.",
 "Mapear con un dron": "Map with a drone",
 "Cobertura amplia.": "Wide coverage.",
 "Percloratos tóxicos": "Toxic perchlorates",
 "El suelo contiene químicos dañinos.": "The soil contains harmful chemicals.",
 "Filtrar el aire": "Filter the air",
 "Proteger a todos.": "Protect everyone.",
 "Neutralizar el suelo": "Neutralize the soil",
 "Química de suelos.": "Soil chemistry.",
 "Evitar la zona": "Avoid the area",
 "Cambiar de lugar.": "Change location.",
 "Ventana de regreso": "Return window",
 "Marte y la Tierra se alejan y la ventana de regreso se acorta.": "Mars and Earth drift apart and the return window shrinks.",
 "Salir ya": "Leave now",
 "Ventana justa.": "A tight window.",
 "Esperar combustible": "Wait for fuel",
 "Cargar al máximo.": "Fill up to the max.",
 "Optimizar la ruta": "Optimize the route",
 "Órbita de transferencia.": "Transfer orbit.",
 "Lluvia ácida": "Acid rain",
 "Nubes de ácido sulfúrico corroen el casco.": "Clouds of sulfuric acid corrode the hull.",
 "Escudo adicional": "Extra shield",
 "Más protección.": "More protection.",
 "Subir de altitud": "Climb in altitude",
 "Alejarse de la nube.": "Move away from the cloud.",
 "Reducir el tiempo expuesto": "Reduce exposure time",
 "Misión más breve.": "A shorter mission.",
 "Presión extrema": "Extreme pressure",
 "La presión aplasta los equipos.": "The pressure crushes the equipment.",
 "Reforzar la estructura": "Reinforce the structure",
 "Cambiar piezas.": "Swap parts.",
 "Operar a distancia": "Operate remotely",
 "Control remoto.": "Remote control.",
 "Usar un globo atmosférico": "Use an atmospheric balloon",
 "Flotar entre las nubes.": "Float among the clouds.",
 "Calor abrasador": "Scorching heat",
 "La temperatura excede lo previsto.": "The temperature exceeds the forecast.",
 "Activar la refrigeración": "Activate cooling",
 "Reducir la actividad": "Reduce activity",
 "Evitar el golpe térmico.": "Avoid heat shock.",
 "Aprovechar el calor para analizar": "Use the heat to analyze",
 "Estudio térmico.": "Thermal study.",
 "Microbios en las nubes": "Microbes in the clouds",
 "Algo en la atmósfera sugiere química orgánica.": "Something in the atmosphere suggests organic chemistry.",
 "Muestrear con un dron": "Sample with a drone",
 "Capturar partículas.": "Capture particles.",
 "Analizar a distancia": "Analyze from a distance",
 "Con instrumentos.": "With instruments.",
 "Dejar sondas flotantes": "Leave floating probes",
 "Laboratorio en las nubes.": "A lab in the clouds.",
 "Grietas en el hielo": "Cracks in the ice",
 "La superficie helada se parte bajo el módulo.": "The icy surface splits beneath the module.",
 "Retirarse": "Pull back",
 "Estabilizar el hielo": "Stabilize the ice",
 "Anclajes y sondas.": "Anchors and probes.",
 "Medir las grietas": "Measure the cracks",
 "Datos del océano.": "Ocean data.",
 "Radiación de Júpiter": "Jupiter's radiation",
 "Los cinturones de radiación saturan los sensores.": "The radiation belts saturate the sensors.",
 "Refugio blindado": "Armored shelter",
 "Proteger al equipo.": "Protect the team.",
 "Apagar instrumentos": "Switch off instruments",
 "Evitar daños.": "Avoid damage.",
 "Medir la radiación": "Measure the radiation",
 "Perforar hacia el océano": "Drill toward the ocean",
 "Se puede perforar hacia el océano subterráneo.": "It's possible to drill toward the subsurface ocean.",
 "Perforación profunda": "Deep drilling",
 "Acceso directo.": "Direct access.",
 "Sonda robótica": "Robotic probe",
 "Autónoma.": "Autonomous.",
 "Solo escuchar": "Just listen",
 "Detectar con sonar.": "Detect with sonar.",
 "Géiser inesperado": "Unexpected geyser",
 "Un chorro de vapor se eleva cerca del despegue.": "A jet of vapor rises near the liftoff site.",
 "Despegar ya": "Lift off now",
 "Antes del chorro.": "Before the jet.",
 "Esperar que baje": "Wait for it to subside",
 "Más seguro.": "Safer.",
 "Capturar una muestra": "Capture a sample",
 "Aprovechar el fenómeno.": "Take advantage of the phenomenon.",
 "Lagos de metano": "Methane lakes",
 "Hay lagos de hidrocarburos líquidos junto al campamento.": "There are lakes of liquid hydrocarbons next to the camp.",
 "Tomar muestras": "Take samples",
 "Analizar la composición.": "Analyze the composition.",
 "Explorar en bote": "Explore by boat",
 "Con riesgo.": "At risk.",
 "Buscar química prebiótica": "Search for prebiotic chemistry",
 "Origen de la vida.": "Origin of life.",
 "Frío extremo": "Extreme cold",
 "El frío de -180 °C pone a prueba los sistemas.": "The −180 °C cold tests the systems.",
 "Calentar los módulos": "Heat the modules",
 "Lo mínimo.": "The bare minimum.",
 "Abrigar al equipo": "Bundle up the team",
 "Protección personal.": "Personal protection.",
 "Atmósfera densa": "Dense atmosphere",
 "La atmósfera espesa dificulta el descenso.": "The thick atmosphere makes the descent harder.",
 "Descenso con paracaídas": "Parachute descent",
 "Aprovechar el aire.": "Use the air.",
 "Descenso con propulsores": "Thruster descent",
 "Más control.": "More control.",
 "Usar un globo": "Use a balloon",
 "Lento y seguro.": "Slow and safe.",
 "Despegue en baja gravedad": "Low-gravity liftoff",
 "Poca gravedad y mucha atmósfera complican el ascenso.": "Low gravity and heavy atmosphere complicate the ascent.",
 "Calcular el ángulo": "Calculate the angle",
 "Mínimo consumo.": "Minimum consumption.",
 "Reducir el peso": "Cut the weight",
 "Dejar muestras.": "Leave samples.",
 "Ayuda de Tierra": "Help from Earth",
 "Optimización remota.": "Remote optimization.",
 "Géiseres de hielo": "Ice geysers",
 "Chorros de agua salen del polo sur.": "Jets of water erupt from the south pole.",
 "Volar a través del chorro": "Fly through the jet",
 "Recolectar muestras.": "Collect samples.",
 "Muestrear desde el suelo": "Sample from the ground",
 "Analizar su química": "Analyze its chemistry",
 "Buscar orgánicos.": "Look for organics.",
 "Gravedad ínfima": "Tiny gravity",
 "La gravedad casi nula complica moverse.": "Near-zero gravity makes moving difficult.",
 "Anclarse al suelo": "Anchor to the ground",
 "Arneses.": "Harnesses.",
 "Entrenar el movimiento": "Train the movement",
 "Adaptación del cuerpo.": "Body adaptation.",
 "Saltar entre zonas": "Jump between zones",
 "Anillos de partículas": "Particle rings",
 "El entorno tiene partículas de hielo a alta velocidad.": "The environment has ice particles at high speed.",
 "Ruta de bajo impacto": "Low-impact route",
 "Entrar despacio.": "Enter slowly.",
 "Escudo de partículas": "Particle shield",
 "Protección extra.": "Extra protection.",
 "Mapear antes de bajar": "Map before descending",
 "Contaminación biológica": "Biological contamination",
 "El módulo pudo haber contaminado el hielo.": "The module may have contaminated the ice.",
 "Esterilizar el módulo": "Sterilize the module",
 "Prevenir.": "Prevent.",
 "Documentar el incidente": "Document the incident",
 "Informe honesto.": "Honest report.",
 "Ocultarlo": "Hide it",
 "Evitar un escándalo.": "Avoid a scandal.",
 "Atmósfera desconocida": "Unknown atmosphere",
 "Los sensores no reconocen parte de la composición.": "The sensors don't recognize part of the composition.",
 "Análisis cauteloso": "Cautious analysis",
 "Poco a poco.": "Little by little.",
 "Salir con trajes": "Go out in suits",
 "Con monitoreo.": "With monitoring.",
 "Medir desde la nave": "Measure from the ship",
 "Datos desde arriba.": "Data from above.",
 "Gravedad mayor": "Higher gravity",
 "Cada paso exige más esfuerzo.": "Every step takes more effort.",
 "Exoesqueletos": "Exoskeletons",
 "Asistencia mecánica.": "Mechanical assistance.",
 "Misiones breves": "Short missions",
 "Menos tiempo afuera.": "Less time outside.",
 "Entrenamiento rápido": "Quick training",
 "Adaptación.": "Adaptation.",
 "A años luz de casa": "Light-years from home",
 "Todo mensaje tardará siglos: la tripulación está sola.": "Every message will take centuries: the crew is alone.",
 "Decidir solos": "Decide on our own",
 "Autonomía total.": "Total autonomy.",
 "Grabar un registro": "Record a log",
 "Para el futuro.": "For the future.",
 "Mantener el ánimo": "Keep morale up",
 "Unirse como equipo.": "Come together as a team.",
 "Señal estructurada": "Structured signal",
 "Detectan un patrón repetitivo en las ondas del planeta.": "A repeating pattern is detected in the planet's waves.",
 "Descifrarla con IA": "Decipher it with AI",
 "Buscar el patrón.": "Find the pattern.",
 "Compararla con datos naturales": "Compare it with natural data",
 "Descartar una causa natural.": "Rule out a natural cause.",
 "Buscar posible vida": "Search for possible life",
 "Biofirma.": "Biosignature.",
 "Reservas críticas": "Critical reserves",
 "La energía está en niveles peligrosos. Cada decisión cuenta.": "Energy is at dangerous levels. Every decision counts.",
 "Apagar todo lo no esencial": "Shut down everything non-essential",
 "Ahorrar lo que queda.": "Save what's left.",
 "Racionar y priorizar": "Ration and prioritize",
 "Decidir qué sigue encendido.": "Decide what stays on.",
 "Reconectar los paneles a mano": "Reconnect the panels by hand",
 "Una maniobra desesperada.": "A desperate maneuver.",
 "Moral por el piso": "Morale at rock bottom",
 "La tripulación está al límite y hay conflictos abiertos.": "The crew is at its limit and open conflicts are brewing.",
 "Apoyo médico y psicológico": "Medical and psychological support",
 "Cuidar a cada uno.": "Take care of each one.",
 "Reunión general": "General meeting",
 "Poner todo sobre la mesa.": "Put everything on the table.",
 "Mensaje de la Tierra": "Message from Earth",
 "Reconectar con casa.": "Reconnect with home.",
 "Dron fuera de control": "Drone out of control",
 "Un dron de carga gira sin control por la bodega.": "A cargo drone spins out of control through the hold.",
 "Reprogramarlo en vivo": "Reprogram it live",
 "Hackeo en caliente.": "Hot hacking.",
 "Cortarle la energía": "Cut its power",
 "Apagado seguro.": "Safe shutdown.",
 "Atraparlo a mano": "Catch it by hand",
 "Reflejos.": "Reflexes.",
 "Rover atascado": "Stuck rover",
 "El rover quedó enterrado en un terreno blando.": "The rover got buried in soft terrain.",
 "Modo oruga": "Tracked mode",
 "Tracción extrema.": "Extreme traction.",
 "Rescate a pie": "Rescue on foot",
 "Ir a buscarlo.": "Go and get it.",
 "Abandonarlo": "Abandon it",
 "Seguir sin él.": "Carry on without it.",
 "Brazo robótico trabado": "Jammed robotic arm",
 "El brazo externo se trabó con una muestra valiosa.": "The external arm jammed with a valuable sample.",
 "Recalibrar servos": "Recalibrate the servos",
 "Precisión fina.": "Fine precision.",
 "Soltar la muestra": "Drop the sample",
 "Ganar tiempo.": "Buy time.",
 "Forzarlo": "Force it",
 "A todo o nada.": "All or nothing.",
 "Plaga en el invernadero": "Greenhouse blight",
 "Un hongo ataca los cultivos de a bordo.": "A fungus attacks the onboard crops.",
 "Podar y aislar": "Prune and isolate",
 "Salvar lo sano.": "Save what's healthy.",
 "Fungicida químico": "Chemical fungicide",
 "Rápido pero tóxico.": "Fast but toxic.",
 "Racionar comida": "Ration the food",
 "Sin riesgo.": "No risk.",
 "Semillas en suelo alienígena": "Seeds in alien soil",
 "Hay chance de cultivar en el suelo local.": "There's a chance to grow in the local soil.",
 "Plantar ya": "Plant now",
 "Experimento histórico.": "Historic experiment.",
 "Probar en laboratorio": "Test in the lab",
 "Controlado.": "Controlled.",
 "No contaminar": "Don't contaminate",
 "Prudencia.": "Prudence.",
 "Oxígeno bajo": "Low oxygen",
 "Las plantas producen menos oxígeno del esperado.": "The plants produce less oxygen than expected.",
 "Más luz al invernadero": "More light for the greenhouse",
 "Fotosíntesis a full.": "Photosynthesis at full blast.",
 "Tanques de reserva": "Reserve tanks",
 "Gastar respaldo.": "Spend the backup.",
 "Electrólisis": "Electrolysis",
 "Oxígeno del agua.": "Oxygen from water.",
 "Combustible contaminado": "Contaminated fuel",
 "Un tanque muestra impurezas peligrosas.": "A tank shows dangerous impurities.",
 "Purificarlo": "Purify it",
 "Destilación a bordo.": "Onboard distillation.",
 "Ventearlo al espacio": "Vent it into space",
 "Perder combustible.": "Lose fuel.",
 "Usarlo igual": "Use it anyway",
 "Rezar.": "Pray.",
 "Reacción inesperada": "Unexpected reaction",
 "Una muestra empieza a burbujear dentro del contenedor.": "A sample starts bubbling inside the container.",
 "Estudiar la reacción": "Study the reaction",
 "¡Química nueva!": "New chemistry!",
 "Sellar y enfriar": "Seal and cool",
 "Contener.": "Contain.",
 "Expulsar la muestra": "Eject the sample",
 "Seguridad.": "Safety.",
 "Combustible in situ": "In-situ fuel",
 "Se puede fabricar combustible con recursos locales.": "Fuel can be made from local resources.",
 "Sintetizarlo": "Synthesize it",
 "Ahorro enorme.": "Huge savings.",
 "Usar lo que queda": "Use what's left",
 "Justo.": "Just enough.",
 "Pedir reabastecimiento": "Request resupply",
 "Caro.": "Expensive.",
 "Tormenta de neutrinos": "Neutrino storm",
 "Los sensores marcan una anomalía estelar en la ruta.": "The sensors register a stellar anomaly on the route.",
 "Medirla": "Measure it",
 "Desviarse": "Divert",
 "Evitarla.": "Avoid it.",
 "Blindar instrumentos": "Shield the instruments",
 "Proteger.": "Protect.",
 "Navegación sin GPS": "Navigation without GPS",
 "Falla el sistema de navegación principal.": "The main navigation system fails.",
 "Como los antiguos.": "Like the ancients.",
 "Piloto a ojo": "Fly by eye",
 "Instinto.": "Instinct.",
 "Esperar a Tierra": "Wait for Earth",
 "Lento.": "Slow.",
 "Cometa cercano": "Nearby comet",
 "Un cometa pasa a poca distancia de la nave.": "A comet passes close to the ship.",
 "Atravesar su cola": "Fly through its tail",
 "Muestras gratis.": "Free samples.",
 "Fotografiarlo": "Photograph it",
 "Analizar su hielo": "Analyze its ice",
 "Desde lejos.": "From afar.",
 "Virus en la IA": "Virus in the AI",
 "La IA de la nave empieza a dar órdenes raras.": "The ship's AI starts giving strange orders.",
 "Contraataque digital": "Digital counterattack",
 "Duelo de código.": "Code duel.",
 "Reiniciar todo": "Reboot everything",
 "Perder datos.": "Lose data.",
 "Control manual": "Manual control",
 "Sin IA.": "No AI.",
 "Datos corruptos": "Corrupt data",
 "Medio disco de ciencia aparece corrupto.": "Half a disk of science turns up corrupt.",
 "Recuperarlos": "Recover it",
 "Arqueología digital.": "Digital archaeology.",
 "Repetir mediciones": "Repeat the measurements",
 "Desde cero.": "From scratch.",
 "Reconstruir con IA": "Rebuild with AI",
 "Riesgoso.": "Risky.",
 "Hackeo desde Tierra": "Hack from Earth",
 "Alguien intenta tomar control de la nave remotamente.": "Someone tries to take remote control of the ship.",
 "Cerrar el firewall": "Close the firewall",
 "Bloqueo total.": "Total lockout.",
 "Cortar comunicaciones": "Cut communications",
 "Aislarse.": "Isolate.",
 "Rastrearlo": "Trace it",
 "Encontrar al culpable.": "Find the culprit."
};
  var T = (x) => LANG === "en" ? EN_TEXT[x] ?? x : x;
  var EN_DATA = {
    roles: {
      cmd: { name: "Commander", short: "Command", tagline: "Leader under pressure", strong: "+4% to the whole crew", weak: "If they fail, −4 extra Trust" },
      pil: { name: "Pilot", short: "Piloting", tagline: "Impossible maneuvers", strong: "+10% on risky moves", weak: "Impulsive: −6% on cautious ones" },
      eng: { name: "Engineer", short: "Engineering", tagline: "Fixes the impossible", strong: "+10 starting Energy", weak: "Perfectionist: −2 Budget per success" },
      med: { name: "Doctor", short: "Health", tagline: "Body and mind", strong: "Failures hurt morale by half", weak: "Pricey medkit: −6 Budget" },
      bio: { name: "Astrobiologist", short: "Biology", tagline: "Hunts for life", strong: "+10 starting Science", weak: "Easily distracted: −5 Energy" },
      geo: { name: "Geologist", short: "Geology", tagline: "Reads the rocks", strong: "+5 Science +5 Budget", weak: "Slow in crises: −8%" },
      com: { name: "Comms", short: "Comms", tagline: "The voice to Earth", strong: "+12 Communication", weak: "Useless at Kepler: −12% there" },
      rob: { name: "Roboticist", short: "Robotics", tagline: "Drones and rovers", strong: "Their failures don't lower Trust", weak: "Low energy (<40): −10%" },
      bot: { name: "Botanist", short: "Botany", tagline: "Grows crops in space", strong: "+3 Trust each chapter", weak: "Fragile in transit: −6%" },
      qui: { name: "Chemist", short: "Chemistry", tagline: "Reactions at the limit", strong: "+8% on arrival", weak: "If they fail, −4 extra Energy" },
      ast: { name: "Navigator", short: "Navigation", tagline: "Routes between stars", strong: "+8% in travel and return", weak: "On the surface −6%" },
      hack: { name: "AI Hacker", short: "AI Systems", tagline: "Code against the clock", strong: "+8 Comms +6% risky", weak: "Distrusted: −6 Trust" }
    },
    planets: {
      luna: { name: "The Moon", tag: "The first step", hazard: "lunar dust", risks: ["Abrasive dust", "Low gravity", "Shadowed craters"], geology: ["Basaltic regolith", "Ancient lava seas", "Ice at the poles"], outro: "The Moon is once again the stepping stone to distant worlds." },
      marte: { name: "Mars", tag: "The red planet", hazard: "dust storms", risks: ["Dust storms", "Toxic perchlorates", "Short return window"], geology: ["Dry riverbeds", "Olympus Mons volcano", "Iron oxide"], outro: "The footprints in the red dust are now human history." },
      venus: { name: "Venus", tag: "The cloudy hell", hazard: "sulfuric acid", risks: ["Acid rain", "Extreme pressure", "460 °C"], geology: ["Volcanic plains", "Active lava", "Pancake volcanoes"], outro: "Surviving Venus proved engineering can beat anything." },
      europa: { name: "Europa", tag: "Ocean under the ice", hazard: "ice and radiation", risks: ["Jupiter's radiation", "Cracks", "Geysers"], geology: ["Ice crust", "Reddish cracks", "Salty ocean"], outro: "Under Europa's ice, the big question remains open." },
      titan: { name: "Titan", tag: "Methane lakes", hazard: "liquid methane", risks: ["−180 °C", "Dense atmosphere", "Methane lakes"], geology: ["Organic dunes", "Ice pebbles", "Methane seas"], outro: "Titan's lakes changed what we know about the origin of life." },
      encelado: { name: "Enceladus", tag: "Ice geysers", hazard: "ice geysers", risks: ["Near-zero gravity", "Geysers", "Contamination"], geology: ["Tiger stripes", "Water geysers", "Young ice"], outro: "Enceladus' geysers left samples for decades." },
      mercurio: { name: "Mercury", tag: "Next to the Sun", hazard: "extreme solar heat", risks: ["430 °C by day", "−180 °C at night", "Solar wind"], geology: ["Giant scarps", "Rayed craters", "Ice at the poles"], outro: "Mercury proved we can work in the shadow of the Sun." },
      io: { name: "Io", tag: "The volcanic moon", hazard: "volcanic eruptions", risks: ["Active volcanoes", "Jupiter's radiation", "Sulfur rain"], geology: ["Lava lakes", "Sulfur plains", "300 km plumes"], outro: "Io's volcanoes revealed the burning heart of Jupiter." },
      pluton: { name: "Pluto", tag: "The frozen heart", hazard: "extreme cold", risks: ["−230 °C", "5-hour signal delay", "Sun barely visible"], geology: ["Nitrogen ice plain", "Ice mountains", "Blue haze"], outro: "At the edge of the solar system, humanity left its farthest footprint." },
      kepler: { name: "Kepler-442b", tag: "Another star (fiction)", hazard: "unknown radiation", risks: ["Unknown air", "No contact", "Higher gravity"], geology: ["Giant basalt", "Turquoise oceans", "Alien flora"], outro: "Across the galaxy, a new travelling species began." }
    },
    chapters: [
      { name: "PREPARATION", type: "LAUNCH BASE", sub: "Countdown." },
      { name: "TRAJECTORY", type: "SPACE TRAVEL", sub: "Earth fades behind." },
      { name: "CRISIS", type: "RED ALERT", sub: "Something goes wrong." },
      { name: "ARRIVAL", type: "SURFACE", sub: "New world." },
      { name: "RETURN", type: "FINAL STAGE", sub: "Heading home." }
    ],
    risk: ["SAFE", "MEDIUM", "RISKY"],
    win: ["NAILED IT!", "PERFECT!", "BRUTAL!", "FLAWLESS!", "THAT'S HOW!", "PRO LEVEL!"],
    luck: ["LUCKY!", "IMPROVISED!", "WE MADE IT!"],
    fail: ["OUCH!", "WENT WRONG!", "FAIL!", "OOPS!"]
  };
  var ES_DATA = JSON.parse(JSON.stringify({
    roles: Object.fromEntries(ROLE_IDS.map((id) => [id, { name: ROLES[id].name, short: ROLES[id].short, tagline: ROLES[id].tagline, strong: ROLES[id].strong, weak: ROLES[id].weak }])),
    planets: Object.fromEntries(PLANETS.map((p) => [p.id, { name: p.name, tag: p.tag, hazard: p.hazard, risks: p.risks, geology: p.geology, outro: p.outro }])),
    chapters: CHAPTERS.map((c) => ({ name: c.name, type: c.type, sub: c.sub })),
    risk: RISK_LABEL.slice(),
    win: WIN_LINES.slice(),
    luck: LUCK_LINES.slice(),
    fail: FAIL_LINES.slice()
  }));
  function applyLang(l) {
    LANG = l === "en" ? "en" : "es";
    try {
      localStorage.setItem("sm-lang", LANG);
    } catch {}
    const src = LANG === "en" ? EN_DATA : ES_DATA;
    for (const id of ROLE_IDS)
      Object.assign(ROLES[id], src.roles[id]);
    for (const p of PLANETS)
      Object.assign(p, src.planets[p.id]);
    CHAPTERS.forEach((c, i) => Object.assign(c, src.chapters[i]));
    RISK_LABEL.splice(0, RISK_LABEL.length, ...src.risk);
    WIN_LINES.splice(0, WIN_LINES.length, ...src.win);
    LUCK_LINES.splice(0, LUCK_LINES.length, ...src.luck);
    FAIL_LINES.splice(0, FAIL_LINES.length, ...src.fail);
    STAT.science.label = tr("stSCIENCE");
    STAT.energy.label = tr("stENERGY");
    STAT.communication.label = tr("stCOMMS");
    STAT.budget.label = tr("stBUDGET");
    STAT.trust.label = tr("stTRUST");
    document.documentElement.lang = LANG;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = tr(el.dataset["i18n"]);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = tr(el.dataset["i18nHtml"]);
    });
    document.getElementById("langEs")?.classList.toggle("active", LANG === "es");
    document.getElementById("langEn")?.classList.toggle("active", LANG === "en");
  }

  // src/game/events.ts
  var KEY = { S: "science", E: "energy", C: "communication", B: "budget", T: "trust" };
  var _id = 0;
  function ev(ph, title, text, k, ...c) {
    return {
      id: ++_id,
      ph,
      title,
      text,
      k: KEY[k],
      c: c.map((s) => {
        const [t = "", skill = "cmd", desc = "", r] = s.split("|");
        return { t, skill, desc, risk: r === undefined ? 1 : Number(r) };
      })
    };
  }
  function evr(role, ph, title, text, k, ...c) {
    const e = ev(ph, title, text, k, ...c);
    e.role = role;
    return e;
  }
  var GEN = [
    ev("0", "Ventana de lanzamiento", "El pronóstico hacia {p} marca una ventana corta. Cada hora de espera consume presupuesto.", "E", "Lanzar en esta ventana|pil|Aprovechar el clima ideal sin demoras.|2", "Esperar la siguiente ventana|cmd|Ganar margen de seguridad a cambio de recursos.|0", "Recalcular la trayectoria|ast|Nueva ruta orbital.|1"),
    ev("0", "Carga de suministros", "La nave no puede llevar todo. Hay que decidir qué entra en la bodega antes de partir hacia {p}.", "B", "Priorizar agua y alimentos|bot|Comida y cultivos primero.|0", "Priorizar instrumental científico|bio|Más datos, menos margen.|2", "Priorizar repuestos y herramientas|eng|Prepararse para posibles fallas.|1"),
    ev("0", "Prueba de antenas", "Las antenas de largo alcance muestran ruido en las pruebas finales.", "C", "Recalibrar todo el sistema|com|Ajuste fino que lleva tiempo.|1", "Instalar una antena de respaldo|eng|Más peso, más seguridad.|0", "Aceptar el margen de error|cmd|Seguir adelante con el cronograma.|2"),
    ev("0", "Simulacro de emergencia", "Antes del despegue, el centro de control propone un simulacro de evacuación y descompresión.", "T", "Hacer el simulacro completo|cmd|Entrenar a todos, aunque demore.|1", "Simulacro médico específico|med|Practicar primeros auxilios en gravedad cero.|0", "Saltear el simulacro|pil|Confiar en el entrenamiento previo.|2"),
    ev("0", "Selección de instrumentos", "El presupuesto solo alcanza para una parte del instrumental científico destinado a {p}.", "S", "Espectrómetro de superficie|geo|Ideal para analizar materiales.|1", "Kit de detección de biofirmas|bio|Buscar rastros de vida.|2", "Sensores de uso general|eng|Menos específicos, más confiables.|0"),
    ev("0", "Examen médico final", "Un integrante presenta valores irregulares el día previo al lanzamiento.", "T", "Tratarlo y seguir|med|Ajustar la medicación y continuar.|1", "Reemplazarlo en el equipo|cmd|Decisión dura pero segura.|0", "Ocultarlo para no demorar|com|Lanzar sin informar.|2"),
    ev("0", "Presión de los medios", "Los medios quieren detalles de la misión a {p}. Lo que se diga puede afectar el financiamiento.", "B", "Conferencia de prensa abierta|com|Ganar apoyo público.|1", "Comunicado breve y prudente|cmd|Mantener un perfil bajo.|0", "Prometer descubrimientos históricos|bio|Atraer fondos elevando expectativas.|2"),
    ev("1", "Lluvia de micrometeoritos", "Un enjambre de partículas cruza la trayectoria hacia {p}.", "E", "Maniobra evasiva|pil|Esquivar el enjambre con un giro brusco.|2", "Reforzar el escudo|eng|Redirigir energía a la protección.|1", "Atravesar a velocidad reducida|cmd|Aceptar impactos leves.|0"),
    ev("1", "Falla en el reciclador de agua", "El sistema que recicla el agua pierde eficiencia día a día.", "T", "Reparar el reciclador|eng|Desarmar y cambiar piezas.|1", "Biofiltro de plantas|bot|El invernadero limpia el agua.|0", "Robot de mantenimiento|rob|Que lo arregle un bot.|2"),
    ev("1", "Corrección de curso", "Los cálculos muestran una desviación pequeña que crece con los días.", "E", "Corrección manual|pil|Usar los propulsores con precisión.|1", "Delegar en el piloto automático|eng|Menos esfuerzo, menos control.|0", "Navegar por estrellas|ast|Cálculo astronómico.|1"),
    ev("1", "Silencio de radio", "Pasan horas sin respuesta del centro de control y crece la inquietud.", "C", "Revisar el canal principal|com|Buscar la falla en la señal.|1", "Reprogramar el enrutador|hack|Código a contrarreloj.|2", "Mantener la calma y esperar|cmd|Tranquilizar al equipo.|0"),
    ev("1", "Fatiga de la tripulación", "Los turnos largos pasan factura. Hay errores pequeños y discusiones.", "T", "Reorganizar los turnos|cmd|Equilibrar el trabajo.|1", "Programa de descanso y ejercicio|med|Recuperar el ritmo biológico.|0", "Comida fresca del invernadero|bot|Ánimo por el estómago.|1"),
    ev("1", "Señal desconocida", "Los sensores captan una señal periódica sin origen claro.", "S", "Decodificar con IA|hack|¿Natural o artificial?|2", "Rastrear su origen|com|Triangular con las antenas.|1", "Ignorarla y continuar|pil|No desviar la misión.|0"),
    ev("1", "Fuga de presión menor", "Una microfisura en un módulo pierde aire lentamente.", "E", "Sellar desde adentro|eng|Parche rápido con resina.|1", "Aislar el módulo|cmd|Cerrar la puerta y seguir.|0", "Enviar un robot afuera|rob|Reparación remota.|2"),
    ev("1", "Debate sobre el rumbo", "La tripulación discute si seguir el plan o modificarlo. Hay dos bandos.", "T", "Votación formal|cmd|Decidir entre todos.|0", "Mediar con datos|bio|Presentar evidencias científicas.|1", "Dejar que decida el piloto|pil|Quien vuela, define.|2"),
    ev("2", "Tormenta solar", "Una eyección de masa coronal viaja hacia la nave.", "E", "Refugiar a todos en el módulo blindado|med|Proteger primero a las personas.|0", "Girar la nave detrás del escudo|pil|Usar el casco como protección.|1", "Mantener todos los sistemas activos|eng|Intentar no perder instrumentos.|2"),
    ev("2", "Incendio en el módulo", "Hay humo en el módulo de servicio. La alarma suena.", "T", "Cortar la ventilación|eng|Ahogar el fuego sin oxígeno.|1", "Evacuar y sellar|cmd|Salvar al equipo.|0", "Espuma química|qui|Sofocar con reactivos.|2"),
    ev("2", "Cortocircuito en el panel principal", "Se pierde energía en dos sistemas críticos.", "E", "Redirigir la energía|eng|Puentear el panel dañado.|1", "Apagar lo no esencial|cmd|Priorizar el soporte vital.|0", "Reinicio con IA|hack|Reescribir el firmware.|2"),
    ev("2", "Apagón de comunicaciones", "Se pierde todo contacto con la Tierra.", "C", "Activar canales de emergencia|com|Frecuencias de respaldo.|1", "Seguir el protocolo autónomo|cmd|Decidir sin ayuda externa.|0", "Reorientar la nave|pil|Alinear las antenas moviendo todo.|2"),
    ev("2", "Emergencia médica a bordo", "Un integrante sufre un cuadro agudo sin causa clara.", "T", "Diagnóstico y tratamiento|med|Usar el botiquín avanzado.|1", "Consultar a Tierra|com|Pedir asesoramiento médico.|0", "Análisis toxicológico|qui|Buscar el veneno.|2"),
    ev("2", "Escombros espaciales", "Restos de satélites se acercan a la ruta de la nave.", "E", "Cálculo fino de trayectoria|ast|Esquivar con precisión.|2", "Usar el escudo|eng|Absorber con protección.|1", "Cambiar de órbita|cmd|Alejarse de la zona.|0"),
    ev("2", "Recorte de presupuesto", "Desde Tierra avisan que el financiamiento se reducirá si no hay resultados pronto.", "B", "Enviar datos preliminares|bio|Mostrar avances científicos.|1", "Negociar con la agencia|com|Pedir un plazo mayor.|1", "Reducir gastos a bordo|cmd|Ajustar el consumo de recursos.|0"),
    ev("3", "Aproximación a {p}", "La nave entra en la órbita de {p}. Los sensores detectan {h}.", "E", "Frenado gradual|pil|Más seguro, más combustible.|0", "Ingreso directo|pil|Ahorrar tiempo con mayor riesgo.|2", "Calibrar motores durante la maniobra|eng|Ajuste en vuelo.|1"),
    ev("3", "Zona de descenso", "Hay que elegir dónde aterrizar en {p}.", "E", "Terreno llano y seguro|geo|Evaluar la estabilidad del suelo.|0", "Cerca de un punto científico|bio|Más datos, más riesgo.|2", "Aterrizaje de precisión|pil|Exigir al máximo la nave.|1"),
    ev("3", "Muestras de superficie", "Las primeras muestras de {p} revelan una composición inesperada.", "S", "Análisis completo en el laboratorio|geo|Procesar con calma.|1", "Buscar biofirmas|bio|Priorizar la búsqueda de vida.|2", "Análisis químico rápido|qui|Reactivos en campo.|0"),
    ev("3", "Base temporal", "Hay que montar un campamento en {p}, con {h} alrededor.", "B", "Montaje rápido y compacto|eng|Menos tiempo expuestos.|1", "Montaje reforzado|geo|Bases sólidas, más recursos.|0", "Usar el módulo de aterrizaje como refugio|pil|Sin construir nada nuevo.|1"),
    ev("3", "Clima hostil", "Una tormenta de {h} se acerca al campamento.", "E", "Asegurar todo el equipo|eng|Anclar y proteger los sistemas.|0", "Aprovechar para medir|bio|Tomar datos del fenómeno.|2", "Refugiarse y esperar|med|Priorizar a la tripulación.|0"),
    ev("3", "Eco bajo la superficie", "Los sensores detectan estructuras o movimiento bajo el suelo.", "S", "Perforar para investigar|geo|Acceder al subsuelo.|2", "Escanear sin tocar|bio|Medir a distancia.|0", "Enviar un dron|rob|Explorar sin riesgo humano.|1"),
    ev("3", "Traje dañado", "Un traje presenta una pérdida en plena excursión.", "T", "Volver de inmediato|pil|Regreso a la base sin demora.|0", "Reparar en el lugar|eng|Parche de emergencia.|2", "Atención médica en campo|med|Estabilizar al afectado.|1"),
    ev("3", "Primer informe a Tierra", "El mundo espera noticias del primer día en {p}.", "C", "Transmisión en vivo|com|Compartir imágenes y datos.|2", "Informe técnico|geo|Resultados medidos y precisos.|1", "Mensaje breve del comandante|cmd|Tranquilizar y agradecer.|0"),
    ev("4", "Preparar el ascenso", "El despegue desde {p} exige combustible y sistemas al límite.", "E", "Revisión completa|eng|Cada sistema, uno por uno.|1", "Despegue anticipado|pil|Aprovechar la ventana orbital.|2", "Reducir la carga|geo|Dejar parte de las muestras.|0"),
    ev("4", "Qué llevamos a casa", "El peso limitado obliga a elegir entre muestras, equipos y registros.", "S", "Priorizar muestras biológicas|bio|Lo más valioso para la ciencia.|1", "Priorizar muestras geológicas|geo|Rocas y minerales.|1", "Solo datos digitales|com|Transmitir y viajar liviano.|0"),
    ev("4", "Reentrada atmosférica", "El escudo térmico muestra desgaste en los últimos cálculos.", "E", "Ángulo de entrada preciso|pil|Controlar manualmente.|2", "Reforzar el escudo|eng|Redirigir energía a la protección.|1", "Seguir el protocolo de Tierra|com|Con guía remota.|0"),
    ev("4", "Conferencia de prensa final", "Todo el mundo espera escuchar a la tripulación.", "C", "Presentación abierta|com|Contar la historia completa.|1", "Resultados científicos|bio|Centrarse en lo hallado.|1", "Homenaje al equipo|cmd|Reconocer a cada integrante.|0"),
    ev("4", "Tripulante agotado", "El cansancio acumulado se hace sentir justo antes del regreso.", "T", "Descanso obligatorio|med|Frenar y recuperar.|0", "Relevo de tareas|cmd|Redistribuir responsabilidades.|1", "Apoyo emocional desde Tierra|com|Mensajes de la familia.|1"),
    ev("4", "Hallazgo contra seguridad", "Quedan datos por recoger, pero la ventana de regreso se cierra.", "S", "Un último estudio rápido|bio|Recoger lo posible.|2", "Regresar ya|pil|No arriesgar la ventana.|0", "Dejar un robot midiendo|rob|Sigue sin vos.|1")
  ];
  var ROLE_EVENTS = [
    evr("cmd", "12", "Autoridad cuestionada", "Un integrante desafía una orden frente a todo el equipo.", "T", "Hablar a solas|cmd|Resolverlo en privado.|0", "Reafirmar la orden|cmd|Mostrar firmeza.|2", "Pedir mediación médica|med|Que un tercero ayude.|1"),
    evr("cmd", "23", "Decisión sin consenso", "Nadie quiere cargar con la decisión más difícil del viaje.", "T", "Asumir la responsabilidad|cmd|Decidir y responder.|2", "Consultar a la tripulación|com|Buscar consenso.|0", "Pedir directivas a Tierra|com|Con demora.|1"),
    evr("cmd", "34", "Informe al centro de control", "Tierra exige explicaciones sobre un gasto no autorizado.", "B", "Explicar con transparencia|cmd|Honestidad ante la agencia.|1", "Justificar con resultados|bio|Mostrar datos.|1", "Minimizar el gasto|com|Presentarlo como menor.|2"),
    evr("cmd", "1234", "Un momento de duda", "La tripulación duda del sentido de la misión.", "T", "Un discurso inspirador|cmd|Recordar el objetivo.|1", "Compartir los números|com|Mostrar los avances.|0", "Una actividad en equipo|med|Fortalecer al grupo.|1"),
    evr("pil", "12", "Campo de asteroides", "Un cinturón de rocas bloquea la ruta directa.", "E", "Vuelo manual entre rocas|pil|Precisión extrema.|2", "Rodear el cinturón|pil|Más largo y seguro.|0", "Pasaje calculado con ingeniería|eng|Ruta asistida.|1"),
    evr("pil", "23", "Asistencia gravitacional", "Hay una oportunidad de ahorrar combustible usando la gravedad de un cuerpo cercano.", "E", "Aprovechar la asistencia|pil|Ahorrar combustible.|2", "Ignorarla|cmd|Seguir el plan.|0", "Verificar el cálculo con ingeniería|eng|Doble chequeo.|1"),
    evr("pil", "3", "Falla de aterrizaje", "El sistema automático falla a baja altura.", "E", "Tomar el control manual|pil|Aterrizar a mano.|2", "Abortar y reintentar|cmd|Gastar más combustible.|0", "Reiniciar el sistema|eng|Rápido y arriesgado.|1"),
    evr("pil", "4", "Maniobra de acoplamiento", "Para volver hay que acoplarse al módulo orbital con poco margen.", "E", "Acoplamiento manual|pil|Precisión de piloto.|2", "Acoplamiento automático|eng|Seguro pero lento.|0", "Guiado desde Tierra|com|Con demora de señal.|1"),
    evr("eng", "12", "Sobrecalentamiento del reactor", "La temperatura del reactor supera lo previsto.", "E", "Reducir la potencia|eng|Más fresco, menos energía.|0", "Reparar el circuito de refrigeración|eng|Intervención compleja.|2", "Pedir diagnóstico a Tierra|com|Asesoramiento remoto.|1"),
    evr("eng", "23", "Pieza crítica rota", "Se rompe una pieza que no tiene repuesto.", "B", "Fabricarla con la impresora 3D|eng|Usar los recursos de a bordo.|1", "Improvisar con otro material|geo|Adaptar un componente.|2", "Operar sin la pieza|pil|Reducir el uso del sistema.|0"),
    evr("eng", "34", "Paneles solares ineficientes", "Los paneles rinden por debajo de lo esperado.", "E", "Reorientar los paneles|pil|Ajuste fino con la nave.|1", "Limpiarlos en una caminata espacial|eng|Salida de riesgo.|2", "Reducir la demanda|cmd|Menos consumo.|0"),
    evr("eng", "1234", "Auditoría de sistemas", "Hay que evaluar el estado general de la nave.", "E", "Auditoría exhaustiva|eng|Detectar todo.|1", "Auditoría rápida|eng|Solo lo urgente.|0", "Que cada rol revise lo suyo|cmd|Delegar el chequeo.|1"),
    evr("med", "12", "Mareo espacial", "Varios integrantes sufren náuseas y desorientación.", "T", "Medicación específica|med|Tratamiento farmacológico.|1", "Ejercicios de adaptación|med|Sin fármacos, más lento.|0", "Reducir las tareas|cmd|Descanso para todos.|0"),
    evr("med", "23", "Radiación acumulada", "Los dosímetros muestran una dosis superior a la prevista.", "T", "Protocolo de protección|med|Refugio y suplementos.|0", "Seguir con el plan|cmd|Aceptar el riesgo.|2", "Análisis de sangre completo|bio|Medir el impacto real.|1"),
    evr("med", "34", "Aislamiento psicológico", "Un integrante muestra señales de angustia y aislamiento.", "T", "Sesión de apoyo|med|Escucha profesional.|1", "Conectarlo con su familia|com|Mensaje diferido.|1", "Asignarle una tarea clave|cmd|Darle propósito.|1"),
    evr("med", "234", "Síntomas desconocidos", "Aparecen síntomas extraños que podrían venir de las muestras.", "T", "Aislar y analizar|med|Cuarentena.|0", "Estudiar el microorganismo|bio|Oportunidad científica.|2", "Reportar a Tierra|com|Pedir protocolo.|1"),
    evr("bio", "13", "Colonias en la nave", "Se detectan colonias de microbios en el módulo habitable.", "T", "Esterilizar todo|med|Limpieza total.|0", "Estudiar las colonias|bio|¿Se adaptaron al espacio?|2", "Aislar el sector|eng|Sellar y observar.|1"),
    evr("bio", "34", "Biofirma dudosa", "Un análisis da positivo para compuestos orgánicos, pero podría ser contaminación.", "S", "Repetir el análisis|bio|Verificar con cuidado.|0", "Publicar el hallazgo ya|com|Compartir con Tierra.|2", "Comparar con muestras de control|geo|Descartar contaminación.|1"),
    evr("bio", "3", "Ambiente extremo", "Algo parece vivir en un lugar donde no debería.", "S", "Cultivarlo en el laboratorio|bio|Con riesgo biológico.|2", "Observarlo en el lugar|bio|Sin tocarlo.|0", "Recoger una muestra sellada|med|Protocolo de seguridad.|1"),
    evr("bio", "4", "Protocolo de cuarentena", "Hay que decidir si las muestras vuelven selladas o no.", "S", "Cuarentena estricta|med|Seguridad ante todo.|0", "Contenedores especiales|bio|Muestras protegidas.|1", "Transmitir solo los datos|com|Dejar las muestras.|1"),
    evr("geo", "3", "Terreno inestable", "El suelo bajo el campamento muestra grietas.", "E", "Reforzar el suelo|geo|Compactar y anclar.|1", "Trasladar el campamento|pil|Mover el módulo.|0", "Estudiar la grieta|bio|Una oportunidad científica.|2"),
    evr("geo", "3", "Veta de minerales", "Hay depósitos de minerales de gran valor científico y económico.", "B", "Extraer muestras|geo|Perforación controlada.|1", "Mapear sin extraer|geo|Solo registrar.|0", "Reportarlo a Tierra|com|Antes de actuar.|1"),
    evr("geo", "34", "Mapa geológico", "Hay que decidir hacia dónde se amplía la exploración.", "S", "Explorar un cráter|geo|Buscar capas antiguas.|2", "Una zona cercana|pil|Ahorrar combustible.|0", "Seguir las lecturas de un dron|eng|Que los datos guíen.|1"),
    evr("geo", "34", "Sismo", "Un temblor sacude la zona de trabajo.", "E", "Evacuar|cmd|Salir del área.|0", "Medir la actividad|geo|Datos únicos.|2", "Asegurar el equipo|eng|Proteger instrumentos.|1"),
    evr("com", "12", "Retraso de señal", "La demora de transmisión complica cada conversación con Tierra.", "C", "Mensajes grabados|com|Automatizar el contacto.|0", "Protocolo comprimido|eng|Menos datos, más velocidad.|1", "Canal de baja frecuencia|com|Lento pero estable.|1"),
    evr("com", "23", "Interferencia", "Algo bloquea parte de la banda de comunicación.", "C", "Cambiar de frecuencia|com|Saltos de banda.|1", "Aumentar la potencia|eng|Más fuerza, más energía.|2", "Mover la antena|pil|Cambiar la orientación.|1"),
    evr("com", "34", "Mensaje del mundo", "Llega un mensaje inesperado de la Tierra con noticias difíciles.", "T", "Contarlo con cuidado|com|Compartir con tacto.|1", "Que decida el comandante|cmd|Control del mensaje.|0", "Esperar un mejor momento|med|Cuidar el ánimo.|0"),
    evr("com", "1234", "Datos en cola", "Hay más datos que ancho de banda disponible.", "C", "Comprimir y priorizar|com|Elegir lo clave.|1", "Enviar todo por tandas|com|Más lento y seguro.|0", "Consultar prioridades científicas|bio|Que ciencia decida.|1")
  ];
  var PLANET_EVENTS = {
    mercurio: [
      ev("3", "Calor abrasador del Sol", "La cara diurna supera los 400 °C y los escudos térmicos crujen.", "E", "Refugiarse en la sombra|eng|Mover la base al lado nocturno.|0", "Trabajar al amanecer|ast|Calcular la franja templada.|1", "Forzar la refrigeración|qui|Gastar refrigerante extra.|2"),
      ev("3", "Hielo en cráteres polares", "Un cráter polar en sombra eterna guarda hielo de agua.", "S", "Bajar a perforar|geo|Extraer muestras de hielo.|2", "Enviar un rover|rob|Exploración a distancia.|1", "Mapear con radar|com|Desde la órbita.|0"),
      ev("2", "Tormenta solar", "Una eyección de masa coronal viaja directo hacia la nave.", "T", "Blindar la cabina|med|Proteger a la tripulación.|0", "Esquivarla con una maniobra|pil|Cambiar de órbita a tiempo.|2", "Apagar la electrónica|eng|Evitar daños en los sistemas.|1"),
      ev("4", "Escape de la gravedad solar", "Salir de Mercurio exige frenar contra la atracción del Sol.", "E", "Asistencia gravitatoria con Venus|ast|Ruta larga pero eficiente.|1", "Impulso directo|pil|Rápido y costoso.|2", "Esperar la ventana ideal|cmd|Paciencia y margen.|0")
    ],
    io: [
      ev("3", "Erupción en vivo", "Un volcán lanza un penacho de azufre a cientos de kilómetros.", "S", "Volar a través del penacho|pil|Capturar gases frescos.|2", "Medir desde lejos|com|Sensores a distancia.|0", "Analizar el azufre|qui|Química volcánica.|1"),
      ev("3", "Lago de lava", "El módulo aterrizó cerca de un lago de lava que se expande.", "E", "Mover el campamento|cmd|Alejarse a tiempo.|0", "Tomar muestras del borde|geo|Roca recién formada.|2", "Mandar un dron|rob|Que el robot se arriesgue.|1"),
      ev("2", "Tubo de flujo de Júpiter", "Una corriente eléctrica entre Ío y Júpiter castiga los sistemas.", "T", "Escudo electromagnético|eng|Desviar la corriente.|1", "Reiniciar con IA|hack|Recuperar los sistemas a tiempo.|2", "Refugio blindado|med|Esperar que pase.|0"),
      ev("4", "Despegue entre cenizas", "Una lluvia de azufre cubre la plataforma de despegue.", "E", "Despegar ya|pil|Antes de que empeore.|2", "Limpiar los motores|eng|Revisar cada tobera.|1", "Esperar a que se asiente|cmd|Más lento, más seguro.|0")
    ],
    pluton: [
      ev("3", "Llanura del corazón", "La enorme llanura de nitrógeno helado se mueve lentamente.", "S", "Estudiar los glaciares|geo|Hielo que fluye.|1", "Perforar el nitrógeno|qui|Química del frío.|2", "Fotografiar desde un dron|pil|Vista completa.|0"),
      ev("3", "Señal de cinco horas", "Cada mensaje a la Tierra tarda cinco horas en llegar.", "C", "Decidir sin esperar|cmd|Autonomía total.|1", "Antena de alta ganancia|com|Mejorar el enlace.|0", "Comprimir los datos con IA|hack|Enviar más en menos tiempo.|2"),
      ev("2", "Frío que rompe metales", "A −230 °C los metales se vuelven frágiles como vidrio.", "E", "Calentar las juntas|eng|Gastar energía.|1", "Cambiar a piezas compuestas|rob|Repuestos especiales.|0", "Seguir y vigilar|cmd|Asumir el riesgo.|2"),
      ev("4", "Regreso desde el borde", "Volver desde Plutón es el viaje más largo de la historia.", "T", "Hibernación de la tripulación|med|Dormir el viaje.|1", "Ruta de máxima velocidad|ast|Asistencias gravitatorias.|2", "Raciones y rutinas|bot|Sostener la moral.|0")
    ],
    luna: [
      ev("3", "Polvo lunar", "El fino polvo se pega a los trajes y a los equipos.", "E", "Cepillar y sellar|eng|Limpieza constante.|0", "Trabajar rápido|pil|Menos tiempo expuestos.|2", "Revisar los filtros|med|Proteger los pulmones.|1"),
      ev("3", "Hielo en los polos", "Un cráter en sombra permanente podría guardar agua.", "S", "Perforar el cráter|geo|Extraer núcleos.|2", "Escanear desde órbita|com|Con radar.|0", "Bajar un rover|rob|Exploración guiada.|1"),
      ev("2", "Falla cerca de la Luna", "Una falla breve de motor ocurre cerca de la superficie lunar.", "E", "Corrección inmediata|pil|Reaccionar con precisión.|2", "Reiniciar el motor|eng|Una pausa de seguridad.|1", "Pedir apoyo a la base|com|Esperar ayuda.|0"),
      ev("4", "Despegue lunar", "Hay que despegar con baja gravedad y poco margen de energía.", "E", "Impulso fuerte|pil|Gastar energía.|2", "Impulso calculado|ast|Ahorrar combustible.|0", "Aligerar la carga|geo|Dejar peso.|1")
    ],
    marte: [
      ev("3", "Tormenta de polvo global", "El cielo se vuelve rojo y los paneles dejan de cargar.", "E", "Hibernar los sistemas|eng|Ahorrar energía.|0", "Seguir trabajando|cmd|Aceptar el riesgo.|2", "Celdas de combustible|qui|Energía química.|1"),
      ev("3", "Antiguos cauces secos", "Se ven formas de antiguos ríos.", "S", "Estudiar sedimentos|geo|Leer la historia del agua.|1", "Buscar microfósiles|bio|Rastros de vida pasada.|2", "Mapear con un dron|pil|Cobertura amplia.|0"),
      ev("3", "Percloratos tóxicos", "El suelo contiene químicos dañinos.", "T", "Filtrar el aire|med|Proteger a todos.|0", "Neutralizar el suelo|qui|Química de suelos.|1", "Evitar la zona|geo|Cambiar de lugar.|0"),
      ev("4", "Ventana de regreso", "Marte y la Tierra se alejan y la ventana de regreso se acorta.", "E", "Salir ya|pil|Ventana justa.|2", "Esperar combustible|eng|Cargar al máximo.|1", "Optimizar la ruta|ast|Órbita de transferencia.|0")
    ],
    venus: [
      ev("3", "Lluvia ácida", "Nubes de ácido sulfúrico corroen el casco.", "E", "Escudo adicional|eng|Más protección.|1", "Subir de altitud|pil|Alejarse de la nube.|1", "Reducir el tiempo expuesto|cmd|Misión más breve.|0"),
      ev("3", "Presión extrema", "La presión aplasta los equipos.", "E", "Reforzar la estructura|eng|Cambiar piezas.|2", "Operar a distancia|com|Control remoto.|0", "Usar un globo atmosférico|pil|Flotar entre las nubes.|1"),
      ev("2", "Calor abrasador", "La temperatura excede lo previsto.", "T", "Activar la refrigeración|eng|Gastar energía.|1", "Reducir la actividad|med|Evitar el golpe térmico.|0", "Aprovechar el calor para analizar|geo|Estudio térmico.|2"),
      ev("3", "Microbios en las nubes", "Algo en la atmósfera sugiere química orgánica.", "S", "Muestrear con un dron|bio|Capturar partículas.|2", "Analizar a distancia|com|Con instrumentos.|0", "Dejar sondas flotantes|rob|Laboratorio en las nubes.|1")
    ],
    europa: [
      ev("3", "Grietas en el hielo", "La superficie helada se parte bajo el módulo.", "E", "Retirarse|pil|Mover el módulo.|0", "Estabilizar el hielo|geo|Anclajes y sondas.|1", "Medir las grietas|bio|Datos del océano.|2"),
      ev("3", "Radiación de Júpiter", "Los cinturones de radiación saturan los sensores.", "T", "Refugio blindado|med|Proteger al equipo.|0", "Apagar instrumentos|eng|Evitar daños.|1", "Medir la radiación|bio|Datos únicos.|2"),
      ev("3", "Perforar hacia el océano", "Se puede perforar hacia el océano subterráneo.", "S", "Perforación profunda|geo|Acceso directo.|2", "Sonda robótica|rob|Autónoma.|1", "Solo escuchar|com|Detectar con sonar.|0"),
      ev("4", "Géiser inesperado", "Un chorro de vapor se eleva cerca del despegue.", "E", "Despegar ya|pil|Antes del chorro.|2", "Esperar que baje|cmd|Más seguro.|0", "Capturar una muestra|bio|Aprovechar el fenómeno.|2")
    ],
    titan: [
      ev("3", "Lagos de metano", "Hay lagos de hidrocarburos líquidos junto al campamento.", "S", "Tomar muestras|geo|Analizar la composición.|1", "Explorar en bote|pil|Con riesgo.|2", "Buscar química prebiótica|qui|Origen de la vida.|2"),
      ev("3", "Frío extremo", "El frío de -180 °C pone a prueba los sistemas.", "E", "Calentar los módulos|eng|Gastar energía.|1", "Reducir la actividad|cmd|Lo mínimo.|0", "Abrigar al equipo|med|Protección personal.|1"),
      ev("2", "Atmósfera densa", "La atmósfera espesa dificulta el descenso.", "E", "Descenso con paracaídas|pil|Aprovechar el aire.|1", "Descenso con propulsores|eng|Más control.|2", "Usar un globo|geo|Lento y seguro.|0"),
      ev("4", "Despegue en baja gravedad", "Poca gravedad y mucha atmósfera complican el ascenso.", "E", "Calcular el ángulo|ast|Mínimo consumo.|1", "Reducir el peso|geo|Dejar muestras.|0", "Ayuda de Tierra|com|Optimización remota.|1")
    ],
    encelado: [
      ev("3", "Géiseres de hielo", "Chorros de agua salen del polo sur.", "S", "Volar a través del chorro|pil|Recolectar muestras.|2", "Muestrear desde el suelo|geo|Más seguro.|0", "Analizar su química|qui|Buscar orgánicos.|1"),
      ev("3", "Gravedad ínfima", "La gravedad casi nula complica moverse.", "T", "Anclarse al suelo|eng|Arneses.|0", "Entrenar el movimiento|med|Adaptación del cuerpo.|1", "Saltar entre zonas|pil|Rápido y arriesgado.|2"),
      ev("2", "Anillos de partículas", "El entorno tiene partículas de hielo a alta velocidad.", "E", "Ruta de bajo impacto|pil|Entrar despacio.|1", "Escudo de partículas|eng|Protección extra.|1", "Mapear antes de bajar|com|Con radar.|0"),
      ev("4", "Contaminación biológica", "El módulo pudo haber contaminado el hielo.", "S", "Esterilizar el módulo|med|Prevenir.|0", "Documentar el incidente|bio|Informe honesto.|1", "Ocultarlo|com|Evitar un escándalo.|2")
    ],
    kepler: [
      ev("3", "Atmósfera desconocida", "Los sensores no reconocen parte de la composición.", "S", "Análisis cauteloso|bio|Poco a poco.|0", "Salir con trajes|med|Con monitoreo.|2", "Medir desde la nave|com|Datos desde arriba.|1"),
      ev("3", "Gravedad mayor", "Cada paso exige más esfuerzo.", "T", "Exoesqueletos|rob|Asistencia mecánica.|1", "Misiones breves|cmd|Menos tiempo afuera.|0", "Entrenamiento rápido|med|Adaptación.|1"),
      ev("2", "A años luz de casa", "Todo mensaje tardará siglos: la tripulación está sola.", "C", "Decidir solos|cmd|Autonomía total.|1", "Grabar un registro|com|Para el futuro.|0", "Mantener el ánimo|med|Unirse como equipo.|1"),
      ev("3", "Señal estructurada", "Detectan un patrón repetitivo en las ondas del planeta.", "S", "Descifrarla con IA|hack|Buscar el patrón.|2", "Compararla con datos naturales|geo|Descartar una causa natural.|1", "Buscar posible vida|bio|Biofirma.|2")
    ]
  };
  var CRIT_E = ev("1234", "Reservas críticas", "La energía está en niveles peligrosos. Cada decisión cuenta.", "E", "Apagar todo lo no esencial|eng|Ahorrar lo que queda.|0", "Racionar y priorizar|cmd|Decidir qué sigue encendido.|1", "Reconectar los paneles a mano|pil|Una maniobra desesperada.|2");
  var CRIT_T = ev("1234", "Moral por el piso", "La tripulación está al límite y hay conflictos abiertos.", "T", "Apoyo médico y psicológico|med|Cuidar a cada uno.|0", "Reunión general|cmd|Poner todo sobre la mesa.|1", "Mensaje de la Tierra|com|Reconectar con casa.|1");
  ROLE_EVENTS.push(evr("rob", "12", "Dron fuera de control", "Un dron de carga gira sin control por la bodega.", "E", "Reprogramarlo en vivo|rob|Hackeo en caliente.|2", "Cortarle la energía|eng|Apagado seguro.|0", "Atraparlo a mano|pil|Reflejos.|1"), evr("rob", "34", "Rover atascado", "El rover quedó enterrado en un terreno blando.", "S", "Modo oruga|rob|Tracción extrema.|1", "Rescate a pie|cmd|Ir a buscarlo.|2", "Abandonarlo|geo|Seguir sin él.|0"), evr("rob", "234", "Brazo robótico trabado", "El brazo externo se trabó con una muestra valiosa.", "B", "Recalibrar servos|rob|Precisión fina.|1", "Soltar la muestra|cmd|Ganar tiempo.|0", "Forzarlo|eng|A todo o nada.|2"), evr("bot", "12", "Plaga en el invernadero", "Un hongo ataca los cultivos de a bordo.", "T", "Podar y aislar|bot|Salvar lo sano.|1", "Fungicida químico|qui|Rápido pero tóxico.|2", "Racionar comida|cmd|Sin riesgo.|0"), evr("bot", "34", "Semillas en suelo alienígena", "Hay chance de cultivar en el suelo local.", "S", "Plantar ya|bot|Experimento histórico.|2", "Probar en laboratorio|bio|Controlado.|1", "No contaminar|med|Prudencia.|0"), evr("bot", "1234", "Oxígeno bajo", "Las plantas producen menos oxígeno del esperado.", "E", "Más luz al invernadero|bot|Fotosíntesis a full.|1", "Tanques de reserva|eng|Gastar respaldo.|0", "Electrólisis|qui|Oxígeno del agua.|2"), evr("qui", "12", "Combustible contaminado", "Un tanque muestra impurezas peligrosas.", "E", "Purificarlo|qui|Destilación a bordo.|1", "Ventearlo al espacio|eng|Perder combustible.|0", "Usarlo igual|pil|Rezar.|2"), evr("qui", "34", "Reacción inesperada", "Una muestra empieza a burbujear dentro del contenedor.", "S", "Estudiar la reacción|qui|¡Química nueva!|2", "Sellar y enfriar|eng|Contener.|0", "Expulsar la muestra|cmd|Seguridad.|1"), evr("qui", "4", "Combustible in situ", "Se puede fabricar combustible con recursos locales.", "B", "Sintetizarlo|qui|Ahorro enorme.|2", "Usar lo que queda|pil|Justo.|1", "Pedir reabastecimiento|com|Caro.|0"), evr("ast", "12", "Tormenta de neutrinos", "Los sensores marcan una anomalía estelar en la ruta.", "S", "Medirla|ast|Datos únicos.|2", "Desviarse|pil|Evitarla.|0", "Blindar instrumentos|eng|Proteger.|1"), evr("ast", "24", "Navegación sin GPS", "Falla el sistema de navegación principal.", "E", "Navegar por estrellas|ast|Como los antiguos.|1", "Piloto a ojo|pil|Instinto.|2", "Esperar a Tierra|com|Lento.|0"), evr("ast", "1", "Cometa cercano", "Un cometa pasa a poca distancia de la nave.", "S", "Atravesar su cola|ast|Muestras gratis.|2", "Fotografiarlo|com|Sin riesgo.|0", "Analizar su hielo|qui|Desde lejos.|1"), evr("hack", "12", "Virus en la IA", "La IA de la nave empieza a dar órdenes raras.", "C", "Contraataque digital|hack|Duelo de código.|2", "Reiniciar todo|eng|Perder datos.|1", "Control manual|pil|Sin IA.|0"), evr("hack", "234", "Datos corruptos", "Medio disco de ciencia aparece corrupto.", "S", "Recuperarlos|hack|Arqueología digital.|1", "Repetir mediciones|bio|Desde cero.|0", "Reconstruir con IA|hack|Riesgoso.|2"), evr("hack", "4", "Hackeo desde Tierra", "Alguien intenta tomar control de la nave remotamente.", "C", "Cerrar el firewall|hack|Bloqueo total.|1", "Cortar comunicaciones|cmd|Aislarse.|0", "Rastrearlo|com|Encontrar al culpable.|2"));

  // src/game/rules.ts
  var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function addAll(target, src) {
    if (!src)
      return;
    for (const [k, v] of Object.entries(src))
      target[k] = (target[k] ?? 0) + v;
  }
  function chance(ch, ctx, circ) {
    const has = ctx.picked.includes(ch.skill);
    let p = 0.52;
    p += has ? 0.24 : -0.14;
    p += [0.12, 0, -0.1][ch.risk] ?? 0;
    p += ctx.planet.mod;
    if (has && ctx.planet.rec.includes(ch.skill))
      p += 0.05;
    for (const id of ctx.picked)
      p += ROLES[id].mods.all ?? 0;
    if (has) {
      const m = ROLES[ch.skill].mods;
      p += m.ownRisk?.[ch.risk] ?? 0;
      p += m.chapter?.[ctx.chapter] ?? 0;
      p += m.planet?.[ctx.planet.id] ?? 0;
      if (m.lowEnergy && ctx.stats.energy < 40)
        p += m.lowEnergy;
    }
    if (circ && (!circ.skill || circ.skill === ch.skill))
      p += circ.d;
    p += (ctx.stats[ROLES[ch.skill].dom] - 50) / 400;
    return clamp(p, 0.1, 0.93);
  }
  function outcomeEffects(ch, e, ctx, success) {
    const has = ctx.picked.includes(ch.skill);
    const R = [{ k: 8, d: 4, f: 6 }, { k: 12, d: 5, f: 10 }, { k: 18, d: 6, f: 16 }][ch.risk] ?? { k: 12, d: 5, f: 10 };
    const m = ROLES[ch.skill].mods;
    const dom = ROLES[ch.skill].dom;
    const eff = {};
    if (success) {
      addAll(eff, { [e.k]: R.k });
      if (dom !== e.k)
        addAll(eff, { [dom]: R.d });
      if (has && ch.risk === 2)
        addAll(eff, { science: 4 });
      if (has)
        addAll(eff, m.onOwnSuccess);
    } else {
      addAll(eff, { [e.k]: -R.f });
      const penStat = e.k === "trust" ? "energy" : "trust";
      const halve = ctx.picked.some((id) => ROLES[id].mods.halveMoral);
      const pen = halve ? 3 : 6;
      const skip = penStat === "trust" && has && m.noTrustLoss;
      if (!skip)
        addAll(eff, { [penStat]: -pen });
      if (has)
        addAll(eff, m.onOwnFail);
    }
    return eff;
  }
  function startStats(picked, planet) {
    const s = { ...BASE_STATS };
    const add = (src) => {
      for (const [k, v] of Object.entries(src))
        s[k] += v;
    };
    picked.forEach((id) => add(ROLES[id].start));
    add(planet.start);
    Object.keys(s).forEach((k) => {
      s[k] = clamp(s[k], 0, 100);
    });
    return s;
  }
  function chapterBonus(picked) {
    const eff = {};
    picked.forEach((id) => addAll(eff, ROLES[id].mods.perChapter));
    return eff;
  }
  function pointsFor(risk, streak) {
    const base = [100, 150, 250][risk] ?? 150;
    return Math.round(base * (1 + Math.min(streak, 8) * 0.25));
  }

  // src/game/space-objects.ts
  function makeAsteroid(w, h, scale = 1) {
    const fromLeft = Math.random() < 0.5;
    const r = (8 + Math.random() * 26) * scale;
    const n = 9 + Math.floor(Math.random() * 5);
    const pts = Array.from({ length: n }, () => 0.7 + Math.random() * 0.4);
    const craters = Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => [Math.random() * 1.2 - 0.6, Math.random() * 1.2 - 0.6, 0.12 + Math.random() * 0.18]);
    const speed = (12 + Math.random() * 30) * (scale > 1 ? 1.6 : 1);
    return {
      x: fromLeft ? -r * 2 : w + r * 2,
      y: Math.random() * h,
      vx: (fromLeft ? 1 : -1) * speed,
      vy: (Math.random() - 0.5) * speed * 0.5,
      r,
      rot: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.8,
      pts,
      craters,
      tone: 60 + Math.random() * 50,
      alpha: 0.55 + Math.random() * 0.4
    };
  }
  function makeMeteor(w, h) {
    const x = Math.random() * w * 1.2;
    const sp = 500 + Math.random() * 700;
    const ang = Math.PI * (0.72 + Math.random() * 0.12);
    const max = 0.7 + Math.random() * 0.8;
    return { x, y: -20 - Math.random() * h * 0.3, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, len: 90 + Math.random() * 160, life: max, max, w: 1 + Math.random() * 2.2, hue: Math.random() < 0.3 ? 30 : 190 };
  }
  function drawAsteroid(ctx, a) {
    ctx.save();
    ctx.globalAlpha = a.alpha;
    ctx.translate(a.x, a.y);
    ctx.rotate(a.rot);
    ctx.beginPath();
    a.pts.forEach((k, i) => {
      const t = i / a.pts.length * Math.PI * 2;
      const px = Math.cos(t) * a.r * k, py = Math.sin(t) * a.r * k;
      if (i === 0)
        ctx.moveTo(px, py);
      else
        ctx.lineTo(px, py);
    });
    ctx.closePath();
    const g = ctx.createRadialGradient(-a.r * 0.4, -a.r * 0.4, a.r * 0.1, 0, 0, a.r * 1.1);
    g.addColorStop(0, `rgb(${a.tone + 70},${a.tone + 58},${a.tone + 48})`);
    g.addColorStop(0.6, `rgb(${a.tone},${a.tone - 8},${a.tone - 16})`);
    g.addColorStop(1, "rgb(12,14,22)");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,.28)";
    for (const [cx, cy, cr] of a.craters) {
      ctx.beginPath();
      ctx.arc(cx * a.r, cy * a.r, cr * a.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  function drawMeteor(ctx, m) {
    const k = Math.min(1, m.life / m.max * 1.6);
    const sp = Math.hypot(m.vx, m.vy);
    const tx = m.x - m.vx / sp * m.len, ty = m.y - m.vy / sp * m.len;
    const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
    g.addColorStop(0, `hsla(${m.hue},100%,92%,${k})`);
    g.addColorStop(0.25, `hsla(${m.hue},100%,70%,${k * 0.6})`);
    g.addColorStop(1, `hsla(${m.hue},100%,60%,0)`);
    ctx.strokeStyle = g;
    ctx.lineWidth = m.w;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.fillStyle = `hsla(${m.hue},100%,96%,${k})`;
    ctx.shadowColor = `hsla(${m.hue},100%,70%,1)`;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.w * 1.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  function createSpaceField(opts) {
    const asts = [];
    const mets = [];
    let ta = opts.asteroidEvery * 0.3, tm = opts.meteorEvery * 0.2;
    return {
      burst(w, h, n) {
        for (let i = 0;i < n; i++)
          mets.push(makeMeteor(w, h));
      },
      step(ctx, w, h, dt, speedMul = 1) {
        ta -= dt;
        tm -= dt;
        if (ta <= 0 && asts.length < opts.maxAst) {
          asts.push(makeAsteroid(w, h, opts.scale ?? 1));
          ta = opts.asteroidEvery * (0.5 + Math.random());
        }
        if (tm <= 0) {
          mets.push(makeMeteor(w, h));
          if (Math.random() < 0.3)
            mets.push(makeMeteor(w, h));
          tm = opts.meteorEvery * (0.4 + Math.random());
        }
        for (let i = asts.length - 1;i >= 0; i--) {
          const a = asts[i];
          a.x += a.vx * dt * speedMul;
          a.y += a.vy * dt * speedMul;
          a.rot += a.vr * dt;
          if (a.x < -120 || a.x > w + 120 || a.y < -120 || a.y > h + 120) {
            asts.splice(i, 1);
            continue;
          }
          drawAsteroid(ctx, a);
        }
        for (let i = mets.length - 1;i >= 0; i--) {
          const m = mets[i];
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          m.life -= dt;
          if (m.life <= 0) {
            mets.splice(i, 1);
            continue;
          }
          drawMeteor(ctx, m);
        }
      }
    };
  }

  // src/game/sfx.ts
  var ctx = null;
  var muted = false;
  function setMuted(v) {
    muted = v;
    try {
      localStorage.setItem("sm-muted", v ? "1" : "0");
    } catch {}
    if (v)
      music.stop();
    else
      music.start();
  }
  function isMuted() {
    return muted;
  }
  function loadMuted() {
    try {
      muted = localStorage.getItem("sm-muted") === "1";
    } catch {}
    return muted;
  }
  function ac() {
    if (muted || typeof window === "undefined")
      return null;
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C)
        return null;
      ctx = new C;
    }
    if (ctx.state === "suspended")
      ctx.resume();
    return ctx;
  }
  function tone(freq, start, dur, type = "sine", vol = 0.12, slideTo) {
    const a = ac();
    if (!a)
      return;
    const o = a.createOscillator();
    const g = a.createGain();
    const t = a.currentTime + start;
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo)
      o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }
  var noiseCache = null;
  function noiseBuffer(a) {
    if (noiseCache && noiseCache.sampleRate === a.sampleRate) return noiseCache;
    const len = Math.floor(a.sampleRate * 3);
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      d[i] = last * 3.5 * 0.7 + white * 0.3;
    }
    noiseCache = buf;
    return buf;
  }
  var launchBus = null;
  function stopLaunch() {
    if (!launchBus || !ctx) return;
    const t = ctx.currentTime;
    try {
      launchBus.gain.cancelScheduledValues(t);
      launchBus.gain.setValueAtTime(launchBus.gain.value, t);
      launchBus.gain.linearRampToValueAtTime(0, t + 0.35);
    } catch {}
    const b = launchBus;
    setTimeout(() => { try { b.disconnect(); } catch {} }, 600);
    launchBus = null;
  }
  function rocketRoar(dur = 6.5) {
    const a = ac();
    if (!a) return;
    stopLaunch();
    const t = a.currentTime;
    const bus = a.createGain();
    bus.gain.value = 1;
    const comp = a.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 6;
    bus.connect(comp).connect(a.destination);
    launchBus = bus;
    const nb = noiseBuffer(a);
    // 1. ignition crack
    const crack = a.createBufferSource(); crack.buffer = nb;
    const cf = a.createBiquadFilter(); cf.type = "bandpass"; cf.frequency.value = 1400; cf.Q.value = 0.7;
    const cg = a.createGain();
    cg.gain.setValueAtTime(0.0001, t); cg.gain.exponentialRampToValueAtTime(0.9, t + 0.02); cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    crack.connect(cf).connect(cg).connect(bus); crack.start(t); crack.stop(t + 0.5);
    // 2. main roar: filtered noise that opens up as the engines throttle up
    const roar = a.createBufferSource(); roar.buffer = nb; roar.loop = true;
    const rf = a.createBiquadFilter(); rf.type = "lowpass"; rf.Q.value = 0.9;
    rf.frequency.setValueAtTime(180, t);
    rf.frequency.exponentialRampToValueAtTime(1100, t + 1.2);
    rf.frequency.exponentialRampToValueAtTime(600, t + dur * 0.6);
    rf.frequency.exponentialRampToValueAtTime(220, t + dur);
    const rg = a.createGain();
    rg.gain.setValueAtTime(0.0001, t);
    rg.gain.exponentialRampToValueAtTime(0.75, t + 0.5);
    rg.gain.setValueAtTime(0.75, t + dur * 0.45);
    rg.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    roar.connect(rf).connect(rg).connect(bus); roar.start(t); roar.stop(t + dur + 0.1);
    // 3. crackle: high noise chopped by a fast tremolo
    const crk = a.createBufferSource(); crk.buffer = nb; crk.loop = true; crk.playbackRate.value = 1.7;
    const hf = a.createBiquadFilter(); hf.type = "highpass"; hf.frequency.value = 2200;
    const hg = a.createGain(); hg.gain.value = 0;
    const lfo = a.createOscillator(); lfo.type = "square"; lfo.frequency.value = 17;
    const lg = a.createGain(); lg.gain.value = 0.09;
    lfo.connect(lg).connect(hg.gain);
    const he = a.createGain();
    he.gain.setValueAtTime(0.0001, t); he.gain.exponentialRampToValueAtTime(1, t + 0.4); he.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.75);
    crk.connect(hf).connect(hg).connect(he).connect(bus);
    crk.start(t); lfo.start(t); crk.stop(t + dur); lfo.stop(t + dur);
    // 4. sub rumble
    [[38, "sine", 0.5], [57, "sawtooth", 0.08]].forEach(([f, type, v]) => {
      const o = a.createOscillator(); o.type = type;
      o.frequency.setValueAtTime(f * 0.8, t); o.frequency.exponentialRampToValueAtTime(f * 1.25, t + dur * 0.7);
      const g = a.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      const lp = a.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 160;
      o.connect(lp).connect(g).connect(bus); o.start(t); o.stop(t + dur + 0.1);
    });
    // 5. rising turbine whine
    const wh = a.createOscillator(); wh.type = "triangle";
    wh.frequency.setValueAtTime(140, t); wh.frequency.exponentialRampToValueAtTime(720, t + dur * 0.8);
    const wg = a.createGain();
    wg.gain.setValueAtTime(0.0001, t); wg.gain.exponentialRampToValueAtTime(0.035, t + 1.5); wg.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    wh.connect(wg).connect(bus); wh.start(t); wh.stop(t + dur + 0.1);
  }
  var sfx = {
    click: () => tone(660, 0, 0.06, "square", 0.04),
    hover: () => tone(880, 0, 0.03, "sine", 0.02),
    win: (streak = 0) => {
      const b = 523 * Math.pow(1.06, Math.min(streak, 6));
      [0, 0.07, 0.14, 0.22].forEach((t, i) => tone(b * [1, 1.25, 1.5, 2][i], t, 0.18, "triangle", 0.1));
    },
    fail: () => {
      tone(220, 0, 0.25, "sawtooth", 0.08, 90);
      tone(150, 0.05, 0.3, "square", 0.04, 70);
    },
    whoosh: () => tone(200, 0, 0.5, "sine", 0.06, 900),
    launch: (dur) => rocketRoar(dur),
    stopLaunch: () => stopLaunch(),
    beep: (go = false) => {
      if (go) {
        tone(1320, 0, 0.35, "square", 0.05);
        tone(660, 0, 0.35, "triangle", 0.08);
      } else
        tone(880, 0, 0.14, "square", 0.045);
    },
    vent: () => {
      const a = ac();
      if (!a) return;
      const t = a.currentTime;
      const n = a.createBufferSource(); n.buffer = noiseBuffer(a);
      const f = a.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 3000;
      const g = a.createGain();
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.15); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      n.connect(f).connect(g).connect(a.destination); n.start(t); n.stop(t + 1.2);
    },
    fanfare: () => [0, 0.12, 0.24, 0.4].forEach((t, i) => tone([523, 659, 784, 1046][i], t, 0.35, "triangle", 0.1))
  };

  // src/game/music.ts · música de fondo ambiente generada en vivo (sin archivos)
  var music = (() => {
    const MASTER = 0.2;            // volumen general (bajito)
    const STEP = 0.75;             // segundos por paso del arpegio
    const STEPS_PER_CHORD = 8;     // 6 s por acorde
    // Am - F - C - G (notas MIDI): ánimo medio, ni triste ni épico
    const CHORDS = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 62], [55, 59, 62, 66]];
    const BASS = [33, 29, 36, 31];
    const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
    let bus = null, send = null, timer = 0, nextT = 0, step = 0, running = false;
    function voice(a, dest, freq, t, dur, type, peak, attack, release, cutoff) {
      const o = a.createOscillator();
      const g = a.createGain();
      const f = a.createBiquadFilter();
      f.type = "lowpass";
      f.frequency.value = cutoff;
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(peak, t + attack);
      g.gain.setValueAtTime(peak, t + Math.max(attack, dur - release));
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      o.connect(f).connect(g).connect(dest);
      o.start(t);
      o.stop(t + dur + 0.05);
    }
    function pad(a, chord, bassNote, t) {
      const dur = STEP * STEPS_PER_CHORD + 1.2;
      chord.forEach((m) => {
        [-5, 5].forEach((cents) => {
          const fr = mtof(m) * Math.pow(2, cents / 1200);
          voice(a, bus, fr, t, dur, "triangle", 0.035, 2.2, 2.4, 900);
        });
      });
      voice(a, bus, mtof(bassNote), t, dur, "sine", 0.11, 1.5, 2.2, 400);
      voice(a, bus, mtof(bassNote + 12), t, dur, "sine", 0.03, 2, 2.2, 500);
    }
    function arp(a, chord, t, idx) {
      const m = chord[idx % chord.length] + (idx % 8 >= 4 ? 24 : 12);
      const fr = mtof(m);
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = "sine";
      o.frequency.value = fr;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.connect(g);
      g.connect(bus);
      g.connect(send);
      o.start(t);
      o.stop(t + 1.7);
    }
    function schedule() {
      const a = ctx;
      if (!a || !bus || !running) return;
      while (nextT < a.currentTime + 1.6) {
        const ci = Math.floor(step / STEPS_PER_CHORD) % CHORDS.length;
        const si = step % STEPS_PER_CHORD;
        if (si === 0) pad(a, CHORDS[ci], BASS[ci], nextT);
        // arpegio suave y espaciado: algunas notas se saltean para que respire
        const pattern = [1, 0, 1, 1, 0, 1, 0, 1];
        if (pattern[si] && Math.random() < 0.85) arp(a, CHORDS[ci], nextT, si);
        nextT += STEP;
        step++;
      }
    }
    function start() {
      if (running || muted) return;
      const a = ac();
      if (!a) return;
      running = true;
      bus = a.createGain();
      bus.gain.value = 0.0001;
      bus.gain.linearRampToValueAtTime(MASTER, a.currentTime + 4);
      bus.connect(a.destination);
      // eco largo para dar sensación de espacio
      send = a.createGain();
      send.gain.value = 0.5;
      const dl = a.createDelay(2);
      dl.delayTime.value = STEP * 2;
      const fb = a.createGain();
      fb.gain.value = 0.38;
      const lp = a.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1600;
      send.connect(dl);
      dl.connect(lp);
      lp.connect(fb);
      fb.connect(dl);
      lp.connect(bus);
      nextT = a.currentTime + 0.15;
      step = 0;
      schedule();
      timer = window.setInterval(schedule, 300);
    }
    function stop() {
      if (!running) return;
      running = false;
      clearInterval(timer);
      const b = bus;
      if (b && ctx) {
        const t = ctx.currentTime;
        try {
          b.gain.cancelScheduledValues(t);
          b.gain.setValueAtTime(b.gain.value, t);
          b.gain.linearRampToValueAtTime(0.0001, t + 0.5);
        } catch {}
        setTimeout(() => { try { b.disconnect(); } catch {} }, 900);
      }
      bus = null;
      send = null;
    }
    // pausa cuando la pestaña no está visible
    document.addEventListener("visibilitychange", () => {
      if (!ctx || !running) return;
      if (document.hidden) ctx.suspend();
      else ctx.resume();
    });
    return { start, stop, isOn: () => running };
  })();

  // src/game/cinematic.ts
  var clamp2 = (v, a, b) => Math.max(a, Math.min(b, v));
  var ease = (x) => {
    x = clamp2(x, 0, 1);
    return x * x * (3 - 2 * x);
  };
  var imgCache = new Map;
  function getImg(src) {
    let im = imgCache.get(src);
    if (!im) {
      im = new Image;
      im.src = src;
      imgCache.set(src, im);
    }
    return im;
  }
  var cineStop = null;
  var stopCinematic = () => cineStop?.();
  var cinematicRunning = () => cineStop !== null;
  function runCinematic({ dur, liftAt, warpAt, captions, bodies, titleAt, onEnd }) {
    const overlay = document.getElementById("intro");
    const cv = document.getElementById("cine");
    const cap = document.getElementById("cineCaption");
    const title = document.getElementById("cineTitle");
    const ctx = cv?.getContext("2d");
    if (!overlay || !cv || !cap || !title || !ctx) {
      onEnd?.();
      return;
    }
    bodies.forEach((b) => b.img && getImg(b.img));
    overlay.classList.remove("hidden");
    title.classList.remove("show");
    cap.classList.remove("show");
    cap.textContent = "";
    let w = 0, h = 0;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = cv.clientWidth || window.innerWidth;
      h = cv.clientHeight || window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 380 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 0.98 + 0.02 }));
    const flames = [];
    const smoke = [];
    let prevTop = null, flashT = -1, vented = false;
    const puff = document.createElement("canvas");
    puff.width = puff.height = 64;
    {
      const pc = puff.getContext("2d");
      const pg = pc.createRadialGradient(32, 32, 0, 32, 32, 32);
      pg.addColorStop(0, "rgba(236,240,248,1)");
      pg.addColorStop(0.45, "rgba(214,220,234,.6)");
      pg.addColorStop(1, "rgba(200,206,222,0)");
      pc.fillStyle = pg;
      pc.fillRect(0, 0, 64, 64);
    }
    const field = createSpaceField({ asteroidEvery: 0.9, meteorEvery: 0.55, maxAst: 12, scale: 1.4 });
    const t0 = performance.now();
    let last = t0, raf = 0, capIdx = -1, ended = false, launched = false, bursted = false, rAng = 0;
    const liftDur = Math.max(1.5, warpAt - liftAt);
    function drawBody(b, t) {
      const age = t - b.t;
      if (age < 0)
        return;
      const cx = w / 2 + b.x * w * 0.5, cy = h / 2 + b.y * h * 0.5;
      const r = b.r * Math.pow(1 + age * (b.grow ?? 0.9), 2.2);
      const a = clamp2(age * 2, 0, 1) * (b.stay ? 1 : clamp2(1 - (age - (b.life ?? 3)) * 1.5, 0, 1));
      if (a <= 0 || !ctx)
        return;
      ctx.save();
      ctx.globalAlpha = a;
      const glow = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.35);
      glow.addColorStop(0, b.c1 + "66");
      glow.addColorStop(1, b.c1 + "00");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.35, 0, Math.PI * 2);
      ctx.fill();
      const im = b.img ? getImg(b.img) : null;
      if (im && im.complete && im.naturalWidth) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(im, cx - r * 1.19, cy - r * 1.19, r * 2.38, r * 2.38);
        const sh = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.4, r * 0.2, cx, cy, r);
        sh.addColorStop(0, "rgba(0,0,0,0)");
        sh.addColorStop(1, "rgba(0,0,0,.55)");
        ctx.fillStyle = sh;
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
        ctx.restore();
      } else {
        const g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
        g.addColorStop(0, b.c1);
        g.addColorStop(0.6, b.c2);
        g.addColorStop(1, "#050a14");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (b.ring) {
        ctx.strokeStyle = "rgba(240,220,170,.6)";
        ctx.lineWidth = Math.max(2, r * 0.08);
        ctx.beginPath();
        ctx.ellipse(cx, cy, r * 1.9, r * 0.45, -0.3, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }
    function drawFlame(x0, y0, len, wid, intensity) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const fl = len * (0.86 + Math.random() * 0.28);
      const fw = wid * (0.92 + Math.random() * 0.16);
      let g = ctx.createLinearGradient(0, y0, 0, y0 + fl);
      g.addColorStop(0, "rgba(255,244,210,.95)");
      g.addColorStop(0.22, "rgba(255,176,86,.9)");
      g.addColorStop(0.65, "rgba(255,96,36,.4)");
      g.addColorStop(1, "rgba(255,60,20,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(x0 - fw, y0);
      ctx.bezierCurveTo(x0 - fw * 1.6, y0 + fl * 0.3, x0 - fw * 0.45, y0 + fl * 0.82, x0, y0 + fl);
      ctx.bezierCurveTo(x0 + fw * 0.45, y0 + fl * 0.82, x0 + fw * 1.6, y0 + fl * 0.3, x0 + fw, y0);
      ctx.closePath();
      ctx.fill();
      const cl = fl * 0.46;
      g = ctx.createLinearGradient(0, y0, 0, y0 + cl);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.5, "rgba(200,230,255,.85)");
      g.addColorStop(1, "rgba(140,190,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(x0 - fw * 0.6, y0);
      ctx.quadraticCurveTo(x0, y0 + cl * 1.35, x0 + fw * 0.6, y0);
      ctx.fill();
      for (let i = 1; i <= 3; i++) {
        ctx.fillStyle = `rgba(255,250,232,${(0.55 * intensity) / i})`;
        ctx.beginPath();
        ctx.ellipse(x0, y0 + cl * 0.34 * i + 3, fw * 0.3, fw * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    function drawTower(x, base, s, t) {
      const H = 150 * s, W = 16 * s;
      ctx.save();
      ctx.fillStyle = "rgba(14,20,32,.9)";
      ctx.fillRect(x - W / 2, base - H, W, H);
      ctx.strokeStyle = "rgba(92,110,140,.95)";
      ctx.lineWidth = Math.max(1, 1.5 * s);
      ctx.beginPath();
      ctx.moveTo(x - W / 2, base); ctx.lineTo(x - W / 2, base - H);
      ctx.moveTo(x + W / 2, base); ctx.lineTo(x + W / 2, base - H);
      const step = 14 * s;
      for (let yy = 0; yy < H - 1; yy += step) {
        ctx.moveTo(x - W / 2, base - yy); ctx.lineTo(x + W / 2, base - yy - step);
        ctx.moveTo(x + W / 2, base - yy); ctx.lineTo(x - W / 2, base - yy - step);
      }
      ctx.stroke();
      const open = clamp2((t - (liftAt - 1)) / 0.7, 0, 1);
      ctx.lineWidth = 3 * s;
      ctx.strokeStyle = "rgba(120,138,168,1)";
      for (const ay of [0.62, 0.82]) {
        const ang = -open * 1.25, ax = x + W / 2, aY = base - H * ay, L = 39 * s;
        ctx.beginPath();
        ctx.moveTo(ax, aY);
        ctx.lineTo(ax + Math.cos(ang) * L, aY + Math.sin(ang) * L);
        ctx.stroke();
      }
      const blink = Math.sin(t * 6) > 0;
      if (blink) {
        const bg = ctx.createRadialGradient(x, base - H - 4 * s, 0, x, base - H - 4 * s, 16 * s);
        bg.addColorStop(0, "rgba(255,90,70,.8)");
        bg.addColorStop(1, "rgba(255,90,70,0)");
        ctx.fillStyle = bg;
        ctx.beginPath(); ctx.arc(x, base - H - 4 * s, 16 * s, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = blink ? "#ff5a46" : "#6a2222";
      ctx.beginPath(); ctx.arc(x, base - H - 4 * s, 3 * s, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#1a2232";
      ctx.fillRect(x - 10 * s, base - 8 * s, 82 * s + 50 * s, 9 * s);
      ctx.fillStyle = "rgba(255,190,110,.55)";
      for (let i = 0; i < 5; i++) ctx.fillRect(x - 6 * s + i * 26 * s, base - 8 * s, 6 * s, 2 * s);
      ctx.restore();
    }
    function drawRocket(x, y, s, intensity, ang = 0, alpha = 1) {
      if (!ctx)
        return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.scale(s, s);
      if (intensity > 0.02) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const halo = ctx.createRadialGradient(0, 60, 4, 0, 60, 110 + intensity * 60);
        halo.addColorStop(0, `rgba(255,180,100,${0.55 * intensity})`);
        halo.addColorStop(1, "rgba(255,110,40,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(0, 60, 170, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        const L = 38 + intensity * 78;
        drawFlame(-22, 41, L * 0.72, 5.5, intensity);
        drawFlame(22, 41, L * 0.72, 5.5, intensity);
        drawFlame(0, 47, L, 9.5, intensity);
      }
      for (const sx of [-22, 22]) {
        const bg = ctx.createLinearGradient(sx - 6, 0, sx + 6, 0);
        bg.addColorStop(0, "#8695ae");
        bg.addColorStop(0.45, "#f4f7fb");
        bg.addColorStop(1, "#7f8ea8");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.moveTo(sx - 6, 36);
        ctx.lineTo(sx - 6, -12);
        ctx.quadraticCurveTo(sx - 5, -30, sx, -36);
        ctx.quadraticCurveTo(sx + 5, -30, sx + 6, -12);
        ctx.lineTo(sx + 6, 36);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#ff9d57";
        ctx.fillRect(sx - 6, 18, 12, 4);
        ctx.fillStyle = "#2c3342";
        ctx.beginPath();
        ctx.moveTo(sx - 4, 36); ctx.lineTo(sx - 6, 41); ctx.lineTo(sx + 6, 41); ctx.lineTo(sx + 4, 36);
        ctx.fill();
      }
      const fg = ctx.createLinearGradient(0, 10, 0, 48);
      fg.addColorStop(0, "#ffb27a");
      fg.addColorStop(1, "#d8582c");
      ctx.fillStyle = fg;
      ctx.beginPath(); ctx.moveTo(-12, 12); ctx.lineTo(-36, 48); ctx.lineTo(-12, 38); ctx.fill();
      ctx.beginPath(); ctx.moveTo(12, 12); ctx.lineTo(36, 48); ctx.lineTo(12, 38); ctx.fill();
      ctx.fillStyle = "#2c3342";
      ctx.beginPath();
      ctx.moveTo(-8, 38); ctx.lineTo(-11, 47); ctx.lineTo(11, 47); ctx.lineTo(8, 38);
      ctx.fill();
      const body = ctx.createLinearGradient(-15, 0, 15, 0);
      body.addColorStop(0, "#9aa9c2");
      body.addColorStop(0.42, "#ffffff");
      body.addColorStop(1, "#8293b0");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.moveTo(0, -76);
      ctx.bezierCurveTo(14, -60, 15, -38, 15, -20);
      ctx.lineTo(15, 38);
      ctx.lineTo(-15, 38);
      ctx.lineTo(-15, -20);
      ctx.bezierCurveTo(-15, -38, -14, -60, 0, -76);
      ctx.fill();
      const nose = ctx.createLinearGradient(-12, 0, 12, 0);
      nose.addColorStop(0, "#d8582c");
      nose.addColorStop(0.45, "#ffb27a");
      nose.addColorStop(1, "#c94c24");
      ctx.fillStyle = nose;
      ctx.beginPath();
      ctx.moveTo(0, -76);
      ctx.bezierCurveTo(8, -67, 11, -60, 12.5, -52);
      ctx.lineTo(-12.5, -52);
      ctx.bezierCurveTo(-11, -60, -8, -67, 0, -76);
      ctx.fill();
      ctx.fillStyle = "#1c2a40";
      ctx.fillRect(-15, 2, 30, 4);
      ctx.fillRect(-15, 28, 30, 3);
      ctx.fillStyle = "rgba(87,228,232,.85)";
      ctx.fillRect(-1, -14, 2, 12);
      const win = ctx.createRadialGradient(-2, -33, 1, 0, -31, 8);
      win.addColorStop(0, "#c8fbff");
      win.addColorStop(0.5, "#57e4e8");
      win.addColorStop(1, "#1d6f8a");
      ctx.fillStyle = win;
      ctx.beginPath();
      ctx.arc(0, -31, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#1c3a5c";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.8)";
      ctx.beginPath();
      ctx.arc(-2.5, -33.5, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    function drawSmoke(ground) {
      for (const p of smoke) {
        if (p.ground !== ground) continue;
        ctx.globalAlpha = clamp2(p.life, 0, 1) * p.a;
        ctx.drawImage(puff, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      }
      ctx.globalAlpha = 1;
    }
    function frame(now) {
      if (ended || !ctx || !cap || !title)
        return;
      const t = (now - t0) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const bgG = ctx.createLinearGradient(0, 0, 0, h);
      bgG.addColorStop(0, "#02040b");
      bgG.addColorStop(1, "#0a1530");
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, w, h);
      const speed = 0.03 + 1.25 * ease((t - warpAt) / 2.2) + 0.12 * ease((t - liftAt) / liftDur);
      const cx = w / 2, cy = h / 2;
      ctx.lineCap = "round";
      for (const s of stars) {
        const pz = s.z;
        s.z -= speed * dt;
        const k = 0.5 * Math.max(w, h) / s.z;
        const px = cx + s.x * k * 0.5, py = cy + s.y * k * 0.5;
        if (s.z <= 0.02 || px < -50 || px > w + 50 || py < -50 || py > h + 50) {
          s.x = Math.random() * 2 - 1;
          s.y = Math.random() * 2 - 1;
          s.z = 1;
          continue;
        }
        const pk = 0.5 * Math.max(w, h) / (pz + 0.0001);
        ctx.strokeStyle = `rgba(220,240,255,${clamp2(1 - s.z, 0.15, 1)})`;
        ctx.lineWidth = (1 - s.z) * 2 + 0.4;
        ctx.beginPath();
        ctx.moveTo(cx + s.x * pk * 0.5, cy + s.y * pk * 0.5);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
      field.step(ctx, w, h, dt, 1 + speed * 3);
      if (!bursted && t > warpAt) {
        bursted = true;
        field.burst(w, h, 8);
      }
      bodies.forEach((b) => drawBody(b, t));
      const R = Math.max(w, h) * 0.9;
      const lift = ease((t - liftAt) / (liftDur + 2));
      const ecy = h + R * 0.72 + lift * R * 1.1;
      const top = ecy - R;
      const dTop = prevTop === null ? 0 : top - prevTop;
      prevTop = top;
      const rsBase = clamp2(Math.min(w, h) / 520, 0.6, 1.1);
      const intensity = t < liftAt - 0.6 ? 0 : clamp2((t - (liftAt - 0.6)) / 0.8, 0, 1);
      const climb = ease((t - liftAt) / liftDur);
      const shakeAmt = intensity * (t < liftAt + 1.2 ? 1 : clamp2(1 - (t - liftAt - 1.2) / 2.2, 0, 1)) * 7 * rsBase;
      ctx.save();
      if (shakeAmt > 0.1)
        ctx.translate((Math.random() - 0.5) * shakeAmt, (Math.random() - 0.5) * shakeAmt);
      if (top < h + 60) {
        const atm = ctx.createRadialGradient(cx, ecy, R * 0.96, cx, ecy, R * 1.08);
        atm.addColorStop(0, "rgba(120,200,255,.55)");
        atm.addColorStop(1, "rgba(120,200,255,0)");
        ctx.fillStyle = atm;
        ctx.beginPath();
        ctx.arc(cx, ecy, R * 1.08, 0, Math.PI * 2);
        ctx.fill();
        const eg = ctx.createRadialGradient(cx - R * 0.2, ecy - R * 0.5, R * 0.1, cx, ecy, R);
        eg.addColorStop(0, "#3f8fb8");
        eg.addColorStop(0.55, "#1b4f7a");
        eg.addColorStop(1, "#07122a");
        ctx.fillStyle = eg;
        ctx.beginPath();
        ctx.arc(cx, ecy, R, 0, Math.PI * 2);
        ctx.fill();
        if (intensity > 0.02) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const gr = 300 * rsBase * (1 + intensity * 0.6);
          const hg = ctx.createRadialGradient(cx, top, 0, cx, top, gr);
          hg.addColorStop(0, `rgba(255,160,80,${0.45 * intensity * (1 - climb * 0.8)})`);
          hg.addColorStop(1, "rgba(255,120,50,0)");
          ctx.fillStyle = hg;
          ctx.fillRect(cx - gr, top - gr, gr * 2, gr * 2);
          ctx.restore();
        }
        drawTower(cx - 62 * rsBase, top, rsBase, t);
      }
      const pad = h - R * 0.28 - 51 * rsBase;
      const target = bodies.find((b) => b.stay);
      let ry = pad - climb * (pad - h * 0.46);
      let rx = cx;
      let flight = 0;
      if (t >= warpAt) {
        ry = h * 0.46 + Math.sin(t * 2.2) * 6;
        if (target) {
          flight = ease((t - warpAt) / Math.max(1, dur - warpAt - 0.9));
          const tx = w / 2 + target.x * w * 0.5, ty = h / 2 + target.y * h * 0.5;
          const sx = cx, sy = h * 0.46;
          const wob = Math.sin(t * 2.6) * 22 * Math.sin(flight * Math.PI);
          rx = sx + (tx - sx) * flight + wob;
          ry = sy + (ty - sy) * flight - Math.sin(flight * Math.PI) * h * 0.06;
          const dx = tx - rx, dy = ty - ry;
          if (Math.hypot(dx, dy) > 12) {
            const want = Math.atan2(dx, -dy);
            rAng += (want - rAng) * Math.min(1, dt * 5);
          }
        }
      }
      if (t < liftAt)
        rx += (Math.random() - 0.5) * 1.5 * ease(t / liftAt);
      else
        rx += (Math.random() - 0.5) * 2.5 * (1 - climb);
      if (!vented && t > 0.5 && t < liftAt - 0.6) {
        vented = true;
        sfx.vent();
      }
      if (!launched && t >= liftAt - 0.6) {
        launched = true;
        flashT = t;
        sfx.launch(Math.max(3, dur - (liftAt - 0.6)));
      }
      const rs = rsBase * (1 - 0.18 * climb) * (1 - 0.78 * flight);
      const rAlpha = 1 - clamp2((flight - 0.9) / 0.1, 0, 1);
      const tdx = -Math.sin(rAng), tdy = Math.cos(rAng);
      if (t > 0.3 && t < liftAt - 0.5 && Math.random() < 0.5) {
        const side = Math.random() < 0.5 ? -1 : 1;
        smoke.push({ x: rx + side * 16 * rs, y: ry + (Math.random() * 30 - 10) * rs, vx: side * (25 + Math.random() * 40) * rs, vy: -(5 + Math.random() * 15) * rs, r: 4 * rs, gr: 18 * rs, life: 1, decay: 0.9, a: 0.35, ground: false });
      }
      if (intensity > 0.2 && climb < 0.55) {
        for (let i = 0; i < 4; i++) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          smoke.push({ x: cx + (Math.random() - 0.5) * 24 * rs, y: top - (2 + Math.random() * 8) * rsBase, vx: dir * (70 + Math.random() * 280) * rsBase, vy: -Math.random() * 45 * rsBase, r: (10 + Math.random() * 14) * rsBase, gr: (34 + Math.random() * 44) * rsBase, life: 1, decay: 0.22 + Math.random() * 0.18, a: 0.6, ground: true });
        }
      }
      if (intensity > 0.2 && t < warpAt + 0.4) {
        for (let i = 0; i < 2; i++)
          smoke.push({ x: rx + tdx * 70 * rs + (Math.random() - 0.5) * 10 * rs, y: ry + tdy * 70 * rs, vx: (Math.random() - 0.5) * 30 * rs, vy: 30 * rs, r: 7 * rs, gr: (22 + Math.random() * 16) * rs, life: 1, decay: 0.55 + Math.random() * 0.3, a: 0.45, ground: false });
      }
      if (smoke.length > 320)
        smoke.splice(0, smoke.length - 320);
      const drag = Math.pow(0.25, dt);
      for (let i = smoke.length - 1; i >= 0; i--) {
        const p = smoke[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt + dTop;
        p.vx *= drag;
        p.vy *= drag;
        p.r += p.gr * dt;
        p.life -= p.decay * dt;
        if (p.life <= 0)
          smoke.splice(i, 1);
      }
      drawSmoke(false);
      if (intensity > 0.02)
        for (let i = 0; i < 3; i++) {
          const spd = 140 + Math.random() * 200;
          flames.push({ x: rx + tdx * 48 * rs + (Math.random() - 0.5) * 16 * rs, y: ry + tdy * 48 * rs, vx: tdx * spd + (Math.random() - 0.5) * 50, vy: tdy * spd, life: 1 });
        }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = flames.length - 1;i >= 0; i--) {
        const f = flames[i];
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        f.life -= dt * 1.6;
        if (f.life <= 0) {
          flames.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(255,${Math.floor(110 + f.life * 110)},60,${f.life * 0.45})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, (3 + f.life * 6) * Math.max(0.5, rs), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      drawRocket(rx, ry, rs, intensity, rAng, rAlpha);
      drawSmoke(true);
      if (flashT >= 0 && t - flashT < 0.7) {
        const k = 1 - (t - flashT) / 0.7;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const fr = 260 * rsBase;
        const fy = ry + 50 * rs;
        const fgr = ctx.createRadialGradient(rx, fy, 0, rx, fy, fr);
        fgr.addColorStop(0, `rgba(255,250,235,${0.9 * k})`);
        fgr.addColorStop(0.4, `rgba(255,170,90,${0.45 * k})`);
        fgr.addColorStop(1, "rgba(255,120,40,0)");
        ctx.fillStyle = fgr;
        ctx.fillRect(rx - fr, fy - fr, fr * 2, fr * 2);
        ctx.restore();
      }
      ctx.restore();
      for (let i = captions.length - 1;i >= 0; i--) {
        const c = captions[i];
        if (t >= c.t) {
          if (i !== capIdx) {
            capIdx = i;
            cap.classList.remove("show");
            cap.offsetWidth;
            cap.textContent = c.text;
            cap.classList.add("show");
            if (/^[1-3]$/.test(c.text))
              sfx.beep(false);
            else if (c.text === tr("liftoff"))
              sfx.beep(true);
          }
          break;
        }
      }
      if (titleAt && t >= titleAt && !title.classList.contains("show")) {
        cap.classList.remove("show");
        title.classList.add("show");
      }
      let fade = 0;
      if (t < 0.6)
        fade = 1 - t / 0.6;
      if (t > dur - 0.6)
        fade = clamp2((t - (dur - 0.6)) / 0.6, 0, 1);
      if (fade > 0) {
        ctx.fillStyle = `rgba(2,4,10,${fade})`;
        ctx.fillRect(0, 0, w, h);
      }
      if (t >= dur) {
        end();
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    function end() {
      if (ended)
        return;
      ended = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      sfx.stopLaunch();
      overlay?.classList.add("hidden");
      title?.classList.remove("show");
      cap?.classList.remove("show");
      cineStop = null;
      onEnd?.();
    }
    cineStop = end;
    raf = requestAnimationFrame(frame);
  }
  var reduced = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  function playIntro(onEnd) {
    if (reduced()) {
      onEnd?.();
      return;
    }
    const p = (id) => PLANETS.find((x) => x.id === id);
    const mk = (pl, t, x, y, r) => ({ t, x, y, r, img: pl.img, c1: pl.c1, c2: pl.c2, life: 2.2, ring: pl.ring ?? false });
    runCinematic({
      dur: 10.5,
      liftAt: 1.6,
      warpAt: 4.6,
      titleAt: 8,
      captions: [
        { t: 0.5, text: tr("c1") },
        { t: 2.4, text: tr("c2") },
        { t: 4.8, text: tr("c3") },
        { t: 6.4, text: tr("c4") }
      ],
      bodies: [mk(p("marte"), 5, -0.55, -0.2, 24), mk(p("europa"), 5.9, 0.6, 0.05, 20), mk(p("kepler"), 6.8, -0.25, 0.35, 16)],
      ...onEnd ? { onEnd } : {}
    });
  }
  function playLaunch(planet, onEnd) {
    if (reduced()) {
      onEnd();
      return;
    }
    runCinematic({
      dur: 8.2,
      liftAt: 2.4,
      warpAt: 3.9,
      captions: [
        { t: 0.3, text: "3" },
        { t: 1, text: "2" },
        { t: 1.7, text: "1" },
        { t: 2.4, text: tr("liftoff") },
        { t: 4.3, text: planet.name.toUpperCase() }
      ],
      bodies: [{ t: 3.9, x: 0.28, y: -0.5, r: 20, grow: 0.5, img: planet.img, c1: planet.c1, c2: planet.c2, stay: true, ring: planet.ring ?? false }],
      onEnd
    });
  }

  // src/game/space-bg.ts
  function startSpaceBackground(cv) {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
      return { stop() {}, burst() {}, setAlert(_v) {} };
    const ctx = cv.getContext("2d");
    if (!ctx)
      return { stop() {}, burst() {}, setAlert(_v) {} };
    const field = createSpaceField({ asteroidEvery: 3.2, meteorEvery: 2.2, maxAst: 7 });
    let w = 0, h = 0, raf = 0, last = performance.now(), alert = false;
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      if (!document.hidden)
        field.step(ctx, w, h, dt, alert ? 2.2 : 1);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return {
      stop() {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
      },
      burst(n = 6) {
        field.burst(w, h, n);
      },
      setAlert(v) {
        alert = v;
      }
    };
  }

  // src/game/engine.ts
  var rand = (n) => Math.floor(Math.random() * n);
  var pick = (a) => a[rand(a.length)];
  var clamp3 = (v, a, b) => Math.max(a, Math.min(b, v));
  var shuffle = (a) => {
    const r = [...a];
    for (let i = r.length - 1;i > 0; i--) {
      const j = rand(i + 1);
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
  var $ = (id) => document.getElementById(id);
  var pad2 = (n) => String(n).padStart(2, "0");
  var DECISION_COUNT = GEN.length * PLANETS.length * 3 + ROLE_EVENTS.length * 3 + Object.values(PLANET_EVENTS).reduce((a, l) => a + l.length * 3, 0);
  function initGame() {
    const ac = new AbortController;
    const on = (el, type, fn) => el.addEventListener(type, fn, { signal: ac.signal });
    const timers = new Set;
    const later = (fn, ms) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
      return id;
    };
    const bg = startSpaceBackground($("spaceBg"));
    const state = {
      mode: "solo",
      mission: "Proyecto Horizonte",
      teamName: "Tripulación Orión",
      picked: [],
      names: { ...DEFAULT_NAMES },
      planet: null,
      crew: [],
      stats: { ...BASE_STATS },
      chapter: 0,
      queue: [],
      idx: 0,
      used: new Set,
      skill: {},
      nospec: {},
      wins: 0,
      total: 0,
      abort: null,
      waiting: false,
      crit: {},
      circ: null,
      current: null,
      responsible: null,
      xp: 0,
      shownXp: 0,
      streak: 0,
      bestStreak: 0,
      autoNext: 0
    };
    const ctx = () => ({ picked: state.picked, planet: state.planet, stats: state.stats, chapter: state.chapter });
    function showScreen(id) {
      document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
      $(id).classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    function selectMode(mode) {
      state.mode = mode;
      $("soloMode").classList.toggle("selected", mode === "solo");
      $("teamMode").classList.toggle("selected", mode === "team");
      $("teamName").classList.toggle("hidden", mode !== "team");
      renderRoleGrid();
    }
    function renderRoleGrid() {
      $("roleGrid").innerHTML = ROLE_IDS.map((id) => {
        const r = ROLES[id];
        const sel = state.picked.includes(id);
        const full = !sel && state.picked.length >= 4;
        return `
        <div class="role-card ${sel ? "selected" : ""} ${full ? "disabled" : ""}" data-role="${id}" tabindex="0" role="button" aria-pressed="${sel}">
          <span class="check">✓</span>
          <div class="rc-top"><div class="rc-icon">${r.icon}</div><div><b>${r.name}</b><small>${r.tagline}</small></div></div>
          <div class="trait plus"><i>▲</i>${r.strong}</div>
          <div class="trait minus"><i>▼</i>${r.weak}</div>
          ${state.mode === "team" && sel ? `<input class="rc-name" data-name="${id}" value="${state.names[id]}" maxlength="20" placeholder="${tr("player")}">` : ""}
        </div>`;
      }).join("");
      const n = state.picked.length;
      $("roleCounter").innerHTML = `<b>${n}</b>/4`;
      $("roleDots").innerHTML = [0, 1, 2, 3].map((i) => `<i class="${i < n ? "on" : ""}">${state.picked[i] ? ROLES[state.picked[i]].icon : ""}</i>`).join("");
      $("toPlanet").disabled = n < 3;
    }
    function toggleRole(id) {
      const i = state.picked.indexOf(id);
      if (i >= 0)
        state.picked.splice(i, 1);
      else if (state.picked.length < 4)
        state.picked.push(id);
      else
        return;
      sfx.click();
      renderRoleGrid();
    }
    function affinity(p) {
      const hit = p.rec.filter((r) => state.picked.includes(r)).length;
      return { hit, total: p.rec.length, ratio: hit / p.rec.length };
    }
    const difStars = (d) => `<span class="stars-dif">${"★".repeat(d)}<i>${"★".repeat(5 - d)}</i></span>`;
    function renderPlanetGrid() {
      $("planetGrid").innerHTML = PLANETS.map((p) => {
        const sel = state.planet?.id === p.id;
        const a = affinity(p);
        return `
        <button class="planet-card ${sel ? "selected" : ""}" data-planet="${p.id}" style="--c1:${p.c1}">
          <span class="orb"><img src="${p.img}" alt="${p.name}" loading="lazy" width="160" height="160"></span>
          <b>${p.name}</b>
          ${difStars(p.dif)}
          <span class="aff ${a.ratio >= 0.67 ? "hi" : a.ratio >= 0.34 ? "mid" : "lo"}">${a.hit}/${a.total} ${tr("rolesWord")}</span>
        </button>`;
      }).join("");
      renderPlanetDetail();
    }
    function renderPlanetDetail() {
      const box = $("planetDetail");
      const p = state.planet;
      if (!p) {
        box.innerHTML = `<div class="detail-empty"><span>\uD83E\uDE90</span><p>${tr("tapWorld")}</p></div>`;
        return;
      }
      const photos = [p.img, ...(p.gallery ?? [p.geoImg])];
      const cur = photos[state.photo ?? 1] ?? p.geoImg;
      box.innerHTML = `
      <div class="geo-hero ${cur === p.img ? "is-orb" : ""}"><img id="geoMain" src="${cur}" alt="${p.name}" width="1536" height="864"><span class="geo-tag">${tr("photos")} · ${photos.length}</span>
        <div class="geo-title"><h3>${p.name.toUpperCase()}</h3><small>${p.tag}</small></div></div>
      <div class="geo-thumbs">${photos.map((src, i) => `<button type="button" class="geo-thumb ${src === cur ? "on" : ""} ${i === 0 ? "orb-thumb" : ""}" data-photo="${i}" aria-label="Foto ${i + 1}"><img src="${src}" alt="" loading="lazy" width="160" height="90"></button>`).join("")}</div>
      <div class="detail-body">
        <div class="detail-stats">
          <div><span>${tr("travel")}</span><b>${p.dist} ${tr("days")}</b></div>
          <div><span>${tr("difficulty")}</span><b>${difStars(p.dif)}</b></div>
          <div><span>${tr("affinity")}</span><b>${affinity(p).hit}/${p.rec.length}</b></div>
        </div>
        <div class="chip-row geo">${p.geology.map((g) => `<span>◆ ${g}</span>`).join("")}</div>
        <div class="chip-row risk">${p.risks.map((r) => `<span>⚠ ${r}</span>`).join("")}</div>
        <div class="chip-row rec">${p.rec.map((r) => `<span class="${state.picked.includes(r) ? "on" : ""}">${ROLES[r].icon} ${ROLES[r].short}</span>`).join("")}</div>
      </div>`;
    }
    function startMission() {
      const planet = state.planet;
      state.mission = $("missionName").value.trim() || "Proyecto Horizonte";
      state.teamName = $("teamName").value.trim() || "Tripulación Orión";
      state.crew = state.picked.map((id) => ({ ...ROLES[id], player: state.mode === "team" ? state.names[id] || DEFAULT_NAMES[id] : ROLES[id].short }));
      state.stats = startStats(state.picked, planet);
      Object.assign(state, { chapter: 0, queue: [], idx: 0, used: new Set, skill: {}, nospec: {}, wins: 0, total: 0, abort: null, waiting: false, crit: {}, xp: 0, shownXp: 0, streak: 0, bestStreak: 0 });
      $("missionTitle").textContent = state.mission.toUpperCase();
      $("missionPlanet").innerHTML = `<img src="${planet.img}" alt="" width="40" height="40"> ${planet.name.toUpperCase()}`;
      renderXp();
      renderStreak();
      showScreen("game");
      renderCrew(null);
      renderStats();
      startChapter();
    }
    function buildQueue(ph) {
      const p = String(ph);
      const ok = (e) => e.ph.includes(p) && !state.used.has(e.id);
      const roleEvs = shuffle(ROLE_EVENTS.filter((e) => ok(e) && e.role && state.picked.includes(e.role)));
      const planEvs = shuffle((PLANET_EVENTS[state.planet.id] ?? []).filter(ok));
      const gens = shuffle(GEN.filter(ok));
      const list = [];
      planEvs.slice(0, ph === 3 ? 2 : 1).forEach((e) => list.push(e));
      if (roleEvs[0])
        list.push(roleEvs[0]);
      if (roleEvs[1] && ph >= 2 && Math.random() < 0.5)
        list.push(roleEvs[1]);
      while (list.length < PER_CHAPTER && gens.length)
        list.push(gens.shift());
      const rest = shuffle([...roleEvs.slice(2), ...planEvs.slice(2)]);
      while (list.length < PER_CHAPTER && rest.length)
        list.push(rest.shift());
      const final = shuffle(list).slice(0, PER_CHAPTER);
      final.forEach((e) => state.used.add(e.id));
      return final;
    }
    const dayFor = (ph) => {
      const d = state.planet.dist;
      return [1, 3, 3 + Math.ceil(d / 2), d + 4, d + 10][ph] ?? 1;
    };
    function startChapter() {
      state.queue = buildQueue(state.chapter);
      state.idx = 0;
      state.crit = {};
      const bonus = chapterBonus(state.picked);
      if (state.chapter > 0 && Object.keys(bonus).length)
        applyEffects(bonus);
      const c = CHAPTERS[state.chapter];
      const name = state.chapter === 3 ? state.planet.name.toUpperCase() : c.name;
      $("bannerKicker").textContent = `${tr("chapter")} ${pad2(state.chapter + 1)}`;
      $("bannerTitle").textContent = name;
      $("bannerSub").textContent = c.sub;
      const b = $("banner");
      b.classList.remove("show");
      b.offsetWidth;
      b.classList.add("show");
      bg.setAlert(state.chapter === 2);
      if (state.chapter === 1 || state.chapter === 2)
        bg.burst(state.chapter === 2 ? 10 : 5);
      sfx.whoosh();
      renderChapterBar();
      showEvent();
    }
    const fill = (txt) => T(txt).replace(/\{p\}/g, state.planet.name).replace(/\{h\}/g, state.planet.hazard);
    function pickResponsible(e) {
      if (e.role) {
        const r = state.crew.find((c) => c.id === e.role);
        if (r)
          return r;
      }
      const cands = state.crew.filter((c) => e.c.some((ch) => ch.skill === c.id));
      return pick(cands.length ? cands : state.crew);
    }
    function renderChapterBar() {
      const done = state.chapter * PER_CHAPTER + state.idx;
      $("chapterSegs").innerHTML = CHAPTERS.map((c, i) => {
        const cls = i < state.chapter ? "done" : i === state.chapter ? "now" : "";
        const inner = i === state.chapter ? `<i style="width:${state.idx / PER_CHAPTER * 100}%"></i>` : "";
        return `<span class="seg ${cls}" title="${c.name}">${inner}</span>`;
      }).join("");
      $("chapterCount").textContent = `${pad2(done + 1)} / ${CHAPTERS.length * PER_CHAPTER}`;
    }
    function showEvent() {
      const s = state.stats;
      if (s.energy < 25 && !state.crit.e) {
        state.crit.e = true;
        state.queue.splice(state.idx, 0, CRIT_E);
      } else if (s.trust < 25 && !state.crit.t) {
        state.crit.t = true;
        state.queue.splice(state.idx, 0, CRIT_T);
      }
      const e = state.queue[state.idx];
      state.current = e;
      state.waiting = false;
      state.circ = Math.random() < 0.6 ? pick(CIRC) : null;
      const who = pickResponsible(e);
      state.responsible = who;
      const c = CHAPTERS[state.chapter];
      const planet = state.planet;
      renderChapterBar();
      const img = $("storyImg");
      const gal = planet.gallery ?? [planet.geoImg];
      const src = c.img ?? gal[state.idx % gal.length];
      if (img.getAttribute("src") !== src)
        img.src = src;
      const wrap = $("storyImage");
      wrap.classList.remove("kb");
      wrap.offsetWidth;
      wrap.classList.add("kb");
      wrap.classList.toggle("alert", state.chapter === 2);
      $("imageStamp").textContent = `${c.type} · ${tr("day")} ${pad2(dayFor(state.chapter) + state.idx)}`;
      $("storyTitle").textContent = fill(e.title);
      $("storyText").textContent = fill(e.text);
      $("roleTurn").innerHTML = state.mode === "team" ? `<b>${who.icon}</b> ${tr("turnOf")} ${who.player.toUpperCase()}` : `<b>${who.icon}</b> ${who.name.toUpperCase()}`;
      const tag = $("circTag");
      if (state.circ) {
        tag.textContent = `${state.circ.d > 0 ? "▲" : "▼"} ${T(state.circ.label).toUpperCase()}`;
        tag.className = "circ-tag " + (state.circ.d > 0 ? "good" : "bad");
      } else
        tag.className = "circ-tag hidden";
      $("choices").innerHTML = e.c.map((ch, i) => {
        const has = state.picked.includes(ch.skill);
        return `
        <button class="choice r${ch.risk}" data-choice="${i}" title="${T(ch.desc)}">
          <span class="key">${i + 1}</span>
          <b>${fill(ch.t)}</b>
          <small class="choice-desc">${fill(ch.desc)}</small>
          <div class="choice-meta">
            <span class="chip ${has ? "ok" : "no"}">${ROLES[ch.skill].icon} ${has ? "" : tr("without") + " "}${ROLES[ch.skill].short.toUpperCase()}</span>
            <span class="chip risk">${RISK_LABEL[ch.risk]}</span>
          </div>
        </button>`;
      }).join("");
      $("result").className = "result";
      $("storyCard").classList.remove("shake", "glow");
      $("storyCard").classList.add("enter");
      later(() => $("storyCard").classList.remove("enter"), 450);
      renderCrew(who.id);
    }
    function applyEffects(eff) {
      const before = { ...state.stats };
      Object.entries(eff).forEach(([k, v]) => {
        state.stats[k] = clamp3(state.stats[k] + v, 0, 100);
      });
      const deltas = {};
      Object.keys(state.stats).forEach((k) => {
        deltas[k] = state.stats[k] - before[k];
      });
      renderStats(deltas);
      return deltas;
    }
    function burst(x, y, win) {
      const layer = $("fx");
      const n = win ? 26 : 12;
      for (let i = 0;i < n; i++) {
        const p = document.createElement("i");
        p.className = "spark " + (win ? i % 3 === 0 ? "c2" : "c1" : "c3");
        const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * (win ? 160 : 80);
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.setProperty("--dx", `${Math.cos(a) * d}px`);
        p.style.setProperty("--dy", `${Math.sin(a) * d}px`);
        layer.appendChild(p);
        later(() => p.remove(), 900);
      }
    }
    function chooseOption(index) {
      if (state.waiting || !state.current)
        return;
      const e = state.current;
      const ch = e.c[index];
      if (!ch)
        return;
      state.waiting = true;
      const has = state.picked.includes(ch.skill);
      const success = Math.random() < chance(ch, ctx(), state.circ);
      const deltas = applyEffects(outcomeEffects(ch, e, ctx(), success));
      const sk = state.skill[ch.skill] = state.skill[ch.skill] ?? { n: 0, ok: 0 };
      sk.n++;
      if (success)
        sk.ok++;
      if (!has)
        state.nospec[ch.skill] = (state.nospec[ch.skill] ?? 0) + 1;
      state.total++;
      let pts = 0;
      if (success) {
        state.wins++;
        pts = pointsFor(ch.risk, state.streak);
        state.streak++;
        state.bestStreak = Math.max(state.bestStreak, state.streak);
        state.xp += pts;
      } else
        state.streak = 0;
      renderXp();
      renderStreak();
      document.querySelectorAll("#choices .choice").forEach((b, i) => {
        b.disabled = true;
        b.classList.add(...i === index ? ["picked", success ? "win" : "fail"] : ["dim"]);
      });
      const btn = document.querySelector(`#choices .choice[data-choice="${index}"]`);
      if (btn) {
        const r = btn.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, success);
      }
      const word = success ? has ? pick(WIN_LINES) : pick(LUCK_LINES) : pick(FAIL_LINES);
      const chips = Object.entries(deltas).filter(([, v]) => v !== 0).map(([k, v]) => `<span class="delta ${v > 0 ? "up" : "down"}">${STAT[k].icon} ${v > 0 ? "+" : ""}${v}</span>`).join("");
      const s = state.stats;
      if (s.energy <= 0)
        state.abort = tr("abortEnergy");
      else if (s.trust <= 0)
        state.abort = tr("abortTrust");
      else if (s.budget <= 0)
        state.abort = tr("abortBudget");
      const res = $("result");
      res.innerHTML = `
      <div class="result-word">${word}</div>
      ${success ? `<div class="result-pts">+${pts} XP${state.streak >= 2 ? ` <em>\uD83D\uDD25 x${state.streak}</em>` : ""}</div>` : `<div class="result-pts">${has ? tr("streakLost") : tr("missed", { r: ROLES[ch.skill].name })}</div>`}
      <div class="deltas">${chips}</div>
      <div class="result-bar"><i></i></div>
      <small>${state.abort ? tr("lostTap") : tr("tapNext")}</small>`;
      res.className = "result show " + (success ? "win" : "fail");
      $("storyCard").classList.remove("shake", "glow");
      $("storyCard").offsetWidth;
      $("storyCard").classList.add(success ? "glow" : "shake");
      if (success)
        sfx.win(state.streak);
      else
        sfx.fail();
      if (!success) {
        document.body.classList.add("hit");
        later(() => document.body.classList.remove("hit"), 400);
      }
      state.autoNext = later(nextEvent, state.abort ? 2600 : 1700);
    }
    function nextEvent() {
      if (!state.waiting)
        return;
      if (state.autoNext) {
        clearTimeout(state.autoNext);
        timers.delete(state.autoNext);
        state.autoNext = 0;
      }
      state.waiting = false;
      if (state.abort) {
        finishMission();
        return;
      }
      state.idx++;
      if (state.idx >= state.queue.length) {
        state.chapter++;
        if (state.chapter >= CHAPTERS.length) {
          finishMission();
          return;
        }
        startChapter();
        return;
      }
      showEvent();
    }
    function renderStats(deltas) {
      $("stats").innerHTML = Object.entries(STAT).map(([key, info]) => {
        const v = state.stats[key];
        const d = deltas ? deltas[key] : 0;
        return `
        <div class="stat ${v < 30 ? "low" : ""} ${d > 0 ? "up" : d < 0 ? "down" : ""}">
          <div class="stat-top"><span>${info.icon} ${info.label}</span><b>${v}</b>${d ? `<em>${d > 0 ? "+" : ""}${d}</em>` : ""}</div>
          <div class="stat-track"><i style="width:${v}%"></i></div>
        </div>`;
      }).join("");
    }
    function renderXp() {
      const el = $("xp");
      const { shownXp: from, xp: to } = state, t0 = performance.now();
      if (from === to) {
        el.textContent = String(to);
        return;
      }
      el.classList.remove("pop");
      el.offsetWidth;
      el.classList.add("pop");
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 600);
        el.textContent = String(Math.round(from + (to - from) * k));
        if (k < 1 && !ac.signal.aborted)
          requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      state.shownXp = to;
    }
    function renderStreak() {
      const el = $("streak");
      el.textContent = `\uD83D\uDD25 ${state.streak}`;
      el.classList.toggle("hot", state.streak >= 3);
      el.classList.toggle("off", state.streak === 0);
    }
    function renderCrew(activeId) {
      $("crewStatus").innerHTML = state.crew.map((p) => `
      <div class="crew-person ${p.id === activeId ? "active" : ""}" title="▲ ${p.strong} · ▼ ${p.weak}">
        <div class="crew-avatar">${p.icon}</div>
        <div><b>${p.player}</b><small>${p.name}</small></div>
      </div>`).join("");
    }
    function finishMission() {
      bg.setAlert(false);
      const values = Object.values(state.stats);
      const average = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      const p = state.planet;
      const score = clamp3(average + p.dif * 2, 0, 100);
      const rate = state.total ? Math.round(state.wins / state.total * 100) : 0;
      let title, icon, text, stars;
      if (state.abort) {
        title = tr("lost");
        icon = "\uD83D\uDCA5";
        text = state.abort;
        stars = 0;
      } else if (score >= 75) {
        title = tr("legend");
        icon = "\uD83C\uDFC6";
        text = p.outro;
        stars = 3;
      } else if (score >= 58) {
        title = tr("done");
        icon = "\uD83D\uDE80";
        text = tr("doneText", { p: p.name });
        stars = 2;
      } else {
        title = tr("barely");
        icon = "\uD83D\uDEF0️";
        text = tr("barelyText", { p: p.name });
        stars = 1;
      }
      const worst = Object.entries(state.nospec).sort((a, b) => b[1] - a[1])[0];
      let tip = "";
      if (worst && worst[1] >= 2)
        tip = tr("tipMissing", { r: ROLES[worst[0]].name, n: worst[1] });
      else if (affinity(p).ratio < 0.5)
        tip = tr("tipCover", { a: affinity(p).hit, b: affinity(p).total, p: p.name });
      else if (rate >= 70)
        tip = tr("tipGood");
      else
        tip = tr("tipSafe");
      const best = saveResult(state.xp, title);
      $("endingIcon").textContent = icon;
      $("endingTitle").textContent = title;
      $("endingText").textContent = text;
      $("endingStars").innerHTML = [0, 1, 2].map((i) => `<i class="${i < stars ? "on" : ""}" style="--d:${0.3 + i * 0.25}s">★</i>`).join("");
      $("lesson").textContent = `\uD83D\uDCA1 ${tip}`;
      $("endingRecord").textContent = state.xp >= best && state.xp > 0 ? tr("newRecord") : tr("record", { n: best });
      $("endingRecord").classList.toggle("new", state.xp >= best && state.xp > 0);
      $("endingMeta").innerHTML = `
      <span><i>${tr("hits")}</i><b>${state.wins}/${state.total}</b></span>
      <span><i>${tr("bestStreak")}</i><b>\uD83D\uDD25 ${state.bestStreak}</b></span>
      <span><i>${tr("missionWord")}</i><b>${score}/100</b></span>`;
      $("finalStats").innerHTML = Object.entries(STAT).map(([k, info]) => `<div class="final-stat"><b>${state.stats[k]}</b><small>${info.icon} ${info.label}</small></div>`).join("");
      $("perf").innerHTML = state.crew.map((c) => {
        const s = state.skill[c.id] ?? { n: 0, ok: 0 };
        const pct = s.n ? Math.round(s.ok / s.n * 100) : 0;
        return `<div class="perf-row"><span>${c.icon} ${state.mode === "team" ? c.player + " · " : ""}${c.short}</span><div class="perf-bar"><i style="width:${pct}%"></i></div><b>${s.ok}/${s.n}</b></div>`;
      }).join("");
      showScreen("ending");
      $("endingHero").style.setProperty("--bgimg", `url(${p.geoImg})`);
      countUp($("endingXp"), state.xp);
      if (stars >= 2) {
        sfx.fanfare();
        bg.burst(12);
      } else
        sfx.fail();
    }
    function countUp(el, to) {
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 1400);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1 && !ac.signal.aborted)
          requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    function readResults() {
      try {
        return JSON.parse(localStorage.getItem("spaceMissionResults") || "[]");
      } catch {
        return [];
      }
    }
    function saveResult(xp, result) {
      const prev = readResults();
      const best = Math.max(xp, ...prev.map((r) => Number(r.score) || 0));
      try {
        prev.unshift({ mission: state.mission, team: state.teamName, planet: state.planet.name, roles: state.picked, score: xp, result, date: new Date().toLocaleDateString("es-AR") });
        localStorage.setItem("spaceMissionResults", JSON.stringify(prev.slice(0, 10)));
      } catch {}
      return best;
    }
    function renderBest() {
      const best = Math.max(0, ...readResults().map((r) => Number(r.score) || 0));
      $("bestScore").textContent = best ? tr("record", { n: best }) : tr("noRecord");
    }
    const goRoles = () => {
      sfx.click();
      renderRoleGrid();
      showScreen("roles");
    };
    on($("newGame"), "click", goRoles);
    on($("replayIntro"), "click", () => playIntro());
    on($("skipIntro"), "click", (e) => {
      e.stopPropagation();
      stopCinematic();
    });
    on($("intro"), "click", () => stopCinematic());
    on($("soloMode"), "click", () => {
      sfx.click();
      selectMode("solo");
    });
    on($("teamMode"), "click", () => {
      sfx.click();
      selectMode("team");
    });
    on($("backHome"), "click", () => showScreen("welcome"));
    on($("randomCrew"), "click", () => {
      state.picked = shuffle(ROLE_IDS).slice(0, 4);
      sfx.whoosh();
      renderRoleGrid();
    });
    on($("roleGrid"), "click", (e) => {
      const t = e.target;
      if (t.closest(".rc-name"))
        return;
      const card = t.closest(".role-card");
      if (card)
        toggleRole(card.dataset["role"]);
    });
    on($("roleGrid"), "keydown", (e) => {
      const t = e.target;
      if ((e.key === "Enter" || e.key === " ") && t.classList.contains("role-card")) {
        e.preventDefault();
        toggleRole(t.dataset["role"]);
      }
    });
    on($("roleGrid"), "input", (e) => {
      const t = e.target;
      if (t.classList.contains("rc-name"))
        state.names[t.dataset["name"]] = t.value.trim();
    });
    on($("toPlanet"), "click", () => {
      sfx.click();
      renderPlanetGrid();
      $("launchMission").disabled = !state.planet;
      showScreen("planet");
    });
    on($("backToRoles"), "click", () => {
      renderRoleGrid();
      showScreen("roles");
    });
    on($("planetGrid"), "click", (e) => {
      const card = e.target.closest(".planet-card");
      if (!card)
        return;
      state.planet = planetById(card.dataset["planet"] ?? "") ?? null;
      state.photo = 1;
      $("launchMission").disabled = !state.planet;
      sfx.click();
      renderPlanetGrid();
    });
    on($("launchMission"), "click", () => {
      if (state.planet)
        playLaunch(state.planet, startMission);
    });
    on($("choices"), "click", (e) => {
      const btn = e.target.closest(".choice");
      if (btn)
        chooseOption(Number(btn.dataset["choice"]));
    });
    on($("result"), "click", () => nextEvent());
    on($("planetDetail"), "click", (e) => {
      const th = e.target.closest(".geo-thumb");
      if (!th || !state.planet) return;
      state.photo = Number(th.dataset["photo"] ?? 1);
      sfx.click();
      renderPlanetDetail();
    });
    on($("playAgain"), "click", () => {
      state.picked = [];
      state.planet = null;
      renderRoleGrid();
      showScreen("roles");
    });
    on($("home"), "click", () => {
      renderBest();
      showScreen("welcome");
    });
    const muteBtn = $("muteBtn");
    const renderMute = () => {
      muteBtn.textContent = isMuted() ? "\uD83D\uDD07" : "\uD83D\uDD0A";
      muteBtn.setAttribute("aria-label", isMuted() ? tr("unmute") : tr("mute"));
    };
    on(muteBtn, "click", () => {
      setMuted(!isMuted());
      renderMute();
      sfx.click();
    });
    on(document, "keydown", (e) => {
      if (cinematicRunning()) {
        if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          stopCinematic();
        }
        return;
      }
      if (!$("game").classList.contains("active"))
        return;
      if (e.target.tagName === "INPUT")
        return;
      if (state.waiting) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          nextEvent();
        }
        return;
      }
      const map = { "1": 0, "2": 1, "3": 2, a: 0, b: 1, c: 2 };
      const i = map[e.key.toLowerCase()];
      if (i !== undefined)
        chooseOption(i);
    });
    function renderKicker() {
      $("heroKicker").innerHTML = tr("heroKicker", { n: `<span id="decisionCount">+${Math.floor(DECISION_COUNT / 100) * 100}</span>` });
    }
    const setLang = (l) => {
      applyLang(l);
      renderKicker();
      renderBest();
      renderMute();
      state.crew.forEach((c) => {
        Object.assign(c, ROLES[c.id]);
        if (state.mode !== "team")
          c.player = ROLES[c.id].short;
      });
      if ($("roles").classList.contains("active"))
        renderRoleGrid();
      if ($("planet").classList.contains("active"))
        renderPlanetGrid();
      if ($("game").classList.contains("active")) {
        renderStats();
        renderCrew(state.responsible ? state.responsible.id : null);
      }
    };
    on($("langEs"), "click", () => setLang("es"));
    on($("langEn"), "click", () => setLang("en"));
    applyLang(LANG);
    renderKicker();
    loadMuted();
    renderMute();
    $("decisionCount").textContent = "+" + Math.floor(DECISION_COUNT / 100) * 100;
    renderBest();
    selectMode("solo");
    const heroImg = document.querySelector(".hero-planet");
    const heroName = document.getElementById("heroPlanetName");
    let heroIdx = PLANETS.findIndex((x) => x.id === "marte");
    PLANETS.forEach((x) => { const im = new Image(); im.src = x.img; });
    const heroTimer = setInterval(() => {
      if (!heroImg || !$("welcome").classList.contains("active")) return;
      heroIdx = (heroIdx + 1) % PLANETS.length;
      const pl = PLANETS[heroIdx];
      heroImg.classList.add("swap");
      setTimeout(() => {
        heroImg.src = pl.img;
        heroImg.alt = pl.name;
        if (heroName) heroName.textContent = pl.name.toUpperCase();
        document.querySelector(".planet-glow")?.style.setProperty("--glow", pl.c1);
        heroImg.classList.remove("swap");
      }, 650);
    }, 4200);
    // los navegadores exigen una interacción antes de reproducir audio: la música arranca con el primer toque o tecla
    const startMusic = () => music.start();
    on(document, "pointerdown", startMusic);
    on(document, "keydown", startMusic);
    playIntro();
    return () => {
      music.stop();
      ac.abort();
      timers.forEach((id) => clearTimeout(id));
      bg.stop();
      clearInterval(heroTimer);
      stopCinematic();
    };
  }

  // src/__export_entry.ts
  document.addEventListener("DOMContentLoaded", () => initGame());
})();