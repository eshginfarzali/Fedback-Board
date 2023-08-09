// import '../style/roadmap.css';
// import '../style/dragdrop.css';

const drake = dragula([
  document.getElementById("planned"),
  document.getElementById("progress"),
  document.getElementById("live"),
  document.getElementById("empty-planned"), 
  document.getElementById("empty-progress"), 
  document.getElementById("empty-live") 
], {
  removeOnSpill: false
});

drake
.on("drag", function(el) {
  el.classList.remove("ex-moved");
})
.on("drop", function(el, target, source) {
  el.classList.add("ex-moved");

  if (target.classList.contains("empty-container")) {
    const oldStatus = el.getAttribute("data-status");
    const newStatus = target.getAttribute("data-status");

    if (oldStatus !== newStatus) {
      updateListItem(el, target);
      source.removeChild(el);
    }
  }
})
.on("over", function(_, container) {
  container.classList.add("ex-over");
})
.on("out", function(_, container) {
  container.classList.remove("ex-over");
});

function updateListItem(item, target) {
  const status = target.getAttribute("data-status");
  const statusColor = target.getAttribute("data-status-color");
  const statusName = target.getAttribute("data-status-name");
  
  item.setAttribute("data-status", status);
  item.querySelector(".status-color").style.backgroundColor = statusColor;
  item.querySelector(".status-name").textContent = statusName;
  
  target.appendChild(item);
}
let data =[]

 function renderData() {
 
  const remoteData = JSON.parse( localStorage.getItem("remoteDataLocalStorge"))
    data = [...remoteData];
    
    data.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("task");
      listItem.setAttribute("data-status", item.status);

      listItem.innerHTML = `
        <div class="status">
          <div class="status-color" style="background-color: ${item.statusColor}" data-status-color="${item.statusColor}" data-status-name="${item.status}">
          </div>
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
            <span>${item.rating}</span>
          </button>
          <div class="comment">
            <img src="../icons/comment.svg" alt="" /> <span>2</span>
          </div>
        </div>
      `;

      if (item.status === "Planned") {
        planned.appendChild(listItem);
      } else if (item.status === "In-Progress") {
        progress.appendChild(listItem);
      } else if (item.status === "Live") {
        live.appendChild(listItem);
      }
    
}
    )}
renderData();







document.addEventListener('DOMContentLoaded', function () {
  const plannedHeader = document.querySelector('.planned-header');
  const inProgressHeader = document.querySelector('.in-progress-header');
  const liveHeader = document.querySelector('.live-header');
  const columns = document.querySelector('.columns');

  columns.classList.add('show-planned');
  plannedHeader.classList.add('show-border-planned');

  plannedHeader.addEventListener('click', function () {
      columns.classList.remove('show-in-progress', 'show-live');
      columns.classList.add('show-planned');
      
      plannedHeader.classList.add('show-border-planned');
      inProgressHeader.classList.remove('show-border-progress');
      liveHeader.classList.remove('show-border-live');
  });

  inProgressHeader.addEventListener('click', function () {
      columns.classList.remove('show-planned', 'show-live');
      columns.classList.add('show-in-progress');
      
      inProgressHeader.classList.add('show-border-progress');
      plannedHeader.classList.remove('show-border-planned');
      liveHeader.classList.remove('show-border-live');
  });

  liveHeader.addEventListener('click', function () {
      columns.classList.remove('show-planned', 'show-in-progress');
      columns.classList.add('show-live');

      liveHeader.classList.add('show-border-live');
      inProgressHeader.classList.remove('show-border-progress');
      plannedHeader.classList.remove('show-border-planned');
  });
});