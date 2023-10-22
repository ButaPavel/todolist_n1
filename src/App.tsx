import React, {useState} from 'react';
import '../src/App.css';
import {Todolist} from "./Todolist";

function App() {
    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML& CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }]);

    function removeId(elId:number) {
        setTasks(tasks.filter(t=>t.id!==elId))
    }
    let [sorFilterTasks, setFilterTasks] = useState('All')
    let filtersTasks=tasks;


    if (sorFilterTasks === 'Active') {filtersTasks=tasks.filter(t=>t.isDone)}

    if (sorFilterTasks === 'Completed') {filtersTasks=tasks.filter(t=>!t.isDone)}
    function sort (sor: 'All' | 'Active' | 'Completed'){
        setFilterTasks(sor)

    }

    return (
        <div className="App">
            <div>
               <Todolist
                   title = 'What to lear'
                   tasks = {filtersTasks}
                   removeId = {removeId}
                   sort={sort}
               />
            </div>
        </div>
    );
}

export default App;
