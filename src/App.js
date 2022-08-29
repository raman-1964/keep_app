import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Output from "./Output";
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const localData = () => {
  const fst = localStorage.getItem("mykeep");

  if (fst) return JSON.parse(fst);
  return [];
}

function App() {

  const [note, setNote] = useState({
    title: "",
    text: ""
  })
  const [item, setItem] = useState(localData());
  const [toggle, setToggle] = useState(false);
  const [editId, seteditId] = useState();

  const addItem = () => {
    if (toggle) {
      setItem(item.map((cur) => {
        if (cur.id === editId)
          return {
            ...cur,
            title: note.title,
            text: note.text
          }
        return cur;
      }))
      setToggle(false);
    } else {
      setItem((prev) => {
        const fnote = {
          ...note,
          id: new Date().getTime()
        }
        return [...prev, fnote]
      })
    }


    setNote({
      title: "",
      text: ""
    })
  }

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setNote((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const onDelete = (id) => {
    setItem((prev) =>
      prev.filter((cur) => {
        return cur.id !== id;
      })
    )
  }

  const onEdit = (id) => {
    const editedItem = item.find((cur) => {
      return cur.id === id;
    })
    const { title, text } = editedItem;
    seteditId(id);
    setToggle(true);
    setNote({ title, text })
  }

  useEffect(() => {
    localStorage.setItem("mykeep", JSON.stringify(item));
  }, [item])

  return (
    <>
      <Navbar />
      <div className="input">
        <input type="text" placeholder="title..." autoComplete="off" name="title" value={note.title} onChange={inputEvent} />
        <textarea cols="" rows="8" placeholder="enter text..." name="text" value={note.text} onChange={inputEvent} />
        <button onClick={addItem}>{toggle ? <ModeEditOutlineIcon /> : <AddIcon />} </button>
      </div>
      <div className="output">
        {
          item.map((cur, ind) => {
            return (<Output
              key={ind}
              id={cur.id}
              titleContent={cur.title}
              textContent={cur.text}
              deleteItem={onDelete}
              editItem={onEdit}
            />)
          })
        }
      </div>
    </>
  );
}

export default App;