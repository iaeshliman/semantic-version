import { Commit } from './commit-helper'

export const Version = {
    bump(version: string, type = 'patch') {
        const match = version.match(/^(?<prefix>v)?(?<major>[0-9]+)\.(?<minor>[0-9]+)\.(?<patch>[0-9]+)[-+]?/)
        if (match === null || match.groups === undefined) throw new Error(`invalid version format: ${version}`)

        const prefix = match.groups.prefix ?? ''
        let major = Number(match.groups.major)
        let minor = Number(match.groups.minor)
        let patch = Number(match.groups.patch)

        switch (type) {
            case 'major':
                major++
                minor = 0
                patch = 0
                break
            case 'minor':
                minor++
                patch = 0
                break
            case 'patch':
                patch++
                break
            default:
                throw new Error(`unsupported bump type '${type}'`)
        }

        return `${prefix}${major}.${minor}.${patch}`
    },
    findBumpType(commits: Commit[], options: { minor?: string[] } = {}) {
        const minor = options.minor ?? ['feat']

        let type = 'patch'
        for (const commit of commits) {
            if (commit.breaking) type = 'major'
            if (type === 'patch' && minor.includes(commit.type)) type = 'minor'
            if (type === 'major') break
        }

        return type
    },
}
