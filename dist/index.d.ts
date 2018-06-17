import * as React from 'react';
export interface IBemProps {
    bem: Function;
}
export interface IBemWrapperProps {
    className?: string;
}
export default function withBEM<T>(blockName: string, prefix?: string, modifierDelimiter?: string): <TOriginalProps = {}>(Component: React.ComponentClass<TOriginalProps & IBemProps> | React.SFC<TOriginalProps & IBemProps>) => React.SFC<TOriginalProps & IBemWrapperProps>;
