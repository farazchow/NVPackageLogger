import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
// import "../styles/App.css"

import { DevUser } from "../server/models/user";

// require("react-bootstrap/lib/NavbarHeader");

class SelectInput extends React.Component<any,any> {
  // generic dropdown menu
  constructor(props: {}){
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
    this.props.onChange(event);
  }

  override render() {
    return (
      <select name={this.props.name} value={this.props.value} onChange={this.handleChange} id={this.props.id}>
        {this.props.options.map(
          (option: any, key: number) => {
            return <option key={key} value={option}>{option}</option>
          }
          )}
      </select>
    )
    }
}

class PackageInputForm extends React.Component<any, any> {
  // TODO: MAKE 'NAMES' A DROPDOWN MENU USING RESIDENT INFO
  constructor(props: {}) {
    super(props);
    this.state = {
      id: '',
      shipper: '',
      resident: '',
      location: '',
      notes: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  handleChange(event: any) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event: any) {
    // TODO: FIGURE OUT HOW TO SUBMIT MONGO FORMS
    /*
    const postURL = 'http://localhost:3000/';
    const date = new Date();
    fetch(postURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          __v: 0,
          _id: this.state.id,
          createdAt: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`,
          name: this.state.resident,
        })
    })
    */
    event.preventDefault();
    if (this.handleValidation()){
      console.log(
        `Tracking: ${this.state.id}\r\n
        Shipper: ${this.state.shipper}\r\n
        Resident: ${this.state.resident}\r\n
        Location: ${this.state.location}\r\n
        Notes: ${this.state.notes}`);
      
      this.setState({
        id: '',
        shipper: '',
        resident: '',
        location: '',
        notes: '',
      })
    }
    else console.log("Must fill out all fields!");
  }

  handleValidation() {
    return Object.keys(this.state).every((key: string) => this.state[key] !== '');
  }

  override render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Tracking: <input type="text" name="id" value={this.state.id} onChange={this.handleChange}/>
        </label>
        <label>
          Shipper: <SelectInput name="shipper" value={this.state.shipper} onChange={this.handleChange} options={["","Amazon","DHL","FedEx","LaserShip","UPS","USPS","Other"]}/>
        </label>
        <label>
          Resident: <input type="text" name="resident" value={this.state.resident} onChange={this.handleChange}/>
        </label>
        <label>
          Location: <SelectInput name="location" value={this.state.location} onChange={this.handleChange} options={["","A-C","D-G","H-J","K-L","M-O","P-R","S-V","W-Z","Closet 1","Closet 2","Closet 3","Closet 4"]}/>
        </label>
        <label>
          Notes: <input type="text" name="notes" value={this.state.notes} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Log Package"/>
      </form>
    )
  }
}

const App = () => {
  /*
   */
  const [data, setData] = useState<DevUser[]>([]);

  // dummy load data for data fetching
  useEffect(() => {
    async function getData() {
      console.log("starting to fetch data");
      const result = await (await fetch("/api/auth")).json();

      console.log("data retrieved", result);
      // console.log("other result is", res);
      setData(result);
    }

    getData();
  }, []);
  return (
    <>
    <br></br>
    <div className="container-fluid text-sm-center p-5 bg-light">
         {/* <!-- bg-light is background color & p-5 is padding --> */}
         <h1 className="display-2">MIT Housing and Residential Services</h1>
         <p className="lead">Contributors: !</p>
    </div>
    <Router>
      <div>
      <Nav fill variant="tabs" defaultActiveKey="/home">
         <Nav.Item>
           <Link to="/">Home</Link>
         </Nav.Item>
         <Nav.Item>
           <Link to="/logpackages">Log Packages Page</Link>
         </Nav.Item>
         <Nav.Item>
           <Link to="/lenddesk">Lend Desk Item</Link>
         </Nav.Item>
         <Nav.Item>
           <Nav.Link eventKey="disabled" disabled>
             Disabled
           </Nav.Link>
         </Nav.Item>
       </Nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/logpackages" element={<LogPackages />}/>
          <Route path="/lenddesk" element={<LendDesk />}/>
        </Routes>
      </div>
    </Router>
    </>
    
  );

  function Home() {
    return (
      <Row>
        <Col>
          <Card className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">MongoDB Data</h6>
            </CardHeader>
            <PackageInputForm/>
            <Card.Body className="p-0 pb-3">
              <table data-size="small" className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      _id
                    </th>
                    <th scope="col" className="border-0">
                      Name
                    </th>
                    <th scope="col" className="border-0">
                      Time
                    </th>
                    <th scope="col" className="border-0">
                      __v
                    </th>
                    <th scope="col" className="border-0">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.map((user: any, key: number) => {
                      console.log("user is", user);
                      return (
                        <tr key={key}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{JSON.stringify(user.createdAt)}</td>
                          <td>{user.__v}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td align={"center"}>No data available</td>
                    </tr>
                  )}

                  {/* {data && data.length > 0 ? (
                    data &&
                    data.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>
                            {item.notes ? ReactHtmlParser(item.notes) : "N/A"}
                          </td>
                          <td>
                            <i
                              className="material-icons edit-icon"
                              onClick={() => editOrder(key)}
                            >
                              edit
                            </i>
                            <i
                              className="material-icons delete-icon"
                              onClick={() => deleteOrder(key)}
                            >
                              delete
                            </i>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td align={"center"}>
                        No data available
                      </td>
                    </tr>
                  )} */}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
  
  function LogPackages() {
    return <h2>LogPackages</h2>;
  }
  
  function LendDesk() {
    return <h2>LendDesk</h2>;
  }
};

export default App;
