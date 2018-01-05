describe ('ItemRules', () => {
  beforeEach( () => {
    class DoubleItem {
      constructor(name, sellIn, quality) {
        this.name     = name;
        this.sellIn   = sellIn;
        this.quality  = quality;
      }
    }

    class DoubleUpdateItem {
      decreaseQuality (item, value) {

      }

      increaseQuality (item, value) {

      }

      setQualityToZero() {

      }
    }

    doubleUpdateItem = new DoubleUpdateItem()
    rules = new ItemRules (doubleUpdateItem);
    vest = new DoubleItem('+5 Dexterity Vest', 10, 20);
    expired = new DoubleItem ('expired', 0, 5);
    agedBrie = new DoubleItem('Aged Brie', 2, 0);
    pass1 = new DoubleItem('Backstage pass', 11, 20)
    pass2 = new DoubleItem('Backstage pass', 10, 20)
    pass3 = new DoubleItem('Backstage pass', 5, 20)
    expiredPass = new DoubleItem('Backstage pass', 0, 20)
    sulfuras = new DoubleItem('Sulfuras, Hand of Ragnaros', 0, 80);
    conjuredCake = new DoubleItem('Conjured Mana Cake', 3, 6);
  });

  describe ('Properties:', () => {
    it ('is instantiated with an instance of UpdateItem', () => {
      expect(rules.updateItem.constructor.name).toEqual('DoubleUpdateItem')
    })
  })

  describe ('#_applyStandard', () => {
    it ('reduces quality by 1', () => {
      spyOn(doubleUpdateItem, 'decreaseQuality')
      rules._applyStandard(vest);
      expect(doubleUpdateItem.decreaseQuality).toHaveBeenCalledWith(vest)
    });

    it ('reduces quality by 2 when item is expired', () => {
      spyOn(doubleUpdateItem, 'decreaseQuality')
      rules._applyStandard(expired);
      expect(doubleUpdateItem.decreaseQuality).toHaveBeenCalledWith(expired, 2)
    });
  });

  describe ('#_applyAgedBrie', () => {
    it ('increase quality by 1', () => {
      spyOn(doubleUpdateItem, 'increaseQuality')
      rules._applyAgedBrie(agedBrie);
      expect(doubleUpdateItem.increaseQuality).toHaveBeenCalledWith(agedBrie)
    });
  });

  describe ('#_applyBackstagePass', () => {
    it ('increase in quality by 1, when the sellIn is over 10', () => {
      spyOn(doubleUpdateItem, 'increaseQuality')
      rules._applyBackstagePass(pass1);
      expect(doubleUpdateItem.increaseQuality).toHaveBeenCalledWith(pass1);
    });

    it ('increase in quality by 2, when the sellIn is 10 or less', () => {
      spyOn(doubleUpdateItem, 'increaseQuality');
      rules._applyBackstagePass(pass2);
      expect(doubleUpdateItem.increaseQuality).toHaveBeenCalledWith(pass2, 2)
    });

    it ('increase in quality by 3, when the sellIn is 5 or less', () => {
      spyOn(doubleUpdateItem, 'increaseQuality')
      rules._applyBackstagePass(pass3);
      expect(doubleUpdateItem.increaseQuality).toHaveBeenCalledWith(pass3, 3);
    });

    it ('quality drops to 0, when the sellIn is 0 or less', () => {
      spyOn(doubleUpdateItem, 'setQualityToZero')
      rules._applyBackstagePass(expiredPass);
      expect(doubleUpdateItem.setQualityToZero).toHaveBeenCalled();
    });
  });

  describe ('#_applyConjured', () => {
    it ('decreases in quality by 2', () => {
      spyOn(doubleUpdateItem, 'decreaseQuality')
      rules._applyConjured(conjuredCake);
      expect(doubleUpdateItem.decreaseQuality).toHaveBeenCalledWith(conjuredCake, 2)
    });

    it ('decreases in quality by 4 when expired', () => {
      spyOn(doubleUpdateItem, 'decreaseQuality')
      conjuredCake.sellIn = 0;
      rules._applyConjured(conjuredCake);
      expect(doubleUpdateItem.decreaseQuality).toHaveBeenCalledWith(conjuredCake, 4)
    });
  });

  describe ('#apply', () => {
    it ('redcues the sellIn property by 1', () => {
      rules.apply(vest);
      expect(vest.sellIn).toEqual(9)
    })

    it ('calls the _applyStandard rule on a standard item', () => {
      spyOn(rules, '_applyStandard')
      rules.apply (vest)
      expect(rules._applyStandard).toHaveBeenCalled()
    })

    it ("doesn't call other rules on a standard item", () => {
      spyOn(rules, '_applyAgedBrie')
      spyOn(rules, '_applyBackstagePass')
      spyOn(rules, '_applyConjured')
      rules.apply (vest)
      expect(rules._applyAgedBrie).not.toHaveBeenCalled()
      expect(rules._applyBackstagePass).not.toHaveBeenCalled()
      expect(rules._applyConjured).not.toHaveBeenCalled()
    })

    it ('calls the _applyAgedBrie on Aged Brie', () => {
      spyOn(rules, '_applyAgedBrie')
      rules.apply(agedBrie)
      expect(rules._applyAgedBrie).toHaveBeenCalled()
    })

    it ("doesn't call other rules on Aged Brie", () => {
      spyOn(rules, '_applyStandard')
      spyOn(rules, '_applyBackstagePass')
      spyOn(rules, '_applyConjured')
      rules.apply (agedBrie)
      expect(rules._applyStandard).not.toHaveBeenCalled()
      expect(rules._applyBackstagePass).not.toHaveBeenCalled()
      expect(rules._applyConjured).not.toHaveBeenCalled()
    })

    it ('calls the _applyBackstagePass on Backstage Pass', () => {
      spyOn(rules, '_applyBackstagePass')
      rules.apply(pass1)
      expect(rules._applyBackstagePass).toHaveBeenCalled()
    })

    it ("doesn't call other rules on Backstage Pass", () => {
      spyOn(rules, '_applyStandard')
      spyOn(rules, '_applyAgedBrie')
      spyOn(rules, '_applyConjured')
      rules.apply(pass1)
      expect(rules._applyStandard).not.toHaveBeenCalled()
      expect(rules._applyAgedBrie).not.toHaveBeenCalled()
      expect(rules._applyConjured).not.toHaveBeenCalled()
    })

    it ('calls the _applyConjured on Conjured', () => {
      spyOn(rules, '_applyConjured')
      rules.apply(conjuredCake)
      expect(rules._applyConjured).toHaveBeenCalled()
    })

    it ("doesn't call other rules on Conjured", () => {
      spyOn(rules, '_applyStandard')
      spyOn(rules, '_applyAgedBrie')
      spyOn(rules, '_applyBackstagePass')
      rules.apply (conjuredCake)
      expect(rules._applyStandard).not.toHaveBeenCalled()
      expect(rules._applyAgedBrie).not.toHaveBeenCalled()
      expect(rules._applyBackstagePass).not.toHaveBeenCalled()
    })
  })
});
