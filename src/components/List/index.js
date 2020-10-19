import React, { Fragment } from 'react';

import './styles.css';
import ListHeader from "./ListHeader";

function List({
    data,
    action,
    columns,
    title,
    showDetails,
    deleteAction
}) {
    return (
        <Fragment>
            {title && <div className={'list-title'}>{title}</div>}
            <ListHeader columns={columns} />
            {data.map(item => (<div key={item.id} className={'list-row'}>
                {columns.map(col => (<div key={`${item.id}_${col.prop}`} className={'list-row-item'}>{item[col.prop]}</div>))}
                {showDetails && <div className={'list-row-item'}>
                    <button onClick={() => action(item)}>Details</button>
                </div>}
                <div className={'list-row-item'}>
                    <button onClick={() => deleteAction(item)}>Delete</button>
                </div>
                </div>))}
        </Fragment>
    );
}

export default List;
