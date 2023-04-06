# Project Title 
WeatherEye

## 1. Project Description
"Our team Team (#BBY-05) is developing an app to help people prepare for severe weather changes with the help of live comments, and unique features such as integration with other services"

## 2. Names of Contributors

* Hi my name is Brandon. I am a CST student at BCIT. I enjoy working in teams and solving problems. 
I have some experience in Java and C and would love to learn new languages as my career evolves.

* Jimmy Nguyen (JimmyPPN - Github). I'm excited about this project because I get more hands-on programming experience.

* Jaskirat Singh (Former computer networking student). As a CST student at BCIT, I've been exploring a bunch of programming languages and technologies like Java, Javascript, and web development. I get super excited about using my skills to solve real-world problems and I love working with a team. Can't wait to see where my coding journey takes me! 

	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Weather by API-Ninjas (provides the latest weather information for any city or geographic location in the world.)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps:
* User clicks on the "Get Started" button to signup/login.
* User needs to create an account. Users will need to provide some basic information such as their name, email address, and choose a password to signin.
* After signing in, the user will see a landing page with default city weather. They can search for weather of a new location.The search bar is in navbar.
* The user can add cities to favorites by clicking on the heart (favorite) button.
* To access favorites, the user can click on the favorite button in the navbar, where they can edit the favorites list as well.
* On the landing page, the app provides a feature to see live comments for a particular city with a rating feature (like/dislike button) to rate the comments.
* The app allows users to provide feedback for the weather by clicking on the "give feedback" button.
* Users can click on the profile button in the footer to edit their profile, such as name, city, and country.
* If users need additional support, they can refer to the help page in the dropdown menu.

## 5. Known Bugs and Limitations
Here are some known bugs:
* The app relies on Weather by API-Ninjas, which can sometimes become unreachable, leading to delays in weather data.
* Slow response time: App uses Firestore as a database that can have slow response times if the database has a large amount of data or if there are a lot of concurrent requests.

## 6. Features for Future
What we'd like to build in the future:
* Push notifications: Adding push notifications to the app would allow users to receive alerts about severe weather changes, even when the app is not open.
* Personalized weather forecasts: Using machine learning or other advanced algorithms, the app could provide personalized weather forecasts based on a user's location, historical data, and other factors.
* Gamification of weather tracking: The app could turn weather tracking into a game by adding achievements, badges, and other rewards for users who consistently track the weather and provide feedback.
* Integration with smart home devices: The app could integrate with smart home devices like thermostats, air purifiers, and humidifiers to provide automated weather-based control.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
└── README.md                # This file

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /back-arrow-icon.svg     # back arrow icon
    /home.svg                # home icon
    /list.svg                # hamburger menu icon
    /user.svg                # profile icon
    /jas.png                 # Team-member picture         
    /jimmy.png               # Team-member picture
    /brandon.png             # Team-member picture
    /weather.jpg             # Background picture
    /weathereye.png          # Logo (App)
    /sardarprogrammer.png    # Logo(Team)              

├── pages                    # Folder for pages
    /aboutus.html            # About the team page
    /favorite.html           # Favorites page
    /help.html               # FAQ page
    /login.html              # Login page
    /main.html               # Main landing page after user signup/logins
    /template.html           # Template page - dev use only
    /user.html               # Profile page

├── scripts                  # Folder for scripts
    /api.js                  # Weather api keys and search function.
    /authentication.js       # User authentication script
    /comment.js              # Comments feature script
    /favorite.js             # Favorite feature script
    /firebaseAPI_BBY05.js    # Firebase api keys
    /main.js                 # Main page script
    /script.js               # Logging out user script
    /skeleton.js             # Load Navbar and Footer
    /user.js                 # User settings script
    /weather.js              # Load Common Places live weather(table).

├── styles                   # Folder for styles
    /style.css               # general site wide style 

├── text                     # nav and foot for all pages
    /nav_after_login.html    # navbar
    /nav_before_login.html   # navbar
    /footer_after_login.html # footer
    /footer_before_login.html# footer

```

## Acknowledgements 
* <a href="https://firebase.google.com/">Firebase</a>
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://getbootstrap.com/">Bootstrap</a>
* <a href="https://rapidapi.com/apininjas/api/weather-by-api-ninjas/">Weather Api</a>



