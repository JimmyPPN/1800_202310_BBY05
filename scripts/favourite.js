// Get favorites from localStorage or set an empty array
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Function to update the favorites list
const updateFavoritesList = () => {
    const favoritesList = document.getElementById("favorites-list");

    // Clear the list first
    favoritesList.innerHTML = "";

    // Add each favorite to the list
    favorites.forEach((city) => {
        const li = document.createElement("li");
        li.className = "list-group-item ";
        li.style.height = "10em";
        li.style.cursor = "pointer";

        // Add the city name as a span element
        const citySpan = document.createElement("span");
        citySpan.textContent = city;
        citySpan.style.fontWeight = "bold";
        citySpan.style.fontSize = "1.5em";
        citySpan.addEventListener("click", () => {
            window.location.href = `main.html?city=${city}`;
        });
        li.appendChild(citySpan);

        // Add remove button to each favorite
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "btn btn-secondary";
        removeBtn.style.float = "right";
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener("click", () => {
            // Remove the city from favorites
            const index = favorites.indexOf(city);
            if (index > -1) {
                favorites.splice(index, 1);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                updateFavoritesList();
            }
        });
        li.appendChild(removeBtn);

        favoritesList.appendChild(li);
    });
};

updateFavoritesList();