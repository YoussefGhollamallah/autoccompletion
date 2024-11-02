document.addEventListener('DOMContentLoaded', function() {
    let timeout;
    const results = document.getElementById("results");
    const searchInput = document.getElementById("search");

    // Charger les recherches précédentes depuis localStorage
    const loadPreviousSearches = () => {
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
        return previousSearches;
    };

    // Enregistrer les recherches précédentes dans localStorage
    const savePreviousSearch = (search) => {
        const previousSearches = loadPreviousSearches();
        if (!previousSearches.includes(search)) {
            previousSearches.push(search);
            localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
        }
    };

    const searchKeywords = async () => {
        const search = searchInput.value;

        if (search.trim().length < 2) {
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
                const [pokemonData, previousSearchesData] = textData.split('---PREVIOUS_SEARCHES---');
                const data = pokemonData.split('\n').filter(item => item.trim() !== '');
                const previousSearchesList = previousSearchesData.split('\n').filter(item => item.trim() !== '');

                results.innerHTML = "";
                results.style.display = "block";

                // Afficher les résultats actuels
                if (data.length > 0) {
                    data.forEach(item => {
                        const [id, name] = item.split('|');
                        const li = document.createElement("li");
                        const a = document.createElement("a");
                        a.href = `detail.php?id=${id}`;
                        a.textContent = name;
                        li.appendChild(a);
                        results.appendChild(li);
                    });
                } else {
                    results.innerHTML = "<li>Aucun pokémon trouvé</li>";
                }

                // Ajouter les résultats précédents après un séparateur uniquement si l'utilisateur a sélectionné un élément
                if (previousSearchesList.length > 0) {
                    results.innerHTML += "<li class='separator'>Anciennes recherches :</li>"; // Séparateur
                    previousSearchesList.forEach(item => {
                        const [id, name] = item.split('|');
                        const li = document.createElement("li");
                        const a = document.createElement("a");
                        a.href = `detail.php?id=${id}`;
                        a.textContent = name;
                        li.appendChild(a);
                        results.appendChild(li);
                    });
                }

            } catch (error) {
                results.innerHTML = "";
                results.style.display = "none";
            }
        }, 500);
    };

    // Événement d'entrée pour le champ de recherche
    searchInput.addEventListener("input", (e) => {
        const search = e.target.value;
        if (search.trim().length < 1) {
            results.innerHTML = "";
            results.style.display = "none";
        } else {
            searchKeywords();
        }
    });

    // Enregistrer les recherches cliquées dans le localStorage
    results.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            const search = e.target.textContent;
            savePreviousSearch(search);

            // Enregistrer la recherche dans la session
            fetch(`config/save_search.php?search=${encodeURIComponent(search)}`);
        }
    });

    // Masquer les résultats si l'utilisateur clique en dehors de la zone de recherche
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".search-container").contains(e.target)) {
            results.innerHTML = "";
            results.style.display = "none";
        }
    });
});
