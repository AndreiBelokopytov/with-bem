import * as React from 'react';
import * as BEMHelper from 'react-bem-helper';

export interface IBemProps {
    bem: Function;
}

export interface IBemWrapperProps {
    className?: string;
}

export default function withBEM<T>(
    blockName: string, 
    prefix: string = '',
    modifierDelimiter: string = '--'
): <TOriginalProps = {}>(
    Component: React.ComponentClass<TOriginalProps & IBemProps> | React.SFC<TOriginalProps & IBemProps>
) => React.SFC<TOriginalProps & IBemWrapperProps> {
    const bemHelper = new BEMHelper({
        name: blockName,
        outputIsString: true,
        prefix,
        modifierDelimiter
    });

    const bem = (className: string) => (
        element: string,
        modifiers: any,
        mixins: string[] = []
    ) => bemHelper({
        element,
        modifiers,
        extra: [className, ...mixins]
    });
    const cache : {
        bem?: Function;
        className?: string;
    } = {};
    return Component => {
        return props => {
            const {
                className = ''
            } = props;
            // Typescript lacks of support object rest for generics
            const other = Object.assign({}, props);
            delete other.className;
            if (cache.className !== className || !cache.bem) {
                cache.className = className;
                cache.bem = bem(className);
            }
            return (
                <Component bem={cache.bem} {...other} />
            );
        }
    }
}
