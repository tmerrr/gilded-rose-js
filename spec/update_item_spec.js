describe ('Update Item', () => {
  beforeEach( () => {
    class DoubleItem {
      constructor(name, sellIn, quality) {
        this.name     = name;
        this.sellIn   = sellIn;
        this.quality  = quality;
      }
    }
    item = new DoubleItem('cheese', 2, 5);

    updateItem = new UpdateItem ()
  })

  describe ('#decreaseSellIn', () => {
    it ('decreases the sellIn property of the item by 1', () => {
      updateItem.decreaseSellIn(item)
      expect(item.sellIn).toEqual(1);
    });
  });

  describe ('#increaseQuality', () => {
    it ('increases the quality by a specified value', () => {
      updateItem.increaseQuality(item, 2);
      expect(item.quality).toEqual(7);
    });

    it ('increases quality by 1 as default', () => {
      updateItem.increaseQuality(item)
      expect(item.quality).toEqual(6);
    });

    it ("can't increase quality over 50", () => {
      updateItem.increaseQuality(item, 50);
      expect(item.quality).toEqual(50);
    });
  });

  describe ('#decreaseQuality', () => {
    it ('decreases quality by a specified value', () => {
      updateItem.decreaseQuality(item, 3);
      expect(item.quality).toEqual(2)
    });

    it ('decreases quality by 1 as default', () => {
      updateItem.decreaseQuality(item);
      expect(item.quality).toEqual(4);
    });

    it ('cannot reduce quality below 0', () => {
      updateItem.decreaseQuality(item, 10)
      expect(item.quality).toEqual(0);
    });
  });

  describe ('#setQualityToZero', () => {
    it ('sets the quality to 0', () => {
      updateItem.setQualityToZero(item);
      expect(item.quality).toEqual(0);
    });
  });

})
