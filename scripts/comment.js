


var LocationDocID = localStorage.getItem("LocationDocID");    //visible to all functions on this page

function getLocationName(id) {
    db.collection("Locations")
      .doc(id)
      .get()
      .then((thisLocation) => {
        var LocationName = thisLocation.data().name;
        document.getElementById("LocationName").innerHTML = LocationName;
          });
}

getLocationName(LocationDocID);

function writecomment() {
    console.log("inside write comment")
    let Title = document.getElementById("title").value;
    let Level = document.getElementById("level").value;
    let Description = document.getElementById("description").value;
    console.log(Title, Level, Description);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("comments").add({
                        LocationDocID: LocationDocID,
                        userID: userID,
                        title: Title,
                        level: Level,
                        description: Description,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "eachLocation.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'comment.html';
        }
    });
}