import { Git } from './git-helper'

describe('git-helper', () => {
    it('should exist', () => {
        expect(Git).toBeDefined()
    })

    describe('getTag', () => {
        it('should exist', () => {
            expect(Git.getTag).toBeDefined()
        })
    })

    describe('getHashes', () => {
        it('should exist', () => {
            expect(Git.getHashes).toBeDefined()
        })
    })

    describe('getCommit', () => {
        it('should exist', () => {
            expect(Git.getCommit).toBeDefined()
        })
    })
})
