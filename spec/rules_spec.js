describe ('ItemRules', () => {
  beforeEach( () => {
    rules = new ItemRules ();
    vest = new Item('+5 Dexterity Vest', 10, 20);
    elixir = new Item('Elixir of the Mongoose', 5, 7);
    agedBrie = new Item('Aged Brie', 2, 0);
    sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    expiredSulfuras = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
    pass1 = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
    pass2 = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49);
    pass3 = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49);
    conjuredCake = new Item('Conjured Mana Cake', 3, 6);
  });

  describe('#isAgedBrie', () => {
    it ('returns false when item name is NOT Aged Brie', () => {
      expect(rules.isAgedBrie(vest)).toBeFalse();
    });

    it ('returns true when item name is Aged Brie', () => {
      expect(rules.isAgedBrie(agedBrie)).toBeTrue();
    });
  });

  describe ('#isSulfuras', () => {
    it ('returns false when item name does NOT include Sulfuras', () => {
      expect(rules.isSulfuras(vest)).toBeFalse();
    });

    it ('returns true when item name includes Sulfuras', () => {
      expect(rules.isSulfuras(sulfuras)).toBeTrue();
    });
  });

  describe ('#isBackstagePass', () => {
    it ('returns false when item name does NOT include Backstage pass', () => {
      expect(rules.isBackstagePass(vest)).toBeFalse();
    });

    it ('returns true when item name includes Backstage pass', () => {
      expect(rules.isBackstagePass(pass1)).toBeTrue();
    });
  });

  describe ('#standard', () => {
    it ('reduces quality quality and sellIn by 1', () => {
      rules.standard(vest);
      expect(vest.quality).toEqual(19);
    });
  });

});
