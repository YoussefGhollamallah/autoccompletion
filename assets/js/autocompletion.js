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
                const data = textData.split('\n').filter(item => item.trim() !== '');

                results.innerHTML = "";
                results.style.display = "block";

                // Afficher les résultats actuels
                if (data.length > 0) {
                    data.forEach(item => {
                        const li = document.createElement("li");
                        li.textContent = item;
                        results.appendChild(li);
                    });
                } else {
                    results.innerHTML = "<li>Aucun pokémon trouvé</li>";
                    return;
                }

                // Ajouter les résultats précédents après un séparateur uniquement si l'utilisateur a sélectionné un élément
                const previousSearches = loadPreviousSearches();
                if (previousSearches.length > 0) {
                    results.innerHTML += "<li class='separator'>Anciennes recherches :</li>"; // Séparateur
                    previousSearches.forEach(item => {
                        const li = document.createElement("li");
                        li.textContent = item;
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

    // Événement de clic sur les résultats
    results.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            const selectedItem = e.target.innerText;
            searchInput.value = selectedItem;
            results.innerHTML = "";
            results.style.display = "none";

            // Ajouter la recherche actuelle aux recherches précédentes
            savePreviousSearch(selectedItem);
        }
    });

    // Masquer les résultats si l'utilisateur clique en dehors de la zone de recherche
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".search-container").contains(e.target)) {
            results.innerHTML = "";
            results.style.display = "none";
        }
    });
    
    // Charger les recherches précédentes au chargement de la page
    const previousSearches = loadPreviousSearches();
    if (previousSearches.length > 0) {
        results.innerHTML += "<li class='separator'>Anciennes recherches :</li>";
        previousSearches.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            results.appendChild(li);
        });
    }
});
