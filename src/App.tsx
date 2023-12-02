import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string,
    filter: FilterValuesType
}

type TaskStateType = {[key:string]: Array<TaskType>}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState <TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    function removeTask(id: string, todolistID: string) {
        let tasksTodolistID = tasks[todolistID]

        let filteredTasks = tasksTodolistID.filter(t => t.id != id);
        tasks[todolistID] =  filteredTasks

        setTasks({...tasks});
    }

    function addTask(title: string, todolistID: string) {
        let tasksTodolistID = tasks[todolistID]

        let task = {id: v1(), title: title, isDone: false};
        tasks[todolistID] = [task, ...tasksTodolistID];

        setTasks({...tasks});




    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let tasksTodolistID = tasks[todolistID]
         let task = tasksTodolistID.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }


    function changeFilter(value: FilterValuesType, todolistID: string) {
        let todolist = todolists.find(t => t.id === todolistID);
        if (todolist) {
            todolist.filter = value;
        }
        setTodolists([...todolists])
    }


    return (
        <div className="App">
            {
                todolists.map(lt => {

                    let tasksForTodolist = tasks[lt.id];

                    if (lt.filter === "active") {

                        tasksForTodolist = tasks[lt.id].filter(t => t.isDone === false);
                    }
                    if (lt.filter === "completed") {
                        tasksForTodolist = tasks[lt.id].filter(t => t.isDone === true);

                    }
                    return <Todolist
                        key={lt.id}
                        todolistID={lt.id}
                        title={lt.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={lt.filter}
                    />

                })
            }

        </div>
    );
}

export default App;
