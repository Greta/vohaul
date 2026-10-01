import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'VOHAUL / Component lab',
    brandUrl: '/vohaul/',
    colorPrimary: '#ff4cde',
    colorSecondary: '#00f5ff',
    appBg: '#05080d',
    appContentBg: '#0a121b',
    appBorderColor: '#285267',
    textColor: '#e9faff',
    barBg: '#0a121b',
    barTextColor: '#9cb7c7',
    barSelectedColor: '#00f5ff',
  }),
});
