import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userprofilePage } from './userprofile.page';
import { profilePage } from './profile.page';
import { userhomePage } from './userhome.page';
import { vendorsPage } from './vendors.page';
import { adminhomePage } from './adminhome.page';
// import { vendorhomePage } from './vendorhome.page';
import { addvendorPage } from './addvendor.page';
import { addMenuItemPage } from './addmenuitem.page';
import { menuPage } from './menu.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const userCredentials = { username: 'john@foo.com', password: 'changeme' };
const vendorCredentials = { username: 'vendor@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

/** Default account info */
const userinfo = { name: 'Fish', bio: 'Sample bio text', image: 'https://media.threatpost.com/wp-content/uploads/sites/103/2019/09/26105755/fish-1.jpg', foods: 'Breakfast' };

/** Test menu item info */
const menuiteminfo = { name: 'Vegetable Stir Fry',
  description: 'TEST TEST TEST',
  image: 'https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-2.jpg',
  cost: '10.33',
  vegan: true,
  available: true,
  calories: '150' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test.skip('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, userCredentials.username, userCredentials.password);
  await navBar.isLoggedIn(testController, userCredentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that user pages are displayed', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, userCredentials.username, userCredentials.password);
  await landingPage.isDisplayed(testController);
  // await navBar.gotoUserHomePage(testController);
  await userhomePage.isDisplayed(testController);
  await userprofilePage.isDisplayed(testController);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await navBar.gotoVendorsPage(testController);
  await vendorsPage.isDisplayed(testController);
});

test.skip('Test that admin pages are displayed', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await landingPage.isDisplayed(testController);
  await userprofilePage.isDisplayed(testController);
  await userprofilePage.selectFoodsOption(testController, 'Breakfast');
  // await navBar.gotoUserHomePage(testController);
  await userhomePage.isDisplayed(testController);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await navBar.gotoVendorsPage(testController);
  await vendorsPage.isDisplayed(testController);
  // await navBar.gotoAdminHomePage(testController);
  await adminhomePage.isDisplayed(testController);
  // await navBar.gotoVendorHomePage(testController);
  // await vendorhomePage.isDisplayed(testController);
  await navBar.gotoAddVendorPage(testController);
  await addvendorPage.isDisplayed(testController);
});

test.skip('Test UserProfile page functions', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, userCredentials.username, userCredentials.password);
  await landingPage.isDisplayed(testController);
  await navBar.gotoProfilePage(testController);
  await profilePage.typeCreateProfile(testController);
  await userprofilePage.isDisplayed(testController);
  await userprofilePage.typeName(testController, userinfo.name);
  await userprofilePage.typeBio(testController, userinfo.bio);
  await userprofilePage.typeImage(testController, userinfo.image);
  await userprofilePage.selectFoodsOption(testController, userinfo.foods);
  await userprofilePage.submitForm(testController);
  await userprofilePage.confirmDialog(testController);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await profilePage.profileElementsExist(testController);
  await profilePage.verifyProfileData(testController, userinfo);
});

test('Test AddMenuItem page functions', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, vendorCredentials.username, vendorCredentials.password);
  await landingPage.isDisplayed(testController);
  await navBar.gotoAddMenuItemPage(testController);
  await addMenuItemPage.isDisplayed(testController);
  await addMenuItemPage.typeName(testController, menuiteminfo.name);
  await addMenuItemPage.typeImage(testController, menuiteminfo.image);
  await addMenuItemPage.typeDescription(testController, menuiteminfo.description);
  await addMenuItemPage.typeCost(testController, menuiteminfo.cost);
  await addMenuItemPage.typeVegan(testController, menuiteminfo.vegan);
  await addMenuItemPage.typeAvailable(testController, menuiteminfo.available);
  await addMenuItemPage.typeCalories(testController, menuiteminfo.calories);
  await addMenuItemPage.submitForm(testController);
  await addMenuItemPage.confirmDialog(testController);
  await testController.navigateTo('http://localhost:3000/menu/vendor');
  await menuPage.menuElementsExist(testController);
  await menuPage.verifyMenuData(testController, menuiteminfo);
});
