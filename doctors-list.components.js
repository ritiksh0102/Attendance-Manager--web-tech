import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Doctor = props => (
   <tr>
     <td>{props.doctor.username}</td>
     <td>{props.doctor.description}</td>
     <td>{props.doctor.date.substring(0,10)}</td>
     <td>{props.doctor.onduty}</td>
     <td>{props.doctor.patient_treated}</td>
     <td>{props.doctor.offduty}</td>
     <td>
       <Link to={"/edit/"+props.doctor._id}>edit</Link> 
     </td>
   </tr>
 )
 
 export default class DoctorsList extends Component {
   constructor(props) {
     super(props);
 
     this.deleteDoctor = this.deleteDoctor.bind(this)
 
     this.state = {doctors: []};
   }
 
   componentDidMount() {
     axios.get('http://localhost:4000/Doctor/')
       .then(response => {
         this.setState({ doctors: response.data })
       })
       .catch((error) => {
         console.log(error);
       })
   }
 
   deleteDoctor(id) {
     axios.delete('http://localhost:4000/Doctor/'+id)
       .then(response => { console.log(response.data)});
 
     this.setState({
       doctors: this.state.doctors.filter(el => el._id !== id)
     })
   }
 
   doctorList() {
     return this.state.doctors.map(currentdoctor => {
       return <Doctor doctor={currentdoctor} deleteDoctor={this.deleteDoctor} key={currentdoctor._id}/>;
     })
   }
 
   render() {
     return (
       <div>
         <h3>Logged Doctors</h3>
         <table className="table">
           <thead className="thead-light">
             <tr>
               <th>Username</th>
               <th>Description</th>
               <th>Date</th>
               <th>onduty_hrs</th>
               <th>Patient_treated</th>
               <th>offduty_hrs</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             { this.doctorList() }
           </tbody>
         </table>
       </div>
     )
   }
 }
 
   