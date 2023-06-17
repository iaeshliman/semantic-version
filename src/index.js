const core = require('@actions/core')
const github = require('@actions/github')

try {
    console.log('running action')

    core.setOutput('version', 'v0.0.0')
} catch (error) {
    core.setFailed(error.message)
}
