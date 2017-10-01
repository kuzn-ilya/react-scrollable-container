import * as React from 'react';
import { addDecorator, RenderFunction } from '@storybook/react';

const Decorator = (story: RenderFunction) => {
    return (
        <div style={{position: 'absolute', left: '0', right: '0', bottom: '0', top: '0'}} >
            {story()}
        </div>
    );
};

addDecorator(Decorator);
