class ItemRules {
  applyStandard (item) {
    if (item.sellIn <= 0) {
      item.decreaseQuality(2);
    } else {
      item.decreaseQuality();
    }
  }

  applyAgedBrie (item) {
    item.increaseQuality();
  }

  applyConjured (item) {
    if (item.sellIn <= 0) {
      item.decreaseQuality(4);
    } else {
      item.decreaseQuality(2);
    }
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
