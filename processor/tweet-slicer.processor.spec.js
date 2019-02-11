const chai = require('chai');
const slicer = require('./tweet-slicer.processor');

const assert = chai.assert;
const expect = chai.expect;

describe('/processor/tweet-slicer.js', () => {
    const testCases = [
        {
            id: 1,
            scenario: 'Interferência na Av. Washington Luis sentido Bairro, próximo Praça. Comte. Linneu Gomes. Ocupa uma faixa. #ZS.',
            expected: [
                'Tweet #1: Interferência na Av. Washington Luis sentido',
                'Tweet #2: Bairro, próximo Praça. Comte. Linneu Gomes.',
                'Tweet #3: Ocupa uma faixa. #ZS.'
            ]
        },
        {
            id: 2,
            scenario: 'Rua Palestra Itália sentido único,  entre a Praça Marrey Junior e a Avenida Pompéia, interditada devido a evento. Evite a região.  #ZO',
            expected: [
                'Tweet #1: Rua Palestra Itália sentido único,  entre a',
                'Tweet #2: Praça Marrey Junior e a Avenida Pompéia,',
                'Tweet #3: interditada devido a evento. Evite a região.',
                'Tweet #4: #ZO'
            ]
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        it('should validate test case: [' + testCase.id + ']', (end) => {
            expect(slicer.slice(testCase.scenario, 45)).to.be.eql(testCase.expected);
            end();
        });
    }
});