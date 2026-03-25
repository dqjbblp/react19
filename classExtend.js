class Animal {
  static sexy = "boy";
  constructor(name) {
    this.name = name;
  }

  static mySexy() {
    console.log(`my sexy is:${this.sexy}`);
  }

  eat(thing) {
    console.log(`${this.name}吃${thing || "豆子"}`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  run() {
    console.log(`${this.name} ${this.breed}在run`);
  }

  eat(after) {
    super.eat();
    console.log(`${this.name} 吃完了～${after}`);
  }
}

// Animal.mySexy();

const TaiDi = new Dog("泰迪", "棕色的");

TaiDi.run();
TaiDi.eat("打饱嗝");
