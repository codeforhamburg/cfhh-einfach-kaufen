import { browser, by, element } from 'protractor';

export class SozialkaufhauskartePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('wbc-root h1')).getText();
  }
}
