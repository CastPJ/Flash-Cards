class FlashCardApp {
  constructor() {
    this.addBtn = document.getElementById("add-btn");
    this.wrapper = document.getElementById("wrapper");
    this.input = document.getElementById("input");

    this.loadSetsFromLocalStorage();

    // Bind the event listener
    this.addBtn.addEventListener("click", (e) => this.addNewSet(e));
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
    const setDiv = document.createElement("div");
    setDiv.classList.add("card", "mx-4", "my-3");

    const set = document.createElement("div");
    set.classList.add("card-body");
    set.textContent = title;

    setDiv.appendChild(set);
    this.wrapper.appendChild(setDiv);
  }

  saveSetToLocalStorage(setTitle) {
    let sets = JSON.parse(localStorage.getItem("cardSet")) || [];
    sets.push(setTitle);
    localStorage.setItem("cardSet", JSON.stringify(sets));
  }

  loadSetsFromLocalStorage() {
    let sets = JSON.parse(localStorage.getItem("cardSet")) || [];
    sets.forEach((setTitle) => this.createSetElement(setTitle));
  }
}

// Initialize the FlashCardApp
const flashCardApp = new FlashCardApp();
