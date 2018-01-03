class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach ( (item) => {
      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.decreaseQuality();
          }
        }
      } else {
        if (item.quality < 50) {
          item.increaseQuality();
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.increaseQuality();
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.increaseQuality();
              }
            }
          }
        }
      }

      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.decreaseSellIn();
      }

      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.decreaseQuality();
              }
            }
          } else {
            item.expire();
          }
        } else {
          if (item.quality < 50) {
            item.increaseQuality();
          }
        }
      }
    });
  }
}
