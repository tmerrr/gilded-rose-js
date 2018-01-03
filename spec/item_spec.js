describe ('Item', () => {
  beforeEach( () => {
    item = new Item('cheese', 2, 5);
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
    it ('increases the quality by a specified value', () => {
      item.increaseQuality(2);
      expect(item.quality).toEqual(7);
    });

    it ('increases quality by 1 as default', () => {
      item.increaseQuality();
      expect(item.quality).toEqual(6);
    });

    it ("can't increase quality over 50", () => {
      item.increaseQuality(50);
      expect(item.quality).toEqual(50);
    });
  });

  describe ('#decreaseQuality', () => {
    it ('decreases quality by a specified value', () => {
      item.decreaseQuality(3);
      expect(item.quality).toEqual(2)
    });

    it ('decreases quality by 1 as default', () => {
      item.decreaseQuality();
      expect(item.quality).toEqual(4);
    });

    it ('cannot reduce quality below 0', () => {
      item.decreaseQuality(10)
      expect(item.quality).toEqual(0);
    });
  });

  describe ('#expire', () => {
    it ('sets the quality to 0', () => {
      item.expire();
      expect(item.quality).toEqual(0);
    });
  });
});
