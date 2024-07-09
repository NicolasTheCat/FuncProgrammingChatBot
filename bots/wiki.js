import axios from "axios";

export const WIKIINFO = {
  name: "WikiBot",
  avatar: "profile_wiki.png",
  commands: { help, desc, random },
};

async function desc(args) {
  const url = `http://localhost:3000/wiki/${args}`;
  const response = (await axios.get(url)).data;

  if (response === "Not found") return "Article non trouvé";
  return response;
}

async function random(args) {
  const url = `http://localhost:3000/wiki/random`;
  const response = (await axios.get(url)).data;

  return response;
}

function help(args) {
  switch (args) {
    case "desc":
      return `La commande desc permets d'avoir la description d'un article wikipedia
        <br> (Exemple : desc Javascript)`;

    case "random":
      return `La commande random permets d'avoir la description d'un article wikipedia aléatoire
          <br>Dû a la taille de wikipedia, certains articles peuvent sembler étrange
          <br> (Exemple : random)`;

    case "":
      return `Mes commandes sont les suivantes :
        <br>desc {article}
        <br>random`;
  }
}
