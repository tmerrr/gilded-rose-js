class ItemRules {
  applyStandard (item) {
    item.decreaseQuality();
  }

  applyAgedBrie (item) {
    item.increaseQuality();
  }

  applyBackstagePass (item) {
    if (item.sellIn <= 0) {
      item.expire()
    } else if (item.sellIn <= 5) {
      item.increaseQuality(3);
    } else if (item.sellIn <= 10) {
      item.increaseQuality(2);
    } else {
      item.increaseQuality();
    }
  }
}
