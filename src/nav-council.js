export default {
  items: [
    {
      name: 'Dashboard',
      url: '/',
      icon: 'icon-speedometer',
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
      name: 'Contact FUUTR',
      icon: 'icon-envelope',
      url: '/contact',
    },
  ],
};
