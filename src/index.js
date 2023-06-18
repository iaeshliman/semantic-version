const core = require('@actions/core')
const exec = require('@actions/exec')

async function main() {
    try {
        console.log('running action')

        console.log('pre await')
        // await execute('git', ['tag', '--sort=-v:refname', '-l', 'v*'])
        // await exec.exec('git', ['tag', '--sort=-v:refname', '-l', 'v*'])
        await exec.exec('git', ['branch'])
        console.log('post await')

        core.setOutput('version', 'v0.0.0')
    } catch (error) {
        core.setFailed(error.message)
    }
}
main()

async function execute() {
    let output = ''
    let error = ''

    const options = {}
    options.listeners = {
        stdout: (data) => {
            output += data.toString()
        },
        stderr: (data) => {
            error += data.toString()
        },
    }

    await exec.exec('git', ['tag', '--sort=-v:refname', '-l', 'v*'], options)

    console.log(output)
    console.log(error)
}

/**
 *
 *  Command to execute
 *
 *  Will return all tags sorted by version and filtered to only include tags matching the pattern `v*`
 *  `git tag --sort=-v:refname -l v*`
 *
 *  Will return the logs of each commit between two (excludes the first commit includes the second commit)
 *  `git log --oneline commit..commit`
 *
 *
 *
 *
 *
 *
 *
 *
 */
