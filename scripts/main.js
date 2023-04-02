function insertNameFromFirestore() {
  // to check if the user is logged in:
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
      currentUser.get().then((userDoc) => {
        //get the user name
        var userName = userDoc.data().name;
        console.log(userName);
        document.getElementById("name-goes-here").innerText = userName;
      });
    }
  });
}
insertNameFromFirestore();

// to add the city to the favorite list
function addToFavorites(cityName) {
  const location = document.getElementById(cityName).textContent;
  // Save the city to Firestore storage
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const userRef = db.collection("users").doc(currentUser.uid);
    userRef
      .update(
        {
          favorites: firebase.firestore.FieldValue.arrayUnion(location),
        },
        { merge: true }
      )
      .then(() => {
        console.log("City added to favorites: " + location);
        const favoriteIcon = document.getElementById("favorite-" + cityName);
        if (favoriteIcon) {
          favoriteIcon.innerText = "favorite";
        } else {
          console.error("Element not found: favorite-" + cityName);
        }
      })
      .catch((error) => {
        console.error("Error adding city to favorites: ", error);
      });
  } else {
    console.error("User not authenticated");
  }
}

// to make sure favourite icon is filled in when the page is loaded
function updateFavoritesIcon() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userRef = db.collection("users").doc(user.uid);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const favorites = doc.data().favorites;
            const cityNameElement = document.getElementById("cityName");
            const cityName = cityNameElement.textContent.trim();
            favorites.forEach((favCity) => {
              if (favCity === cityName) {
                const favoriteIcon = document.getElementById(
                  "favorite-" + cityNameElement.id
                );
                if (favoriteIcon) {
                  favoriteIcon.innerText = "favorite";
                }
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error getting user favorites: ", error);
        });
    }
  });
}

window.onload = updateFavoritesIcon;
