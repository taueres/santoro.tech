import React from 'react';

const colorsLength = 5

function getCommandOutput(command, key) {
  if (command === 'social') {
    return (
      <React.Fragment key={key}>
        <br/>*** Social ***<br/>
        <br/>
        Feel free to contact me via the social networks:<br/>
        {' '}* <a href="https://github.com/taueres" target="_blank">GitHub</a><br/>
        {' '}* <a href="https://linkedin.com/in/sergio-santoro-0893239a" target="_blank">LinkedIn</a><br/>
        {' '}* <a href="https://twitter.com/taueres" target="_blank">Twitter</a><br/>
        {' '}* <a href="https://www.facebook.com/sergio.santoro.7" target="_blank">Facebook</a><br/>
        <br/>
      </React.Fragment>
    );
  }
  
  if (command === 'about') {
    return `
*** About me ***

Hey! I'm Sergio Santoro, Software Engineer who loves the Web and its new technologies.
I'm currently writing code for (AWSome) Amazon Web Services. I previously coded for (Hotel?) trivago!
I made this funny website, as you can see I like coding in my spare time too.
I love studying several IT topics: networking protocols, web development and new (temporary cool) programming languages.
I currently live in Ireland, I like exploring the hidden treasures of this beautiful island.
I look forward to any technical discussion, hopefully we'll have one soon.

That's it for now! Thanks for your time!

`;
  }
  
  if (command === 'contact') {
    return `
*** Contact ***

As everybody else, I have multiple email addresses.
Please discard the weird characters: brackets and dashes (they are used as anti-crawler defense).
  * sergio{--}@san{--}toro.tech
  * san{--}toro.srg{--}@gm{--}ail.com

`;
  }

  if (command === 'help') {
    return 'Help!? Help!? Who needs help?\n'
  }
}

const invalidCmdMessages = [
  'Nope! Did you read the commands available?',
  'What should that mean?!',
  'Are you serious!?',
  'I\'m afraid that\'s not working.'
];

function addToOutput(output, cmdOutput, key, command) {
  return [
    ...output,
    <React.Fragment key={`input-${key}`}>Your input: {command}<br/></React.Fragment>,
    cmdOutput
  ];
}
  
export function processCommandOutput({output, invalidCmdIdx, consoleLine, colorIdx}) {
  const key = output.length;
  const trimmedCmd = consoleLine.trim();

  if (trimmedCmd === '') {
    const noCmd = 'I cannot figure out what to do by myself... HELP ME!\n';
    return {
      output: addToOutput(output, noCmd, key, consoleLine)
    };
  }

  if (trimmedCmd === 'wtf') {
    return {
      output: addToOutput(output, '\n', key, consoleLine),
      colorIdx: (colorIdx + 1) % colorsLength
    };
  }

  const commandOutput = getCommandOutput(trimmedCmd, key)
  if (commandOutput) {
    return {
      output: addToOutput(output, commandOutput, key, consoleLine)
    };
  }

  return {
    output: addToOutput(output, invalidCmdMessages[invalidCmdIdx] + '\n', key, consoleLine),
    invalidCmdIdx: (invalidCmdIdx + 1) % invalidCmdMessages.length
  };
}
