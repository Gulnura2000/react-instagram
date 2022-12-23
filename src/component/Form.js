import React, { Component } from "react";

export default class Form extends Component {
    render(){
        return(
          <form onSubmit={this.props.weatherMethod}>
               <input type="text" name="city" placeholder="шаар"/>
               <button>аба ырайыны билуу</button>
            </form>
        )
    }

}