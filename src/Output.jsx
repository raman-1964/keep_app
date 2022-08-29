import React from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

function Output(props) {

  const deletei = () => {
    props.deleteItem(props.id);
  }

  const editI = () => {
    props.editItem(props.id);
  }

  return (
    <>

      <div className="card-cont">
        <div className="cards"  >
          <h3>{props.titleContent}</h3>
          <p>{props.textContent}</p>
        </div>
        <hr />
        <div className="button_cnt">
          <button onClick={deletei}> <DeleteOutlineIcon /> </button>
          <button onClick={editI}> <ModeEditOutlineIcon /> </button>
        </div>
      </div>

    </>
  )

}

export default Output;