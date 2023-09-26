const textInput = document.querySelector(".input1");
const addButton = document.querySelector(".button1");
let itemContainer = document.querySelector(".item-container");
const searchButton = document.querySelector(".button2");





const completeTodo = (parText, editButton) => {
    parText.classList.toggle("line-through");
    editButton.setAttribute("disabled", "disabled");
}

let todoList1 = [
	 {
        todo: "Eat breakfast",
        isDone: false
    },
    {
        todo: "Get lunch",
        isDone: true
    }

];

var isLocalData = localStorage.getItem("todoTask");
if(isLocalData !== null) {
	todoList1 = JSON.parse(isLocalData);
	// createTodoElement(item);
}



const createTodoElement = (item) => {

	// to create div of class .list
	const listItem = document.createElement("div");

	//to add class to the above div
	listItem.classList.add("list");

	//to add .list into .item-container
	itemContainer.appendChild(listItem);

	// to create another div with class .listP
	const listParagraph = document.createElement("div");
	listParagraph.classList.add("listP");
	listItem.appendChild(listParagraph);

	// to create p element
	const parText = document.createElement("p");

	// to give the above paragraph a value
	parText.innerText = item.todo;
	listParagraph.appendChild(parText);

	//to add double click event to paragraph
	parText.addEventListener("dblclick", () =>{
		completeTodo(parText, editButton);
	})


	// to create div for button
	const divButton = document.createElement("div");
	divButton.classList.add("listB");
	listItem.appendChild(divButton);

	//to create edit button
	const editButton = document.createElement("button");
	divButton.appendChild(editButton);

	//to create img for the edit button
	const editImage = document.createElement("img");
	editImage.src = "edit1.png";
	editButton.appendChild(editImage);

	//add click event to edit-button here
	editButton.addEventListener("click", () => {
		textInput.value = parText.innerText;
		listItem.remove();
	})


	//to create delete button
	const delButton = document.createElement("button");
	divButton.appendChild(delButton);


	//to create img for the delete button
	const delImage = document.createElement("img");
	delImage.src = "delete.png";
	delButton.appendChild(delImage);

	//add click event to delete button
	delButton.addEventListener("click", () => {



			const text2 = listItem.querySelector("p").innerText

			todoList1 = todoList1.filter((todo1) => {
				
				return todo1.todo.trim() !== text2
			})

			console.log(todoList1)
		
		listItem.remove();
		// todoList1.splice(index, 1);
		localStorage.setItem("todoTask", JSON.stringify(todoList1));

	
		
	})
 

	if (item.isDone) {
		completeTodo(parText, editButton);
	}

}


function createTodoListElement (todoList1) {

    todoList1.forEach(item => createTodoElement(item));
    console.log(todoList1);

}

createTodoListElement(todoList1); 

addButton.addEventListener("click", () => {

	//to check if text-input is empty
	if (textInput.value.trim().length === 0 ) 
		return;

	let todoObject = {
        todo: textInput.value,
        isDone: false
    };
    todoList1.push(todoObject);
    localStorage.setItem("todoTask", JSON.stringify(todoList1));

	createTodoElement(todoObject);
	textInput.value = " ";

})	

const allList = document.querySelectorAll(".item-container .list");

const filterItems = (searchText) => {

	// const allList = document.querySelectorAll(".item-container .list");
	// const searchTerm = textInput.value.toLowerCase();

	allList.forEach((item => {

		let text = item.querySelector("p");

		if(text.innerText.toLowerCase().includes(searchText)) {
			return;

		} else {
			item.classList.add("hide");
		}

	}));

}

const displayAllItems = () => {

	allList.forEach((item => {

		item.style.display = "flex";

	}));	


}

searchButton.addEventListener("click", (e) => {
	const searchText = textInput.value.toLowerCase();

	if(searchText.trim() === "") {
		displayAllItems();
		// console.log("cat")
	} else {
		filterItems(searchText);
	}
});




















