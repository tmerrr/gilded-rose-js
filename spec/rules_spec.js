describe ('ItemRules', () => {
  beforeEach( () => {
    rules = new ItemRules ();
    vest = new Item('+5 Dexterity Vest', 10, 20);
    agedBrie = new Item('Aged Brie', 2, 0);
    sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    expiredSulfuras = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
    conjuredCake = new Item('Conjured Mana Cake', 3, 6);
  });

  describe ('#applyStandard', () => {
    it ('reduces quality by 1', () => {
      rules.applyStandard(vest);
      expect(vest.quality).toEqual(19);
    });
  });

  describe ('#applyAgedBrie', () => {
    it ('increase quality by 1', () => {
      rules.applyAgedBrie(agedBrie);
      expect(agedBrie.quality).toEqual(1);
    });
  });

  describe ('#applyBackstagePass', () => {
    it ('increase in quality by 1, when the sellIn is over 10', () => {
      var pass = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20);
      rules.applyBackstagePass(pass);
      expect(pass.quality).toEqual(21);
    });

    it ('increase in quality by 2, when the sellIn is 10 or less', () => {
      var pass = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20);
      rules.applyBackstagePass(pass);
      expect(pass.quality).toEqual(22);
    });

    it ('increase in quality by 3, when the sellIn is 5 or less', () => {
      var pass = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20);
      rules.applyBackstagePass(pass);
      expect(pass.quality).toEqual(23);
    });

    it ('quality drops to 0, when the sellIn is 0 or less', () => {
      var pass = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
      rules.applyBackstagePass(pass);
      expect(pass.quality).toEqual(0);
    });
  });
});
