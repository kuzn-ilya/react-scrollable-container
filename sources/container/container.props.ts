import * as React from 'react';

interface ContainerCSSProperties extends React.CSSProperties {
    height: number | string;
    width: number | string;
}

export interface ContainerProps {
    style: ContainerCSSProperties;
}
