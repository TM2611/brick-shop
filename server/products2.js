import uuid from 'uuid-random';

// Pence for price

// Red, Blue, Yellow, Purple, White, Grey, Brown, Green, Orange, Black
const products = [
  {
    id: uuid(),
    name: 'Red Brick',
    colour: 'red',
    price: 20,
    instock: 100,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: '/images/red.jpg',
  },
  {
    id: uuid(),
    name: 'Green Brick',
    colour: 'green',
    price: 2299,
    instock: 29,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: '/images/green.jpg',
  },
];

export { products };
