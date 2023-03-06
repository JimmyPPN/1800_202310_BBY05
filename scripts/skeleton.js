
// Injects the navbar, and footer into the HTML doc

function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            console.log($('#nav').load('text/nav_after_login.html'));
            console.log($('#foot').load('text/footer.html'));
        } else {
            // No user is signed in.
            console.log($('#nav').load('text/nav_before_login.html'));
            console.log($('#foot').load('text/footer.html'));
        }
    });
}
loadSkeleton(); //invoke the function


