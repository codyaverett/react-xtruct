module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    'parserOptions': {
        'ecmaFeatures': {
            'experimentalObjectRestSpread': true,
            'jsx': true
        },
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'jsx-quotes': ['error', 'prefer-double'],
        'class-methods-use-this': ['error', {
            exceptMethods: [
                'render',
                'getInitialState',
                'getDefaultProps',
                'getChildContext',
                'componentWillMount',
                'componentDidMount',
                'componentWillReceiveProps',
                'shouldComponentUpdate',
                'componentWillUpdate',
                'componentDidUpdate',
                'componentWillUnmount',
            ],
        }],
        'react/display-name': ['off', {ignoreTranspilerName: false}],
        'react/forbid-prop-types': ['error', {forbid: ['any', 'array', 'object']}],
        'react/jsx-indent-props': ['error', 2],
        'react/jsx-handler-names': ['off', {
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on',
        }],
        'react/jsx-no-bind': ['error', {
            ignoreRefs: true,
            allowArrowFunctions: true,
            allowBind: false,
        }],
        'react/jsx-no-literals': 'off',
        'react/jsx-no-undef': 'error',
        'react/sort-prop-types': ['off', {
            ignoreCase: true,
            callbacksLast: false,
            requiredFirst: false,
        }],
        'react/no-did-update-set-state': 'error',
        'react/no-unknown-property': 'error',
        'react/no-is-mounted': 'error',
        'react/no-danger': 'warn',
        'react/no-multi-comp': ['error', {ignoreStateless: true}],
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    },
    'settings': {
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.jsx', '.json']
            }
        },
        'react': {
            'pragma': 'React',
            'version': '15.0'
        },
    }
};
