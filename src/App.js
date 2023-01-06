import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import Modal from "./modalComponent"
import { Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <>
      <div class="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div >
          <Link to={{ pathname: "/a", state: { label: "All Contacts" } }}  >
            <Button variant="primary" size="xxl" className='btn-a'>
              Modal A
            </Button>
          </Link>
          <Link to={{ pathname: "/b", state: { label: "US Contacts", country: 226 } }} >
            <Button variant="secondary" size="xxl" className='ml-4 btn-b'>
              Modal B
            </Button>
          </Link>
        </div>
      </div>
      <div className="App">
        <div>
          <Route exact key={1} path="/a" component={Modal} />
          <Route exact key={2} path="/b" component={Modal} />
        </div>
      </div>
    </>
  );
}
export default App;
