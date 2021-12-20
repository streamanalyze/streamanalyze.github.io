Prism.languages.OSQL = {
	'comment': {
		pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
		lookbehind: true
	},
	'variable': [
		{
			pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
			greedy: true
		},
		/@[\w.$]+/
	],
	'string': {
		pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
		greedy: true,
		lookbehind: true
	},
	'identifier': {
		pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
		greedy: true,
		lookbehind: true,
		inside: {
			'punctuation': /^`|`$/
		}
	},
	'function': /\b(?:\S*)(?=\()/i, // Should we highlight user defined functions too?
	'keyword': /\b(?:Vector|of|bag|Object|Integer|integer|Number|number|Real|real|Timeval|timeval|Charstring|charstring|Binary|binary|Function|function|set|timestamp|function|in|vselect|select|insert|update|delete|from|where|and|or|group|by|order|limit|offset|having|as|case|when|else|end|type|join|on|outer|desc|asc|union|create|primary|key|if|foreign|not|references|default|null|database|drop|grant|declare|begin|then)\b/i,
	'boolean': /\b(?:true|NULL|false)\b/i,
	'number': /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
	'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b/i,
	'punctuation': /[;[\]()`,.]/
};





           