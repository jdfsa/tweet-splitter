
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const path = require('path');
const expect = chai.expect;

describe('index.js', () => {
    const scenarios = [
        {
            description: 'should show tweets in console',
            impl: (callback) => {
                callback(null, [
                    'Tweet #1: Rua Palestra Itália sentido único,  entre a',
                    'Tweet #2: Praça Marrey Junior e a Avenida Pompéia,',
                    'Tweet #3: interditada devido a evento. Evite a região.',
                    'Tweet #4: #ZO'
                ])
            },
            expected: {
                status: 200,
                data: [
                    'Tweet #1: Rua Palestra Itália sentido único,  entre a',
                    'Tweet #2: Praça Marrey Junior e a Avenida Pompéia,',
                    'Tweet #3: interditada devido a evento. Evite a região.',
                    'Tweet #4: #ZO'
                ]
            },
        },
        {
            description: 'should show error in console',
            impl: (callback) => {
                var error = new Error('error status code 500');
                error.statusCode = 500;
                callback(error)
            },
            expected: {
                status: 500,
                data: { statusCode: 500 }
            }
        }
    ];

    beforeEach(() => {
        sinon.spy(console, 'log');
    });

    afterEach(() => {
        console.log.restore();
    });

    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];

        it(scenario.description, (end) => {
            const appPath = path.join(process.cwd(), 'index');
            proxyquire(appPath, {
                './processor/tweet-flow.processor': {
                    processTweets: scenario.impl
                }
            });
            expect(console.log.calledWith(scenario.expected.data));
            end();
        });
    }
});