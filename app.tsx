import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Scrollable } from './sources/components/scrollable';
import './app.less';

ReactDOM.render((
    <Scrollable 
        children={[<div>first</div>,<div>second</div>]} 
        style={{ height: "100%", width: "100%" }} 
    />
), document.getElementById('app'));
