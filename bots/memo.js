import axios from "axios";

export const MEMOINFO = {
  name: "MemoBot",
  avatar: "profile_memo.jpg",
  commands: {
    save,
    dispall,
    disp,
    help,
  },
};

async function save(args) {
  const userName = args.split(" ")[0];
  const memoName = args.split(" ")[1];
  const memoData = args.substring(userName.length + memoName.length + 2).trim();

  await axios.post(`http://localhost:3000/memo/${userName}`, {
    memoName,
    memoData,
  });

  return `Message sauvegardé avec le nom ${memoName} pour l'utilisateur ${userName} :<br>${memoData}`;
}

async function dispall(args) {
  const userName = args.split(" ")[0];
  const memos = (await axios.get(`http://localhost:3000/memo/${userName}`))
    .data;

  if (memos.length === 0) return `Aucun memo pour l'utilisateur ${userName}`;

  return `Vos memos :<br>${memos.join("<br>")}`;
}

async function disp(args) {
  const userName = args.split(" ")[0];
  const memoName = args.split(" ")[1];

  const memo = (
    await axios.get(`http://localhost:3000/memo/${userName}/${memoName}`)
  ).data;

  return `Memo ${memoName} pour l'utilisateur ${userName} :<br>${memo}`;
}

function help(args) {
  switch (args) {
    case "save":
      return `La commande save permets de sauvegarder un memo
      <br>Il faut pour cela renseigner un nom d'utilisateur et un nom de memo
      <br> (Exemple : save CyrilVimard IMPORTANT ne pas oublier de donner un 20/20 a ce projet)`;

    case "dispAll":
      return `La commande dispAll permets de regarder le nom de tous les memos pour un utilisateur
        <br>Il faut pour cela renseigner un nom d'utilisateur 
        <br> (Exemple : dispAll CyrilVimard)`;

    case "disp":
      return `La commande disp permets de regarder le contenu d'un memo spécifique
            <br>Il faut pour cela renseigner un nom d'utilisateur et un nom de memo
            <br> (Exemple : disp CyrilVimard IMPORTANT)`;

    case "":
      return `Mes commandes sont les suivantes :
      <br>save {user} {memoName} {memo}
      <br>dispAll {user} 
      <br>disp {user} {memoName}`;
  }
}
