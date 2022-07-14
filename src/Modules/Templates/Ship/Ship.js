class Ship {
  constructor(length) {
    this.length = length;
    this.damageArray = Array(length).fill(false);
  }

  hit(section) {
    if (section >= 0 && section <= this.length - 1) {
      if (this.damageArray[section]) {
        return false;
      }
      this.damageArray[section] = true;
      return true;
    }
    throw new RangeError('The hit was outside of the ship length. This function should not be called on this ship. ');
  }

  get sunk() {
    return this.damageArray.every((element) => element === true);
  }
}

export default Ship;
