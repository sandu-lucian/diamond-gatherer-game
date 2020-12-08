// Exercitiul 3

class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  greet() {
    console.log("Hello!");
  }

  details() {
    console.log(
      `My name is ${this.firstName} ${this.lastName} and I am ${this.age} years old.`
    );
  }
}

class Employee extends Person {
  constructor(firstName, lastName, age, job, salary, dateOfEmployment) {
    super(firstName, lastName, age);
    this.job = job;
    this.salary = salary;
    this.dateOfEmployment = dateOfEmployment;
  }

  jobDetails() {
    console.log(`${this.firstName} works as a ${this.job}.`);
  }

  income() {
    console.log(
      `${this.firstName}'s yearly net income is ${12 * this.salary}.`
    );
  }

  timeWithUs() {
    console.log(
      `${this.firstName} has been in our team since ${this.dateOfEmployment}.`
    );
  }
}

const Lucian = new Employee(
  "Lucian",
  "Sandu",
  25,
  "Junior Front End Developer",
  2000,
  "25th Jan 2020"
);
Lucian.greet();
Lucian.details();
Lucian.jobDetails();
Lucian.income();
Lucian.timeWithUs();

const Delia = new Employee(
  "Delia",
  "Sevastru",
  25,
  "Junior QA Engineer",
  2000,
  "16th March 2020"
);
Delia.greet();
Delia.details();
Delia.jobDetails();
Delia.income();
Delia.timeWithUs();

// Exercitiul 4

const arr = [1, -2, 6, -7, 10, 9, 14, true, false, null, undefined];

//filter

const filteredArr = arr.filter((el) => typeof el === "number");
console.log(filteredArr);

//map

const mappedArr = filteredArr.map((el) => el * 10);
console.log(mappedArr);

//reduce

const result = mappedArr.reduce((acc, curr) => (acc += curr));
console.log(result);
