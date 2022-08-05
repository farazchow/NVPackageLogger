import React , {useState} from "react";
import Modal from "react-modal";
import '../css/addbutton.css';




export function AddButton () {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    
    return (
        <div className="AddButton">
            <button onClick = {() => setModalIsOpen(true)}>Add Desk Items</button>
            <Modal isOpen={modalIsOpen} onRequestClose = {()=> setModalIsOpen(false)}>
                <h2>Modal title</h2>
                <p>Modal Body</p>
                <div>
                    <button onClick={()=> setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
        </div>

    );
}

