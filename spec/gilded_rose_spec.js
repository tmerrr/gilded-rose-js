describe ('Gilded Rose', () => {
  beforeEach( () => {
    vest = new Item('+5 Dexterity Vest', 10, 20);
    elixir = new Item('Elixir of the Mongoose', 5, 7);
    agedBrie = new Item('Aged Brie', 2, 0);
    sulfuras = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    expiredSulfuras = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
    pass1 = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20);
    pass2 = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49);
    pass3 = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49);
    conjuredCake = new Item('Conjured Mana Cake', 3, 6);
  });

  describe ('Properties:', () => {
    it ('has a property of items as an Array', () => {
      var shop = new Shop ();
      expect(shop.items).toBeArray();
    });

    it ('has an instance of ItemRules', () => {
      var shop = new Shop ();
      expect(shop.rules.constructor.name).toEqual('ItemRules')
    })
  })

  describe ('#updateQuality', () => {
    describe ('updating normal items', () => {
      it ('reduces sellIn property of an item, by 1', () => {
        var shop = new Shop([vest]);
        shop.updateQuality();
        expect(vest.sellIn).toEqual(9);
      });

      it ('reduces quality property of an item, by 1', () => {
        var shop = new Shop([vest]);
        shop.updateQuality();
        expect(vest.quality).toEqual(19);
      });

      it ('reduces sellIn property of multiple items, by 1', () => {
        var shop = new Shop([vest, elixir]);
        shop.updateQuality();
        expect(vest.sellIn).toEqual(9);
        expect(elixir.sellIn).toEqual(4);
      });

      it ('reduces quality property of multiple items, by 1', () => {
        var shop = new Shop([vest, elixir]);
        shop.updateQuality();
        expect(vest.quality).toEqual(19);
        expect(elixir.quality).toEqual(6);
      });
    });

    describe ('updating expired items', () => {
      beforeEach ( () => {
        vest.sellIn = 0;
        elixir.sellIn = 0;
      });

      it ('reduces sellIn property of an item, by 1', () => {
        var shop = new Shop([vest]);
        shop.updateQuality();
        expect(vest.sellIn).toEqual(-1);
      });

      it ('reduces quality property of an item, by 2', () => {
        var shop = new Shop([vest]);
        shop.updateQuality();
        expect(vest.quality).toEqual(18);
      });

      it ('reduces sellIn property of multiple items, by 1', () => {
        var shop = new Shop([vest, elixir]);
        shop.updateQuality();
        expect(vest.sellIn).toEqual(-1);
        expect(elixir.sellIn).toEqual(-1);
      });

      it ('reduces quality property of multiple items, by 2', () => {
        var shop = new Shop([vest, elixir]);
        shop.updateQuality();
        expect(vest.quality).toEqual(18);
        expect(elixir.quality).toEqual(5);
      });
    });

    describe ('updating Aged Brie', () => {
      it ('reduces sellIn property of Aged Brie, by 1', () => {
        var shop = new Shop([agedBrie]);
        shop.updateQuality();
        expect(agedBrie.sellIn).toEqual(1);
      });

      it ('increases quality property of Aged Brie, by 1', () => {
        var shop = new Shop([agedBrie]);
        shop.updateQuality();
        expect(agedBrie.quality).toEqual(1);
      });

      it ("doesn't increases quality property of Aged Brie, if quality has reached 50", () => {
        agedBrie.quality = 50;
        var shop = new Shop([agedBrie]);
        shop.updateQuality();
        expect(agedBrie.quality).toEqual(50);
      });
    });

    describe ('updating Sulfuras', () => {
      it ('always has a quality of 80, even if expired', () => {
        var shop = new Shop([sulfuras, expiredSulfuras]);
        shop.updateQuality();
        expect(sulfuras.quality).toEqual(80);
        expect(expiredSulfuras.quality).toEqual(80);
      });
    });

    describe ('updating Backstage passes', () => {
      it ('increases quality at a normal rate when more than 10 days left', () => {
        var shop = new Shop ([pass1]);
        shop.updateQuality();
        expect(pass1.quality).toEqual(21);
      });

      it ('increases quality at 2x normal rate when 10 days or less left', () => {
        pass1.sellIn = 10;
        var shop = new Shop ([pass1]);
        shop.updateQuality();
        expect(pass1.quality).toEqual(22);
      });

      it ('increases quality at 3x normal rate when 5 days or less left', () => {
        pass1.sellIn = 5;
        var shop = new Shop ([pass1]);
        shop.updateQuality();
        expect(pass1.quality).toEqual(23);
      });

      it ("quality doesn't exceed 50", () => {
        var shop = new Shop ([pass2, pass3]);
        shop.updateQuality();
        expect(pass2.quality).toEqual(50);
        expect(pass3.quality).toEqual(50);
      });

      it ('quality drops to 0 when sellIn is 0 or less', () => {
        pass1.sellIn = 0;
        var shop = new Shop ([pass1]);
        shop.updateQuality();
        expect(pass1.quality).toEqual(0);
      });
    });

    describe ('updating Conjured items', () => {
      it ('reduces quality by 2', () => {
        var shop = new Shop([conjuredCake]);
        shop.updateQuality();
        expect(conjuredCake.quality).toEqual(4);
      });

      it ('reduces quality by 4, when expired', () => {
        conjuredCake.sellIn = 0;
        var shop = new Shop([conjuredCake]);
        shop.updateQuality();
        expect(conjuredCake.quality).toEqual(2);
      });
    });

  });
});
