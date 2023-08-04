const drake = dragula([
    document.getElementById("planned"),
    document.getElementById("progress"),
    document.getElementById("live"),
    document.getElementById("empty-planned"), // New drop target
    document.getElementById("empty-progress"), // New drop target
    document.getElementById("empty-live") // New drop target
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
      const status = target.getAttribute("data-status");
      el.setAttribute("data-status", status);
      target.appendChild(el);
    }
  })
  .on("over", function(_, container) {
    container.classList.add("ex-over");
  })
  .on("out", function(_, container) {
    container.classList.remove("ex-over");
  });

    
      async function fetchAndRenderData() {
        try {
          const response = await fetch("../../Json/feedback.json");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
      
          const data = await response.json();
          data.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.classList.add("task");
            listItem.setAttribute("data-status", item.status);
      
            listItem.innerHTML = `
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
            `;
      
            if (item.status === "Planned") {
              planned.appendChild(listItem);
            } else if (item.status === "In-Progress") {
              progress.appendChild(listItem);
            } else if (item.status === "Live") {
              live.appendChild(listItem);
            }
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      
    fetchAndRenderData();
    
  
  



document.addEventListener('DOMContentLoaded', function () {
    const plannedHeader = document.querySelector('.planned-header');
    const inProgressHeader = document.querySelector('.in-progress-header');
    const liveHeader = document.querySelector('.live-header');
    const columns = document.querySelector('.columns');
    columns.classList.remove('show-in-progress', 'show-live');

      //border add 
    plannedHeader.classList.add('show-border-planned');

    plannedHeader.addEventListener('click', function () {
      columns.classList.remove('show-in-progress', 'show-live');
      plannedHeader.classList.add('show-border-planned');
    
          //border  remove
      inProgressHeader.classList.remove('show-border-progress');
      liveHeader.classList.remove('show-border-live');
    });

    inProgressHeader.addEventListener('click', function () {
      columns.classList.remove('show-planned', 'show-live');
      columns.classList.add('show-in-progress');


          //border add and remove
      inProgressHeader.classList.add('show-border-progress');
      plannedHeader.classList.remove('show-border-planned');
      liveHeader.classList.remove('show-border-live');
    });

    liveHeader.addEventListener('click', function () {
      columns.classList.remove('show-planned', 'show-in-progress');
      columns.classList.add('show-live');


        //border add and remove
      liveHeader.classList.add('show-border-live');
      inProgressHeader.classList.remove('show-border-progress');
      plannedHeader.classList.remove('show-border-planned');

    });
  });