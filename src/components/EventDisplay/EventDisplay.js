import React, {Component} from "react";
import "./EventDisplay.css";
import moment from "moment";
import EventDetails from "./EventDetails.js";
import API from "../../utils/API";
import saveEventObj from "./saveEventObj"

class EventDisplay extends Component {
    // Convert dates to a human readable format
    dateConversion = (origionalDate) => {
        var convertedDate = moment(origionalDate, 'YYYY-MM-DD').format('MM-DD-YYYY');
        return convertedDate
    }

    saveEvent = (eventKey) => {
        const eventObj = this.props.state.events.find(obj => obj.key === eventKey);
    
        API.saveEvent(saveEventObj(eventObj, this.props.state.loginUserId))
        .then(res => {
            // Remove the event from the state array without a success message
            this.removeEvent(eventKey, false)
    
            // Display the users saved events
            this.props.displaySavedEvents(this.props.state.loginUserId)
    
            this.props.toastFunction("info", "Event Saved Successfully!")        
        })
        .catch(err => {
            console.log(err)
            
            this.props.toastFunction("error","The Event Was Not Saved!")
        });
    }

    removeSavedEvent = (eventId) => {
        // Use the user's id to remove an event
        API.removeEvent(eventId, this.props.state.loginUserId)
            .then(res => {
                this.props.displaySavedEvents(this.props.state.loginUserId);
            
                this.props.toastFunction("info", "Event Removed Successfully!")
            })
            .catch(err => {
                console.log(err)

                this.props.toastFunction("error", "The Event Was Not Removed!")
            });
    }

    // showToast can prevent a message when an event is saved instead of deleted
    removeEvent = (eventKey, showToast=true) => {
        const oldArray = this.props.state.events;

        // Remove the event from the event array
        const newArray = oldArray.filter(obj => {
            return obj.key !== eventKey;
        });

        // Remove the event from the database
        this.props.objSetState({
            events: newArray
        }).then(() => {
            if (showToast) {
                this.props.toastFunction("info", "Event Removed Successfully!")
            }
        });
    }

    render() {
        return (
            <div id="EventDisplay">

                {/* Saved Events Display */}
                {(this.props.state.savedEvents.length > 0) ? <div><br /><h3>Saved Events</h3></div> : <div></div>}
                <div id="accordion">
                    {this.props.state.savedEvents.map(event => (
                        /* Data is passed to every image with props */
                        <div key={event._id}>
                            <div className="card">
                            <div className="card-header" id={"heading" + event._id}>
                                    <h5 className="mb-0">
                                        <button
                                            className="btn btn-link"
                                            data-toggle="collapse"
                                            data-target={"#collapse" + event._id}
                                            aria-expanded="false"
                                            aria-controls={"collapse" + event._id}
                                        >
                                        {event.name}
                                        </button>
                                    </h5>
                                </div>
                            </div>
                            <div
                                id={"collapse" + event._id}
                                className="collapse hide"
                                aria-labelledby={"heading" + event._id}
                            >
                                <div className="card-body">
                                    <p> <button className="iconBtn" type="button" title="Remove" onClick={()=> this.removeSavedEvent(event._id)}>
                                            <i className="fas fa-trash-alt fa-2x" id="removeIcon"></i>
                                        </button>&nbsp;&nbsp;
                                        <b>City:</b> {event.city} ({event.lat}, {event.lng})</p>
                                    <EventDetails event={event} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* New Events Display */}
                {(this.props.state.events.length > 0) ? <div><br /><h3>New Events</h3></div> : <div></div>}
                <div id="accordion">
                    {this.props.state.events.map(event => (
                        /* Data is passed to every image with props */
                        <div key={event.key}>
                            <div className="card">
                            <div className="card-header" id={"heading" + event.key}>
                                    <h5 className="mb-0">
                                        <button
                                            className="btn btn-link"
                                            data-toggle="collapse"
                                            data-target={"#collapse" + event.key}
                                            aria-expanded="false"
                                            aria-controls={"collapse" + event.key}
                                        >
                                        {event.name}
                                        </button>
                                    </h5>
                                </div>
                            </div>
                            <div
                                id={"collapse" + event.key}
                                className="collapse hide"
                                aria-labelledby={"heading" + event.key}
                            >
                                <div className="card-body">
                                    <p> {(this.props.state.loginUserId)
                                            ?<span><button
                                                className="iconBtn"
                                                type="button"
                                                title="Save"
                                                onClick={() => this.saveEvent(event.key)}>
                                                <i className="far fa-save fa-2x" id="saveIcon"></i>
                                            </button>&nbsp;&nbsp;</span>
                                            : <span></span>
                                        }
                                        <button className="iconBtn" type="button" title="Remove" onClick={()=>this.removeEvent(event.key)}>
                                            <i className="fas fa-trash-alt fa-2x" id="removeIcon"></i>
                                        </button>&nbsp;&nbsp;
                                        <b>City:</b> {event.city} ({event.lat}, {event.lng})</p>
                                    <EventDetails event={event} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default EventDisplay;