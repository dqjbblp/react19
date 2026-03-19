class Stu {
  static name = "hy";
  constructor(age) {
    this.age = age;
  }

  static logStatic() {
    console.log("this is static method");
  }

  set setAge(newAge) {
    this.age = newAge;
  }

  get getAge() {
    console.log(`get method get age ${this.age}`);
  }

  useFunGetAge() {
    console.log(this.age, "use normal function get age");
    return this.age;
  }

  useFunSetAge(newAge) {
    this.age = newAge;
    console.log(this.age, "use normal function set age");
  }
}

console.log(Stu.name, "static get name");

Stu.logStatic();

const stu = new Stu(20);

console.log(stu.age, "get method get age;", "set method change before");
stu.age = 1222;
console.log(stu.age, "get method get age;", "change after");

stu.useFunGetAge();
stu.useFunSetAge(2000);
