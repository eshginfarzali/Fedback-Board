const countUp = document.getElementById("count-up");
const countBtn = document.getElementById("countBtn");
const postReply =document.querySelector(".reply-one")
const postReplyes =document.querySelectorAll(".replyes")
const replyForm =document.querySelector(".form-reply-comment")
const generalForm = document.querySelector(".general-comment");


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



function addPostReplyes() {
    // generalForm.remove();


  replyForm.innerHTML = `
    <form>
      <div class="inp-text">
        <input type="text" name="textInput" minlength="3" maxlength="250" value="" required>
      </div>
      <div class="post-reply"><button>Post Reply</button></div>
    </form>
  `;

}

function addPostReply() {
    // replyForm.remove();



  generalForm.innerHTML = `
    <form>
      <div class="inp-text">
        <input type="text" name="textInput" minlength="3" maxlength="250" value="" required>
      </div>
      <div class="post-reply"><button>Post Reply</button></div>
    </form>
  `;

}

postReplyes.forEach((button) => {
    button.addEventListener("click", addPostReplyes);
  });

postReply.addEventListener("click", addPostReply);
