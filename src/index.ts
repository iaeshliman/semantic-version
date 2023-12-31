import * as core from '@actions/core'
import { Git } from './git-helper'
import { Version } from './version-helper'

async function main(): Promise<void> {
    try {
        // TODO: remove logging
        console.log('test running semantic versioning action')

        // Get latest tag
        const tag = await Git.getTag()

        // Get all hashes
        const hashes = await Git.getHashes(tag)

        // Get all commits
        const commits = []
        for (const hash of hashes) {
            try {
                commits.push(await Git.getCommit(hash))
            } catch (error: unknown) {
                console.warn(`commit ${hash}: ${(error as Error).message}`)
            }
        }

        // DEBUG
        console.log(commits)

        // Get bump type
        const type = Version.findBumpType(commits)
        const version = Version.bump(tag, type)

        // DEBUG
        console.log(`old version ${tag}\nnew version: ${version}`)
    } catch (error: unknown) {
        core.setFailed(`${(error as any)?.message ?? error}`)
    }
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
