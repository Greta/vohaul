import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'VOHAUL / Component lab',
    brandUrl: '/vohaul/',
    colorPrimary: '#b7b8ff',
    colorSecondary: '#a3ffcb',
    appBg: '#080e16',
    appContentBg: '#101923',
    appBorderColor: '#344553',
    textColor: '#edf5f4',
    barBg: '#101923',
    barTextColor: '#a3b6c5',
    barSelectedColor: '#a3ffcb',
  }),
});
