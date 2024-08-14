class FlashCardApp {
  constructor() {
    this.addBtn = document.getElementById("add-btn");
    this.wrapper = document.getElementById("wrapper");
    this.input = document.getElementById("input");

    // Bind the event listener
    this.addBtn.addEventListener("click", (e) => this.addNewNote(e));
  }

  addNewNote(e) {
    e.preventDefault();

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "mx-4", "my-3");

    const card = document.createElement("div");
    card.classList.add("card-body");
    if (this.input.value === "") {
      card.textContent = "New cards set";
    } else {
      card.textContent = this.input.value;
      this.input.value = "";
    }

    cardDiv.appendChild(card);
    this.wrapper.appendChild(cardDiv);
  }
}

// Initialize the FlashCardApp
const flashCardApp = new FlashCardApp();
