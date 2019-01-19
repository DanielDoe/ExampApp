import React from 'react';
import Icon from 'antd/lib/icon';

export function HeaderComponent(props) {

    return (
        <div className="header grid">
            <span onClick={() => props.onIconSelect()}>
                <Icon 
                    type="bars"
                    style={{ fontSize: 'x-large', margin: '0.5rem 1rem' }} 
                    className="icon-container" />
            </span>
            <span className="header-container">{props.headerTitle}</span>
        </div>
    );
}
