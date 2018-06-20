import * as React from 'react';
import * as BEMHelper from 'react-bem-helper';
import { isArray } from 'util';

interface PredicateSetNullable {
    [key: string]: boolean | undefined | null | (() => boolean);
}

export type BemDecorator =  (
    element?: string | null,
    modifiers?: BEMHelper.WordSet | PredicateSetNullable | null,
    extra?: BEMHelper.WordSet | PredicateSetNullable | null
) => string;

export interface IBemProps {
    bem: BemDecorator;
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

    const bem = (className: string): BemDecorator => (
        element?: string,
        modifiers?: BEMHelper.WordSet,
        extra: BEMHelper.WordSet = {}
    ) => {
        if (typeof extra === 'string') {
            return bemHelper({
                element,
                modifiers,
                extra: [className, extra]
            });
        } else if (isArray(extra)) {
            return bemHelper({
                element,
                modifiers,
                extra: [className, ...extra]
            });
        } else {
            return bemHelper({
                element,
                modifiers,
                extra: {
                    ...extra as BEMHelper.PredicateSet,
                    [className]: true
                }
            });
        }
    }

    const cache : {
        bem?: BemDecorator;
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
