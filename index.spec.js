'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const proxyquire = require('proxyquire');
const path = require('path');
const expect = chai.expect;
chai.use(chaiHttp);

const request = require('supertest');

describe('index.js', () => {
    const scenarios = [
        {
            description: 'should return valid response',
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
            }
        },
        {
            description: 'should return error with status code 500',
            impl: (callback) => {
                var error = new Error('error status code 500');
                error.statusCode = 500;
                callback(error)
            },
            expected: {
                status: 500,
                data: { statusCode: 500 }
            }
        },
        {
            description: 'should return error with status code 403',
            impl: (callback) => {
                var error = new Error('error status code 403');
                error.statusCode = 403;
                callback(error)
            },
            expected: {
                status: 403,
                data: { statusCode: 403 }
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

        it(scenario.description, (end) => {
            chai.request(server).get('/')
                .set('Accept', 'application/json')
                .end((error, response) => {
                    expect(response).to.have.status(scenario.expected.status);
                    expect(response).to.have.header('Content-Type', /json/)
                    expect(response.body).to.be.eql(scenario.expected.data);
                    end();
                });
        });
    }
});