import { Commit } from './commit-helper'
import { Version } from './version-helper'

describe('version-helper', () => {
    it('should exist', () => {
        expect(Version).toBeDefined()
    })

    describe('bump', () => {
        it('should exist', () => {
            expect(Version.bump).toBeDefined()
        })

        it.each([
            { version: 'v1.0.0', type: 'minor', expected: 'v1.1.0' },
            { version: 'v0.19.0', type: 'major', expected: 'v1.0.0' },
            { version: 'v3.2.10', type: 'patch', expected: 'v3.2.11' },
            { version: '0.0.1', type: 'minor', expected: '0.1.0' },
        ])('$type bump of version $version should become $expected', ({ version, type, expected }) => {
            const bumped = Version.bump(version, type)
            expect(bumped).toBe(expected)
        })
    })

    describe('findBumpType', () => {
        it('should exist', () => {
            expect(Version.findBumpType).toBeDefined()
        })

        it.each([
            {
                commits: [
                    new Commit('feat: new feature'),
                    new Commit('fix(component)!: bug fix'),
                    new Commit('refactor(other component): code cleanup'),
                    new Commit('docs: readme updates'),
                    new Commit(
                        'feature(component): large new feature' +
                            '\n' +
                            'BREAKING CHANGE: component no longer accepts property XYZ'
                    ),
                ],
                options: {},
                expected: 'major',
            },
            {
                commits: [
                    new Commit('feat: new feature'),
                    new Commit('refactor(other component): code cleanup'),
                    new Commit('docs: readme updates'),
                ],
                options: {},
                expected: 'minor',
            },
            {
                commits: [new Commit('refactor(other component): code cleanup'), new Commit('docs: readme updates')],
                options: {},
                expected: 'patch',
            },
            {
                commits: [new Commit('fix(component)!: bug fix')],
                options: {},
                expected: 'major',
            },
        ])('$type bump of version $version should become $expected', ({ commits, options, expected }) => {
            const bumped = Version.findBumpType(commits, options)
            expect(bumped).toBe(expected)
        })
    })
})
