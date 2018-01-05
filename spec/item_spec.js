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

});
