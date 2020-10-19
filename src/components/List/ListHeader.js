import React, {Fragment} from 'react';

import './styles.css';

function ListHeader({
    columns
}) {
    return (
        <div className={'list-header'}>
            {columns.map(item => (<div key={`${item.prop}`} className={'list-header-item'}>{item.title}</div>))}
            <div className={'list-header-item'}>&nbsp;</div>
        </div>
    );
}

export default ListHeader;
