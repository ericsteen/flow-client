import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {url} from './consts'

const { TextArea } = Input
const FormItem = Form.Item;

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null
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
    console.log(values)
    fetch(`${url}/api/v1/invitations`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "invitation": {
          "email" : values.email,
          "msg" : values.msg
        }
      })
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
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
    );
  }
}

const WrappedMessageForm = Form.create()(MessageForm);
export default WrappedMessageForm
