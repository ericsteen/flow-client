import React, { Component } from 'react'

export default class InvitesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      data: null
    };
  }

  getInvitesForUser = (user_id) => {
    this.setState({ isLoading: true });

    fetch(`/api/v1/users/${user_id}/sent_invitations`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(data => JSON.stringify(data))
    .then(data => this.setState({ data, isLoading: false}))
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    return (
      <>
      </>
    )
  }
}
