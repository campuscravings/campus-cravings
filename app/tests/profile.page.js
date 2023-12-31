import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#profile-page';
    this.pageSelector = Selector(this.pageId);
    this.profileImage = Selector('#profile-image');
    this.profileName = Selector('#profile-name');
    this.profileBio = Selector('#profile-bio');
    this.profileFoods = Selector('#profile-foods');
    this.profileCreate = Selector('#create-user-profile-link');
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async typeCreateProfile(testController) {
    await testController.click(this.profileCreate);
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
  }
}

export const profilePage = new ProfilePage();
