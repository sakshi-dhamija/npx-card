#!/usr/bin/env node

"use strict";

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require("fs");
const request = require("request");
const path = require("path");
const ora = require("ora");
const cliSpinners = require("cli-spinners");
clear();

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "list",
    name: "action",
    message: "What you want to do?",
    choices: [
      {
        name: `Send me an ${chalk.green.bold("email")}?`,
        value: () => {
          open(
            "https://mail.google.com/mail/u/?authuser=sakshidhamija15@gmail.com"
          );
          console.log("\nGrt, the postman might arrive soon!\n");
        },
      },
      {
        name: `Check out my ${chalk.magentaBright.bold("Resume")}?`,
        value: () => {
          // cliSpinners.dots;
          const loader = ora({
            text: " Downloading Resume",
            spinner: cliSpinners.material,
          }).start();
          let pipe = request(
            "https://drive.google.com/file/d/1hhlkPAcKlwAq2BPfvw_dpCQE8WIMQVoK/view?usp=sharing"
          ).pipe(fs.createWriteStream("./sakshi-resume.html"));
          pipe.on("finish", function () {
            let downloadPath = path.join(process.cwd(), "sakshi-resume.html");
            console.log(`\nResume Downloaded at ${downloadPath} \n`);
            open(downloadPath);
            loader.stop();
          });
        },
      },
      {
        name: `Wanna discuss about an idea, pitch or books? ${chalk.green.bold("Call me")}`,
        value:()=>{
          console.log("+91 8349046111");
        }
      },
      {
        name: "I came here mistakenly.",
        value: () => {
          console.log("haha bye!\n");
        },
      },
    ],
  },
];

const data = {
  name: chalk.bold.green("            Sakshi Dhamija"),
  handle: chalk.white("@secrashi"),
  work: `${chalk.white("Sophomore at ")} ${chalk
    .hex("#2b82b2")
    .bold("IIIT Gwalior")}`,
  github: chalk.gray("https://github.com/") + chalk.green("secrashi"),
  linkedin:
    chalk.gray("https://linkedin.com/in/") +
    chalk.blue("s15"),
  Medium:
  chalk.gray("https://sakshi-secrashi.medium.com/"),
  npx: chalk.red("npx") + " " + chalk.white("secrashi"),

  labelWork: chalk.white.bold("       Work:"),
  labelGitHub: chalk.white.bold("     GitHub:"),
  labelLinkedIn: chalk.white.bold("   LinkedIn:"),
  labelMedium: chalk.white.bold("       Medium:"),
  labelCard: chalk.white.bold("       Card:"),
};

const me = boxen(
  [
    `${data.name}`,
    ``,
    `${data.labelWork}  ${data.work}`,
    ``,
    `${data.labelGitHub}  ${data.github}`,
    `${data.labelLinkedIn}  ${data.linkedin}`,
    `${data.labelMedium}  ${data.Medium}`,
    ``,
    `${data.labelCard}  ${data.npx}`,
    ``,
    `${chalk.italic("I am currently learning....          to unlearn,")}`,
    `${chalk.italic("If I do not respond within a day, just know that ")}`,
    `${chalk.italic("I'm writing a poem and will get back to u soon.  hopefully! ")}`,
    `${chalk.italic("Umm..  Bye!")}`,
  ].join("\n"),
  {
    margin: 1,
    float: "center",
    padding: 1,
    borderStyle: "single",
    borderColor: "green",
  }
);

console.log(me);
const tip = [
  `Tip: Do not try to ${chalk.cyanBright.bold("cmd/ctrl + click")} on the links above`,
  "",
].join("\n");
console.log(tip);

prompt(questions).then((answer) => answer.action());
