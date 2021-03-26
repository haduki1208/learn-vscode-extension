const textBoxElement = document.querySelector("#textBox");
const submitElement = document.querySelector("#submit");
const listElement = document.querySelector("#list");

submitElement.addEventListener("click", () => {
  const { value } = textBoxElement;
  if (!value) {
    return;
  }

  const li = document.createElement("li");
  li.textContent = value;
  listElement.appendChild(li);
});
