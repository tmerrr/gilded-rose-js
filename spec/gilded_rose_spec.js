describe ('Gilded Rose', () => {
  beforeEach( () => {
    class DoubleItem {

    }

    class DoubleItemRules {
        apply () {

        }
    }

    vest = new DoubleItem());
    agedBrie = new DoubleItem();
    sulfuras = new DoubleItem();
    pass = new DoubleItem();
    conjuredCake = new DoubleItem();

    doubleRules = new DoubleItemRules()

    shop = new Shop([
        vest,
        agedBrie,
        sulfuras,
        pass,
        conjuredCake
    ],
    doubleRules)
  });

  describe ('Properties:', () => {
    it ('has a property of items as an Array', () => {
      expect(shop.items).toBeArray();
    });

    it ('has an instance of ItemRules', () => {
      expect(shop.rules.constructor.name).toEqual('DoubleItemRules')
    })
  })

  describe ('#updateQuality', () => {
    it ('calls apply on the Rules class and passes in each item as an argument', () => {
      spyOn(doubleRules, 'apply');
      shop.updateQuality();
      expect(doubleRules.apply).toHaveBeenCalledWith(vest)
      expect(doubleRules.apply).toHaveBeenCalledWith(agedBrie)
      expect(doubleRules.apply).toHaveBeenCalledWith(sulfuras)
      expect(doubleRules.apply).toHaveBeenCalledWith(pass)
      expect(doubleRules.apply).toHaveBeenCalledWith(conjuredCake)
    })
  });
});
