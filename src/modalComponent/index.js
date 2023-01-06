import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as ReactBootStrap from 'react-bootstrap'
import NavigateButtons from "./navigateButtons"
import { Scrollbars } from 'react-custom-scrollbars';
import * as actions from '../store/actions/index';
import { connect } from "react-redux";
import { compose } from 'redux';
import Spinner from 'react-bootstrap/Spinner';
import DetailModal from "./detailModal"

let tempSearch = "";

const ModalComponent = (props) => {

    const [contactList, setContactList] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [country, setCountry] = useState(props?.location?.state?.country || "");
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({});
    const [showEven, setShowEven] = useState(false);
    const { list, loading } = props;

    useEffect(() => {
        setContactList([])
        setPage(1)
        props.getContactList({ page, query, country }, true)
    }, [])

    const handleChange = (e) => {
        setQuery(e.target.value);
        let value = e.target.value;
        tempSearch = e.target.value;
        setTimeout(() => {
            handleChangeProductName(value)
        }, 2000);
    }

    const handleChangeProductName = (search) => {
        if (search === tempSearch) {
            props.getContactList({ page, query: search, country });
            setContactList([])
            setPage(1)
        }
    }

    useEffect(() => {
        if (list && Object.keys(list).length > 0) {
            let newContact = contactList;
            newContact = newContact.concat(Object.values(list));
            setContactList(newContact);
        }
    }, [list])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleChangeProductName(query)
            tempSearch = ""
        }
    }

    return (
        <>
            <Modal show={true} size='lg' >
                <Modal.Header >
                    <Modal.Title>{props?.location?.state?.label} {loading && <Spinner animation="border" role="status" style={{ position: "absolute", right: 24 }} />}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form.Control type="text" placeholder="Search" onChange={handleChange} className={"mb-4"} onKeyPress={handleKeyPress} />
                    <Scrollbars style={{ height: "60vh" }}
                        onScrollFrame={(e) => {
                            if (e.top === 1) {
                                let newPage = page + 1;
                                setPage(newPage)
                                props.getContactList({
                                    page: newPage,
                                    query, country
                                })
                            }
                        }}
                    >
                        <ReactBootStrap.Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contactList && contactList.filter(item => !showEven || (item.id % 2 === 0)).map((item) => (
                                    <tr key={item.id} onClick={() => { setOpen(true); setDetails(item) }}>
                                        <td>{item.id}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>{item.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </ReactBootStrap.Table>
                    </Scrollbars>
                </Modal.Body>

                <Modal.Footer style={{ justifyContent: "space-between" }}>
                    <div >
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Only Even"
                            checked={showEven}
                            onClick={() => setShowEven(!showEven)}
                        />
                    </div>
                    <NavigateButtons />
                </Modal.Footer>
            </Modal>
            <DetailModal item={details} open={open} onClose={() => setOpen(false)} />
        </>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.contactReducer.loading,
        error: state.contactReducer.error,
        list: state.contactReducer.list
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getContactList: (request, clearData) => { dispatch(actions.getContactList(request, clearData)) },
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(ModalComponent);
