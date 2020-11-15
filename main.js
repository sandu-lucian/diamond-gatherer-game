const aboutMe = {
  name: "Sandu Lucian",
  age: 25,
  skills: [
    "HTML",
    "CSS",
    "JS",
    "SASS",
    "React - beginner",
    "TypeScript - beginner",
    "NodeJS (Express) - beginner",
  ],
  greet: () => {
    console.log(
      `Hello!\n\nMy name is ${aboutMe.name}, I am ${aboutMe.age} years old\nand my Frontend knowledge revolves around\n${aboutMe.skills}.\n\nNice to meet you!`
    );
  },
};

window.addEventListener("load", (e) => {
  aboutMe.greet();
});

const hello = (name) => {
  return `Buna, numele meu este ${name}`;
};
