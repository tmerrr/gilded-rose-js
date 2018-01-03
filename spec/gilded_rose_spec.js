describe ('Gilded Rose', () => {
  beforeEach( () => {
    vest = new Item('+5 Dexterity Vest', 10, 20);
    agedBried = new Item('Aged Brie', 2, 0);
    elixir = new Item('Elixir of the Mongoose', 5, 7);
    sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    expiredSulfuras = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
    pass1 = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
    pass2 = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49);
    pass3 = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49);
    conjuredCake = new Item('Conjured Mana Cake', 3, 6);
    allItems = [
      vest,
      agedBried,
      elixir,
      sulfuras,
      expiredSulfuras,
      pass1,
      pass2,
      pass3,
      conjuredCake
    ];
  });

  describe ('#updateQuality', () => {
    it ('reduces sellIn property of a normal item, by 1', () => {
      var shop = new Shop([vest])
      shop.updateQuality();
      expect(vest.sellIn).toEqual(9)
    })

    it ('reduces quality property of a normal item, by 1', () => {
      var shop = new Shop([vest])
      shop.updateQuality();
      expect(vest.quality).toEqual(19)
    })
  })
})
