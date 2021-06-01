const userName = "Lorica7";

const overview = document.querySelector(".overview");
const newDiv = document.createElement('div');
const ul = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewBtn = document.querySelector('.view-repos');
const inputFilter = document.querySelector(".filter-repos");

function makePTag() {
    const newP = document.createElement("p");
    return newP;
}


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
    const data = await fetch(`https://api.github.com/repos/${userName}/${repoName}`);
    const repoInfo = await data.json();
    console.log(repoInfo)
   
    
    const getLanguages = await fetch(repoInfo.languages_url);
    const languageData = await getLanguages.json();
  
   
    const langList = [];
    for (const item in languageData) {
        langList.push(item);
    }
    displayRepo(repoInfo, langList);
}
  

function displayRepo(repoInfo, languages) {
    inputFilter.classList.remove("hide");
    repoData.innerHTML = '';

    const heading = document.createElement('h3');
    heading.innerText = `Name: ${repoInfo.name}`;
    repoData.append(heading);

    const desc = makePTag().innerText = `Description: ${repoInfo.description}`;
    repoData.append(desc);

    const breaker = document.createElement("br");
    repoData.append(breaker);

    const languageP = makePTag().innerText = `Languages: ${languages.join(", ")}`;
    repoData.append(languageP);
    const breaker2 = document.createElement("br");
    repoData.append(breaker2);

    const aTag = document.createElement("a");
    aTag.setAttribute("class", "visit");
    aTag.setAttribute("href", repoInfo.html_url);
    aTag.setAttribute("target", "_blank");
    aTag.setAttribute("rel", "noreferrer noopener");
    aTag.innerText = "View Repo on GitHub";
    const breaker3 = document.createElement("br");
    repoData.append(aTag);
    repoData.append(breaker3);

    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
    viewBtn.classList.remove("hide");
  
}

viewBtn.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    viewBtn.classList.add("hide");
})

getUser();

getRepos();

