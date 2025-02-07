const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");

const handleSignup = async (e) => {
  e.preventDefault();
  const URL = "http://localhost:3000/api/user";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });

  if (!response.ok) {
    console.log(response.status);
    return;
  }

  // REDIRECT TO LOGIN PAGE
  window.location.replace("http://localhost:3000/");
};
form.addEventListener("submit", handleSignup);
