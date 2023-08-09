// import '../style/feedback-detial.css';

const countUp = document.getElementById("count-up");
const countBtn = document.getElementById("countBtn");
const postReply = document.querySelectorAll(".reply-one");
const postReplyes = document.querySelectorAll(".replyes");
const generalForm = document.querySelector(".general-comment");
const postComment = document.getElementById("postComment");
const postCommentInp = document.getElementById("postCommentInp");
const newPostComment = document.querySelector(".new-post-comment-general");
const commentBox = document.querySelector(".comment-box");
const feedbackDetailBox = document.getElementById("feedbackDetailBox");

async function fetchUser() {
  const resp = await fetch("../../Json/User.json");
  const data = await resp.json();
  return data;
}

async function getCommentData() {
  try {
    const userData = await fetchUser();
    commentBox.innerHTML = `
            <div class="profile-img">
                <img src="../img/profile-img.jpg" alt="" />
            </div>
            <div class="user-comment">
                <div class="user-reply">
                    <div class="user-name">
                        <h1>${userData.name}</h1>
                        <p>${userData.username}</p>
                    </div>
                    <div class="reply replyes reply-one">
                        <p class="replyes">Reply</p>
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
                            </div>
                            </div>
                            
                            <form style="gap: 10px;" class="form-reply-comment"></form>
                </section>
            </div>
        `;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

getCommentData();

function addPostComment(e) {
  e.preventDefault();
  let inptValue = postCommentInp.value;
  newPostComment.innerHTML = `
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

  
<form class="general-comment"></form>`;
  postCommentInp.value = "";
}
postComment.addEventListener("click", addPostComment);

const replyForm = document.querySelector(".form-reply-comment");

let bool = true;
function addPostReplyes() {
  if (bool) {
    const formReplyComment = document.createElement("div");
    formReplyComment.className = "form-reply-comment";

    formReplyComment.innerHTML = `
        <form>
            <div class="inp-text">
                <input type="text" name="textInput" minlength="3" maxlength="250" value="" required id="replyComment">
            </div>
            <div class="post-reply"><button id="postReplyComment">Post Reply</button></div>
        </form>
    `;

    const commentBox = document.querySelector(".reply-box-inp");
    commentBox.appendChild(formReplyComment);
    bool = false;
  }
}

postReplyes.forEach((button) => {
  button.addEventListener("click", addPostReplyes);
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("replyes")) {
    addPostReplyes();
  } else if (event.target.closest(".form-reply-comment")) {
  }
});

function getDataDetial() {
  const storedData = JSON.parse(localStorage.getItem("remoteDataLocalStorge"));
  const feddDataId = JSON.parse(localStorage.getItem("feedbackId"));


  const foundData = storedData.find((item) => item.id === feddDataId);

  if (foundData) {
    let count = foundData.rating;
    countUp.textContent = count;

    countBtn.addEventListener("click", () => {
      countUp.textContent = ++count;
    });
    feedbackDetailBox.innerHTML = `
        <div class="text-feed">
        <h2>${foundData.title}</h2>
        <p>${foundData.text}</p>
        <button>${foundData.category}</button>
      </div>
      <div class="feed-com">
        <img src="../../assets/icons/comment.svg" alt="comment" />
        <span>${foundData.comment}</span>
      </div>
        `;
  } else {
    feedbackDetailBox.innerHTML = `
        <div class="text-feed"> <p>Data not found</p> </div>`;
  }
}
getDataDetial();

// const  postReplyComment = document.getElementById("postReplyComment")
// console.log(postReplyComment);
// function createReplyAddComment(e){
//     e.preventDefault()
//   const replyCommentInpValue = document.getElementById("replyComment")
//     let inptValue = postCommentInp.value
//     console.log(inptValue);
//     newPostComment.innerHTML =`
//     <div class="comment-box">
//     <div class="profile-img">
//       <img src="../img/profile-img.jpg" alt="" />
//     </div>
//     <div class="user-comment">
//       <div class="user-reply">
//         <div class="user-name">
//           <h1>Eshgin Farzaliyev</h1>
//           <p>@eshginfarzali</p>
//         </div>
//         <div class="reply reply-one">
//           <p>Reply</p>
//         </div>
//       </div>
//       <div class="comment-text">
//         <p>
//          ${inptValue}
//         </p>
//       </div>

//     <form class="general-comment"></form>`
//     postCommentInp.value=''

// }
// postReplyComment.addEventListener("click", createReplyAddComment);
