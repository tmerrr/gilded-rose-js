class Shop {
  constructor(items = [], rules = new ItemRules ()){
    this.items = items;
    this.rules = rules;
  }

  updateQuality() {
    this.items.forEach( (item) => {
      this.rules.apply(item);
    });
  }
}
