import { Commit } from './commit-helper'
import { exec } from './exec-helper'

export const Git = {
    async getTag() {
        const tags = await exec('git', ['tag', '--sort=-v:refname', '-l', 'v*'])
        return tags.split('\n')[0].trim()
    },
    async getHashes(start: string, end = 'HEAD') {
        const commits = await exec('git', ['log', '--format=%h', `${start}..${end}`])
        return commits.split('\n').map((commit) => commit.trim())
    },
    async getCommit(hash: string) {
        const commit = await exec('git', ['log', '--format=%B', '-n', '1', hash])
        return new Commit(commit)
    },
}
