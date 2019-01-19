import React from 'react'
import {Image, List} from 'semantic-ui-react';
import Data from '../_shared/assets/file.svg';

class RenderList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: [],
    };

    this.state.dataSource = this.props.dataSource;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        dataSource: nextProps.dataSource
    });
}

  renderContent() {
    return this.props.dataSource.map((element, id) =>
        (
          <List.Item key={`List+${id}`}>
            <Image avatar src={Data} style={{ borderRadius: '0rem' }} />
            <List.Content>
              <List.Header style={{ height: '1rem', borderBottom: 'none', color: 'rgba(0, 0, 0, 0.54)' }}>{element}</List.Header>
            </List.Content>
          </List.Item>
      )
    );
  }
  render() {
    return (
      <div>
        <List animated verticalAlign='middle'>
            {this.renderContent()}
        </List>
      </div>
    );
  }
}

export default RenderList;
