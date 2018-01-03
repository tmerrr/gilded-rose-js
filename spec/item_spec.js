describe ('Item', () => {
  beforeEach( () => {
    item = new Item('cheese', 2, 5);
    vest = new Item('+5 Dexterity Vest', 10, 20);
    agedBrie = new Item('Aged Brie', 2, 0);
    sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    pass1 = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
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

  describe('#isAgedBrie', () => {
    it ('returns false when item name is NOT Aged Brie', () => {
      expect(vest.isAgedBrie()).toBeFalse();
    });

    it ('returns true when item name is Aged Brie', () => {
      expect(agedBrie.isAgedBrie()).toBeTrue();
    });
  });

  describe ('#isBackstagePass', () => {
    it ('returns false when item name does NOT include Backstage pass', () => {
      expect(vest.isBackstagePass()).toBeFalse();
    });

    it ('returns true when item name includes Backstage pass', () => {
      expect(pass1.isBackstagePass()).toBeTrue();
    });
  });
});
