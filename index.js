const dialogboxjs = document.getElementById("dialogboxjs");
const addbtn = document.getElementById("addbtn");
const closebtn = document.getElementById("closebtn");
const todoConatiner = document.querySelector(".content");
const title = document.getElementById('title');
const todo_text = document.getElementById('todo_text');
const error = document.querySelector(".error");

let editMode = -1;

let counter = 0;

let data = JSON.parse(localStorage.getItem("todos")) || [];

counter = data.length;

for (let i = 0; i < data.length; i++) {
    let todotext = `<div class="box" box-id='${i}'>
                        <div class="box-header"> 
                            <div class="heading">
                            <span id="box-text">${data[i].title}</span>
                            </div>
                            <div class="btn-container">
                                <div><i class="fa fa-edit"></i></div>
                                <button>X</button>
                            </div>
                        </div>
                        <textarea>${data[i].text}</textarea>
                    </div>`;
    todoConatiner.innerHTML += todotext;

}

function deletelisteners() {
    const deletearr = document.querySelectorAll(".btn-container button");
    const editarr = document.querySelectorAll(".btn-container i");
    for (let i = 0; i < deletearr.length; i++) {
        deletearr[i].addEventListener("click", function(e) {
            let todo = e.target.closest(".box");
            console.log(todo);
            let id = todo.getAttribute("box-id");
            let data = JSON.parse(localStorage.getItem("todos"));
            let newdata = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].id != id) {} else {
                    newdata.push(data[i]);
                }
            }
            localStorage.setItem("todos", JSON.stringify(newdata));
            todo.classList.add("gayab");
        });
        editarr[i].addEventListener("click", function(e) {
            dialogboxjs.style.display = "flex";
            let todo = e.target.closest(".box");
            let id = todo.getAttribute("box-id");
            editMode = id;
            title.value = todo.querySelector(".box-text").innerText;
            todo_text.value = todo.querySelector(".todo_text").innerText;

        });

    };
}

deletelisteners()

addbtn.addEventListener("click", function() {
    dialogboxjs.style.display = "flex";
    let todo = e.target.closest(".box");
});
closebtn.addEventListener("click", function() {
    dialogboxjs.style.display = "none";
    error.classList.add("gayab");
    todo_text.value = "";
    title.value = "";

});


function todo() {
    if (todo_text.value !== "" || title.value !== "") {

        let todos = JSON.parse(localStorage.getItem("todos")) || [];

        if (editMode !== -1) {
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].id == editMode) {
                    todos[i].title = title.value;
                    todos[i].text = todo_text.value;
                }
            }

            localStorage.setItem("todos", JSON.stringify(todos));

            let todo = document.querySelector(`[box-id='${editMode}']`);
            todo.querySelector("#box-text").innerText = title.value;
            todo.querySelector(".todo_text").innerText = todo_text.value;
            editMode = -1;
            dialogboxjs.style.display = "none";
            return;
        }

        let todotext = `<div class="box" box-id='${counter}'>
                        <div class="box-header"> 
                        <div class="heading">
                          <span id="box-text">${title.value}</span>
                            </div>
                            <div class="btn-container">
                                <div><i class="fa fa-edit"></i></div>
                                <button>X</button>
                            </div>
                        </div>
                        <textarea>${todo_text.value}</textarea>
                    </div>`;
        todoConatiner.innerHTML += todotext;
        deletelisteners();

        todos.push({
            id: counter,
            title: title.value,
            text: todo_text.value
        });
        counter += 1;
        localStorage.setItem("todos", JSON.stringify(todos));

        todo_text.value = "";
        title.value = "";
        dialogboxjs.style.display = "none";
    } else {
        error.classList.remove("gayab");
    }
}