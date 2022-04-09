"use strict"
// На странице находится форма: инпут для ввода текста и кнопка.
// Пользователь может ввести что-то в инпут и нажать на кнопку, после этого в списке ниже должна отобразится строка, с тем что было введено в инпуте. После этого инпут в форме должен очистится
// Добавить в каждую строку кнопку “Delete”, при клике на которую элемент удаляется из списка
// Если пользователь нажимает на кнопку “Add” - а инпут пустой, то выводить ошибку. Ошибка должна исчезать - если пользователь снова начал вводить текст в инпут.
// HTML структура, которая должна быть:
// <form>
// 	<input type="text" />
// 	<button type="submit">Add</button>
// </form>
// <ul id="list"></ul>
// Добавлять атрибуты, классы и тд можно по своему усмотрению

const container = document.querySelector(".container");
const form = document.forms.addItem;
const input = form.input;
const select = form.select;
const button = form.querySelector("button");
const errorMessage = document.querySelector(".error_message");

const addItem = () => {
    let list = document.querySelector(`.list`);

    let listItem = document.createElement('li');
    select.selectedIndex ? list.prepend(listItem) : list.append(listItem);
    listItem.className = "list_item";
    listItem.innerHTML = input.value;

    let markButton = document.createElement('button');
    listItem.append(markButton);
    markButton.className = "markButton";
    markButton.innerHTML = `Mark`;

    let deleteButton = document.createElement('button');
    listItem.append(deleteButton);
    deleteButton.className = "delete_button";
    deleteButton.innerHTML = `X`;

    form.reset();
    showCountItems();
}

form.onsubmit = (event) => {
  event.preventDefault();

  if (input.value.trim().length === 0) {
    input.classList.add("error");
    errorMessage.innerHTML = "Nickname field is required";
    return;
  }
  addItem();
}

input.onfocus = () => {
  const isErrorField = input.classList.contains("error");
if (isErrorField) {
      input.classList.remove("error");
      errorMessage.innerHTML = "";
    }
}

container.addEventListener("click", (event) => {
    const isRemoveButton = event.target.className === "delete_button";
    if (isRemoveButton) {
      event.target.closest(".list_item").remove();
      showCountItems();
      }
});

container.addEventListener("click", (event) => {
  const markButtonClick = event.target.className === "markButton";
  if (markButtonClick) {
    let markedItem = event.target.closest(".list_item");
    markedItem.classList.toggle("markedItem");
    markedItem.classList.contains("markedItem") ? event.target.innerHTML = "Unmark" : event.target.innerHTML = "Mark";
    }
});

const showCountItems = () => {
  let count = document.querySelectorAll(".list_item").length;
  document.querySelector(".title").innerHTML = `ToDo list (${count} items);`;
}

showCountItems();