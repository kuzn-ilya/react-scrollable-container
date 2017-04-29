"use strict";

var objectAssign = require('object-assign');

var CSS_NUMBER_VARS = {
    'SCROLLBAR_THUMB_OFFSET': 2,
    'SCROLLBAR_THICKNESS': 17,
    'GRID_CELL_HORZ_PADDING': 5,
    'SHIFT_PADDING': 2
};

var CSS_STRING_VARS = {
    'base-css-name': 'react-container',
    // Common stuff
    'COMMON_SHADOW_COLOR': '#CCC',

    // Custom scroll bar
    'SCROLLBAR_COLOR': 'rgba(241, 241, 241, 0.8)', /* #F1F1F1 */
    'SCROLLBAR_BUTTON_COLOR': '#F1F1F1',
    'SCROLLBAR_BUTTON_HOVER_COLOR': '#A8A8A8',
    'SCROLLBAR_BUTTON_CAPTURED_COLOR': '#787878',
    'SCROLLBAR_THUMB_COLOR': '#C1C1C1',
    'SCROLLBAR_THUMB_HOVER_COLOR': '#A8A8A8',
    'SCROLLBAR_THUMB_CAPTURED_COLOR': '#787878',

    // Layout splitter
    'LAYOUT_SPLITTER_COLOR': 'gray',

    // Grid general stuff
    'GRID_SELECTED_ROW_COLOR': 'lightgray',
    'GRID_CELL_BORDER_COLOR': '#d6d6d6',
    'GRID_HEADER_CELL_FONT': 'bold 11px \'Roboto\', sans-serif',
    'GRID_CELL_FONT': 'normal 11px \'Roboto\', sans-serif',
    'GRID_HEADER_CELL_BACKGROUND_COLOR': '#d6d6d6',
    'GRID_HEADER_CELL_BORDER_COLOR': '#6C7A89',
    'GRID_SELECTED_CELL_OUTLINE': 'black',

    // Gantt shift
    'GRID_SHIFT_FONT': 'normal 11px \'Roboto\', sans-serif',
    'GRID_SHIFT_BACKGROUND_COLOR': 'steelblue',
    'GRID_SHIFT_COLOR': 'white'
};

var CSS_ALL_VARS = objectAssign({}, CSS_STRING_VARS, CSS_NUMBER_VARS);

module.exports = {
    CSS_NUMBER_VARS: CSS_NUMBER_VARS,
    CSS_STRING_VARS: CSS_STRING_VARS,
    CSS_ALL_VARS: CSS_ALL_VARS
};
