import { Commit } from './commit-helper';
export declare const Git: {
    getTag(): Promise<string>;
    getHashes(start: string, end?: string): Promise<string[]>;
    getCommit(hash: string): Promise<Commit>;
};
