const core = require('@actions/core')
const exec = require('@actions/exec')

try {
    console.log('running action')

    const result = await execute('git', ['tag', '--sort=-v:refname', '-l', 'v*'])
    console.log('reached this stage')
    console.log(result)

    core.setOutput('version', 'v0.0.0')
} catch (error) {
    core.setFailed(error.message)
}

async function execute(cmd, args) {
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

    await exec.exec(cmd, args, options)

    if (error !== '') throw new Error(error)
    return output
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
