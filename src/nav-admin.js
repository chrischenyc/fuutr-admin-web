export default {
  items: [
    {
      name: 'Dashboard',
      url: '/',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '8',
      },
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-people',
    },
    {
      name: 'Rides',
      url: '/rides',
      icon: 'icon-speedometer',
    },
    {
      name: 'Vehicles',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Vehicles',
          url: '/vehicles',
          icon: 'icon-cursor',
        },
        {
          name: 'Add Vehicles',
          url: '/vehicles/add',
          icon: 'icon-plus',
        },
      ],
    },
    {
      name: 'Zones',
      url: '/zones',
      icon: 'icon-map',
      children: [
        {
          name: 'non-parking zones',
          url: '/zones/non-parking',
          icon: 'icon-cursor',
        },
        {
          name: 'speed limit zones',
          url: '/zones/speed-limit',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Payments',
      url: '/payments',
      icon: 'icon-credit-card',
    },
  ],
};
