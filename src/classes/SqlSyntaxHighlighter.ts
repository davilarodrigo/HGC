export class SqlSyntaxHighlighter{

    static highlightCompleteSqlQuery(sentence: string) {
        sentence = SqlSyntaxHighlighter.insertBreakLines(sentence)
        sentence = SqlSyntaxHighlighter.highlightStrings(sentence)
        sentence = SqlSyntaxHighlighter.highlightPunctuation(sentence)
        sentence = SqlSyntaxHighlighter.highlightKeywords(sentence)
        return sentence
    }

    static highlightStrings(sentence: string) {
        const regex = /'(.*?)'/g; // Expresión regular para detectar cadenas entre comillas simples
        return sentence.replace(regex, `<span class="sql-string">'$1'</span>`);
    }
    
    static highlightParenthesis(text: string): string {
        const regex = /\('.*?'\)/g;
        let match = regex.exec(text);
        let result = '';
        let lastIndex = 0;
    
        while (match) {
            const startIndex = match.index + 1;
            const endIndex = startIndex + match[1].length;
            result += text.slice(lastIndex, startIndex);
            result += `<span class="sql-parenthesis">${match[1]}</span>`;
            lastIndex = endIndex;
            match = regex.exec(text);
        }
    
        result += text.slice(lastIndex);
        return result;
    }
    
    static highlightPunctuation(text: string): string {
        const punctuationRegex = /[(),;]/g;
        return text.replace(punctuationRegex, (match) => {
            return `<span class="sql-punctuation">${match}</span>`;
        });
    }
    
    static highlightKeywords(sentence: string) {
        const keywords = ["SELECT", "FROM", "WHERE", "INTO", "INSERT", "VALUES", "UPDATE", "DELETE", "LIKE", "NOT", "AND", "SET"];
    
        const output = sentence
            .split(" ")
            .map((word) => {
                const isKeyword = keywords.includes(word.toUpperCase());
                if (isKeyword) {
                    return `<span class="keyword">${word}</span>`;
                } else {
                    return word;
                }
            })
            .join(" ")
    
        return output
    }
    
    static insertBreakLines(sentence: string) {
        const breakLinesAfter = ["FROM","WHERE","SET","VALUES",", ("]
        
        //add a <br> after each closing parenthesis and comma "),"
        sentence = sentence.replace(/\),/g, "),<br>")
    
        return sentence
            .split(" ")
            .map((word) => {
                const isBreakLine = breakLinesAfter.includes(word.toUpperCase());
                if (isBreakLine) {
                    return `<br> ${word}`;
                } else {
                    return word;
                }
            })
            .join(" ")
    }
}