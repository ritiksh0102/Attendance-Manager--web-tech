import react from 'react'
import { BrowserRouter as Router, Link, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import Navbar from "./components/navbar.component";
import Doctorlist from "./components/doctors-list.components";
import Editlist from "./components/edit-doctors.components";
import CreateDoctorlist from "./components/create-doctors.components";
import CreateUser from "./components/create-user.component";


function App()  {
    return (
    <Router>
    <div className="App">
      
    <Navbar />
    <br/>
    <Route path="/" exact component={Doctorlist} />
    <Route path="/edit/:id" component={Editlist} />
    <Route path="/create" component={CreateDoctorlist} />
    <Route path="/user" component={CreateUser} />
    </div>
  </Router>
);
}


export default App;
 