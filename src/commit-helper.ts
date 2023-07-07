export class Commit {
    raw: string
    type: string
    description: string
    breaking: boolean

    constructor(raw: string) {
        this.raw = raw

        // Extract first line of commit and parse
        const match = raw
            .split('\n')[0]
            .trim()
            .match(/^(?<type>[\w\s]+)(?:\([\w\s]+\))?(?<breaking>!)?: (?<description>.+)$/)
        if (match === null || match.groups === undefined) throw new Error('invalid commit format')

        this.type = match.groups.type
        this.description = match.groups.description
        this.breaking = match.groups.breaking !== undefined

        if (/BREAKING CHANGE/.test(raw)) this.breaking = true
    }
}
