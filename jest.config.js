module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/shell/mocks/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/shell/mocks/styleMock.js'
    },
    moduleFileExtensions: [
        'js', 'jsx'
    ],
    moduleDirectories: [
        'node_modules',
        'app/node_modules'
    ],
    snapshotSerializers: [
        '<rootDir>/node_modules/jest-serializer-enzyme'
    ],
    setupFiles: [
        '<rootDir>/shell/mocks/shim.js'
    ],
    collectCoverageFrom: [
        'app/features/**/*.{js,jsx}',
        'app/store/**/*.{js,jsx}',

        '!webpack/',
        '!app/features/**/dataService.js'
    ]
};
