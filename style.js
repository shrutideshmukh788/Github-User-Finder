let searchBtn = document.querySelector(".search");
let usernameinp = document.querySelector(".usernameinp");
let card = document.querySelector(".card");

function getUserProfileData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((raw) => {
    if (!raw.ok) throw new Error("User Not Found.");
    return raw.json();
  });
}

function decorateProfile(details) {
  let data = `
    <img src="${details.avatar_url}" alt="GitHub Avatar"
         class="w-32 h-32 rounded-full border border-gray-600">
    <div>
      <h2 class="text-2xl font-bold">${details.name}</h2>
      <p class="text-blue-400">${details.login}</p>
      <p class="text-gray-300 mt-2">${details.bio ? details.bio : ""}</p>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-400 mt-4">
        <div><strong class="text-white">Public Repos:</strong> ${details.public_repos}</div>
        <div><strong class="text-white">Followers:</strong> ${details.followers}</div>
        <div><strong class="text-white">Following:</strong> ${details.following}</div>
        <div><strong class="text-white">Location:</strong> ${details.location || "N/A"}</div>
        <div><strong class="text-white">Company:</strong> ${details.company || "N/A"}</div>
        <div>
          <strong class="text-white">Blog:</strong> 
          ${details.blog ? `<a href="${details.blog}" class="text-blue-400 hover:underline" target="_blank">${details.blog}</a>` : "N/A"}
        </div>
      </div>

      <a href="${details.html_url}" target="_blank"
         class="inline-block mt-6 text-blue-500 hover:underline text-sm">
        🔗 View Full GitHub Profile →
      </a>
    </div>
  `;
  card.innerHTML = data;
}

searchBtn.addEventListener("click", function () {
  let username = usernameinp.value.trim();
  if (username.length > 0) {
    card.innerHTML = `<p class="text-gray-400">Loading...</p>`;
    getUserProfileData(username)
      .then((data) => {
        decorateProfile(data);
      })
      .catch((err) => {
        card.innerHTML = `<p class="text-red-500 font-semibold">${err.message}</p>`;
      });
  } else {
    card.innerHTML = `<p class="text-red-500 font-semibold">Please enter a GitHub username.</p>`;
  }
});
