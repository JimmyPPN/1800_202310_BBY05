function displaylocationInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "comments" or "comments"?
    db.collection( "locations" )
        .doc( ID )
        .get()
        .then( doc => {
            thislocation = doc.data();
            locationCode = thislocation.code;
            locationName = doc.data().name;
            
            // only populate title, and image
            document.getElementById( "locationName" ).innerHTML = locationName;
            let imgEvent = document.querySelector( ".location-img" );
            imgEvent.src = "../images/" + locationCode + ".jpg";
        } );
}
displaylocationInfo();

function savelocationDocumentIDAndRedirect(){
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('locationDocID', ID);
    window.location.href = 'comment.html';
}

function populatecomments() {
    let locationCardTemplate = document.getElementById("commentCardTemplate");
    let locationCardGroup = document.getElementById("commentCardGroup");

    let params = new URL(window.location.href) //get the url from the searbar
    let locationID = params.searchParams.get("docID")
    
    // doublecheck: is your collection called "comments" or "comments"?
    db.collection("comments").where( "locationDocID", "==", locationID).get()
        .then(allcomments => {
            comments=allcomments.docs;
            console.log(comments);
            comments.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var level = doc.data().level; //gets the unique ID field
                var season = doc.data().season;
                var description = doc.data().description; //gets the length field
                var flooded = doc.data().flooded;
                var scrambled = doc.data().scrambled;
                var time = doc.data().timestamp.toDate();
                console.log(time)

                let commentCard = locationCardTemplate.content.cloneNode(true);
                commentCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
                commentCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
                commentCard.querySelector('.level').innerHTML = `level: ${level}`;
                commentCard.querySelector('.season').innerHTML = `season: ${season}`;
                commentCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
                commentCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
                commentCard.querySelector('.description').innerHTML = `Description: ${description}`;
                locationCardGroup.appendChild(commentCard);
            })
        })
}
populatecomments();