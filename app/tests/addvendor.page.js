import { Selector } from 'testcafe';

class AddVendorPage {
  constructor() {
    this.pageId = '#addvendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok;
  }
}

export const addvendorPage = new AddVendorPage();
