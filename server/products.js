import uuid from 'uuid-random';

// Pence for price

// Red, Blue, Yellow, Purple, White, Grey, Brown, Green, Orange, Black

const products = [
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'purple',
    price: 6,
    instock: 1020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'purple',
    price: 10,
    instock: 333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    colour: 'purple',
    price: 13,
    instock: 723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    colour: 'purple',
    price: 12,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick2x2.png',
  },
];
export { products };
