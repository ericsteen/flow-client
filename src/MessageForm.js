import React, { Component } from 'react'
import {
  Redirect
} from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {url} from './consts'

const { TextArea } = Input
const FormItem = Form.Item;

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      invitePostData: null,
      fireRedirect: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.postMsg(values)
      }
    });
  }

  postMsg = (values) => {
    this.setState({ isLoading: true });

    fetch(`${url}/api/v1/invitations`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "invitation": {
          "email" : values.email,
          "msg" : values.msg
        }
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(data => JSON.stringify(data))
    .then(data => this.setState({invitePostData: data, fireRedirect: true, isLoading: false}))
    .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state
    return (
      <>
        <Form onSubmit={this.handleSubmit} className="send-email-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input recipient email!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('msg', {
              rules: [{ required: true, message: 'Please input your Message!' }],
            })(
              <TextArea prefix={<Icon type="note" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="message" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="send-email-form-button">
              Send Email
            </Button>
          </FormItem>
        </Form>
        {fireRedirect && (
          <Redirect to={from || '/invites'}/>
        )}
      </>
    );
  }
}

const WrappedMessageForm = Form.create()(MessageForm);
export default WrappedMessageForm
