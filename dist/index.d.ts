export {};
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
