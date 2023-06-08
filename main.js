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
    mainEl.innerHTML = "";
  }
});

async function getUser(username) {
  try {
    const res = await fetch(API_URL + username);

    if (res.status == 404) {
      createErrorCard(`User ${username} not found `);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      createCardUser(data);
      getRepos(username);
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

async function getRepos(username) {
  try {
    const res = await fetch(`${API_URL + username}/repos?sort=created`);
    const data = await res.json();
    addReposToCard(data);
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
   <li> <strong>Followers : </strong> ${user.followers}</li>
   <li><strong>Following : </strong> ${user.following} </li>
   <li><strong>Repos:</strong> ${user.public_repos}</li>
   </ul>
   <h5>Repos Details...</h5>
   <div id="repos">
   </div>
   </div>
   </div>
  `;

  mainEl.innerHTML = cardHtml;
}

function addReposToCard(repos) {
  const reposEl = document.querySelector("#repos");
  repos.slice(0, 4).forEach((repo) => {
    const repoEl = document.createElement("div");
    repoEl.innerHTML = `
    <a  target="_blank"href="${repo.html_url}"><h3>${repo.name}</h3></a>
    <h4> Created : ${repo.created_at.substring(0, 10)}</h4>
    <p>${repo.description}<p>
    `;
    repoEl.classList.add("repo");
    reposEl.appendChild(repoEl);
  });
}
