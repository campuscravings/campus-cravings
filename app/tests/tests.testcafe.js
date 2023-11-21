import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userprofilePage } from './userprofile.page';
import { profilePage } from './profile.page';
import { userhomePage } from './userhome.page';
import { vendorsPage } from './vendors.page';
import { adminhomePage } from './adminhome.page';
import { vendorhomePage } from './vendorhome.page';
import { addvendorPage } from './addvendor.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const userCredentials = { username: 'john@foo.com', password: 'changeme' };
// const vendorCredentials = { username: 'john@foo.com', password: 'changeme' };
const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
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
  await navBar.gotoUserHomePage(testController);
  await userhomePage.isDisplayed(testController);
  await navBar.gotoUserProfilePage(testController);
  await userprofilePage.isDisplayed(testController);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await navBar.gotoVendorsPage(testController);
  await vendorsPage.isDisplayed(testController);
});

test('Test that admin pages are displayed', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, adminCredentials.username, adminCredentials.password);
  await landingPage.isDisplayed(testController);
  await navBar.gotoUserHomePage(testController);
  await userhomePage.isDisplayed(testController);
  await navBar.gotoUserProfilePage(testController);
  await userprofilePage.isDisplayed(testController);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await navBar.gotoVendorsPage(testController);
  await vendorsPage.isDisplayed(testController);
  await navBar.gotoAdminHomePage(testController);
  await adminhomePage.isDisplayed(testController);
  await navBar.gotoVendorHomePage(testController);
  await vendorhomePage.isDisplayed(testController);
  await navBar.gotoAddVendorPage(testController);
  await addvendorPage.isDisplayed(testController);
});
