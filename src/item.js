class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  decreaseSellIn () {
    this.sellIn--;
  }

  increaseQuality () {
    this.quality++;
  }

  decreaseQuality () {
    if (this.quality > 0) this.quality--;
  }

  expire () {
    this.quality = 0;
  }
}
