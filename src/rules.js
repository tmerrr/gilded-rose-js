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

  apply (item) {
    item.sellIn -= 1;
    if (item.name.includes('Aged Brie')) {
      this._applyAgedBrie(item)
    } else if (item.name.includes('Backstage pass')) {
      this._applyBackstagePass(item)
    } else if (item.name.includes('Conjured')) {
      this._applyConjured(item)
    } else if (item.name.includes('Sulfuras')) {

    } else {
      this._applyStandard(item)
    }
  }
}
