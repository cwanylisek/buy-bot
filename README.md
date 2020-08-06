# funko-buy-bot

This is a simple bot using Node.js / puppeteer that buys a Funko toy when it drops.

# Prerequisites

- Node.js
- git command-line tools
- A text editor (I recommend VSCode)

## Install Node.js

- Install [Node.js (LTS)](https://nodejs.org/en/download)
- Test your Node.js installation: First open a terminal (in Windows, you can do `WIN + R` then type `cmd` and hit `ENTER`), then type `node -v` and you should see something like `v10.16.0` (the current version as of right now).

## Install git

- Install [git](https://git-scm.com/downloads)
- Test your git installation: First open a terminal (in Windows, you can do `WIN + R` then type `cmd` and hit `ENTER`), then type `git --version` and you should see something like `git version 2.8.1.windows.1` (the current version as of right now).

# Getting started

1. Clone this repository using git

- Open a terminal (in Windows, you can do `CTRL + R` then type `cmd` and hit `ENTER`)
- Enter the following:

`git clone https://github.com/cwanylisek`

2. Make sure you are in the bot directory within the terminal

`cd buy-bot`

3. Install the Node.js dependencies

`npm install`

4. Using a text editor, edit the `bot.js` file in the bot directory. In this file, look for the section called `Parameters to set`. These are the parameters to change:

- user
- pass
- cv_code
- cc_number
- month
- year
- phone
- url
- debug
- buy

5. Run the bot

Once you've configured the bot, you can run it

`node bot.js`

Ideally, you would run it right around the time of the drop.