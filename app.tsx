import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { RightPanel } from './sources/components/right-panel';
import './app.less';

import { fakeData } from './sources/data/fake.data';

const children = fakeData.map(
    (item, index) => (
        <div key={index}>
            <span style={{width: "30px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.id}</span>
            <span style={{width: "150px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.firstName}</span>
            <span style={{width: "150px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.lastName}</span>
            <span style={{width: "250px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.email}</span>
            <span style={{width: "150px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.gender}</span>
            <span style={{width: "150px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.ipAddress}</span>
            <span style={{width: "200px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.creditCardType}</span>
            <span style={{width: "150px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.creditCardNumber}</span>
            <span style={{width: "150px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.creditCardExpires}</span>
            <span style={{width: "250px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.city}</span>
            <span style={{width: "150px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.company}</span>
            <span style={{width: "250px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.department}</span>
            <span style={{width: "150px", display: "inline-block", borderRight: "solid 1px grey", borderBottom: "solid 1px grey"}}>{item.currency}</span>
        </div>
    )
);

ReactDOM.render((
    <RightPanel 
        children={children} 
        height="100%"
        width="100%"
        headerHeight={50}
        headerChild={<div style={{width: 1028}}>Header</div>}
        childWidth={2200}
        childHeight={1900}
    />
), document.getElementById('app'));
