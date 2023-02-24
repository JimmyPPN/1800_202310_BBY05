//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
// function loadSkeleton(){
//     console.log($('#navbarPlaceholder').load('./text/nav.html'));
//     console.log($('#footerPlaceholder').load('./text/footer.html'));
// }
// loadSkeleton();  //invoke the function


// Injects the navbar, and footer into the HTML doc
function injectTemplates() {
    console.log($('#nav').load('text/nav.html'));
    console.log($('#foot').load('text/footer.html'));
}

// Calls the inject_navfoot function
injectTemplates();

