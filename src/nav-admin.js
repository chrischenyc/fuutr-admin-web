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
      url: '/vehicles',
    },
    {
      name: 'Zones',
      url: '/zones',
      icon: 'icon-map',
    },
    {
      name: 'Issues',
      url: '/issues',
      icon: 'icon-envelope',
    },
    {
      name: 'Payments',
      url: '/payments',
      icon: 'icon-credit-card',
    },
  ],
};
