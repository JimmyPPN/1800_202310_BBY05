// Injects the navbar, and footer into the HTML document.
function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do something for the user here.
      var promise = new Promise(() => {
        $("#nav").load("../text/nav_after_login.html");
        $("#foot").load("../text/footer_after_login.html");
        $.getScript("../scripts/api.js", function () {
          console.log("Running api.js");
        });
      });
    } else {
      // No user is signed in.
      console.log($("#nav").load("../text/nav_before_login.html"));
      console.log($("#foot").load("../text/footer_before_login.html"));
    }
  });
}
loadSkeleton(); //invoke the function
