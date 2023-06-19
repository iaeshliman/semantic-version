import * as core from '@actions/core'
import { exec } from './exec-helper'

async function main(): Promise<void> {
    try {
        console.log('Testing github actions')

        // Get latest tag
        let result = await exec('git', ['tag', '--sort=-v:refname', '-l', 'v*'])
        const tag = result.trim().split('\n')[0].trim()

        // DEBUG: print values
        console.log('Result:', result, '\nTag:', tag)

        // Get all commit hashes since last tag
        result = await exec('git', ['log', '--format=%h', `${tag}..HEAD`], { silent: false })
        const hashes = result
            .trim()
            .split('\n')
            .map((e) => e.trim())

        // DEBUG: print values
        console.log('Result:', result, '\nCommits:', hashes)

        // Iterate over each hash
        for (const hash of hashes) {
            await analyzeCommit(hash)
        }
    } catch (error: unknown) {
        console.error(error)
        core.setFailed(`${(error as any)?.message ?? error}`)
    }
}

async function analyzeCommit(hash: string): Promise<void> {
    console.log(`analyzing commit ${hash}`)

    const commit = await exec('git', ['log', '--format=%B', '-n', '1', hash])

    console.log(commit)
}

main()

/**
 *  Command to execute
 *
 *  Will return all tags sorted by version and filtered to only include tags matching the pattern `v*`
 *  `git tag --sort=-v:refname -l v*`
 *
 *  Will return the logs of each commit between two (excludes the first commit includes the second commit)
 *  `git log --oneline commit..commit`
 *
 *  Will return just the commits between the given tag and the head of the branch
 *  `git log --format="%h" tag..HEAD`
 *
 *
 *  Steps:
 *      - get all tags
 *      - find most recent version tag
 *      - find commits
 */
