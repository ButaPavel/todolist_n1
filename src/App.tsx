import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TasksType = {
[key:string]: Array<TaskType>
}
type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
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


    function removeTask(id: string, todolistsID: string) {
        let todolistTask = tasks[todolistsID]
        tasks[todolistsID] = todolistTask.filter(task => task.id != id)
        setTasks({...tasks});
    }

    function addTask(title: string, todolistsID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistsID]
        tasks[todolistsID] = [task, ...todolistTasks]
        setTasks({...tasks})

    }

    function changeStatus(taskId: string, isDone: boolean, todolistsID: string) {
        let task = tasks[todolistsID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todolistsID: string) {
        let todolist = todolists.find(lt => lt.id === todolistsID);
        if (todolist) {
            todolist.filter = value;
        }
        setTodolists([...todolists]);
    }

    return (
        <div className="App">

            {todolists.map(lt => {
                let allTodolistTasks = tasks[lt.id]
                let tasksForTodolist = allTodolistTasks;

                if (lt.filter === "active") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                }
                if (lt.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                }

                return <Todolist
                    key={lt.id}
                    todolistsID={lt.id}
                    title={lt.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={lt.filter}
                />
            })}

        </div>
    );
}

export default App;
