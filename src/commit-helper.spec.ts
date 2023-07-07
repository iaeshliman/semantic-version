import { Commit } from './commit-helper'

const commits = [
    {
        type: 'feat',
        description: 'new feature',
        breaking: false,
        raw: 'feat: new feature',
    },
    {
        type: 'fix',
        description: 'bug fix',
        breaking: true,
        raw: 'fix(component)!: bug fix',
    },
    {
        type: 'refactor',
        description: 'code cleanup',
        breaking: false,
        raw: 'refactor(other component): code cleanup',
    },
    {
        type: 'docs',
        description: 'readme updates',
        breaking: false,
        raw: 'docs: readme updates',
    },
    {
        type: 'feature',
        description: 'large new feature',
        breaking: true,
        raw:
            'feature(component): large new feature' +
            '\n' +
            'BREAKING CHANGE: component no longer accepts property XYZ',
    },
]

describe('commit-helper', () => {
    it('should exist', () => {
        expect(Commit).toBeDefined()
    })

    it.each(commits)('should create object', ({ raw, type, description, breaking }) => {
        const commit = new Commit(raw)

        expect(commit).toBeDefined()
        expect(commit).toBeInstanceOf(Commit)
        expect(commit.type).toBe(type)
        expect(commit.description).toBe(description)
        expect(commit.breaking).toBe(breaking)
    })
})
