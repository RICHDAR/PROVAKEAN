async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

/* ===============================
   SQUADRA DINAMICA
================================ */
async function loadSquadra() {
    const container = document.getElementById("squadra-dinamica");
    if (!container) return;

    const files = await loadJSON("data/squadra_index.json");

    container.innerHTML = "";

    for (const file of files) {
        const p = await loadJSON("data/squadra/" + file);

        container.innerHTML += `
            <div class="player-card">
                <img src="${p.foto}" class="player-photo">
                <h2>${p.numero} - ${p.nome}</h2>
                <h3>${p.ruolo}</h3>
                <p>${p.descrizione}</p>
            </div>
        `;
    }
}

/* ===============================
   RISULTATI DINAMICI
================================ */
async function loadRisultati() {
    const container = document.getElementById("risultati-dinamici");
    if (!container) return;

    const files = await loadJSON("data/risultati_index.json");

    container.innerHTML = "";

    for (const file of files) {
        const r = await loadJSON("data/risultati/" + file);

        container.innerHTML += `
            <div class="match-box">
                <h2>${r.competizione}</h2>
                <h3>${r.data}</h3>
                <p><strong>${r.risultato}</strong> vs ${r.avversario}</p>
                <p>${r.descrizione}</p>
            </div>
        `;
    }
}

/* ===============================
   CLUB / CHI SIAMO
================================ */
async function loadClub() {
    const container = document.getElementById("club-dinamico");
    if (!container) return;

    const c = await loadJSON("data/club.json");

    container.innerHTML = `
        <p>${c.p1}</p>
        <p>${c.p2}</p>
        <p>${c.p3}</p>
    `;
}

/* ===============================
   STORICO
================================ */
async function loadStorico() {
    const container = document.getElementById("storico-dinamico");
    if (!container) return;

    const s = await loadJSON("data/storico.json");

    container.innerHTML = `
        <ul>
            <li>Partite giocate: ${s.giocate}</li>
            <li>Vittorie: ${s.vittorie}</li>
            <li>Pareggi: ${s.pareggi}</li>
            <li>Sconfitte: ${s.sconfitte}</li>
            <li>Gol Fatti: ${s.gf}</li>
            <li>Gol Subiti: ${s.gs}</li>
        </ul>
    `;
}

/* ===============================
   HOME PAGE
================================ */
async function loadHome() {
    const t = document.getElementById("home-titolo");
    const st = document.getElementById("home-sub");
    const intro = document.getElementById("home-intro");

    if (!t) return;

    const h = await loadJSON("data/home.json");

    t.innerText = h.title;
    st.innerText = h.subtitle;
    intro.innerText = h.intro_text;
}

/* ===============================
   INIZIALIZZAZIONE
================================ */
window.onload = () => {
    loadSquadra();
    loadRisultati();
    loadClub();
    loadStorico();
    loadHome();
};
