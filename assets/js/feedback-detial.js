const countUp = document.getElementById("count-up");
const countBtn = document.getElementById("countBtn");
const postReply =document.querySelectorAll(".reply-one")
const postReplyes =document.querySelectorAll(".replyes")
const replyForm =document.querySelector(".form-reply-comment")
const generalForm = document.querySelector(".general-comment");
const postComment =document.getElementById('postComment')
const postCommentInp =document.getElementById('postCommentInp')
const newPostComment =document.querySelector('.new-post-comment-general')
const commentBox =document.querySelector('.comment-box')


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

async function fetchUser(){
 const resp = await fetch("../../Json/User.json")
 const data = await resp.json()
 return data;
}
fetchUser()

async function processData(){
    try {
      const userData = await fetchUser(); // Call the fetchUser function to get the data
      commentBox.innerHTML =`
      <div class="profile-img">
      <img src="../img/profile-img.jpg" alt="" />
    </div>
    <div class="user-comment">
      <div class="user-reply">
        <div class="user-name">
          <h1>${userData.name}</h1>
          <p>${userData.username}</p>
        </div>
        <div class="reply reply-one">
          <p>Reply</p>
        </div>
      </div>
      <div class="comment-text">
        <p>
        ${userData.comment}
        </p>
      </div>

      <section class="section-reply-comment">
        <div class="comment-box">
          <div class="profile-img">
            <img src="../img/profile-img.jpg" alt="" />
          </div>
          <div class="user-comment">
            <div class="user-reply">
              <div class="user-name">
                <h1>Eshgin Farzaliyev</h1>
                <p>@eshginfarzali</p>
              </div>
              <div class="reply replyes">
                <p class="replyes">Reply</p>
              </div>
            </div>
            <div class="comment-text">
              <p>
              ${userData.comment}
              </p>
            </div>
          </div>
        </div>



        <div class="comment-box">
          <div class="profile-img">
            <img src="../img/profile-img.jpg" alt="" />
          </div>
          <div class="user-comment">
            <div class="user-reply">
              <div class="user-name">
                <h1>Eshgin Farzaliyev</h1>
                <p>@eshginfarzali</p>
              </div>
              <div class="reply replyes">
                <p class="replyes">Reply</p>
              </div>
            </div>
            <div class="comment-text">
              <p>
                ${userData.comment}
              </p>
            </div>
            <form style="gap: 10px;" class="form-reply-comment"></form>
          </div>
        </div>







      </section>
    </div>
      `
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  
  processData();


function addPostComment(e){
    e.preventDefault()
let inptValue = postCommentInp.value
console.log(inptValue);
newPostComment.innerHTML =`
<div class="comment-box">
<div class="profile-img">
  <img src="../img/profile-img.jpg" alt="" />
</div>
<div class="user-comment">
  <div class="user-reply">
    <div class="user-name">
      <h1>Eshgin Farzaliyev</h1>
      <p>@eshginfarzali</p>
    </div>
    <div class="reply reply-one">
      <p>Reply</p>
    </div>
  </div>
  <div class="comment-text">
    <p>
     ${inptValue}
    </p>
  </div>

  <section class="section-reply-comment">
    <div class="comment-box">
      <div class="profile-img">
        <img src="../img/profile-img.jpg" alt="" />
      </div>
      <div class="user-comment">
        <div class="user-reply">
          <div class="user-name">
            <h1>Eshgin Farzaliyev</h1>
            <p>@eshginfarzali</p>
          </div>
          <div class="reply replyes">
            <p class="replyes">Reply</p>
          </div>
        </div>
        <div class="comment-text">
          <p>
            Also, please allow styles to be applied based on system
            preferences. I would love to be able to browse Frontend
            Mentor in the evening after my device’s dark mode turns on
            without the background it currently has. preferences. I
            would love to be able to browse Frontend Mentor in the
            evening after my device’s dark mode turns on without the
            bright background it currently has.
          </p>
        </div>
      </div>
    </div>



    <div class="comment-box">
      <div class="profile-img">
        <img src="../img/profile-img.jpg" alt="" />
      </div>
      <div class="user-comment">
        <div class="user-reply">
          <div class="user-name">
            <h1>Eshgin Farzaliyev</h1>
            <p>@eshginfarzali</p>
          </div>
          <div class="reply replyes">
            <p class="replyes">Reply</p>
          </div>
        </div>
        <div class="comment-text">
          <p>
            Also, please allow styles to be applied based on system
            preferences. I would love to be able to browse Frontend
            Mentor in the evening after my device’s dark mode turns on
            without the background it currently has. preferences. I
            would love to be able to browse Frontend Mentor in the
            evening after my device’s dark mode turns on without the
            bright background it currently has.
          </p>
        </div>
        <form style="gap: 10px;" class="form-reply-comment"></form>
      </div>
    </div>

  </section>
</div>
</div>
<form class="general-comment"></form>`
postCommentInp.value=''

}



postComment.addEventListener("click", addPostComment)









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

postReply.forEach((button)=>{
button.addEventListener("click", addPostReply)
});