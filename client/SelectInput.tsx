import React, { useEffect, useState } from "react";

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

export default SelectInput;