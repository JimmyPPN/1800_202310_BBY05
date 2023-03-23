function showLiveComments() {
  const city = document.querySelector("#cityName").textContent;
  const feedbackDisplay = document.querySelector("#live-comments-container");

  // if live comments are currently visible, hide them and return
  if (feedbackDisplay.innerHTML !== "") {
    feedbackDisplay.innerHTML = "";
    return;
  }

  getFeedback(city)
    .then((sortedDocs) => {
      const feedbackList = createFeedbackList(sortedDocs);
      feedbackDisplay.appendChild(feedbackList);
    })
    .catch((error) => {
      console.error("Error retrieving feedback documents: ", error);
      alert(
        "An error occurred while retrieving live comments. Please try again later."
      );
    });
}

// retrieves feedback documents for a particular city from the database
function getFeedback(city) {
  return db
    .collection("feedback")
    .where("city", "==", city)
    .get()
    .then((querySnapshot) => {
      const sortedDocs = querySnapshot.docs
        .sort((a, b) => {
          return b.data().timestamp - a.data().timestamp;
        })
        .slice(0, 5);
      return sortedDocs;
    });
}

// creates a list of feedback items
function createFeedbackList(sortedDocs) {
  const feedbackList = document.createElement("ul");
  feedbackList.classList.add("list-group", "mb-2");

  sortedDocs.forEach((doc) => {
    createFeedbackItem(doc)
      .then((feedbackItem) => {
        feedbackList.appendChild(feedbackItem);
      })
      .catch((error) => {
        console.error("Error creating feedback item: ", error);
        alert(
          "An error occurred while creating a feedback item. Please try again later."
        );
      });
  });

  return feedbackList;
}

// creates a feedback item
function createFeedbackItem(doc) {
  const feedback = doc.data();
  const likes = feedback.likes || 0;
  const dislikes = feedback.dislikes || 0;

  return getUser(feedback.userId)
    .then((userDoc) => {
      const username = userDoc.data().name;
      const feedbackItem = document.createElement("li");
      feedbackItem.classList.add("list-group-item", "mb-2");
      feedbackItem.innerHTML = `
          <div><strong>Username:</strong> ${username}</div>
          <div><strong>Title:</strong> ${feedback.title}</div>
          <div><strong>Description:</strong> ${feedback.description}</div>
          <div><strong>Date:</strong> ${new Date(
            feedback.timestamp.toDate()
          ).toLocaleDateString()}</div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <i class="material-icons thumb-icon" data-type="up" data-id="${
                doc.id
              }">thumb_up</i>
              <span class="like-count">${likes}</span>
              <i class="material-icons thumb-icon" data-type="down" data-id="${
                doc.id
              }">thumb_down</i>
              <span class="dislike-count">${dislikes}</span>
            </div>
          </div>
        `;

      addThumbListeners(feedbackItem, doc.id);

      return feedbackItem;
    })
    .catch((error) => {
      console.error("Error retrieving user document: ", error);
      alert(
        "An error occurred while retrieving user information. Please try again later."
      );
    });
}

// function uses the feedbackId to retrieve the feedback document from the Firestore database
function getUser(userId) {
  return db.collection("users").doc(userId).get();
}

// adds event listeners to the thumbs up and thumbs down icons
function addThumbListeners(feedbackItem, feedbackId) {
  const upThumb = feedbackItem.querySelector(
    `[data-type="up"][data-id="${feedbackId}"]`
  );
  const downThumb = feedbackItem.querySelector(
    `[data-type="down"][data-id="${feedbackId}"]`
  );
  const likeCount = feedbackItem.querySelector(".like-count");
  const dislikeCount = feedbackItem.querySelector(".dislike-count");

  upThumb.addEventListener("click", () => {
    updateFeedback(feedbackId, {
      likes: firebase.firestore.FieldValue.increment(1),
    });
  });

  downThumb.addEventListener("click", () => {
    updateFeedback(feedbackId, {
      dislikes: firebase.firestore.FieldValue.increment(1),
    });
  });

  // updates the like and dislike counts in real time
  db.collection("feedback")
    .doc(feedbackId)
    .onSnapshot((doc) => {
      likeCount.innerText = doc.data().likes || 0;
      dislikeCount.innerText = doc.data().dislikes || 0;
    });
}

// updates the likes and dislikes fields for a feedback document
function updateFeedback(feedbackId, data) {
  return db
    .collection("feedback")
    .doc(feedbackId)
    .update(data)
    .then(() => {
      console.log("Feedback updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating feedback document: ", error);
      alert(
        "An error occurred while updating feedback. Please try again later."
      );
    });
}

// Display the feedback form
function showFeedbackForm() {
  const feedbackContainer = document.querySelector("#feedback-container");
  if (feedbackContainer.style.display === "block") {
    feedbackContainer.style.display = "none";
    return;
  }
  // create a form element
  const form = document.createElement("form");
  form.setAttribute("id", "feedback-form");

  // create a title input field
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("class", "form-control");
  titleInput.setAttribute("id", "title");
  titleInput.setAttribute("placeholder", "Title");

  // create a level select field
  const levelSelect = document.createElement("select");
  levelSelect.setAttribute("class", "form-control");
  levelSelect.setAttribute("id", "level");
  const levelOptions = ["Rain", "Snow", "Overcast", "Clear", "Windy", "Other"];
  for (let i = 0; i < levelOptions.length; i++) {
    const option = document.createElement("option");
    option.textContent = levelOptions[i];
    levelSelect.appendChild(option);
  }

  // create a description text area
  const descTextarea = document.createElement("textarea");
  descTextarea.setAttribute("class", "form-control");
  descTextarea.setAttribute("id", "description");
  descTextarea.setAttribute("rows", "3");
  descTextarea.setAttribute("placeholder", "Any additional details?");

  // create a submit button
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "button");
  submitBtn.setAttribute("class", "btn btn-primary pull-right");
  submitBtn.textContent = "Submit";
  submitBtn.addEventListener("click", submitFeedback);

  // add all form elements to the form
  form.appendChild(titleInput);
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
  form.appendChild(levelSelect);
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
  form.appendChild(descTextarea);
  form.appendChild(document.createElement("br"));
  form.appendChild(document.createElement("br"));
  form.appendChild(submitBtn);

  // append the form to the DOM
  // const feedbackContainer = document.querySelector("#feedback-container");
  feedbackContainer.innerHTML = ""; // clear previous content
  feedbackContainer.appendChild(form);
  feedbackContainer.style.display = "block";
}

// Submit the feedback to Firestore
function submitFeedback() {
  // get the values from the form
  const title = document.querySelector("#title").value;
  const level = document.querySelector("#level").value;
  const description = document.querySelector("#description").value;
  const city = document.querySelector("#cityName").textContent;
  const userId = getUserId(); // replace with your own function that returns the current user's ID
  const timestamp = firebase.firestore.Timestamp.now();

  // store the feedback in Firestore
  const feedbackRef = firebase.firestore().collection("feedback");
  feedbackRef
    .add({
      title: title,
      level: level,
      description: description,
      city: city,
      userId: userId,
      timestamp: timestamp,
    })
    .then(function () {
      // clear the form
      document.querySelector("#feedback-form").reset();

      // display a message to the user
      alert("Thank you for your feedback!");
    })
    .catch(function (error) {
      console.error("Error writing feedback to Firestore: ", error);
      alert(
        "An error occurred while submitting your feedback. Please try again later."
      );
    });
}

// Get the current user's ID
function getUserId() {
  const user = firebase.auth().currentUser;
  if (user) {
    return user.uid;
  } else {
    return null;
  }
}
