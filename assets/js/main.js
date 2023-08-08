// import '../style/main.css';
const body = document.body;
const menuToggle = document.getElementById("menu__toggle");
const roadmapBox = document.querySelector(".roadmap-box");
const allBox = document.querySelector(".all-box");

const feedBackBox = document.getElementById("feedBackBox");
const feedsCount = document.querySelector(".feeds-count");
const feedSort = document.getElementById("sort");

const all = document.querySelector(".all");
const ui = document.querySelector(".ui");
const ux = document.querySelector(".ux");
const enhancement = document.querySelector(".enhancement");
const bug = document.querySelector(".bug");
const feature = document.querySelector(".feature");

// const retrievedData = JSON.parse(localStorage.getItem("feedbackData")) || [];

let data = []

const statusCounts = {};

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchFeedbackData() {
  const storedData = JSON.parse(localStorage.getItem("remoteDataLocalStorge")) || [];

  if (storedData.length === 0) {
    const jsonUrl = "../../Json/feedback.json";
    const remoteData = await fetchData(jsonUrl);
    localStorage.setItem("remoteDataLocalStorge", JSON.stringify(remoteData));
    data = [...remoteData];
  } else {
    data = [...storedData];
  }
}

function renderFeedbackData() {
  if (feedBackBox) feedBackBox.innerHTML = "";

  const statusCounts = { Planned: 0, "In-Progress": 0, Live: 0 };

  data.forEach((item) => {
    const status = item.status;
    statusCounts[status]++;
    if (feedsCount)
      feedsCount.innerHTML = `
        <li>${statusCounts.Planned || 0}</li>
        <li>${statusCounts["In-Progress"] || 0}</li>
        <li>${statusCounts.Live || 0}</li>`;
    const section = createFeedbackSection(item);
    feedBackBox.appendChild(section);
  });
}

function createFeedbackSection(item) {
  const section = document.createElement("section");
  section.className = "add-feedback-box";

  const countFeedDiv = document.createElement("div");
  countFeedDiv.className = "count-feed";

  const countButton = document.createElement("button");
  const countImg = document.createElement("img");
  countImg.src = "./assets/icons/chevron-up.svg";
  countImg.alt = "up";

  const countReitin = document.createElement("span");
  countReitin.className = "countReitin";
  countReitin.textContent = item.rating;

  countButton.appendChild(countImg);
  countButton.appendChild(document.createElement("br"));
  countButton.appendChild(countReitin);
  countFeedDiv.appendChild(countButton);

  const textFeedBoxDiv = document.createElement("div");
  textFeedBoxDiv.className = "text-feed-box";

  const textFeedDiv = document.createElement("div");
  textFeedDiv.className = "text-feed";

  const titleHeading = document.createElement("h2");
  titleHeading.textContent = item.title;

  const textParagraph = document.createElement("p");
  textParagraph.textContent = item.text;

  const categoryButton = document.createElement("button");
  categoryButton.textContent = item.category;

  textFeedDiv.appendChild(titleHeading);
  textFeedDiv.appendChild(textParagraph);
  textFeedDiv.appendChild(categoryButton);

  const feedComDiv = document.createElement("div");
  feedComDiv.className = "feed-com";

  const commentImg = document.createElement("img");
  commentImg.src = "./assets/icons/comment.svg";
  commentImg.alt = "comment";

  const commentSpan = document.createElement("span");
  commentSpan.textContent = item.comment;

  feedComDiv.appendChild(commentImg);
  feedComDiv.appendChild(commentSpan);

  textFeedBoxDiv.appendChild(textFeedDiv);
  textFeedBoxDiv.appendChild(feedComDiv);

  section.appendChild(countFeedDiv);
  section.appendChild(textFeedBoxDiv);

  countButton.addEventListener("click", () => {
    item.rating++;
    countReitin.textContent = item.rating.toString();
  });

  section.addEventListener("click", (e) => {
    e.stopPropagation()
    localStorage.setItem("feedbackId", JSON.stringify(item.id));
    location.href = "../../assets/page/feedback-detial.html";
  });
  return section;
}

function filterAndDisplay(category) {
  const feedbackSections = feedBackBox.querySelectorAll(".add-feedback-box");
  feedbackSections.forEach((section) => {
    const categoryButton = section.querySelector(".text-feed button");
    if (categoryButton.textContent === category || category === "all") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

all?.addEventListener("click", () => filterAndDisplay("all"));
ui?.addEventListener("click", () => filterAndDisplay("UI"));
ux?.addEventListener("click", () => filterAndDisplay("UX"));
enhancement?.addEventListener("click", () => filterAndDisplay("Enhancement"));
bug?.addEventListener("click", () => filterAndDisplay("Bug"));
feature?.addEventListener("click", () => filterAndDisplay("Feature"));

function sortAndDisplay() {
  const value = feedSort.options[feedSort.selectedIndex].value;

  switch (value) {
    case "mostcom":
      data.sort((a, b) => (b.comment || 0) - (a.comment || 0));
      break;
    case "leastcom":
      data.sort((a, b) => (a.comment || 0) - (b.comment || 0));
      break;
    case "mostup":
      data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "leastup":
      data.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      break;
    default:
      break;
  }

  feedBackBox.innerHTML = "";

  data.forEach((item) => {
    const section = createFeedbackSection(item);
    feedBackBox.appendChild(section);
  });
}

feedSort?.addEventListener("change", sortAndDisplay);

function updateLayout() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    if (menuToggle.checked) {
      body.style.overflow = "hidden";
      roadmapBox.style.display = "inline-block";
      allBox.style.display = "inline-block";
    } else {
      body.style.overflow = "auto";
      roadmapBox.style.display = "none";
      allBox.style.display = "none";
    }
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    body.style.overflow = "auto";
    roadmapBox.style.display = "flex";
    allBox.style.display = "flex";
  }
}

menuToggle?.addEventListener("change", updateLayout);
window.addEventListener("resize", updateLayout);

updateLayout();

async function initializeApp() {
  await fetchFeedbackData();
  renderFeedbackData();
}

initializeApp();




