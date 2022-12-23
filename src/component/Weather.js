import React, { Component } from "react";

export default class Weather extends Component {
    render(){
        return(
            <div>
                {this.props.city &&
                <div className="weather">
                <p>издеген жериниз :   {this.props.city} , {this.props.country} </p>
                <p>температура :      {   this.props.temp } C°</p>
                <p>давление :         {   this.props.pressure}</p>
                <p>кундун чыгуусу:      {   this.props.sunset}</p>
                </div>
                }
                

            </div>
        )
    }

}