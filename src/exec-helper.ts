import { exec as execute, ExecOptions } from '@actions/exec'

export async function exec(cmd: string, args?: string[], options?: ExecOptions): Promise<string> {
    let output = ''
    let error = ''

    if (options == undefined) options = {}
    options.listeners = {
        stdout: (data: Buffer) => (output += data.toString()),
        stderr: (data: Buffer) => (error += data.toString()),
    }
    options.silent = true

    await execute(cmd, args, options)

    if (error !== '') throw new Error(error)
    return output
}
