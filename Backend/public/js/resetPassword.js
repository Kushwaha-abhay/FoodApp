let password = document.querySelector("#password");
let confirmPassword = document.querySelector("confirm-password");
let resetBtn = document.querySelector(".resetBtn");
let message = document.querySelector("#message");

resetBtn.addEventListener("click", async function (e) {
  try {
    e.preventDefault(); // prevent page refresh
    if (password.value && confirmPassword.value) {
      let obj = await axios.post(
        "http://localhost:3000/api/users/resetPassword",
        { password: email.value, confirmPassword: confirmPassword.value }
      );
      console.log("obj", obj);
      if (obj.data) {
        message.innerHTML = obj.data.message;
      } else {
        message.innerHTML = "Failed..!!";
      }
    }
  } catch (error) {
    console.log(error);
  }
});
