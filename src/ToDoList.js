import { useEffect, useState } from 'react';

import './ToDoList.css'

export default function Container() {
    const [list, setList] = useState([])
    const [task, setTask] = useState('')

    function handleChange(e) {
        setTask(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        let newTask = {
            id: new Date().getTime(),
            text: task,
        }

        setList([...list, newTask])
        setTask('')
    }

    function handleDelete(index) {
        let newList = [...list]
        newList.splice(index, 1)
        setList([...newList])
    }
    return (
        <div className="main">
            <form action="#" onSubmit={handleSubmit}>
                <h3>To Do List</h3>
                <p>Write down here your note</p>
                <input type="text" onChange={handleChange} value={task} />
                <button>Add</button>
            </form>
            <div>
                {list.map(
                    (item, index) => (
                        <div key={item.text}>
                            {item.text}
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                        
                    ))}
            </div>
        </div>
    )

}