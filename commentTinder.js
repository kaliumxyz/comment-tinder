#!/usr/bin/node
"use strict";
let file = process.argv[2];
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// TODO: implement a table of sorts to display the results.
// something like: {left: {}, right: {}};
let remove = []

fs.readFile(path.resolve(file),{encoding: "utf-8"}, async (err,content) => { 

	if(!content){
		console.error('the file is empty!')
		process.exit(0)
	}

	let lines = content
		.split('\n')
		.filter(line => line
			.includes('//')
		)
	while(lines.length) {
		rl.prompt()
		let ans = await prompt(lines[lines.length - 1])
		if(ans)
		if(ans.toLowerCase().startsWith('y'))
			lines.pop()
		else if(ans.toLowerCase().startsWith('n'))
			remove[lines.pop()] = 1
	}

	let result = content.split('\n').reduce((acc, el) => acc += remove[el]?'\n':el + "\n", "")

	if ((await prompt("agree?")).toLowerCase().startsWith('y'))
		await new Promise((res,rej) => fs.writeFile(file, result, {}, res))

	rl.close()

})




function prompt(line) {
	return new Promise((res, rej) => {
		rl.question(line + "\n", ans => {res(ans)})
	})
}
