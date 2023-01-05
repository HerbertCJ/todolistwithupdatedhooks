import { useState, useEffect } from 'react';

import './ToDoList.css'

export default function ToDoList() {

    const [list, setList] = useState([])
    const [task, setTask] = useState('')
    const [taskEdit, setTaskEdit] = useState(null)
    const [editText, setEditText] = useState('')

    useEffect(() => {
        const json = localStorage.getItem("list");
        const lodadedList = JSON.parse(json);      
        if (lodadedList) {            
            setList(lodadedList);
        }
    }, []);

    useEffect(() => {
        const json = JSON.stringify(list);
        localStorage.setItem("list", json);        
    }, [list]);

    function handleSubmit(e) {
        e.preventDefault();
        let valid = validation(task)
        if (valid === 1) return;


        let newTask = {
            id: new Date().getTime(),
            text: task,
        }

        setList([...list, newTask])
        setTask('')
    }

    function handleChange(e) {
        setTask(e.target.value)
    }

    function handleDelete(index) {
        let newList = [...list]
        newList.splice(index, 1)
        setList([...newList])
    }

    function editItem(id, editText) {
        let valid = validation(editText)
        if (valid === 1) return;

        const updatedList = [...list].map((item) => {
            if (item.id === id) {
                item.text = editText;
            }
            return item;
        })
        setList(updatedList)
        setTaskEdit(null)
        setEditText('')
    }

    function validation(taskExist) {
        if (taskExist.trim() === '') return 1;
        let checkList = [...list]
        let flag = 0;
        checkList.map((item) => {
            if (item.text === taskExist) {
                flag = 1;
            }
            return 0;
        })
        if (flag === 1) {
            return 1;
        } else {
            return 0;
        }
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
                {list.map((item, index) => (
                    <div key={item.id} className="list">
                        <div>
                            {taskEdit === item.id ?
                                (<input type="text"
                                    onChange={(e) => setEditText(e.target.value)}
                                    value={editText} />)
                                :
                                (<div className="item">{item.text}</div>)}
                        </div>

                        <div>
                            {taskEdit === item.id ? (<button onClick={() => editItem(item.id, editText)} className="submitedit">Submit Edit</button>) : (<button onClick={() => setTaskEdit(item.id)}>Edit</button>)}
                        </div>

                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
