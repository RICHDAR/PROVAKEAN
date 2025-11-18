async function loadResults() {
    const container = document.getElementById("risultati-dinamici");
    if (!container) return;

    let vittorie = 0;
    let pareggi = 0;
    let sconfitte = 0;
    let golFatti = 0;

    try {
        const indexResponse = await fetch("data/risultati/index.json");
        if (!indexResponse.ok) {
            container.innerHTML = "<p style='color:white;'>Nessun risultato disponibile.</p>";
            return;
        }

        const files = await indexResponse.json();
        container.innerHTML = "";

        for (const file of files) {
            const match = await (await fetch(`data/risultati/${file}`)).json();

            const gf = match.gol_casa;
            const gs = match.gol_ospite;

            // STATISTICHE
            golFatti += gf;

            if (match.stile === "pareggio") pareggi++;
            else if (match.stile === "sconfitta") sconfitte++;
            else vittorie++;

            // STILE CARD
            let cardClass = "match-card";
            let badge = "";
            let extra = "";

            switch (match.stile) {
                case "vittoria":
                    badge = `<div class="badge badge-green">VITTORIA</div>`;
                    break;

                case "record":
                    badge = `<div class="badge badge-record">VITTORIA RECORD</div>`;
                    break;

                case "pareggio":
                    badge = `<div class="badge badge-yellow">PAREGGIO</div>`;
                    break;

                case "sconfitta":
                    badge = `<div class="badge badge-red">SCONFITTA</div>`;
                    break;

                case "tavolino":
                    badge = `<div class="badge badge-yellow">TAVOLINO</div>`;
                    extra = `<p class="motivazione"><strong>Motivazione:</strong> ${match.motivazione}</p>`;
                    break;

                case "semifinale":
                    badge = `<div class="badge badge-purple">SEMIFINALE</div>`;
                    break;

                case "finale":
                    badge = `<div class="badge badge-gold">FINALE ORO</div>`;
                    cardClass += " match-gold";
                    break;

                case "gironi":
                    badge = `<div class="badge badge-blue">FASE A GIRONI</div>`;
                    break;

                case "speciale":
                    badge = `<div class="badge badge-purple">PARTITA SPECIALE</div>`;
                    break;
            }

            // HTML DELLA CARD (identica alla tua grafica)
            container.innerHTML += `
                <div class="${cardClass}">
                    <h3 class="match-date">${match.fase} • ${new Date(match.data).toLocaleDateString("it-IT")}</h3>
                    ${badge}

                    <div class="match-info">
                        <div class="team">
                            <img src="${match.logo_casa}" alt="Logo Kean" class="team-logo">
                            <p class="team-name">Kean FC</p>
                        </div>

                        <div class="score">
                            <p>${match.gol_casa} - ${match.gol_ospite}</p>
                        </div>

                        <div class="team">
                            <img src="${match.logo_ospite}" alt="Logo Avversario" class="team-logo">
                            <p class="team-name">${match.avversario || ""}</p>
                        </div>
                    </div>

                    <p class="marcatori"><strong>Marcatori:</strong> ${match.marcatori}</p>
                    ${extra}
                </div>
            `;
        }

        // AGGIORNO STATISTICHE
        document.getElementById("stat-vittorie").innerText = vittorie;
        document.getElementById("stat-pareggi").innerText = pareggi;
        document.getElementById("stat-sconfitte").innerText = sconfitte;
        document.getElementById("stat-golfatti").innerText = golFatti;

    } catch (err) {
        console.error("Errore caricamento risultati:", err);
    }
}

window.onload = loadResults;
