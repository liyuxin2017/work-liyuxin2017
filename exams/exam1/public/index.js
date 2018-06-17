( function exam1() {

  let numberOfButton = 0;

  function pageSetup() {
    bindAddAction();
  }

  function bindAddAction() {
    const exam1Button = document.querySelector(".exam1-button");
    exam1Button.addEventListener("click", addButton);
  }

  function addButton() {
    const buttonList = document.querySelector(".button-list");
    numberOfButton++;
    buttonList.innerHTML += `<li><button class="added-button"}>${numberOfButton}</button></li>`;
    bindRemoveAction();
  }

  function bindRemoveAction() {
    const addedButtons = document.querySelectorAll(".added-button");
    addedButtons.forEach(button => {
      button.addEventListener("click", removeButton);
    });
  }

  function removeButton() {
    sendNumberOfButtonToSever(this.innerHTML);
    this.remove();
  }

  function sendNumberOfButtonToSever(number) {
    let url = '/report?button=' + number;
    fetch(url);
  }

  pageSetup();
})();
