describe ('Item', () => {
  beforeEach( () => {
    item = new Item('cheese', 2, 5);
    freeItem = new Item ('free!', 1, 0);
  });

  describe ('Properties:', () => {
    it ('has an item name', () => {
      expect(item.name).toEqual('cheese');
    });

    it ('has a Sell In value', () => {
      expect(item.sellIn).toEqual(2);
    });

    it ('has a quality value', () => {
      expect(item.quality).toEqual(5);
    });
  });

  describe ('#decreaseSellIn', () => {
    it ('decreases the sellIn property by 1', () => {
      item.decreaseSellIn();
      expect(item.sellIn).toEqual(1);
    });
  });

  describe ('#increaseQuality', () => {
    it ('increases quality by 1', () => {
      item.increaseQuality();
      expect(item.quality).toEqual(6);
    });
  });

  describe ('#decreaseQuality', () => {
    it ('decreases quality by 1', () => {
      item.decreaseQuality();
      expect(item.quality).toEqual(4);
    });

    it ('cannot reduce quality below 0', () => {
      freeItem.decreaseQuality();
      expect(freeItem.quality).toEqual(0);
    });
  });

  describe ('#expire', () => {
    it ('sets the quality to 0', () => {
      item.expire();
      expect(item.quality).toEqual(0);
    });
  });
});
