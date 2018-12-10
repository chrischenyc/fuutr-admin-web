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
      name: 'Vehicles',
      url: '/vehicles',
      icon: 'icon-speedometer',
      children: [
        {
          name: 'online',
          url: '/vehicles/online',
          icon: 'icon-cursor',
        },
        {
          name: 'offline',
          url: '/vehicles/offline',
          icon: 'icon-cursor',
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
  ],
};
