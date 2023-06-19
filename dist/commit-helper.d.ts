export declare class Commit {
    type: string;
    scope?: string;
    description: string;
    paragraphs?: string[];
    footers?: string[];
    breaking: boolean;
    constructor(commit: string);
    /**
     * Parse commit title using regex
     * Extract the type, scope, description, and breaking change status
     * @param title
     * @returns
     */
    private parseTitle;
    private parseBody;
}
