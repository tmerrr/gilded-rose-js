describe ('Gilded Rose', () => {
  beforeEach( () => {
    class DoubleItem {
      constructor(name) {
        this.name = name;
      }
    }

    class DoubleItemRules {
        apply () {

        }
    }

    vest = new DoubleItem('+5 Dexterity Vest');
    agedBrie = new DoubleItem('Aged Brie');
    sulfuras = new DoubleItem('Sulfuras, Hand of Ragnaros');
    pass = new DoubleItem('Backstage passes to a TAFKAL80ETC concert');
    conjuredCake = new DoubleItem('Conjured Mana Cake');

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
