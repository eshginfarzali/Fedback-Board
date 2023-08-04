// Custom Dragula JS
var drake = dragula([
    document.getElementById("to-do"),
    document.getElementById("doing"),
    document.getElementById("done"),
  ], {
    removeOnSpill: false
  });
  
  drake
    .on("drag", function(el) {
      el.classList.remove("ex-moved");
    })
    .on("drop", function(el) {
      el.classList.add("ex-moved");
    })
    .on("over", function(el, container) {
      container.classList.add("ex-over");
    })
    .on("out", function(el, container) {
      container.classList.remove("ex-over");
    });
  
  // Vanilla JS to add a new task
  function addTask() {
    var inputTask = document.getElementById("taskText").value;
    var newTask = document.createElement("li");
    newTask.className = "task";
    newTask.innerHTML = "<p>" + inputTask + "</p>";
    
    document.getElementById("to-do").appendChild(newTask);
    document.getElementById("taskText").value = "";
  }
  
  















document.addEventListener('DOMContentLoaded', function () {
    const plannedHeader = document.querySelector('.planned-header');
    const inProgressHeader = document.querySelector('.in-progress-header');
    const liveHeader = document.querySelector('.live-header');
    const columns = document.querySelector('.columns');
    plannedHeader.classList.add('show-border-planned');

    plannedHeader.addEventListener('click', function () {
      columns.classList.remove('show-in-progress', 'show-live');
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