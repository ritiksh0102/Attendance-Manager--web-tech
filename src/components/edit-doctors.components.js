import React ,{ Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
export default class Editlist extends Component {
   constructor(props) {
      super(props);
  
      this.onChangeUsername = this.onChangeUsername.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);
      this.onChangeDate = this.onChangeDate.bind(this);
      this.onChangeonduty = this.onChangeonduty.bind(this);
      this.onChangepatienttreated = this.onChangepatienttreated.bind(this);
      this.onChangeoffduty = this.onChangeoffduty.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  
      this.state = {
        username: '',
        description: '',
        date: new Date(),
        onduty:'',
        patient_treated:'',
        offduty:'',
        users: []
      }
    }
  
    componentDidMount() {
      axios.get('http://localhost:4000/Doctor/'+this.props.match.params.id)
        .then(response => {
          this.setState({
            username: response.data.username,
            description: response.data.description,
            date: new Date(response.data.date),
            onduty:response.data.onduty,
            patient_treated: response.data.patient_treated,
            offduty: response.data.offduty
          })   
        })
        .catch(function (error) {
          console.log(error);
        })
  
      axios.get('http://localhost:4000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
  
    }
  
    onChangeUsername(e) {
      this.setState({
        username: e.target.value
      })
    }
  
    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      })
    }  
    onChangeDate(date) {
      this.setState({
        date: date
      })
    }

    onChangeonduty(e) {
      this.setState({
        onduty: e.target.value
      })
    }
   
    onChangepatienttreated(e) {
      this.setState({
        patient_treated: e.target.value
      })
    }
   
    onChangeoffduty(e) {
      this.setState({
        offduty: e.target.value
      })
    }
  
    onSubmit(e) {
      e.preventDefault();
  
      const doctor = {
        username: this.state.username,
        description: this.state.description,
        date: this.state.date,
        onduty:this.state.onduty,
        patient_treated:this.state.patient_treated,
        offduty:this.state.offduty,
      }
  
      console.log(doctor);
  
      axios.post('http://localhost:4000/Doctor/update/' + this.props.match.params.id, doctor)
        .then(res => console.log(res.data));
  
      window.location = '/';
    }
  
    render() {
      return (
      <div>
        <h3>Edit Doctors Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          
        <div className="form-group">
          <label>onduty: </label>
          <input 
              type="int" 
              className="form-control"
              value={this.state.onduty}
              onChange={this.onChangeonduty}
              />
        </div>
        <div className="form-group">
          <label>patient_treated: </label>
          <input 
              type="int" 
              className="form-control"
              value={this.state.patient_treated}
              onChange={this.onChangepatienttreated}
              />
        </div>

        <div className="form-group">
          <label>offduty </label>
          <input 
              type="int" 
              className="form-control"
              value={this.state.offduty}
              onChange={this.onChangeoffduty}
              />
        </div>
  
          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
      )
    }
  }
  