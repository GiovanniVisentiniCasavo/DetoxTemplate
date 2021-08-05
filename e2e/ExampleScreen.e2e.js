describe('Example Screen Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should type into the text field', async () => {
    console.debug("tap start")
    await element(by.text('Example screen')).tap();
    console.debug("tap end")
    const someText = 'This is just a test (:';
    await element(by.id('ExampleTextInputId')).typeText(someText);
    await expect(element(by.id('ExampleTextInputId'))).toHaveText(someText);
  });
});
