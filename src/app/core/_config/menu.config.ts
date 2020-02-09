export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [
        {
          title: 'Taller',
          root: true,
          alignment: 'left',
          page: '/admin/workshop',
          // translate: 'MENU.DASHBOARD',
          toggle: 'click',
          submenu: [
            {
              title: 'Reception',
              page: '/admin/workshop/reception'
            },
            {
              title: 'Vehículos',
              page: '/admin/workshop/vehicle'
            },
            {
              title: 'Clientes',
              page: '/admin/workshop/client'
            },
            {
              title: 'Empresas',
              page: '/admin/workshop/company'
            }
          ]
        },
        {
          title: 'Inventarios',
          root: true,
          alignment: 'left',
          page: '/admin/inventory',
          // translate: 'MENU.DASHBOARD',
        },
        {
          title: 'R.R.H.H',
          root: true,
          alignment: 'left',
          page: '/admin/human_resources',
          // translate: 'MENU.DASHBOARD',
        },
        {
          title: 'Finanzas',
          root: true,
          alignment: 'left',
          page: '/admin/money',
          // translate: 'MENU.DASHBOARD',
        },
      ]
    },
    aside: {
      self: {},
      items: [
        {section: 'Navegación'},
        {
          title: 'Taller',
          root: true,
          alignment: 'left',
          page: '/admin/workshop',
          // translate: 'MENU.DASHBOARD',
          // toggle: 'click',
          submenu: [
            {
              title: 'Reception',
              page: '/admin/workshop/reception'
            },
            {
              title: 'Vehículos',
              page: '/admin/workshop/vehicle'
            },
            {
              title: 'Clientes',
              page: '/admin/workshop/client'
            },
            {
              title: 'Empresas',
              page: '/admin/workshop/company'
            }
          ]
        },
        {
          title: 'Inventarios',
          root: true,
          alignment: 'left',
          page: '/admin/inventory',
          // translate: 'MENU.DASHBOARD',
        },
        {
          title: 'R.R.H.H',
          root: true,
          alignment: 'left',
          page: '/admin/human_resources',
          // translate: 'MENU.DASHBOARD',
        },
        {
          title: 'Finanzas',
          root: true,
          alignment: 'left',
          page: '/admin/money',
          // translate: 'MENU.DASHBOARD',
        }
      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
