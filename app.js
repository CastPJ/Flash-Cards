class FlashCardApp {
  constructor() {
    this.addBtn = document.getElementById("add-btn");
    this.clearBtn = document.getElementById("clear-btn");
    this.wrapper = document.getElementById("wrapper");
    this.input = document.getElementById("input");

    this.loadSetsFromLocalStorage();

    // Bind the event listeners
    this.addBtn.addEventListener("click", (e) => this.addNewSet(e));
    this.clearBtn.addEventListener("click", () => {
      localStorage.clear();
      this.wrapper.innerHTML = "";
    });
  }

  addNewSet(e) {
    e.preventDefault();
    const setTitle =
      this.input.value === "" ? "New cards set" : this.input.value;
    this.saveSetToLocalStorage(setTitle);
    this.input.value = "";
    this.createSetElement(setTitle);
  }

  createSetElement(title) {
    // Create the main card div
    const setDiv = document.createElement("div");
    setDiv.classList.add("card-mod", "mx-4", "my-3");

    // Create the card body div
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.textContent = title;

    // Create the dropdown button
    const dropdownButton = document.createElement("button");
    dropdownButton.type = "button";
    dropdownButton.classList.add("btn", "btn-primary", "dropdown-toggle");
    dropdownButton.setAttribute("data-bs-toggle", "dropdown");

    // Create the dropdown menu
    const dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu");

    // Create the dropdown items
    const changeTitleItem = document.createElement("li");
    const changeTitleLink = document.createElement("a");
    changeTitleLink.classList.add("dropdown-item");
    changeTitleLink.href = "#";
    changeTitleLink.textContent = "Change title";
    changeTitleItem.appendChild(changeTitleLink);

    const changeColorItem = document.createElement("li");
    const changeColorLink = document.createElement("a");
    changeColorLink.classList.add("dropdown-item");
    changeColorLink.href = "#";
    changeColorLink.textContent = "Change color";
    changeColorItem.appendChild(changeColorLink);

    const deleteSetItem = document.createElement("li");
    const deleteSetLink = document.createElement("a");
    deleteSetLink.classList.add("dropdown-item");
    deleteSetLink.href = "#";
    deleteSetLink.textContent = "Delete set";
    deleteSetItem.appendChild(deleteSetLink);

    // Append items to the dropdown menu
    dropdownMenu.appendChild(changeTitleItem);
    dropdownMenu.appendChild(changeColorItem);
    dropdownMenu.appendChild(deleteSetItem);

    // Append elements to the main card div
    setDiv.appendChild(cardBody);
    setDiv.appendChild(dropdownButton);
    setDiv.appendChild(dropdownMenu);

    // Add event listeners for dropdown items
    deleteSetLink.addEventListener("click", () =>
      this.deleteSet(setDiv, title)
    );

    this.wrapper.appendChild(setDiv);
  }

  deleteSet(setDiv, title) {
    if (confirm("Are you sure you want to delete this set?")) {
      this.removeSetFromLocalStorage(title);
      setDiv.remove();
    }
  }

  saveSetToLocalStorage(setTitle) {
    let sets = JSON.parse(localStorage.getItem("cardSet")) || [];
    sets.push(setTitle);
    localStorage.setItem("cardSet", JSON.stringify(sets));
  }

  removeSetFromLocalStorage(title) {
    let sets = JSON.parse(localStorage.getItem("cardSet")) || [];

    sets = sets.filter((set) => set !== title);

    localStorage.setItem("cardSet", JSON.stringify(sets));
  }

  loadSetsFromLocalStorage() {
    let sets = JSON.parse(localStorage.getItem("cardSet")) || [];
    sets.forEach((setTitle) => this.createSetElement(setTitle));
  }
}

// Initialize the FlashCardApp
const flashCardApp = new FlashCardApp();
