const planned = document.getElementById("planned");
const progress = document.getElementById("progress");
const live = document.getElementById("live");

async function fetchAndRenderData() {
  try {
    const response = await fetch("../../Json/feedback.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    data.forEach((item) => {
      if (item.status === "Planned") {
        planned.innerHTML += `
<li class="task" data-status="planned">
<div class="status">
  <div class="status-color" style="background-color: ${item.statusColor}"></div>
  &ThinSpace;
  <p class="status-name">${item.status}</p>
</div>
<div class="title">${item.title}</div>
<p class="text">
${item.text}
</p>
<div class="category"><span>${item.category}</span></div>
<div class="reyting-comment">
  <button class="reyting">
    <img src="../icons/chevron-up.svg" alt="" />
    <span>123</span>
  </button>
  <div class="comment">
    <img src="../icons/comment.svg" alt="" /> <span>2</span>
  </div>
</div>
</li>
`;
      }
      if (item.status === "In-progress"){
        progress.innerHTML+= `
        <li class="task" data-status="progres">
        <div class="status">
          <div class="status-color" style="background-color: ${item.statusColor}"></div>
          &ThinSpace;
          <p class="status-name">${item.status}</p>
        </div>
        <div class="title">${item.title}</div>
        <p class="text">
        ${item.text}
        </p>
        <div class="category"><span>${item.category}</span></div>
        <div class="reyting-comment">
          <button class="reyting">
            <img src="../icons/chevron-up.svg" alt="" />
            <span>123</span>
          </button>
          <div class="comment">
            <img src="../icons/comment.svg" alt="" /> <span>2</span>
          </div>
        </div>
        </li>
        `;
      }

      if (item.status === "Live"){
        live.innerHTML+= `
        <li class="task" data-status="live">
        <div class="status">
          <div class="status-color" style="background-color: ${item.statusColor}"></div>
          &ThinSpace;
          <p class="status-name">${item.status}</p>
        </div>
        <div class="title">${item.title}</div>
        <p class="text">
        ${item.text}
        </p>
        <div class="category"><span>${item.category}</span></div>
        <div class="reyting-comment">
          <button class="reyting">
            <img src="../icons/chevron-up.svg" alt="" />
            <span>123</span>
          </button>
          <div class="comment">
            <img src="../icons/comment.svg" alt="" /> <span>2</span>
          </div>
        </div>
        </li>
        `;
      }

    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchAndRenderData();
