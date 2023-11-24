import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#userprofile-page';
    this.pageSelector = Selector(this.pageId);
    this.nameField = Selector('#userprofile-field-name');
    this.bioField = Selector('#userprofile-field-bio');
    this.imageField = Selector('#userprofile-field-image');
    this.foodsSelect = Selector('#userprofile-field-foods');
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

  async typeBio(testController, text) {
    await testController.typeText(this.bioField, text);
  }

  async typeImage(testController, text) {
    await testController.typeText(this.imageField, text);
  }

  async selectFoodsOption(testController, optionText) {
    await testController
      .click(this.foodsSelect.find('option').withText(optionText));
  }

  async submitForm(testController) {
    await testController.click(this.submitButton);
  }

  async confirmDialog(testController) {
    await testController.click(this.okButton);
  }
}

export const userprofilePage = new UserProfilePage();
