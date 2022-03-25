import uuid from 'uuid-random';

// Pence for price
// LIMIT, OFFSET, QUERY ORDER BY.
// const params = new URLSearchParams(window.location.search);
// const page = params.get('page') || 0;


const products = [
  // Purple
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'purple',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'purple',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'purple',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'purple',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'purple',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'purple',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'purple',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'purple',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'purple',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'purple',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/purple/plate2x3.png',
  },
  // End of Purple
  // Red
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'red',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'red',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'red',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'red',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'red',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'red',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'red',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'red',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'red',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'red',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/red/plate2x3.png',
  },
  // End of red
  // Blue
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'blue',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'blue',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'blue',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'blue',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'blue',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'blue',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'blue',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'blue',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'blue',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'blue',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/blue/plate2x3.png',
  },
  // End of Blue
  // Yellow
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'yellow',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'yellow',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'yellow',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'yellow',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'yellow',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'yellow',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'yellow',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'yellow',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'yellow',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'yellow',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/yellow/plate2x3.png',
  },
  // End of Yellow
  // White
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'white',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'white',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'white',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'white',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'white',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'white',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'white',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'white',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'white',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'white',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/white/plate2x3.png',
  },
  // End of White
  // Grey
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'grey',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'grey',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'grey',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'grey',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'grey',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'grey',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'grey',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'grey',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'grey',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'grey',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/grey/plate2x3.png',
  },
  // End of Grey
  // Brown
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'brown',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'brown',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'brown',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'brown',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'brown',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'brown',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'brown',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'brown',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'brown',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'brown',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/brown/plate2x3.png',
  },
  // End of Brown
  // Green
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'green',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'green',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'green',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'green',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'green',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'green',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'green',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'green',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'green',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'green',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/green/plate2x3.png',
  },
  // End of Green
  // Orange
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'orange',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'orange',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'orange',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'orange',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'orange',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'orange',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'orange',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'orange',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'orange',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'orange',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/orange/plate2x3.png',
  },
  // End of Orange
  // Black
  {
    id: uuid(),
    name: 'Brick 1x1',
    colour: 'black',
    category: 'bricks',
    price: 6,
    instock: 7020,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/brick1x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x2',
    colour: 'black',
    category: 'bricks',
    price: 10,
    instock: 9333,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/brick1x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 1x4',
    category: 'bricks',
    colour: 'black',
    price: 13,
    instock: 8723,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/brick1x4.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x2',
    category: 'bricks',
    colour: 'black',
    price: 12,
    instock: 7877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/brick2x2.png',
  },
  {
    id: uuid(),
    name: 'Brick 2x3',
    category: 'bricks',
    colour: 'black',
    price: 16,
    instock: 8747,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/brick2x3.png',
  },
  {
    id: uuid(),
    name: 'Brick 3x1',
    category: 'bricks',
    colour: 'black',
    price: 15,
    instock: 6345,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/brick3x1.png',
  },
  {
    id: uuid(),
    name: 'Brick 4x2',
    category: 'bricks',
    colour: 'black',
    price: 18,
    instock: 8277,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/brick4x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 1x1',
    category: 'plates',
    colour: 'black',
    price: 4,
    instock: 877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/plate1x1.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x2',
    category: 'plates',
    colour: 'black',
    price: 10,
    instock: 8477,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/plate2x2.png',
  },
  {
    id: uuid(),
    name: 'Plate 2x3',
    category: 'plates',
    colour: 'black',
    price: 14,
    instock: 5877,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.',
    imgSrc: './images/single/black/plate2x3.png',
  },
];
export { products };
