// Injects the navbar, and footer into the HTML doc

function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            console.log($('#nav').load('text/nav_after_login.html'));
            console.log($('#foot').load('text/footer.html'));
            var script = document.createElement('script');
            script.setAttribute('src', 'scripts/api.js');
            document.head.appendChild(script);
        } else {
            // No user is signed in.
            console.log($('#nav').load('text/nav_before_login.html'));
            console.log($('#foot').load('text/footer_before_login.html'));
        }
    });
}
loadSkeleton(); //invoke the function


