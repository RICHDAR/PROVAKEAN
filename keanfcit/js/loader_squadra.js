async function loadRole(folder, containerId) {
    try {
        const container = document.getElementById(containerId);
        if (!container) return;

        // 1: recupero lista file nel ruolo
        const indexPath = `data/squadra/${folder}/index.json`;

        const indexResponse = await fetch(indexPath);
        if (!indexResponse.ok) {
            container.innerHTML = "<p style='color:white;'>Nessun giocatore inserito.</p>";
            return;
        }

        const files = await indexResponse.json();
        container.innerHTML = "";

        // 2: carico ogni file JSON del ruolo
        for (const f of files) {
            const player = await (await fetch(`data/squadra/${folder}/${f}`)).json();

            container.innerHTML += `
                <div class="player-card">
                    <img src="${player.foto}" class="player-photo">
                    <h2>${player.numero}</h2>
                    <h3>${player.nome}</h3>
                    <p>${player.descrizione}</p>
                </div>
            `;
        }
    } catch (err) {
        console.error(err);
    }
}

window.onload = () => {
    loadRole("portieri", "portieri-dinamici");
    loadRole("difensori", "difensori-dinamici");
    loadRole("centrocampisti", "centrocampisti-dinamici");
    loadRole("attaccanti", "attaccanti-dinamici");
    loadRole("staff", "staff-dinamico");
};
