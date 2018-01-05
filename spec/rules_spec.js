describe ('ItemRules', () => {
  beforeEach( () => {
    rules = new ItemRules ();
    vest = new Item('+5 Dexterity Vest', 10, 20);
    agedBrie = new Item('Aged Brie', 2, 0);
    sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    conjuredCake = new Item('Conjured Mana Cake', 3, 6);

    // class DoubleUpdateItem {
    //   _applyStandard (item) {
    //     item.isStandardCalled = true;
    //   }
    //
    //   _applyAgedBrie (item) {
    //     item.isAgedBrieCalled = true;
    //   }
    //
    //   _applyBackstagePass (item) {
    //     item.isBackstagePassCalled = true;
    //   }
    //
    //   _applyConjured (item) {
    //     item.isConjuredCalled = true;
    //   }
    // }
  });

  describe ('Properties:', () => {
    it ('is instantiated with an instance of UpdateItem', () => {
      expect(rules.updateItem.constructor.name).toEqual('UpdateItem')
    })
  })

  describe ('#_applyStandard', () => {
    it ('reduces quality by 1', () => {
      rules._applyStandard(vest);
      expect(vest.quality).toEqual(19);
    });

    it ('reduces quality by 2 when item is expired', () => {
      var expired = new Item ('expired', 0, 5);
      rules._applyStandard(expired);
      expect(expired.quality).toEqual(3);
    });
  });

  describe ('#_applyAgedBrie', () => {
    it ('increase quality by 1', () => {
      rules._applyAgedBrie(agedBrie);
      expect(agedBrie.quality).toEqual(1);
    });
  });

  describe ('#_applyBackstagePass', () => {
    it ('increase in quality by 1, when the sellIn is over 10', () => {
      var pass = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20);
      rules._applyBackstagePass(pass);
      expect(pass.quality).toEqual(21);
    });

    it ('increase in quality by 2, when the sellIn is 10 or less', () => {
      var pass = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20);
      rules._applyBackstagePass(pass);
      expect(pass.quality).toEqual(22);
    });

    it ('increase in quality by 3, when the sellIn is 5 or less', () => {
      var pass = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20);
      rules._applyBackstagePass(pass);
      expect(pass.quality).toEqual(23);
    });

    it ('quality drops to 0, when the sellIn is 0 or less', () => {
      var pass = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
      rules._applyBackstagePass(pass);
      expect(pass.quality).toEqual(0);
    });
  });

  describe ('#_applyConjured', () => {
    it ('decreases in quality by 2', () => {
      rules._applyConjured(conjuredCake);
      expect(conjuredCake.quality).toEqual(4);
    });

    it ('decreases in quality by 4 when expired', () => {
      conjuredCake.sellIn = 0;
      rules._applyConjured(conjuredCake);
      expect(conjuredCake.quality).toEqual(2);
    });
  });

  describe ('#apply', () => {
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
      let pass = new Item('Backstage pass', 10, 10)
      rules.apply(pass)
      expect(rules._applyBackstagePass).toHaveBeenCalled()
    })

    it ("doesn't call other rules on Backstage Pass", () => {
      spyOn(rules, '_applyStandard')
      spyOn(rules, '_applyAgedBrie')
      spyOn(rules, '_applyConjured')
      let pass = new Item('Backstage pass', 10, 10)
      rules.apply (pass)
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
