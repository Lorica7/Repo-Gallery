const userName = "Lorica7";

const overview = document.querySelector(".overview");

const getUser = async function () {
    const url = `https://api.github.com/users/${userName}`;
    const data = await fetch(url);
    const resData = await data.json();
    console.log(resData)
   displayUser(resData)
}

function displayUser(data) {
    const newDiv = document.createElement('div');
    newDiv.classList.add("user-info");

    const number = data.public_repos;

    createNewEl("Name", data.name);
    createNewEl("Bio", data.bio);
    createNewEl("Location", data.location);
    createNewEl("Number of Repos", number)

}


function createNewEl(text, dataItem) {
    const strong = document.createElement("strong");
    const pTag = document.createElement("p");
    pTag.append(strong);
    strong.innerText = `${text}: `;
    const textN = document.createTextNode(dataItem);
    pTag.append(textN);
    overview.append(pTag);
}

getUser();