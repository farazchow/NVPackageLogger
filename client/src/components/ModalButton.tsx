import React , {useState} from "react";
import Modal from "react-modal";
import '../css/addbutton.css';
import { AddDeskItemsForm } from "./AddDeskItemsForm";
import App from "../../App"




export const ModalButton = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    
    return (
        <div className="modalButton">
            <button onClick = {() => setModalIsOpen(true)}>Add Desk Items</button>
            {/* <Modal isOpen={modalIsOpen} onRequestClose = {()=> setModalIsOpen(false)}> */}
            <Modal isOpen={modalIsOpen} >
                <h2>Modal title</h2>
                <AddDeskItemsForm id="modalId"/>
                <div>
                    <button onClick={()=> setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
        </div>

    );
}

