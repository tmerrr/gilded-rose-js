class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decreaseSellIn () {
    this.sellIn--;
  }

  increaseQuality (value = 1) {
    if ((this.quality + value) >= 50) {
      this.quality = 50;
    } else {
      this.quality += value;
    }
  }

  decreaseQuality (value = 1) {
    if ((this.quality - value) <= 0) {
      this.expire()
    } else {
      this.quality -= value;
    }
  }

  expire () {
    this.quality = 0;
  }

  isAgedBrie () {
    return this.name === 'Aged Brie';
  }

  isSulfuras () {
    return this.name.includes('Sulfuras');
  }

  isBackstagePass () {
    return this.name.includes('Backstage pass');
  }
}
