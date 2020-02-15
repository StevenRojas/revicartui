import {LayoutConfigModel} from '../_base/layout';

export class LayoutConfig {
  public defaults: LayoutConfigModel = {
    demo: 'revicar',
    // == Base Layout
    self: {
      layout: 'fluid', // fluid|boxed
      body: {
        'background-image': './assets/media/misc/bg-1.jpg',
      },
      logo: {
        dark: './assets/media/logos/revicart-logo.png',
        light: './assets/media/logos/revicart-logo.png',
        brand: './assets/media/logos/revicart-logo.png',
        green: './assets/media/logos/revicart-logo.png',
      },
    },
    // == Page Splash Screen loading
    loader: {
      enabled: true,
      type: 'spinner-logo',
      logo: './assets/media/loaders/cogs-2.gif',
      message: 'Espere por favor...',
    },
    // == Colors for javascript
    colors: {
      state: {
        brand: '#374afb',
        light: '#ffffff',
        dark: 'rgba(57,59,83,0.79)',
        primary: '#5867dd',
        success: '#34bfa3',
        info: '#36a3f7',
        warning: '#ffb822',
        danger: '#fd3995',
      },
      base: {
        label: [
          '#c5cbe3',
          '#a1a8c3',
          '#3d4465',
          'rgba(62,68,102,0.87)',
        ],
        shape: [
          '#f0f3ff',
          '#d9dffa',
          '#afb4d4',
          '#646c9a',
        ],
      },
    },
    header: {
      self: {
        width: 'fixed',
        fixed: {
          desktop: {
            enabled: true,
            mode: 'topbar',
          },
          mobile: true,
        },
      },
      search: {
        display: true,
      },
      menu: {
        self: {
          display: true,
          'root-arrow': false,
        },
        desktop: {
          arrow: true,
          toggle: 'click',
          submenu: {
            skin: 'ligth',
            arrow: true,
          },
        },
        mobile: {
          submenu: {
            skin: 'ligth',
            accordion: true,
          },
        },
      },
    },
    subheader: {
      display: true,
      layout: 'subheader-v6',
      fixed: true,
      width: 'fluid',
      style: 'solid',
    },
    content: {
      width: 'fluid',
    },
    brand: {
      self: {
        skin: 'ligth',
      },
    },
    aside: {
      self: {
        skin: 'light',
        fixed: true,
        display: false,
        display_mobile: true,
        minimize: {
          toggle: true,
          default: false,
        },
      },
      menu: {
        dropdown: false,
        scroll: true,
        submenu: {
          accordion: true,
          dropdown: {
            arrow: true,
            'hover-timeout': 500,
          },
        },
      },
    },
    footer: {
      display: false,
      self: {
        width: 'fluid',
      },
    },
  };

  /**
   * Good place for getting the remote config
   */
  public get configs(): LayoutConfigModel {
    return this.defaults;
  }
}
