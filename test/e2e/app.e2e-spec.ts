import { MaterialErrorMessagesPage } from './app.po';

describe('material-error-messages App', () => {
  let page: MaterialErrorMessagesPage;

  beforeEach(() => {
    page = new MaterialErrorMessagesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
