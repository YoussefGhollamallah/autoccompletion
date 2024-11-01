document.addEventListener('DOMContentLoaded', function() {
    let timeout;

    const searchKeywords = async () => {
        const results = document.getElementById("results");
        const search = document.getElementById("search").value;

        if (search.trim().length < 1) {
            results.innerHTML = "";
            results.style.display = "none";
            return;
        }

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(async () => {
            try {
                const response = await fetch(`config/search.php?search=${encodeURIComponent(search)}`);
                
                if (!response.ok) throw new Error("Erreur dans la réponse du serveur");
                
                const textData = await response.text();
                const data = textData.split('\n').filter(item => item.trim() !== '');

                results.innerHTML = "";
                results.style.display = "block";

                if (data.length === 0) {
                    results.innerHTML = "<li>Aucun pokémon trouvé</li>";
                    return;
                }

                data.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    results.appendChild(li);
                });
            } catch (error) {
                results.innerHTML = "";
                results.style.display = "none";
            }
        }, 500);
    };

    document.getElementById("search").addEventListener("input", (e) => {
        const search = e.target.value;
        if (search.trim().length < 1) {
            const results = document.getElementById("results");
            results.innerHTML = "";
            results.style.display = "none";
        } else {
            searchKeywords();
        }
    });

    document.getElementById("results").addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            document.getElementById("search").value = e.target.innerText;
            document.getElementById("results").innerHTML = "";
            document.getElementById("results").style.display = "none";
        }
    });

    // Masquer les résultats si l'utilisateur clique en dehors de la zone de recherche
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".search-container").contains(e.target)) {
            document.getElementById("results").innerHTML = "";
            document.getElementById("results").style.display = "none";
        }
    });
});