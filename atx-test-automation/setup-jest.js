import 'jest-preset-angular';
global['CSS'] = null;
/* global mocks for local storage */
var mock = function () {
    var storage = {};
    return {
        getItem: function (key) { return (key in storage ? storage[key] : null); },
        setItem: function (key, value) { return (storage[key] = value || ''); },
        removeItem: function (key) { return delete storage[key]; },
        clear: function () { return (storage = {}); },
    };
};
Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
// Mock for webkit appearence
Object.defineProperty(window, 'getComputedStyle', {
    value: function () { return ['-webkit-appearance']; },
});
/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
    value: function () {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});
/* output shorter and more meaningful Zone error stack traces */
Error.stackTraceLimit = 2;
//# sourceMappingURL=setup-jest.js.map