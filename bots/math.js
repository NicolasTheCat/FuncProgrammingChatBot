import axios from "axios";
import * as mathe from "mathjs";

export const MATHINFO = {
  name: "MathBot",
  avatar: "profile_math.png",
  commands: { math, mathplus, help },
};

function math(args) {
  return mathe.evaluate(args);
}

async function mathplus(args) {
  const evals = args.split("#");

  const request = await axios
    .post("http://api.mathjs.org/v4/", {
      expr: evals,
    })
    .catch((err) => {
      return { error: err.message };
    });

  if (request["error"]) return request["error"];

  if (request.data["error"]) return results["error"];

  return request.data["result"].join("<br>");
}

function help(args) {
  switch (args) {
    case "math":
      return "La commande math retourne le résultat d'une opération mathématique <br>(example: math 3*(1+1))";

    case "mathplus":
      return `Utilise l'api en ligne MathJS pour effectuer plusieurs calculs en une commande <br>
        Chaque opération doit être séparée par un # <br>
        (example: mathplus 3*(1+1)#2*(1+1)#3*(1+1))`;

    case "":
      return `Mes commandes sont les suivantes :<br>
      math<br>
      mathPlus<br>`;
  }
}
