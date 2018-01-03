class Shop {
  constructor(items = [], rules = new ItemRules ()){
    this.items = items;
    this.rules = rules;
  }

  updateQuality() {
    this.items.forEach ( (item) => {
      item.decreaseSellIn();
      if (item.isAgedBrie()) {
        this.rules.applyAgedBrie(item);
      } else if (item.isBackstagePass()) {
        this.rules.applyBackstagePass(item);
      } else if (item.isSulfuras()) {

      } else {
        this.rules.applyStandard(item);
      }
    });
  }
}
