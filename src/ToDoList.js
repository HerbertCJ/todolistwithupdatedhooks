import { useEffect, useState } from 'react';

import './ToDoList.css'

export default function Container() {
    const [list, setList] = useState([])
    const [task, setTask] = useState('')

    return (
        <div className="main">
            <form action="#">
                <h3>To Do List</h3>
                <p>Write down here your note</p>     
                <input type="text" />           
                <button>Add</button>
            </form>
            <div>               
            </div>
        </div>
    )

}