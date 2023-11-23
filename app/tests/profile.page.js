import { Selector } from 'testcafe';

class PofilePage {
  constructor() {
    this.pageId = '#profile-page';
    this.pageSelector = Selector(this.pageId);
    this.profileImage = Selector('#profile-image');
    this.profileName = Selector('#profile-name');
    this.profileBio = Selector('#profile-bio');
    this.profileFoods = Selector('#profile-foods');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async profileElementsExist(testController) {
    await testController
      .expect(this.profileImage.exists).ok('Profile image is displayed')
      .expect(this.profileName.exists).ok('Profile name is displayed')
      .expect(this.profileBio.exists)
      .ok('Profile bio is displayed')
      .expect(this.profileFoods.exists)
      .ok('Profile foods are displayed');
  }

  async verifyProfileData(testController, expectedProfileData) {
    await testController
      .expect(this.profileName.innerText).eql(expectedProfileData.name, 'Profile name matches')
      .expect(this.profileBio.innerText).contains(expectedProfileData.bio, 'Profile bio matches')
      .expect(this.profileFoods.innerText)
      .contains(expectedProfileData.foods, 'Profile foods match');
    // Add additional assertions for other profile data if needed
  }
}

export const profilePage = new PofilePage();
