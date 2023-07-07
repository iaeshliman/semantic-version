import { Commit } from './commit-helper';
export declare const Version: {
    bump(version: string, type?: string): string;
    findBumpType(commits: Commit[], options?: {
        minor?: string[];
    }): string;
};
