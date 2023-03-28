function doAll() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // insertNameFromFirestore();
      getFavorites(user);
    } else {
      console.log("No user is signed in");
    }
  });
}
doAll();

// retrieve the user's favorite cities from firestore
function getFavorites(user) {
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((userDoc) => {
      // Get the array of favorite cities
      const favorites = userDoc.data().favorites || [];

      // Get the pointer to the favorites list element
      const favoritesList = document.getElementById("favorites-list");

      // Clear the list first
      favoritesList.innerHTML = "";

      // Iterate through the array of favorite cities
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
          // Get a reference to the user document in Firestore
          const userRef = db.collection("users").doc(user.uid);
          // Remove the city from favorites in the user document
          userRef
            .update({
              favorites: firebase.firestore.FieldValue.arrayRemove(city),
            })
            .then(() => {
              console.log("City removed from favorites.");
              getFavorites(user);
            })
            .catch((error) => {
              console.error("Error removing city from favorites:", error);
            });
        });
        li.appendChild(removeBtn);
        favoritesList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
