class Animal {
  constructor({ animal_colour, animal_kind, animal_sex,animal_age }) {
    this.color = animal_colour;
    this.kind = animal_kind;
    this.sex = animal_sex;
    this.age=animal_age
  }
  setSex() {
    let sex = "未知";
    switch (this.sex) {
      case "M":
        sex = "公";
        break;
      case "F":
        sex = "母";
        break;
    }
    return sex;
  }
  setName() {
    const sex = this.setSex() == "未知" ? "" : this.setSex();
    return `${this.color}${sex}${this.kind}`;
  }

  setAge (){
    let age = "不確定年齡";
    switch (this.age) {
      case "CHILD":
        age = "幼年";
        break;
      case "ADULT":
        age = "成年";
        break;
    }
    return age;
  }



}

export {
    Animal
}