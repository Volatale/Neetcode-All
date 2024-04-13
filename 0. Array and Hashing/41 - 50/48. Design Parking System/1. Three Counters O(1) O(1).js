class ParkingSystem {
  constructor(big, medium, small) {
    this.smallSpace = small;
    this.mediumSpace = medium;
    this.bigSpace = big;
  }

  addCar(carType) {
    switch (carType) {
      case 1:
        if (this.bigSpace > 0) {
          this.bigSpace--;
          return true;
        }

        return false;
      case 2:
        if (this.mediumSpace > 0) {
          this.mediumSpace--;
          return true;
        }

        return false;

      case 3:
        if (this.smallSpace > 0) {
          this.smallSpace--;
          return true;
        }

        return false;
      default:
        return false;
    }
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
