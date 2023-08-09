// import '../style/edit.css';

window.onload = function () {
  const editingContainer = document.querySelector(".editing");

  function getDataRender() {
    const storedData = JSON.parse(
      localStorage.getItem("remoteDataLocalStorge")
    );
    const feddDataId = JSON.parse(localStorage.getItem("feedbackId"));
  

    const foundData = storedData.find((item) => item.id === feddDataId);

    if (foundData) {
      editingContainer.innerHTML = `
        <div class="edit-icon"><img src="../icons/edit.svg" alt="" /></div>
        <h1>Editing ‘${foundData.title}’</h1>
    
        <div class="feedback-edit-box">
          <div class="title-text">
            <h2>Feedback Title</h2>
            <p>Add a short, descriptive headline</p>
          </div>
          <div class="value-text">
            <input
              id="feedTitleInp"
              type="text"
              value="${foundData.title}"
            />
          </div>
          <div class="title-text">
            <h2>Category</h2>
            <p>Choose a category for your feedback</p>
          </div>
          <div class="value-text">
          <select name="category" id="category">
          <option value="Feature" ${
            foundData.category === "Feature" ? "selected" : ""
          }>Feature</option>
          <option value="UI" ${
            foundData.category === "UI" ? "selected" : ""
          }>UI</option>
          <option value="UX" ${
            foundData.category === "UX" ? "selected" : ""
          }>UX</option>
          <option value="Bug" ${
            foundData.category === "Bug" ? "selected" : ""
          }>Bug</option>
          <option value="Enhancement" ${
            foundData.category === "Enhancement" ? "selected" : ""
          }>Enhancement</option>
        </select>           
          </div>
          <div class="title-text">
            <h2>Update Status</h2>
            <p>Change feedback state</p>
          </div>
          <div class="value-text">
            <select name="feedBackStatus" id="feedBackStatus">
            <option value="Planned" ${
              foundData.status === "Planned" ? "selected" : ""
            }>Planned</option>
          <option value="In-Progress" ${
            foundData.status === "In-Progress" ? "selected" : ""
          }>In-Progress</option>
          <option value="Live" ${
            foundData.status === "Live" ? "selected" : ""
          }>Live</option>
     
            </select>
          </div>
          <div class="title-text">
            <h2>Feedback Detail</h2>
            <p>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
          </div>
          <div class="value-text">
            <input id="feedTextInp"
              type="text"
              value="${foundData.text}"
            />
          </div>
    
          <div class="qrup-btn">
            <div class="delete">
              <button id="deleteBtn">Delete</button>
            </div>
            <div class="cancel-update">
              <button><a href="../page/feedback-detial.html">Cancel</a></button>
              <button id="updateFeedBtn">Update Feedback</button>
            </div>
          </div>
        </div>
        `;
    } else {
      editingContainer.innerHTML = `
        <div class="text-feed"> <p>Data not found</p> </div>`;
    }
  }

  function getDelete() {
    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your file has been deleted.",
            showConfirmButton: false,
            timer: 1500,
          });
          const storedData = JSON.parse(
            localStorage.getItem("remoteDataLocalStorge")
          );
          const feddDataId = JSON.parse(localStorage.getItem("feedbackId"));

          const updatedData = storedData.filter(
            (item) => item.id !== feddDataId
          );
          localStorage.setItem(
            "remoteDataLocalStorge",
            JSON.stringify(updatedData)
          );
          setTimeout(() => {
            window.location.href = "../../index.html";
          }, 1500);
        }
      });
    });
  }

  function setInputValidity(input, isValid) {
    if (isValid) {
      input.style.outline = "none";
    } else {
      input.style.outline = "1px solid red";
    }
  }

  function validateInput(value, minLength, maxLength) {
    return value.length >= minLength && value.length <= maxLength;
  }

  function getUpload() {
    const feedTitleInp = document.getElementById("feedTitleInp");
    const selectCategory = document.getElementById("category");
    const selectfeedBackStatus = document.getElementById("feedBackStatus");
    const feedTextInp = document.getElementById("feedTextInp");
    const updateFeedBtn = document.getElementById("updateFeedBtn");
    const errorDiv = document.querySelector(".error-div");

    feedTitleInp.addEventListener("input", () => {
      const isValid = validateInput(feedTitleInp.value, 3, 60);
      setInputValidity(feedTitleInp, isValid);
    });

    feedTextInp.addEventListener("input", () => {
      const isValid = validateInput(feedTextInp.value, 3, 250);
      setInputValidity(feedTextInp, isValid);
    });

    updateFeedBtn.addEventListener("click", () => {
      const titleValue = feedTitleInp.value.trim();
      const textValue = feedTextInp.value.trim();
      const isTitleValid = validateInput(titleValue, 3, 60);
      const isTextValid = validateInput(textValue, 3, 250);

      setInputValidity(feedTitleInp, isTitleValid);
      setInputValidity(feedTextInp, isTextValid);

      if (isTitleValid && isTextValid) {
        const storedData = JSON.parse(
          localStorage.getItem("remoteDataLocalStorge")
        );
        const feddDataId = JSON.parse(localStorage.getItem("feedbackId"));

        const updatedTitle = feedTitleInp.value;
        const updatedCategory = selectCategory.value;
        const updatedStatus = selectfeedBackStatus.value;
        const updatedText = feedTextInp.value;
        let updatedStatusColor = "#F49F85"; // Default status color for "Planned" status

        if (updatedStatus === "In-Progress") {
          updatedStatusColor = "#ad1fea";
        } else if (updatedStatus === "Live") {
          updatedStatusColor = "#62bcfa";
        }

        const updatedData = storedData.map((item) => {
          if (item.id === feddDataId) {
            return {
              ...item,
              title: updatedTitle,
              category: updatedCategory,
              status: updatedStatus,
              statusColor: updatedStatusColor,
              text: updatedText,
            };
          }
          return item;
        });

        localStorage.setItem(
          "remoteDataLocalStorge",
          JSON.stringify(updatedData)
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Feedback updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        // Redirect to a new page or perform any other action after update
        setTimeout(() => {
          window.location.href = "../../assets/page/feedback-detial.html";
        }, 1500);
      } else {
        errorDiv.innerHTML = "Please check the input values.";
      }
    });
  }

  getDataRender();
  getDelete();
  getUpload();
};
