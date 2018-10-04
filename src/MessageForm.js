import React, { Component } from 'react'
import { Input } from 'antd';

const { TextArea } = Input;


export default class MessageForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {

    return (
      <>
        <Input placeholder="Email Address" style={{marginLeft: '80px', float: 'left', clear: 'both'}} />
        <br />
        <br />
        <TextArea rows={4} />
      </>
    )
  }
}
