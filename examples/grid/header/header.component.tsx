import * as React from 'react';

import { HeaderProps } from './header.props';
import { HeaderCell } from '../header-cell/header-cell.component';

export class Header extends React.Component<HeaderProps, void> {
    render(): JSX.Element {
        return (
            <div style={{
                height: "100%",
                width: "100%",
                position: "relative",
                top: "0px",
                left: "0px"                
            }}>
                <HeaderCell width={30} caption="id" />
                <HeaderCell width={150} caption="firstName" />
                <HeaderCell width={150} caption="lastName" />
                <HeaderCell width={250} caption="email" />
                <HeaderCell width={80} caption="gender" />
                <HeaderCell width={150} caption="ipAddress" />
                <HeaderCell width={200} caption="creditCardType" />
                <HeaderCell width={150} caption="creditCardNumber" />
                <HeaderCell width={80} caption="creditCardExpires" />
                <HeaderCell width={250} caption="city" />
                <HeaderCell width={150} caption="company" />
                <HeaderCell width={250} caption="department" />
                <HeaderCell width={150} caption="currency" />
            </div>
        );
    }
}