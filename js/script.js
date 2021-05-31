const userName = "Lorica7";

const overview = document.querySelector(".overview");
const newDiv = document.createElement('div');
const ul = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");


const getUser = async () => {
    const url = `https://api.github.com/users/${userName}`;
    const data = await fetch(url);
    const resData = await data.json();
    console.log(resData)
   displayUser(resData)
}

function displayUser(data) {
    newDiv.classList.add("user-info");

    const number = data.public_repos;
    const photo = data.avatar_url;

    createPicEl(photo);
    createNewEl("Name", data.name);
    createNewEl("Bio", data.bio);
    createNewEl("Location", data.location);
    createNewEl("Number of Repos", number);

  overview.append(newDiv)
}

function createNewEl(text, dataItem) {
    const strong = document.createElement("strong");
    const pTag = document.createElement("p");
    pTag.append(strong);
    strong.innerText = `${text}: `;
    const textN = document.createTextNode(dataItem);
    pTag.classList.add("pStyle");
    pTag.append(textN);
    newDiv.append(pTag);
}

function createPicEl(data) {
    let fig = document.createElement("figure");
    let img = document.createElement("img");

    img.setAttribute("src", data);
    img.setAttribute("alt", "user avatar");
    
    fig.append(img);
    newDiv.append(fig);
}


const getRepos = async () => {
    const url = `https://api.github.com/users/${userName}/repos?sort=update&per_page=100`;
    const data = await fetch(url);
    const resData = await data.json();
    console.log(resData)
    displayRepos(resData);
}

function displayRepos(repos){
    repos.forEach(function (item) {
        const li = document.createElement("li");
        li.classList.add("repo");

        const heading = document.createElement("h3");
        heading.innerText = item.name;

        li.append(heading);
        ul.append(li);
})

}

const repoList = ul.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        console.log(typeof(repoName));
        getInfo(repoName);
    }
})

const getInfo = async function (repoName) {
    const data = await fetch(`https://api.github.com/users/${userName}/repos/${userName}/${repoName}`);
    const repoInfo = await data.json();
    console.log(repoInfo)
}



getUser();

getRepos();

