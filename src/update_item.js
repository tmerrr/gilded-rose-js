class UpdateItem {
  decreaseSellIn (item) {
    item.sellIn -= 1;
  }

  increaseQuality (item, value = 1) {
    if ((item.quality + value) >= 50) {
      item.quality = 50;
    } else {
      item.quality += value;
    }
  }

  decreaseQuality (item, value = 1) {
    if ((item.quality - value) <= 0) {
      item.quality = 0;
    } else {
      item.quality -= value;
    }
  }

  setQualityToZero (item) {
    item.quality = 0;
  }
}
