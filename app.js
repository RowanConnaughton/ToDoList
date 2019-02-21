//define UI variables

const form = document.querySelector('#form-submit');

const taskLists = document.querySelector('#todo');

const taskList = document.querySelector('#sortable1');

const progressList = document.querySelector('#sortable2');

const doneList = document.querySelector('#sortable3');

const clearBtn = document.querySelector('.clear-tasks');

const taskInput = document.querySelector('#task');

//load all event listeners

loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('click', addTask);
    //remove task event
    taskLists.addEventListener('click', removeTask);
    //clear tasks event
    clearBtn.addEventListener('click', clearTasks);


}


//get tasks from local Storage
function getTasks() {

    let tasks;
    let progress;
    let done;

    getFromLocal(tasks, 'tasks', 'deep-purple', taskList);
    getFromLocal(progress, 'progress', 'indigo', progressList);
    getFromLocal(done, 'done', 'blue', doneList);

    //get todos from local storage
    function getFromLocal(array, arrayName, color, listName) {
        

        if (localStorage.getItem(arrayName) === null) {

            array = [];
        } else {

            array = JSON.parse(localStorage.getItem(arrayName));
        }

        array.forEach(function (task) {

            //create li element
            const li = document.createElement('li');

            //add class
            li.classList.add("collection-item", color, "darken-2", "white-text");

            //create text and append to li
            li.appendChild(document.createTextNode(task));

            //create new link element
            const link = document.createElement('a');
            //add class
            link.className = 'delete-item secondary-content';
            //add icon
            link.innerHTML = '<i class="fas fa-times"></i>';
            //append link to li
            li.appendChild(link);
            //append li to ul
            listName.appendChild(li);

        });
    }


}



//add task
function addTask(e) {

    if (taskInput.value === '') {
        alert('Add task');

    } else {

        //create li element
        const li = document.createElement('li');

        //add class
        li.classList.add("collection-item", "deep-purple", "darken-2", "white-text");

        //create text and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon
        link.innerHTML = '<i class="fas fa-times"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);

        //store in local storage
        todo.options.onAdd(li);


        //clear input
        taskInput.value = '';
    }

    e.preventDefault();
}



//remove task
function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {

        const id = e.target.parentElement.parentElement.parentElement.id;

        if (confirm('Are you sure you want to delete this item?')) {
            e.target.parentElement.parentElement.remove();

            //remove form local storage

            if (id === "sortable1") {

                todo.options.onRemove(e.target.parentElement.parentElement);

            } else if (id === "sortable2") {

                inProgress.options.onRemove(e.target.parentElement.parentElement);

            } else if (id === "sortable3") {

                todoDone.options.onRemove(e.target.parentElement.parentElement);

            }
        }
    }

}



//clear tasks
function clearTasks(e) {

    if (confirm("Are you sure you want to delete ALL Tasks?")) {

        while (taskList.firstChild || progressList.firstChild || doneList.firstChild) {

            if (taskList.firstChild !== null) {
                taskList.removeChild(taskList.firstChild);
            }

            if (progressList.firstChild !== null) {
                progressList.removeChild(progressList.firstChild);
            }

            if (doneList.firstChild !== null) {
                doneList.removeChild(doneList.firstChild);
            }

        }





        //clear tasks form local storage
        clearTasksFromLocalStorage();
    }
}


//clear tasks from local storage
function clearTasksFromLocalStorage() {

    localStorage.clear();
}


//change classes on list add
function changeClasses(item, removeColor1, removeColor2, addColor){

    item.classList.remove(removeColor1);
    item.classList.remove(removeColor2);
    item.classList.add(addColor);

}


//add to local stroage
function addLocalS(item, array, arrayName){

    

    //check if localstorage is null
    if (localStorage.getItem(arrayName) === null) {

        array = [];
    } else {

        //add items to array from localstorage
        array = JSON.parse(localStorage.getItem(arrayName));
    }

    //add new item to array
    array.push(item.innerText);

    //set localstorage
    localStorage.setItem(arrayName, JSON.stringify(array));

}


//remove from local storage
function removeLocalS(item, array, arrayName){

    if (localStorage.getItem(arrayName) === null) {

        array = [];
    } else {

        array = JSON.parse(localStorage.getItem(arrayName));
    }

    array.forEach(function (task, index) {
        if (item.textContent === task) {
            array.splice(index, 1);
        }

    });

    localStorage.setItem(arrayName, JSON.stringify(array));

}


//sortable js
let todo = new Sortable(sortable1, {
    group: 'shared',
    animation: 150,


    onAdd: function (evt) {
        
        

        if (evt.item === undefined) {

            //when item is created

            const itemEl = evt;

            let tasks;
            //add to local storage
            addLocalS(itemEl, tasks, "tasks");
            

        } else {

            //when item is draged into list
            
            const itemEl = evt.item;

            changeClasses(itemEl, "blue", "indigo", "deep-purple");
            
            let tasks;
            //add to local storage
            addLocalS(itemEl, tasks, "tasks");
        }
    },

    onRemove: function (evt) {

        if (evt.item === undefined) {
            //when delete is clicked

            const itemEl = evt;

            let tasks;

            //remove from local storage
            removeLocalS(itemEl, tasks, 'tasks');

            
        } else {

            //when item is draged out of list
            const itemEl = evt.item;

            let tasks;
            //remove from local storage
            removeLocalS(itemEl, tasks, 'tasks');

        }

    }

});


let inProgress = new Sortable(sortable2, {
    group: 'shared',
    animation: 150,


    onAdd: function (evt) {
        let itemEl = evt.item;

        let progress;

        changeClasses(itemEl, "deep-purple", "blue", "indigo");

        
        // document.getElementById('placeholder1').style.display = "none";

        //add to local storage
        addLocalS(itemEl, progress, 'progress');

    },

    onRemove: function (evt) {

        if (evt.item === undefined) {
            //when delete is clicked
 
             const itemEl = evt;
 
             let progress;
 
            //remove from local storage
             removeLocalS(itemEl, progress, 'progress');
            
 
         } else {
             //when draged out of list
 
             let itemEl = evt.item;
 
             let progress;
 
             //remove from local storage
             removeLocalS(itemEl, progress, 'progress');
             
 
         }
    }
});


let todoDone = new Sortable(sortable3, {
    group: 'shared',
    animation: 150,

    onAdd: function (evt) {
        let itemEl = evt.item;
        let done;

        changeClasses(itemEl, "deep-purple", "indigo", "blue");
        
        // document.getElementById('placeholder2').style.display = "none";

        //add to local storage
        addLocalS(itemEl, done, 'done');
    },

    onRemove: function (evt) {

        if (evt.item === undefined) {
            //when delete is clicked
             const itemEl = evt;
 
             let done;
 
             removeLocalS(itemEl, done, 'done');
 
 
         } else {
 
             //when item is draged out of list
 
             const itemEl = evt.item;
 
             let done;
 
             removeLocalS(itemEl, done, 'done');
 
         }
    }

});