// Redirect react/jsx-runtime to the host app's React global so we never
// bundle a mismatched copy alongside whatever version Mattermost provides.
//
// The new JSX transform calls jsx(type, props, key?) where key is the third
// arg. React.createElement treats a third arg as a child, not a key, so we
// merge it back into props before delegating.
const React = require('react'); // externalized → window.React

function jsx(type, props, key) {
    if (key !== undefined) {
        return React.createElement(type, {...props, key});
    }
    return React.createElement(type, props);
}

module.exports = {
    jsx,
    jsxs: jsx,
    Fragment: React.Fragment,
};
