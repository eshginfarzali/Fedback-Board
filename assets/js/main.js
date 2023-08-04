const body = document.body;
const menuToggle = document.getElementById('menu__toggle');
const roadmapBox = document.querySelector('.roadmap-box');
const allBox = document.querySelector('.all-box');
const feedBackBox = document.getElementById("feedBackBox"); 

const all = document.querySelector(".all");
const ui = document.querySelector(".ui");
const ux = document.querySelector(".ux");
const enhancement = document.querySelector(".enhancement"); 
const bug = document.querySelector(".bug");
const feature = document.querySelector(".feature");

async function fetchAndRenderData() {
  try {
    const response = await fetch("../../Json/feedback.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    feedBackBox.innerHTML = ""; 

    data.forEach((item) => {
      feedBackBox.innerHTML += `
        <section class="add-feedback-box">
          <div class="count-feed">
            <button>
              <img src="./assets/icons/chevron-up.svg" alt="up" /> <br />
              ${item.reiting}
            </button>
          </div>
    
          <div class="text-feed-box">
            <div class="text-feed">
              <h2>${item.title}</h2>
              <p>
                ${item.text}
              </p>
              <button>${item.category}</button>
            </div>
            <div class="feed-com">
              <img src="./assets/icons/comment.svg" alt="comment" />
              <span>${item.comment}</span>
            </div>
          </div>
        </section>
      `;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
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

all.addEventListener("click", () => filterAndDisplay("all"));
ui.addEventListener("click", () => filterAndDisplay("UI"));
ux.addEventListener("click", () => filterAndDisplay("UX"));
enhancement.addEventListener("click", () => filterAndDisplay("Enhancement"));
bug.addEventListener("click", () => filterAndDisplay("Bug"));
feature.addEventListener("click", () => filterAndDisplay("Feature"));

fetchAndRenderData();


 











function updateLayout() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    if (menuToggle.checked) {
      body.style.overflow = 'hidden';
      roadmapBox.style.display = 'inline-block';
      allBox.style.display = 'inline-block';
    } else {
      body.style.overflow = 'auto';
      roadmapBox.style.display = 'none';
      allBox.style.display = 'none';
    }
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    body.style.overflow = 'auto';
    roadmapBox.style.display = 'flex';
    allBox.style.display = 'flex';
  }
}

menuToggle.addEventListener('change', updateLayout);
window.addEventListener('resize', updateLayout);

// Initial layout update
updateLayout();


// addFeedbackBox.addEventListener("click", ()=>{
//     location.href = "./assets/page/feedback-detial.html"
// })

