import { Selector } from 'testcafe';

class VendorsPage {
  constructor() {
    this.pageId = '#listvendors-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const vendorsPage = new VendorsPage();
