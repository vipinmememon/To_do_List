document.addEventListener('DOMContentLoaded',()=>{

    const todoInput=document.getElementById("todo-input");
const addTaskButton=document.getElementById("add-task-btn");

const todoList=document.getElementById("todo-list");

let tasks= JSON.parse(localStorage.getItem('tasks'))||[];   //json.parse convert string to array;  tasks exact that are in setItem

tasks.forEach(task => renderTask(task));

addTaskButton.addEventListener('click',()=>{
    let taskText=todoInput.value.trim();
    if(taskText==="") return ;

    //also  add unique id and property of taskText;

    const newTask={
        id:Date.now(),  //unique id
        text:taskText,
       completed:false
    }
   tasks.push(newTask);
      saveTasks()
      renderTask(newTask);
   todoInput.value="" ; //clear input;

   console.log(tasks);
   

})

//read from local storage

function renderTask(task){   //render is a fancy name use by programmer  means display the things on the DOM
     //console.log(task.text);

     const li=document.createElement("li");
     li.setAttribute("data-id",task.id);
     if(task.completed) li.classList.add('completed');
     li.innerHTML=`
     <span>${task.text}</span>
     <button>delete</button>
     `;
     li.addEventListener('click',(e)=>{
       if(e.target.tagName==='BUTTON') return ;
       task.completed=!task.completed;
       li.classList.toggle('completed');
       saveTasks();
     })

  li.querySelector('button').addEventListener('click',(e)=>{
       e.stopPropagation(); //prevent toggle from firing;
       tasks=tasks.filter((t)=>t.id!=task.id);
       li.remove();
       saveTasks();
  })

    todoList.appendChild(li);
}

//store tasks in an localStorage
function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks)) //json.stringify convertd tasks array into string
}
});