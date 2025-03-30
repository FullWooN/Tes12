// Base Animal class demonstrating ENCAPSULATION
class Animal {
    #name; // Private field
    #age;  // Private field
    
    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }
    
    // Getter methods (accessing private fields)
    get name() {
        return this.#name;
    }
    
    get age() {
        return this.#age;
    }
    
    // Method to be overridden by child classes (POLYMORPHISM)
    makeSound() {
        return "Some generic animal sound";
    }
    
    // Method that can be inherited
    eat(food) {
        return `${this.#name} is eating ${food}.`;
    }
    
    // Static method (belongs to the class, not instances)
    static generateRandomName() {
        const names = ['Max', 'Bella', 'Charlie', 'Luna', 'Lucy', 'Cooper', 'Daisy', 'Buddy'];
        return names[Math.floor(Math.random() * names.length)];
    }
    
    // Abstract method (to be implemented by child classes)
    getAnimalType() {
        throw new Error("Method 'getAnimalType()' must be implemented.");
    }
    
    // Display animal info
    displayInfo() {
        return `
            <div class="animal-card">
                <h3>${this.#name}</h3>
                <p>Type: ${this.getAnimalType()}</p>
                <p>Age: ${this.#age} years</p>
                <p>Sound: ${this.makeSound()}</p>
            </div>
        `;
    }
}

// Dog class demonstrating INHERITANCE
class Dog extends Animal {
    constructor(name, age, breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }
    
    // POLYMORPHISM - overriding makeSound method
    makeSound() {
        return "Woof! Woof!";
    }
    
    // Implementing abstract method
    getAnimalType() {
        return "Dog";
    }
    
    // New method specific to Dog
    fetch(item) {
        return `${this.name} is fetching the ${item}.`;
    }
    
    // Overriding displayInfo to include breed
    displayInfo() {
        return `
            <div class="animal-card">
                <h3>${this.name}</h3>
                <p>Type: ${this.getAnimalType()} (${this.breed})</p>
                <p>Age: ${this.age} years</p>
                <p>Sound: ${this.makeSound()}</p>
            </div>
        `;
    }
}

// Cat class demonstrating INHERITANCE
class Cat extends Animal {
    constructor(name, age, isIndoor) {
        super(name, age);
        this.isIndoor = isIndoor;
    }
    
    // POLYMORPHISM - overriding makeSound method
    makeSound() {
        return "Meow!";
    }
    
    // Implementing abstract method
    getAnimalType() {
        return "Cat";
    }
    
    // New method specific to Cat
    purr() {
        return `${this.name} is purring...`;
    }
    
    // Overriding displayInfo to include indoor status
    displayInfo() {
        return `
            <div class="animal-card">
                <h3>${this.name}</h3>
                <p>Type: ${this.getAnimalType()} (${this.isIndoor ? 'Indoor' : 'Outdoor'})</p>
                <p>Age: ${this.age} years</p>
                <p>Sound: ${this.makeSound()}</p>
            </div>
        `;
    }
}

// Bird class demonstrating INHERITANCE
class Bird extends Animal {
    constructor(name, age, wingspan) {
        super(name, age);
        this.wingspan = wingspan;
    }
    
    // POLYMORPHISM - overriding makeSound method
    makeSound() {
        return "Chirp! Chirp!";
    }
    
    // Implementing abstract method
    getAnimalType() {
        return "Bird";
    }
    
    // New method specific to Bird
    fly() {
        return `${this.name} is flying with a wingspan of ${this.wingspan}cm.`;
    }
    
    // Overriding displayInfo to include wingspan
    displayInfo() {
        return `
            <div class="animal-card">
                <h3>${this.name}</h3>
                <p>Type: ${this.getAnimalType()}</p>
                <p>Age: ${this.age} years</p>
                <p>Wingspan: ${this.wingspan} cm</p>
                <p>Sound: ${this.makeSound()}</p>
            </div>
        `;
    }
}

// AnimalShelter class demonstrating COMPOSITION
class AnimalShelter {
    constructor() {
        this.animals = [];
    }
    
    addAnimal(animal) {
        this.animals.push(animal);
        this.updateDisplay();
    }
    
    listAnimals() {
        return this.animals.map(animal => animal.displayInfo()).join('');
    }
    
    makeAllSounds() {
        return this.animals.map(animal => `${animal.name} says: ${animal.makeSound()}`).join('<br>');
    }
    
    feedAll() {
        return this.animals.map(animal => animal.eat('food')).join('<br>');
    }
    
    getAnimalCount() {
        return this.animals.length;
    }
    
    updateDisplay() {
        document.getElementById('animalCount').textContent = `Animals in shelter: ${this.getAnimalCount()}`;
    }
}

// Create shelter instance
const shelter = new AnimalShelter();

// Helper function to generate random animals
function generateRandomAnimal() {
    const types = ['dog', 'cat', 'bird'];
    const type = types[Math.floor(Math.random() * types.length)];
    const name = Animal.generateRandomName();
    const age = Math.floor(Math.random() * 10) + 1;
    
    switch(type) {
        case 'dog':
            const dogBreeds = ['Labrador', 'Beagle', 'Poodle', 'Bulldog', 'Terrier'];
            const breed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
            return new Dog(name, age, breed);
        case 'cat':
            const isIndoor = Math.random() > 0.5;
            return new Cat(name, age, isIndoor);
        case 'bird':
            const wingspan = Math.floor(Math.random() * 50) + 20;
            return new Bird(name, age, wingspan);
    }
}

// Event Listeners
document.getElementById('addAnimal').addEventListener('click', () => {
    const animal = generateRandomAnimal();
    shelter.addAnimal(animal);
    document.getElementById('animalDetails').innerHTML = `Added: ${animal.name} the ${animal.getAnimalType()}`;
});

document.getElementById('listAnimals').addEventListener('click', () => {
    document.getElementById('shelterStatus').innerHTML = '<h3>All Animals:</h3>' + shelter.listAnimals();
    document.getElementById('animalDetails').innerHTML = '';
});

document.getElementById('makeSounds').addEventListener('click', () => {
    document.getElementById('shelterStatus').innerHTML = '<h3>Animal Sounds:</h3>' + shelter.makeAllSounds();
    document.getElementById('animalDetails').innerHTML = '';
});

document.getElementById('feedAnimals').addEventListener('click', () => {
    document.getElementById('shelterStatus').innerHTML = '<h3>Feeding Animals:</h3>' + shelter.feedAll();
    document.getElementById('animalDetails').innerHTML = '';
});