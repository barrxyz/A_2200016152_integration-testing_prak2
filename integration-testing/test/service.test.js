const sinon = require('sinon');
const expect = require('chai').expect;
const Service = require('./service');
const PrimaryRepository = require('./PrimaryRepository');
const SecondaryRepository = require('../src/secondaryRepository.');

describe('Service Integration Tests with Multiple Stubs', () => {
    let service;
    let primaryRepositoryStub;
    let secondaryRepositoryStub;

    beforeEach(() => {
        primaryRepositoryStub = sinon.createStubInstance(PrimaryRepository);
        secondaryRepositoryStub = sinon.createStubInstance(secondaryRepository);
        service = new Service();
        service.primaryRepository = primaryRepositoryStub;
        service.secondaryRepository = secondaryRepositoryStub;
    });

    it('should return item from primary repository if found', () => {
        const item = { id: 1, name: 'Item 1' };
        primaryRepositoryStub.getItemById.withArgs(1).returns(item);

        const result = service.getItemById(1);

        expect(result).to.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(1)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.called).to.be.false;
    });

    it('should return item from secondary repository if not found in primary', () => {
        expect(result).to.equal(item);
        expect(primaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
        expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;

        it('should throw an error if item is not found in both repositories', () => {
            primaryRepositoryStub.getItemById.returns(null);
            secondaryRepositoryStub.getItemById.returns(null);

            expect(() => service.getItemById(5)).to.throw('Item not found in both repositories');
            expect(primaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
            expect(secondaryRepositoryStub.getItemById.calledOnceWith(5)).to.be.true;
        });
    });
});
