import { PollsonPage } from './app.po';

describe('pollson App', function() {
  let page: PollsonPage;

  beforeEach(() => {
    page = new PollsonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
