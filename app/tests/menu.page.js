import { Selector } from 'testcafe';

class MenuPage {
  constructor() {
    this.pageId = '#menu-page';
    this.pageSelector = Selector(this.pageId);
    this.menuName = Selector('#menu-item-name');
    this.menuImage = Selector('#menu-item-image');
    this.menuDescription = Selector('#menu-item-description');
    this.menuVeganIcon = Selector('#vegan-icon');
    this.menuCost = Selector('#menu-item-cost');
    this.menuCalories = Selector('#menu-item-calories');
  }

  async menuElementsExist(testController) {
    await testController
      .expect(this.menuImage.exists).ok('Menu item image is displayed')
      .expect(this.menuName.exists).ok('Menu item name is displayed')
      .expect(this.menuDescription.exists)
      .ok('Menu item description is displayed')
      .expect(this.menuCost.exists)
      .ok('Menu item cost is displayed')
      .expect(this.menuCalories.exists)
      .ok('Menu item calories is displayed')
      .expect(this.menuVeganIcon.exists)
      .ok('Vegan Icon is displayed');
  }

  async verifyMenuData(testController, expectedMenuData) {
    await testController
      .expect(this.menuName.innerText).eql(expectedMenuData.name, 'Menu item name matches')
      .expect(this.menuDescription.innerText).contains(expectedMenuData.description, 'Menu item description matches')
      .expect(this.menuCost.innerText)
      .contains(expectedMenuData.cost, 'Menu item cost match')
      .expect(this.menuCalories.innerText)
      .contains(expectedMenuData.calories, 'Menu item calories matches');
  }
}

export const menuPage = new MenuPage();
