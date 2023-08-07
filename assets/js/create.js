import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const addFeedback = document.getElementById("addFeedback");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackDetail");
const category = document.getElementById("category");

// Load existing data from localStorage if available
const existingData = JSON.parse(localStorage.getItem("feedbackData")) || [];
let newData = existingData;

function saveDataToLocalStorage(data) {
    localStorage.setItem("feedbackData", JSON.stringify(data));
}

function createFeedback() {
    const newFeedback = {
        "id": uuidv4(),
        "status": "Live",
        "statusColor": "#62bcfa",
        "title": feedbackTitle.value,
        "text": feedbackText.value,
        "category": category.value,
        "rating": 0,
        "comment": 0
    };

    newData.push(newFeedback);

    feedbackTitle.value = "";
    feedbackText.value = "";
    category.value = "";

  
    saveDataToLocalStorage(newData);
}

addFeedback.addEventListener("click", createFeedback);
