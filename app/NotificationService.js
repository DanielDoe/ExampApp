import React from 'react';
import { Button, notification } from 'antd';


export default class OpenNotificationWithIcon extends React.Component {
    openNotificationWithIcon = (type, message) => {
        notification[type]({
          message: 'PDF Status',
          description: message,
        });
      };

    render(){
       return openNotificationWithIcon(this.props.type, this.props.message);
    }
}