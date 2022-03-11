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
];

export { products };
