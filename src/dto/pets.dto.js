class PetsDTO {
    constructor(data) {
        this.name = data.name;
        this.species = data.species;
        this.age = data.age;
        this.owner = data.owner || null;
    }
}

export default PetsDTO;