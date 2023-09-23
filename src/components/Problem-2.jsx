import React, { useEffect, useState } from "react";
import { ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Problem2 = () => {
    const [showModalA, setShowModalA] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [showContactDetail, setShowContactDetail] = useState(false);
    const [clickedContact, setClickedContact] = useState({});
    const [allContacts, setAllContacts] = useState([]);
    const [tempAllContacts, setTempAllContacts] = useState([])
    const [tempUSContacts, setTempUSContacts] = useState([])
    const [usContacts, setUSContacts] = useState([]);
    const [checked, setChecked] = useState(false);

    const handleClose = () => {
        setShowModalA(false);
        setShowModalB(false);
    };
    const handleShow = (modal) => {
        if (modal === "A") {
            setShowModalA(true);
            setShowModalB(false);
        } else {
            setShowModalB(true);
            setShowModalA(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://contact.mediusware.com/api/contacts/");
            const data = await res.json();
            setAllContacts(data.results);
            const usContactRes = await fetch(
                "https://contact.mediusware.com/api/country-contacts/United%20States/"
            );
            const usContactData = await usContactRes.json();
            setUSContacts(usContactData.results);
        };
        fetchData();
    }, []);

    const handleSelectedContact = (contact) => {
        console.log(contact.phone);
        setShowContactDetail(true);
        setClickedContact(contact);
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

                    <div className="d-flex justify-content-center gap-3">
                        <button
                            className="btn btn-lg btn-outline-primary"
                            type="button"
                            onClick={() => handleShow("A")}
                        >
                            All Contacts
                        </button>
                        <button
                            className="btn btn-lg btn-outline-warning"
                            type="button"
                            onClick={() => handleShow("B")}
                        >
                            US Contacts
                        </button>
                    </div>
                    <Modal scrollable={false} backdrop={false} show={showModalA || showModalB} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{
                                showModalA ? <>All contacts</> : <>US Contacts</>
                            }</Modal.Title>
                        </Modal.Header>
                        <Modal.Body scrollable={true} >
                            {showModalA
                                ? allContacts.map((contact) => (
                                    <div style={{ textAlign: "center", marginBottom: "2px" }} key={contact.id}>
                                        <Button style={{ width: "100%" }} onClick={() => handleSelectedContact(contact)} variant="light">{contact.phone}</Button>
                                    </div>
                                ))
                                : usContacts.map((contact) => (
                                    <div style={{ textAlign: "center", marginBottom: "2px" }} key={contact.id}>
                                        <Button style={{ width: "100%" }} onClick={() => handleSelectedContact(contact)} variant="light">{contact.phone}</Button>
                                    </div>
                                ))}
                        </Modal.Body>
                        <Modal.Footer >
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                                <ToggleButton
                                    id="toggle-check"
                                    type="checkbox"
                                    variant="outline-primary"
                                    checked={checked}
                                    value="1"
                                    onChange={(e) => {

                                        setChecked(e.currentTarget.checked)
                                        if (e.currentTarget.checked === true) {
                                            if (showModalA) {
                                                const temp = [...allContacts]
                                                setTempAllContacts(temp)
                                                const filteredData = allContacts.filter(contact => contact.id % 2 === 0)
                                                setAllContacts(filteredData)
                                            } else {
                                                const temp = [...usContacts]
                                                setTempUSContacts(temp)
                                                const filteredData = usContacts.filter(contact => contact.id % 2 === 0)
                                                setUSContacts(filteredData)

                                            }
                                        } else {
                                            if (showModalA) {
                                                setAllContacts(tempAllContacts)
                                            } else {
                                                setAllContacts(tempUSContacts)
                                            }

                                        }
                                    }}
                                >
                                    Only Even
                                </ToggleButton>
                                <div>
                                    <button
                                        style={{ backgroundColor: "#46139f", color: "white" }}
                                        className="btn  me-2"
                                        type="button"
                                        onClick={() => handleShow("A")}
                                    >
                                        All Contacts
                                    </button>
                                    <button
                                        style={{ backgroundColor: "#ff7f50" }}
                                        className="btn me-2"
                                        type="button"
                                        onClick={() => handleShow("B")}
                                    >
                                        US Contacts
                                    </button>
                                    <button
                                        style={{ backgroundColor: "#46139f", color: "white" }}
                                        className="btn  "
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>




                        </Modal.Footer>
                    </Modal>


                    {/* --------------------Contact details Modal------------------------ */}
                    <Modal
                        style={{ color: "white" }}
                        show={showContactDetail}
                        onHide={() => setShowContactDetail(false)}
                    >
                        <Modal.Header style={{ backgroundColor: "#46139f" }} closeButton>
                            <Modal.Title>Contact Id: {clickedContact?.id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ backgroundColor: "#46139f" }}>
                            <div>
                                <h4>Phone: {clickedContact?.phone}</h4>
                                <p>{clickedContact?.country?.name}</p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: "#46139f" }}>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setShowContactDetail(false);
                                }}
                            >
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Problem2;
