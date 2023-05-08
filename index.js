import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://realtime-database-f5486-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementInDB = ref(database, "endorsement");

const display = document.getElementById("display");
const publishBtn = document.getElementById("publish-btn");
const endorseField = document.getElementById("endorseField");

publishBtn.addEventListener("click", () => {
  let inputValue = endorseField.value;
  push(endorsementInDB, inputValue);
  clearTextArea();
});

onValue(endorsementInDB, (snapshot) => {
  if (snapshot.exists()) {
    let endorseArray = Object.entries(snapshot.val());
    clearDisplay();
    for (let i = 0; i < endorseArray.length; i++) {
      let currentEndorsement = endorseArray[i];
      let currentEndorsementID = currentEndorsement[0];
      let currentEndorsementValue = currentEndorsement[1];
      appendEndorsements(currentEndorsement);
    }
  } else {
    display.innerHTML = `Nothing is here`;
  }
});

function appendEndorsements(item) {
  let endorsementID = item[0];
  let endorsementValue = item[1];
  let newDisplay = document.createElement("li");
  newDisplay.textContent = endorsementValue;
  newDisplay.addEventListener("dblclick", () => {
    let exactID = ref(database, `endorsement/${endorsementID}`);
    remove(exactID);
  });
  display.append(newDisplay);
}
function clearTextArea() {
  endorseField.value = "";
}
function clearDisplay() {
  display.innerHTML = "";
}
