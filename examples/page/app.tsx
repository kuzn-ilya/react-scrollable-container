import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.css';

import { ExamplesPage } from './ExamplesPage';
import { Example } from './Example';
import { GridExample } from './../GridExample/GridExample';
import { LayoutExample } from './../LayoutExample/LayoutExample';

let examples: Example[] = [
    { componentClass: GridExample, name: 'Grid' },
    { componentClass: LayoutExample, name: 'Layout' }
];

// ReactDOM.render(<GridExample />, document.getElementById('app'));
ReactDOM.render(<ExamplesPage examples={examples}/>, document.getElementById('app'));

if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line:no-any no-require-imports no-var-requires
    (React as any).Perf = require('react-addons-perf');
}
