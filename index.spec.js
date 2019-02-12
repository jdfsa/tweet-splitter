'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const proxyquire = require('proxyquire');
const path = require('path');
const should = chai.should();
chai.use(chaiHttp);

describe('index.js', () => {
    const scenarios = [
        {
            id: 1,
            impl: (successCallback, errorCallback) => {
                successCallback([
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
            }
        }
    ]

    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
     
        const appPath = path.join(process.cwd(), 'index');
        const server = proxyquire(appPath, {
            './processor/tweet-flow.processor': {
                processTweets: scenario.impl
            }
        });

        it('should run test case: ' + scenario.id, (end) => {
            chai.request(server).get('/').end((error, response) => {
                response.should.have.status(scenario.expected.status);
                response.body.should.be.eql(scenario.expected.data);
                end();
            });
        });
    }
});