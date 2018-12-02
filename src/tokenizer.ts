const debug = require('debug')('tokenizer');

const compact = (str: string): string => str.trim().replace('  ', ' ');
  
export class Tokenizer {
    username: string
    botname: string
    protected _entry: string
    protected _sentences: string[]

    constructor(username: string = 'Guy', botname: string = 'ECTOR') {
        this.username = username
        this.botname = botname
        this._entry = '';
        this._sentences = [];
    }

    set entry(value: string) {
        this._entry = compact(value)
        this._sentences = []
    }

    // Split the entry into sentences.
    get sentences(): string[] {
        // this.sentences = this.entry.split(/[\.!]\s/);
        if (!this._entry) return [];
        const words: string[] = this._entry.split(' ');
        const endingWords = words.filter((w: string): boolean =>
            w.endsWith('.') || w.endsWith('!') || w.endsWith('?')
        );

        const botnameRegExp = new RegExp("\\W?" + this.botname.normalize() + "\\W?");
        const usernameRegExp = new RegExp("\\W?" + this.username.normalize() + "\\W?");
        this._sentences = [];
        let lastSentence: string = words[0];
        words.reduce((prev, cur: string): string => {
            const curNormalized: string = cur.normalize();
            let curReplaced: string = cur;
            if (curNormalized.search(botnameRegExp) !== -1) {
                curReplaced = cur.replace(this.botname,"{yourname}");
            }
            else if (curNormalized.search(usernameRegExp) !== -1) {
                curReplaced = cur.replace(this.username,"{myname}");
            }

            if (endingWords.indexOf(prev) !== -1) {
                this._sentences.push(compact(lastSentence));
                lastSentence = "";
            }
            lastSentence = lastSentence + " " + curReplaced;
            return cur;
        });
        this._sentences.push(compact(lastSentence));
        return this._sentences;        
    }

    // Get the tokens of one sentence
    getTokens(sentenceIndex: number = 0): string[] {
        return this._sentences[sentenceIndex].split(' ');
    }
}
