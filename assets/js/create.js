import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const addFeedback = document.getElementById("addFeedback");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackDetail");
const category = document.getElementById("category");

const existingData = JSON.parse(localStorage.getItem("remoteDataLocalStorge")) || [];

function saveDataToLocalStorage(data) {
    localStorage.setItem("remoteDataLocalStorge", JSON.stringify(data));
}

function validateInput(value, minLength, maxLength) {
    return value.length >= minLength && value.length <= maxLength;
}

function setInputValidity(input, isValid) {
    if (isValid) {
        input.style.outline = "none";
    } else {
        input.style.outline = "1px solid red";
    }
}

function checkInputsValidity() {
    const titleValue = feedbackTitle.value.trim();
    const textValue = feedbackText.value.trim();
    const isCategoryValid = category.value !== "";
    const isTitleValid = validateInput(titleValue, 3, 30);
    const isTextValid = validateInput(textValue, 3, 250);

    setInputValidity(category, isCategoryValid);
    setInputValidity(feedbackTitle, isTitleValid);
    setInputValidity(feedbackText, isTextValid);

    return isCategoryValid && isTitleValid && isTextValid;
}

category.addEventListener("change", checkInputsValidity);
feedbackTitle.addEventListener("input", checkInputsValidity);
feedbackText.addEventListener("input", checkInputsValidity);

function createFeedback() {
    if (checkInputsValidity()) {
        const newFeedback = {
            "id": uuidv4(),
            "status": "Live",
            "statusColor": "#62bcfa",
            "title": feedbackTitle.value.trim(),
            "text": feedbackText.value.trim(),
            "category": category.value,
            "rating": 0,
            "comment": 0
        };

        existingData.push(newFeedback);

        feedbackTitle.value = "";
        feedbackText.value = "";
        category.value = "";

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your feedback has been added ',
            showConfirmButton: false,
            timer: 1500
        });

        saveDataToLocalStorage(existingData);
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please check the input values',
            showConfirmButton: false,
            timer: 1500
        });
    }
}

addFeedback.addEventListener("click", createFeedback);
