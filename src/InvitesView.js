import React, { Component } from 'react'


export default class InvitesView extends React.Component {
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
        <p>Yoblee</p>
      </>
    )
  }
}
