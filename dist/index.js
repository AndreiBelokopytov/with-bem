import * as React from 'react';
import * as BEMHelper from 'react-bem-helper';
export default function withBEM(blockName, prefix = '', modifierDelimiter = '--') {
    const bemHelper = new BEMHelper({
        name: blockName,
        outputIsString: true,
        prefix,
        modifierDelimiter
    });
    const bem = (className) => (element, modifiers, mixins = []) => bemHelper({
        element,
        modifiers,
        extra: [className, ...mixins]
    });
    const cache = {};
    return Component => {
        return props => {
            const { className = '' } = props;
            // Typescript lacks of support object rest for generics
            const other = Object.assign({}, props);
            delete other.className;
            if (cache.className !== className || !cache.bem) {
                cache.className = className;
                cache.bem = bem(className);
            }
            return (React.createElement(Component, Object.assign({ bem: cache.bem }, other)));
        };
    };
}
