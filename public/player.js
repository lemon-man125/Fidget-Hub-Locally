class Player {
  constructor(placeY) {
    this.fidgets = [];
    this.oldPlaceY = placeY;
    this.newPlaceY = this.oldPlaceY;
    this.accepted = false;
  }

  addFidget(fidget) {
    if (this.newPlaceY !== this.oldPlaceY) return;
    this.fidgets.push(fidget);
  }

  accept() {
    this.accepted = true;
  }

  lerpY(y) {
    this.newPlaceY = lerp(this.newPlaceY, y, 0.05);
  }

  revert() {
    this.newPlaceY = this.oldPlaceY;
  }

  clear() {
    this.fidgets = [];
  }

  show() {
    for (const fidget of this.fidgets) {
      const { length } = this.fidgets;
      const i = this.fidgets.indexOf(fidget);
      image(fidget, (width / (length + 1)) * (i + 1), this.newPlaceY, 100, 100);
    }
  }
}
