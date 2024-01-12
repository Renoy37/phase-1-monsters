let currentPage = 0;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("forward").addEventListener("click", function () {
    currentPage++;
    getMonsters();
  });

  document.getElementById("back").addEventListener("click", function () {
    if (currentPage > 0) {
      currentPage--;
      //console.log("Back button clicked");
      getMonsters();
    } else {
      //console.log("Already on the first page. Cannot go back.");
      alert('"Already on the first page. Cannot go back."');
    }
  });

  getMonsters();
  createMonster();
});

// Rest of your code (getMonsters and createMonster functions)

//function to get the monsters
function getMonsters() {
  fetch("http://localhost:3000/monsters")
    .then((response) => response.json())
    .then((data) => {
      // const dataAmmount = data.slice(0, 50);
      // console.log(dataAmmount);

      const monstersPerPage = 50;

      const startIndex = currentPage * monstersPerPage;
      const endIndex = startIndex + monstersPerPage;
      const dataContent = data.slice(startIndex, endIndex);

      dataContent.forEach((monster) => {
        const name = monster.name;
        const age = monster.age;
        const description = monster.description;

        const toContain = document.getElementById("monster-container");

        const listContainer = document.createElement("div");

        const nameContainer = document.createElement("h1");
        nameContainer.textContent = name;

        const ageConainer = document.createElement("h3");
        ageConainer.textContent = age;

        const descriptionContainer = document.createElement("p");
        descriptionContainer.textContent = description;

        listContainer.appendChild(nameContainer);
        listContainer.appendChild(ageConainer);
        listContainer.appendChild(descriptionContainer);

        toContain.appendChild(listContainer);
      });
    })
    .catch((error) => console.error("Error fetching monsters:", error));
}

//function to create monster input form and send the input data to the db
function createMonster() {
  const container = document.getElementById("create-monster");

  const form = document.createElement("form");
  form.id = "monsters-form";

  const nameInput = document.createElement("input");
  nameInput.id = "name";
  nameInput.placeholder = "name...";

  const ageInput = document.createElement("input");
  ageInput.id = "age";
  ageInput.placeholder = "age...";

  const descriptionInput = document.createElement("input");
  descriptionInput.id = "desc";
  descriptionInput.placeholder = "description...";

  const createButton = document.createElement("button");
  createButton.textContent = "create";

  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descriptionInput);
  form.appendChild(createButton);

  container.appendChild(form);

  const formListen = document.querySelector("#monsters-form");
  formListen.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = document.querySelector("#name").value;
    const ageValue = document.querySelector("#age").value;
    const descriptionValue = document.querySelector("#desc").value;

    newValues = {
      name: nameValue,
      age: ageValue,
      description: descriptionValue,
    };

    formListen.reset();

    //sending a POST request to the local db with the new data
    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newValues),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data successfully sent:", data);
      })
      .catch((error) => {
        console.error("Error sending POST request:", error);
      });
  });
}
