import { Selector } from 'testcafe';

class AddMenuItemPage {
  constructor() {
    this.pageId = '#add-menu-item-page';
    this.pageSelector = Selector(this.pageId);
    this.nameField = Selector('#add-menu-item-field-name');
    this.imageField = Selector('#add-menu-item-field-image');
    this.descriptionField = Selector('#add-menu-item-field-description');
    this.veganField = Selector('#add-menu-item-field-vegan');
    this.availableField = Selector('#add-menu-item-field-available');
    this.costField = Selector('#add-menu-item-field-cost');
    this.caloriesField = Selector('#add-menu-item-field-calories');
    this.submitButton = Selector('.btn.btn-primary[type="submit"]');
    this.okButton = Selector('.swal-button.swal-button--confirm');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok;
  }

  async typeName(testController, text) {
    await testController.typeText(this.nameField, text);
  }

  async typeDescription(testController, text) {
    await testController.typeText(this.descriptionField, text);
  }

  async typeCost(testController, text) {
    await testController.typeText(this.costField, text);
  }

  async typeCalories(testController, text) {
    await testController.typeText(this.caloriesField, text);
  }

  async typeImage(testController, text) {
    await testController.typeText(this.imageField, text);
  }

  async typeVegan(testController) {
    await testController.click(this.veganField);
  }

  async typeAvailable(testController) {
    await testController.click(this.availableField());
  }

  async submitForm(testController) {
    await testController.click(this.submitButton);
  }

  async confirmDialog(testController) {
    await testController.click(this.okButton);
  }
}

export const addMenuItemPage = new AddMenuItemPage();
