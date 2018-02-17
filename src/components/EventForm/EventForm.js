import React, {Component} from "react";
import "./EventForm.css";

class EventForm extends Component {
    state = {
        events: [],
        name: "",
        city: "",
        date: "",
        time: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
      };
    
    handleFormSubmit = event => {
        event.preventDefault()

        const newEvent = {
            name: this.state.name,
            city: this.state.city,
            date: this.state.date,
            time: this.state.time
        }

        console.log(newEvent)

        this.setState({
            events: [...this.state.events, newEvent],
            name: "",
            city: "",
            date: "",
            time: ""
        })
    };

    render() {
        // this.state.events
        return (
        <div id="EventForm">
            <br />
            <h3>Add an Event</h3>
            <form>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <label htmlFor="eventFormName">Event Name</label>
                        <input required
                            type="text"
                            value={this.state.name}
                            onChange={this.handleInputChange}
                            name="name"
                            className="form-control"
                            id="eventFormName"
                            placeholder="Name"
                        />
                        <div required className="formSpacer"></div>
                        <label htmlFor="eventFormCity">Event City</label>
                        <input required
                            type="text"
                            value={this.state.city}
                            onChange={this.handleInputChange}
                            name="city"
                            className="form-control"
                            id="eventFormCity"
                            placeholder="City"
                        />
                        <div className="formSpacer"></div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <label htmlFor="eventFormDate">Event Date</label>
                        <input required
                            type="date"
                            min="1970-01-01"
                            max="2070-12-31"
                            value={this.state.date}
                            onChange={this.handleInputChange}
                            name="date"
                            className="form-control"
                            id="eventFormDate"
                            placeholder="Date"
                        />
                        <div className="formSpacer"></div>
                        <label htmlFor="eventFormTime">Event Time</label>
                        <input required
                            type="time"
                            value={this.state.time}
                            onChange={this.handleInputChange}
                            name="time"
                            className="form-control"
                            id="eventFormTime"
                            placeholder="Time"
                        />
                        <div className="formSpacer"></div>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        id="eventFormBtn"
                        onSubmit={this.handleFormSubmit}
                    >Submit</button>
                </div>
            </form>
        </div>
        );
    }
}

export default EventForm;