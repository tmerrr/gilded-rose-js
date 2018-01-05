class ItemRules {
  constructor(updateItem = new UpdateItem()) {
    this.updateItem = updateItem;
  }

  _applyStandard (item) {
    if (item.sellIn <= 0) {
      this.updateItem.decreaseQuality(item, 2)
    } else {
      this.updateItem.decreaseQuality(item)
    }
  }

  _applyAgedBrie (item) {
    this.updateItem.increaseQuality(item);
  }

  _applyBackstagePass (item) {
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

  _applyConjured (item) {
    if (item.sellIn <= 0) {
      this.updateItem.decreaseQuality(item, 4)
    } else {
      this.updateItem.decreaseQuality(item, 2)
    }
  }

  applyRule (item) {
    if (item.name.includes('Aged Brie')) {
      this._applyAgedBrie(item)
    } else {
      this._applyStandard(item)
    }
  }
}
