main();

async function main() {
  let body = document.querySelector("body");
  let shell = document.querySelector("#shell");
  let input = document.createElement("p");
  let text = "";

  await execute("help", shell);
  input.textContent = "|";
  shell.appendChild(input);

  body.addEventListener("keydown", function (event) {
    if (event.key.length === 1) {
      text += event.key;
    } else {
      switch (event.key) {
        case "Enter":
          execute(text, shell).then(() => {
            input.textContent = text;
            text = "";
            input = document.createElement("p");
            shell.appendChild(input);
            input.textContent = "|";
          });
          break;
        case "Backspace":
          text = text.slice(0, -1);
          break;
      }
    }

    input.textContent = text + "|";
  });
}

async function execute(command) {
  let output = document.createElement("div");
  let cmd = command.split(" ");

  if (cmd[0] == "lang") {
    switch (cmd[1]) {
      case "it":
        document.documentElement.lang = "it";
        break;
      case "en":
        document.documentElement.lang = "en";
        break;
      default:
        let error = document.createElement("p");
        error.textContent = cmd[1]
          ? `Error: ${cmd[1]} not a valid language`
          : `Error: lang requires a language (it/en)`;
        output.appendChild(error);
    }
  } else {
    await fetch(`/${document.documentElement.lang}/${command}.md`).then(
      (response) => {
        if (!response.ok) {
          let error = document.createElement("p");
          error.textContent = `Error: ${command} not found`;
          output.appendChild(error);
        } else {
          response.text().then((text) => {
            let rows = text.split("\n");
            for (let i = 0; i < rows.length; i++) {
              if (rows[i].length > 0) {
                let row = document.createElement("p");
                row.innerHTML = md2html(rows[i]);
                output.appendChild(row);
              }
            }
          });
        }
      },
    );
  }

  shell.appendChild(output);
}

function md2html(text) {
  const regex = [
    [/^# (.+)$/, "<h1>$1</h1>"],
    [/\[(.+?)\]\((.+?)\)/g, "<a href='$2' target='_blank'>$1</a>"],
  ];
  for (let i = 0; i < regex.length; i++)
    text = text.replace(regex[i][0], regex[i][1]);
  return text;
}
