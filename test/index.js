const { Chromeless } = require('chromeless');
const expect = require('expect.js');

describe('Test', () => {
  const chromeless = new Chromeless();

  it('load page', async () => {
    await chromeless
      .goto('http://localhost:8080')
      .wait('.page');
  });

  it('check github link', async () => {
    const result = await chromeless.exists('a[href*="github.com/MikeDevice/first-follow"]');
    expect(result).to.be.ok();
  });

  it('check there is no tables', async () => {
    const result = await chromeless.exists('table');
    expect(result).to.not.be.ok();
  });

  it('check default grammar', async () => {
    const textRows = await chromeless.evaluate(() => {
      const rows = document.querySelectorAll('[data-contents="true"] > div');
      return [].map.call(rows, row => row.innerText.trim());
    });

    expect(textRows).to.eql(['S→a b A', 'A→b c', 'A→ε']);
  });


  after(async () => {
    await chromeless.end();
  });
});
