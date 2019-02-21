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

    getTodo();
    getProgress();
    getDone();

    //get todos from local storage
    function getTodo() {
        let tasks;

        if (localStorage.getItem('tasks') === null) {

            tasks = [];
        } else {

            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function (task) {

            //create li element
            const li = document.createElement('li');

            //add class
            li.classList.add("collection-item", "deep-purple", "darken-2", "white-text");

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
            taskList.appendChild(li);

        });
    }

    //get progress list from local storage
    function getProgress() {
        let progress;

        if (localStorage.getItem('progress') === null) {

            progress = [];
        } else {

            progress = JSON.parse(localStorage.getItem('progress'));
            //remove place holder
            // document.getElementById('placeholder1').style.display = "none";;


        }

        progress.forEach(function (task) {

            //create li element
            const li = document.createElement('li');

            //add class
            li.classList.add("collection-item", "indigo", "darken-2", "white-text");

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
            progressList.appendChild(li);

        });
    }

    //get done list from local storage
    function getDone() {
        let done;

        if (localStorage.getItem('done') === null) {

            done = [];
        } else {

            done = JSON.parse(localStorage.getItem('done'));

            // document.getElementById('placeholder2').style.display = "none";
        }

        done.forEach(function (task) {

            //create li element
            const li = document.createElement('li');

            //add class
            li.classList.add("collection-item", "blue", "darken-2", "white-text");

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
            doneList.appendChild(li);

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


//sortable js
let todo = new Sortable(sortable1, {
    group: 'shared',
    animation: 150,


    onAdd: function (evt) {
        
        

        if (evt.item === undefined) {

            const itemEl = evt;

            

            let tasks;

            if (localStorage.getItem('tasks') === null) {

                tasks = [];
            } else {

                tasks = JSON.parse(localStorage.getItem('tasks'));
            }

            tasks.push(itemEl.innerText);

            localStorage.setItem('tasks', JSON.stringify(tasks));

        } else {

            const itemEl = evt.item;

            itemEl.classList.remove("blue");
            itemEl.classList.remove("indigo");
            itemEl.classList.add("deep-purple");

            let tasks;

            if (localStorage.getItem('tasks') === null) {

                tasks = [];
            } else {

                tasks = JSON.parse(localStorage.getItem('tasks'));
            }

            tasks.push(itemEl.innerText);

            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    },
    onRemove: function (evt) {

        if (evt.item === undefined) {
            let itemEl = evt;



            let tasks;

            if (localStorage.getItem('tasks') === null) {

                tasks = [];
            } else {

                tasks = JSON.parse(localStorage.getItem('tasks'));
            }

            tasks.forEach(function (task, index) {
                if (itemEl.textContent === task) {
                    tasks.splice(index, 1);
                }

            });

            localStorage.setItem('tasks', JSON.stringify(tasks));



        } else {


            let itemEl = evt.item;

            let tasks;

            if (localStorage.getItem('tasks') === null) {

                tasks = [];
            } else {

                tasks = JSON.parse(localStorage.getItem('tasks'));
            }

            tasks.forEach(function (task, index) {
                if (itemEl.textContent === task) {
                    tasks.splice(index, 1);
                }

            });

            localStorage.setItem('tasks', JSON.stringify(tasks));


        }

    }




});

let inProgress = new Sortable(sortable2, {
    group: 'shared',
    animation: 150,


    onAdd: function (evt) {
        let itemEl = evt.item;
        itemEl.classList.remove("deep-purple");
        itemEl.classList.remove("blue");
        itemEl.classList.add("indigo");

        // document.getElementById('placeholder1').style.display = "none";


        let progress;

        if (localStorage.getItem('progress') === null) {

            progress = [];
        } else {

            progress = JSON.parse(localStorage.getItem('progress'));
        }

        progress.push(itemEl.innerText);

        localStorage.setItem('progress', JSON.stringify(progress));

    },
    onRemove: function (evt) {

        if (evt.item === undefined) {
            let itemEl = evt;



            let progress;

            if (localStorage.getItem('progress') === null) {

                progress = [];
            } else {

                progress = JSON.parse(localStorage.getItem('progress'));
            }

            progress.forEach(function (task, index) {
                if (itemEl.textContent === task) {
                    progress.splice(index, 1);
                }

            });

            localStorage.setItem('progress', JSON.stringify(progress));



        } else {

            let itemEl = evt.item;

            let progress;

            if (localStorage.getItem('progress') === null) {

                progress = [];
            } else {

                progress = JSON.parse(localStorage.getItem('progress'));
            }

            progress.forEach(function (task, index) {
                if (itemEl.textContent === task) {
                    progress.splice(index, 1);
                }

            });

            localStorage.setItem('progress', JSON.stringify(progress));

        }
    },
});

let todoDone = new Sortable(sortable3, {
    group: 'shared',
    animation: 150,

    onAdd: function (evt) {
        let itemEl = evt.item;
        itemEl.classList.remove("deep-purple");
        itemEl.classList.remove("indigo");
        itemEl.classList.add("blue");


        // document.getElementById('placeholder2').style.display = "none";

        let done;

        if (localStorage.getItem('done') === null) {

            done = [];
        } else {

            done = JSON.parse(localStorage.getItem('done'));
        }

        done.push(itemEl.innerText);

        localStorage.setItem('done', JSON.stringify(done));
    },
    onRemove: function (evt) {

        if (evt.item === undefined) {
            var itemEl = evt;



            let done;

            if (localStorage.getItem('done') === null) {

                done = [];
            } else {

                done = JSON.parse(localStorage.getItem('done'));
            }

            done.forEach(function (task, index) {
                if (itemEl.textContent === task) {
                    done.splice(index, 1);
                }

            });

            localStorage.setItem('done', JSON.stringify(done));



        } else {

            var itemEl = evt.item;

            let done;

            if (localStorage.getItem('done') === null) {

                done = [];
            } else {

                done = JSON.parse(localStorage.getItem('done'));
            }

            done.forEach(function (task, index) {
                if (itemEl.textContent === task) {
                    done.splice(index, 1);
                }

            });

            localStorage.setItem('done', JSON.stringify(done));

        }
    },

});