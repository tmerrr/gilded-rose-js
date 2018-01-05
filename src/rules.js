class ItemRules {
  constructor(updateItem = new UpdateItem()) {
    this.updateItem = updateItem;
  }

  applyStandard (item) {
    if (item.sellIn <= 0) {
      this.updateItem.decreaseQuality(item, 2)
    } else {
      this.updateItem.decreaseQuality(item)
    }
  }

  applyAgedBrie (item) {
    this.updateItem.increaseQuality(item);
  }

  applyBackstagePass (item) {
    if (item.sellIn <= 0) {
      this.updateItem.setQualityToZero(item);
    } else if (item.sellIn <= 5) {
      this.updateItem.increaseQuality(item, 3)
    } else if (item.sellIn <= 10) {
      this.updateItem.increaseQuality(item, 2)
    } else {
      this.updateItem.increaseQuality(item)
    }
  }

  applyConjured (item) {
    if (item.sellIn <= 0) {
      this.updateItem.decreaseQuality(item, 4)
    } else {
      this.updateItem.decreaseQuality(item, 2)
    }
  }
}
