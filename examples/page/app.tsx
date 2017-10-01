import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles.css';

import { ExamplesPage } from './ExamplesPage';
import { Example } from './Example';
import { GridExample } from './../GridExample/GridExample';
import { GanttExample } from './../GanttExample/GanttExample';
import { LayoutExample } from './../LayoutExample/LayoutExample';
import { ScrollBarExample } from './../ScrollBarExample/ScrollBarExample';

let examples: Example[] = [
    { componentClass: GridExample, name: 'Grid' },
    { componentClass: GanttExample, name: 'Gantt' },
    { componentClass: LayoutExample, name: 'Layout' },
    { componentClass: ScrollBarExample, name: 'ScrollBar' }
];

// ReactDOM.render(<GridExample />, document.getElementById('app'));
ReactDOM.render(<ExamplesPage examples={examples}/>, document.getElementById('app'));
