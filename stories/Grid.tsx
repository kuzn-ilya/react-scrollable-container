import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { fakeData } from './fake.data';
import { Grid, TextColumn, DateColumn, HeaderRow, Row } from '../sources/components';

const GridComp = (props: {multiSelectRows?: boolean, customScrollBar?: boolean}) => (
    <Grid fixedHeaderRowClass={HeaderRow}
        fixedRowClass={Row}
        scrollableHeaderRowClass={HeaderRow}
        scrollableRowClass={Row}
        customScrollBars={props.customScrollBar}
        rowData={fakeData}
        fixedColumnCount={2}
        rowHeight={20}
        headerHeight={51}
        multiSelectRows={props.multiSelectRows}
    >
        <TextColumn caption="id" propName="id" width={30} align="right" readonly />
        <TextColumn caption="firstName" propName="firstName" width={150} />
        <TextColumn caption="id" propName="id" width={30} align="right" readonly />
        <TextColumn caption="lastName" propName="lastName" width={150} readonly />
        <TextColumn caption="email" propName="email" width={150} />
        <TextColumn caption="gender" propName="gender" width={80} />
        <TextColumn caption="ipAddress" propName="ipAddress" width={150} align="center" />
        <TextColumn caption="creditCardType" propName="creditCardType" width={200} />
        <TextColumn caption="creditCardNumber" propName="creditCardNumber" width={150} />
        <DateColumn caption="creditCardExpires" propName="creditCardExpires" width={80} align="center" />
        <TextColumn caption="city" propName="city" width={250} />
        <TextColumn caption="company" propName="company" width={150} />
        <TextColumn caption="department" propName="department" width={250} />
        <TextColumn caption="currency" propName="currency" width={150} />
    </Grid>
);

storiesOf('Grid', module)
    .add('default', () => <GridComp />)
    .add('Multiselect', () => <GridComp multiSelectRows />)
    .add('Custom scrollbars', () => <GridComp customScrollBar />);
