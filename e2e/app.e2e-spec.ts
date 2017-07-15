import { SozialkaufhauskartePage } from './app.po';

describe('sozialkaufhauskarte App', () => {
  let page: SozialkaufhauskartePage;

  beforeEach(() => {
    page = new SozialkaufhauskartePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to wbc!');
  });
});
