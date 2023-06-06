const mainEl = document.querySelector("#main");
const formEl = document.querySelector("#form");
const searchEl = document.querySelector("#search");
const API_URL = "https://api.github.com/users/";

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = searchEl.value;
  if (user) {
    getUser(user);
    searchEl.value = "";
  }
});

async function getUser(username) {
  // fetch(API_URL + username)
  //   .then((res) => {
  //     if (res.status == 404) {
  //       createErrorCard(`User ${username} not found `);
  //       return;
  //     }
  //     if (res.ok) {
  //       return res.json();
  //     }
  //   })
  //   .then((data) => console.log(data))
  //   .catch((err) => {
  //     createErrorCard("Problem fetching user");
  //   });

  try {
    const res = await fetch(API_URL + username);
    if (res.status == 404) {
      createErrorCard(`User ${username} not found `);
      return;
    }
    if (res.ok) {
      const data = res.json();
      console.log(data);
    }
  } catch (error) {
    createErrorCard("Error to fetching");
  }
}
function createErrorCard(message) {
  const cardHtml = `<div class="card">
  <h1>${message}</h1>
  </div>`;

  mainEl.innerHTML = cardHtml;
}

async function getUser() {
  try {
    const res = await fetch(`${API_URL + username}/repos?sort=created`);
    const data = await res.json();
  } catch (error) {
    createErrorCard();
  }
}

function createCardUser(user) {
  const userId = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio}</p>` : "";
  const cardHtml = `
   <div class="card" >
   
   <div>
   <img  src="${user.avatar_url}" alt="${user.name}" class="avatar">

   </div>
   <div class="user-info"><h2>${userId}</h2>
   ${userBio}
   <ul>
   <li>${user.followers} <strong>Followers</strong></li>
   <li>${user.following} <strong>Following</strong></li>
   <li>${user.public_repos} <strong>Repos:</strong></li>
   </ul>
   <div id="repos"></div>
   </div>
   </div>
  `;

  mainEl.innerHTML = cardHtml;
}

function addReposToCard(repos) {
  const reposEl = document.querySelector("#repos");
  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";

    reposEl.appendChild(repoEl);
  });
}
