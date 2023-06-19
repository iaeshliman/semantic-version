export class Commit {
    type: string
    scope?: string
    description: string
    paragraphs?: string[]
    footers?: string[]
    breaking = false

    constructor(commit: string) {
        const sections = commit
            .trim()
            .split('\n\n')
            .map((e) => e.trim())

        // parse title
        const { type, scope, description, breaking: brkTitle } = this.parseTitle(sections[0])

        this.type = type
        this.scope = scope
        this.description = description
        if (brkTitle) this.breaking = true

        // parse body and footers
        const { paragraphs, footers, breaking: brkFooter } = this.parseBody(sections.slice(1).join('\n\n'))

        this.paragraphs = paragraphs
        this.footers = footers
        if (brkFooter) this.breaking = true
    }

    /**
     * Parse commit title using regex
     * Extract the type, scope, description, and breaking change status
     * @param title
     * @returns
     */
    private parseTitle(title: string): { type: string; scope?: string; description: string; breaking: boolean } {
        const match = title.match(/^(?<type>\w+)(?:\((?<scope>\w+)\))?(?<breaking>!)?:\s.+$/)
        if (match == null || match.groups == null) throw new Error('could not parse commit title')

        return {
            type: match.groups.type,
            scope: match.groups.scope,
            description: match.groups.description,
            breaking: match.groups.breaking != undefined,
        }
    }

    private parseBody(body: string): { paragraphs: string[]; footers: string[]; breaking: boolean } {
        let footers: string[] = []

        const matches = body.match(/^[\w-]+(?::\s|\s#).+$/gm)
        if (matches != null) footers = matches
        const paragraphs = body
            .split(footers.join('\n'))[0]
            .split('\n\n')
            .map((e) => e.trim())

        footers = footers.map((e) => e.trim())

        return {
            paragraphs: paragraphs,
            footers: footers,
            breaking: footers.some((footer) => footer.startsWith('BREAKING CHANGE')),
        }
    }
}
