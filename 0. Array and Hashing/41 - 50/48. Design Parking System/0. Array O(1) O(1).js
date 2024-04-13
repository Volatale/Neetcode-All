class ParkingSystem {
  constructor(big, medium, small) {
    this.spaces = [big, medium, small];
  }

  addCar(carType) {
    if (this.spaces[carType - 1] > 0) {
      this.spaces[carType - 1]--;
      return true;
    }

    return false;
  }
}

const parkingSystem = new ParkingSystem(1, 1, 0);

console.log(parkingSystem.addCar(1)); //* True
console.log(parkingSystem.addCar(2)); //* True
console.log(parkingSystem.addCar(3)); //* False
console.log(parkingSystem.addCar(1)); //* False

console.log("Next Set");

const parkingSystemII = new ParkingSystem(3, 3, 3);

console.log(parkingSystemII.addCar(1)); //* True
console.log(parkingSystemII.addCar(1)); //* True
console.log(parkingSystemII.addCar(1)); //* True
console.log(parkingSystemII.addCar(1)); //* False

console.log(parkingSystemII.addCar(2)); //* True
console.log(parkingSystemII.addCar(2)); //* True
console.log(parkingSystemII.addCar(2)); //* True
console.log(parkingSystemII.addCar(2)); //* False

console.log(parkingSystemII.addCar(3)); //* True
console.log(parkingSystemII.addCar(3)); //* True
console.log(parkingSystemII.addCar(3)); //* True
console.log(parkingSystemII.addCar(3)); //* False
