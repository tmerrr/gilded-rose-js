class Shop {
  constructor(items = [], rules = new ItemRules ()){
    this.items = items;
    this.rules = rules;
  }

  updateQuality() {
    this.items.forEach ( (item) => {
      item.decreaseSellIn();
      if (item.isConjured()) {
        this.rules.applyConjured(item);
      } else if (item.isAgedBrie()) {
        this.rules.applyAgedBrie(item);
      } else if (item.isBackstagePass()) {
        this.rules.applyBackstagePass(item);
      } else if (item.isSulfuras()) {
        // quality of Sulfuras doesn't change and decreaseSellIn
        // is already applied. So do nothing!
      } else {
        this.rules.applyStandard(item);
      }
    });
  }
}
