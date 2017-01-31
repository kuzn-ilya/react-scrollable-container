import * as ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import * as camelize from 'fbjs/lib/camelize';
import * as invariant from 'fbjs/lib/invariant';

interface Memoized {
    [key: string]: string | null;
}

let memoized: Memoized = {};
const prefixes = ['Webkit', 'ms', 'Moz', 'O'];
const prefixRegex = new RegExp('^(' + prefixes.join('|') + ')');
const testStyle = ExecutionEnvironment.canUseDOM ? document.createElement('div').style : {};

function getWithPrefix(name: string): string | null {
    for (let i = 0; i < prefixes.length; i++) {
        const prefixedName = prefixes[i] + name;
        if (prefixedName in testStyle) {
            return prefixedName;
        }
    }
    return null;
}

/**
 * @param property name of a css property to check for.
 * @return property name supported in the browser, or null if not supported.
 */
export function getCSSPropertyNameWithVendorPrefix(property: string): string | null  {
    const name = camelize(property);
    if (memoized[name] === undefined) {
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        if (prefixRegex.test(capitalizedName)) {
            invariant(false, 'getVendorPrefixedName must only be called with unprefixed'
                + 'CSS property names. It was called with %s', property);
        }
        memoized[name] = (name in testStyle) ? name : getWithPrefix(capitalizedName);
    }
    return memoized[name];
}
