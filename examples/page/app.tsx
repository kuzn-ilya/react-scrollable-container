import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.css';

import { ExamplesPage } from './ExamplesPage';
import { Example } from './Example';
import { GridExample } from './../GridExample/GridExample';
import { Grid2Example } from './../Grid2Example/Grid2Example';
import { LayoutExample } from './../LayoutExample/LayoutExample';
import { ScrollBarExample } from './../ScrollBarExample/ScrollBarExample';

let examples: Example[] = [
    { componentClass: GridExample, name: 'Grid' },
    { componentClass: Grid2Example, name: 'Grid 2' },
    { componentClass: LayoutExample, name: 'Layout' },
    { componentClass: ScrollBarExample, name: 'ScrollBar' }
];

// ReactDOM.render(<GridExample />, document.getElementById('app'));
ReactDOM.render(<ExamplesPage examples={examples}/>, document.getElementById('app'));

if (process.env.NODE_ENV !== 'production') {
    // tslint:disable-next-line:no-any no-require-imports no-var-requires
    (React as any).Perf = require('react-addons-perf');
}
