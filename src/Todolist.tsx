import React from 'react';
import '../src/App.css';


type PropsType={
    title: string
    tasks: Array<TasksType>
    removeId:(elId:number)=>any
sort:(sor: 'All' | 'Active' | 'Completed')=>any}

type TasksType ={
    id:number
    title:string
    isDone:boolean
}
export function Todolist(props:PropsType) {



    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>

                {props.tasks.map(el=>
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={()=>(props.removeId(el.id))}>x</button>
                    </li>
                )}

                <div>
                    <button onClick={()=>(props.sort('All'))}>All</button>
                    <button onClick={()=>(props.sort('Active'))}>Active</button>
                    <button onClick={()=>(props.sort('Completed'))}>Completed</button>
                </div>
            </div>
        </div>
    );
}


