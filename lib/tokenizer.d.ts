export default class Tokenizer {
    username: string;
    entry: null | string;
    sentences: null | string[];
    botname: string;
    constructor(username?: string, botname?: string);
    setEntry(entry: string): void;
    getSentences(): string[];
    getTokens(sentenceIndex: number): string[];
}
