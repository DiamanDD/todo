describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?id=additemformadditem--add-item-form-add-item-base&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

// import initStoryshots from '@storybook/addon-storyshots';
// import { puppeteerTest } from '@storybook/addon-storyshots-puppeteer';
//
// initStoryshots({ suite: 'Puppeteer storyshots', test: puppeteerTest( {  storybookUrl : 'http://192.168.1.108:6006/iframe.html?id=appwithredux--app-with-redux-base-example&viewMode=story'  }) });
//
//
//     export const myExample = () => {
//
//     };
// myExample.parameters = {
//     async puppeteerTest(page) {
//         const element = await page.$('<some-selector>');
//         await element.click();
//         expect(something).toBe(something);
//     },
// };
//

