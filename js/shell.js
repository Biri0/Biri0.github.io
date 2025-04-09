main();

function addShellInput(shell) {
  let input_box = document.createElement("div");
  let input = document.createElement("input");
  input_box.appendChild(input);
  shell.appendChild(input_box);
  document.querySelector("input").focus();
  return input;
}

function inputLowerCase(input) {
  input.addEventListener("input", function (event) {
    input.value = input.value.toLowerCase();
  });
}

async function main() {
  let body = document.querySelector("body");
  let shell = document.querySelector("#shell");

  shell.appendChild(await execute("help", shell));

  let input = addShellInput(shell);
  inputLowerCase(input);

  document.querySelector("html").addEventListener("click", function () {
    document.querySelector("input").focus();
  });

  body.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      let prev_input = document.querySelector("input");
      let text = prev_input.value;

      execute(text).then((output) => {
        prev_input.remove();

        let prev_command = document.createElement("p");
        prev_command.textContent = text;
        shell.appendChild(prev_command);

        shell.appendChild(output);

        input = addShellInput(shell);
        inputLowerCase(input);

        document.querySelector("input").focus();
      });
    }
  });
}

async function execute(command) {
  function changeLang(lang) {
    let success = document.createElement("p");
    success.textContent =
      document.documentElement.lang == lang
        ? `Warning: the language was already set to '${lang}'`
        : `Language changed to '${lang}'`;
    output.appendChild(success);
    document.documentElement.lang = lang;
  }

  let output = document.createElement("div");
  let cmd = command.split(" ");

  if (cmd[0] == "lang") {
    switch (cmd[1]) {
      case "it":
        changeLang("it");
        break;
      case "en":
        changeLang("en");
        break;
      default:
        let error = document.createElement("p");
        error.textContent = cmd[1]
          ? `Error: '${cmd[1]}' is not a valid language`
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

  return output;
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
