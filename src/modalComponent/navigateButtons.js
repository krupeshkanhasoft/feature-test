import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const NavigateButtons = () => {
    return (
        <div >
            <Link to={{ pathname: "/a", state: { label: "All Contacts" } }}  >
                <Button variant="primary" size="xxl" className='ml-4 btn-a' >
                    All Contacts
                </Button>
            </Link>
            <Link to={{ pathname: "/b", state: { label: "US Contacts", country: 226 } }} >
                <Button variant="primary" size="xxl" className='ml-4 btn-b'>
                    US Contacts
                </Button>
            </Link>
            <Link to={"/"}>
                <Button variant="secondary" size="xxl" className='ml-4 bg-white btn-close '>
                    Close
                </Button>
            </Link>
        </div>
    );
}

export default NavigateButtons