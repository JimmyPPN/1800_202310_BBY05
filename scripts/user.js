var currentUser;          //put this right after you start script tag before writing any functions.

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {

        if (user) {

            currentUser = db.collection("users").doc(user.uid)

            currentUser.get()
                .then(userDoc => {

                    var userName = userDoc.data().name;
                    var userCountry = userDoc.data().country;
                    var userCity = userDoc.data().city;
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCountry != null) {
                        document.getElementById("countryInput").value = userCountry;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            console.log("No user is signed in");
        }
    });
}
populateUserInfo();

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}
function saveUserInfo() {
    userName = document.getElementById('nameInput').value;
    userCountry = document.getElementById('countryInput').value;
    userCity = document.getElementById('cityInput').value;
    currentUser.update({
        name: userName,
        country: userCountry,
        city: userCity
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('personalInfoFields').disabled = true;
}



