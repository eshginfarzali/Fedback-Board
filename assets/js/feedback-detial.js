const countUp = document.getElementById("count-up");
const countBtn = document.getElementById("countBtn");
const postReply =document.querySelector(".reply")
const form =document.querySelector("form")


let count = 0;
const storedCount = localStorage.getItem("count");
if (storedCount !== null) {
    count = parseInt(storedCount);
    updateCountText();
}

function updateCountText() {
  countUp.textContent = `${count}`;
}

function handleUpCount() {
  count++;
  updateCountText();
  localStorage.setItem("count", count); 
  countBtn.removeEventListener("click", handleUpCount);
}

countBtn.addEventListener("click", handleUpCount);

  
function addPostReply(){
form.innerHTML=`
<div class="inp-text">

<input type="text" name="textInput" minlength="3" maxlength="250" value="" required>
</div>
<div class="post-reply"><button>Post Reply</button></div>
`
}


postReply.addEventListener("click", addPostReply)