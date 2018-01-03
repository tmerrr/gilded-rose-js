class ItemRules {

  isAgedBrie (item) {
    return item.name === 'Aged Brie'
  }

  isSulfuras (item) {
    return item.name.includes('Sulfuras')
  }

  isBackstagePass (item) {
    return item.name.includes('Backstage pass')
  }

  standard (item) {
    item.decreaseQuality();
  }
}
