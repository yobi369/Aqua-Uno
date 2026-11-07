export type TaurusGalleryCategory = 'Products' | 'Facility' | 'Team' | 'Production';

export interface TaurusGalleryPhoto {
  image: string;
  title: string;
  alt: string;
  category: TaurusGalleryCategory;
}

const imageUrl = (file: string) =>
  `https://images.pixieset.com/599043011/${file}-medium.jpg`;

export const TAURUS_GALLERY_PHOTOS: TaurusGalleryPhoto[] = [
  {
    image: imageUrl('1a4d70a146ed529b7288636a5d3652ba'),
    title: 'Aqua Uno spring water',
    alt: 'Aqua Uno water bottle photographed outdoors',
    category: 'Products',
  },
  {
    image: imageUrl('274241db392cd4e5cea1f7dfc11d9900'),
    title: 'Bottled for every day',
    alt: 'Aqua Uno bottled water arranged for display',
    category: 'Products',
  },
  {
    image: imageUrl('4071dc4f96915ab3ce31c454d91d879c'),
    title: 'A closer look',
    alt: 'Aqua Uno water bottle photographed among greenery',
    category: 'Products',
  },
  {
    image: imageUrl('faf223007bc7d38d60d12514c4967dcd'),
    title: 'Fresh from Aqua Uno',
    alt: 'Aqua Uno bottled water in a natural setting',
    category: 'Products',
  },
  {
    image: imageUrl('f47c75c4bfa03763cfe6605afe27dffd'),
    title: 'The Aqua Uno range',
    alt: 'Aqua Uno water bottles arranged together',
    category: 'Products',
  },
  {
    image: imageUrl('1c38c92611e2beead65029e599c3c8b4'),
    title: 'Our facility',
    alt: 'Exterior view of the Aqua Uno facility',
    category: 'Facility',
  },
  {
    image: imageUrl('fc64279b88625eadf526ce68e8ce29dd'),
    title: 'Aqua Uno at the source',
    alt: 'Aqua Uno facility and surrounding grounds',
    category: 'Facility',
  },
  {
    image: imageUrl('1278685e4f454fd9afd825db3921f9ad'),
    title: 'Built for bottling',
    alt: 'Aerial view of the Ephron Industries facility',
    category: 'Facility',
  },
  {
    image: imageUrl('e80f0e21b6cc2e0a339947fd12030fbe'),
    title: 'The Ephron Industries plant',
    alt: 'Blue exterior of the Ephron Industries plant',
    category: 'Facility',
  },
  {
    image: imageUrl('97ec178700a9b4d6660aafb2cbfae6e8'),
    title: 'A view of the grounds',
    alt: 'Aqua Uno facility grounds viewed from above',
    category: 'Facility',
  },
  {
    image: imageUrl('9421a17762b34d03e8465dc82947ddd2'),
    title: 'The people behind Aqua Uno',
    alt: 'Ephron Industries team member at work',
    category: 'Team',
  },
  {
    image: imageUrl('4c0fad060215e60f43f6f39bfc3e58d3'),
    title: 'Working together',
    alt: 'Ephron Industries colleagues meeting',
    category: 'Team',
  },
  {
    image: imageUrl('923ee4463e39016e19bbc3424a32c123'),
    title: 'Teamwork in action',
    alt: 'Ephron Industries team collaborating around a table',
    category: 'Team',
  },
  {
    image: imageUrl('a1a49d73916749334c12229392076581'),
    title: 'The people who make it happen',
    alt: 'Ephron Industries colleagues together at work',
    category: 'Team',
  },
  {
    image: imageUrl('da83abda9e9dc149ae925a7ccdc67473'),
    title: 'A shared commitment',
    alt: 'Ephron Industries team members at the facility',
    category: 'Team',
  },
  {
    image: imageUrl('54574db1c02c12908f4f4b459b320ba8'),
    title: 'On-site at Ephron Industries',
    alt: 'Ephron Industries team member at the facility',
    category: 'Team',
  },
  {
    image: imageUrl('58b1c9a09f8437a56420cb44e42cba80'),
    title: 'People and purpose',
    alt: 'Ephron Industries colleagues working together',
    category: 'Team',
  },
  {
    image: imageUrl('b98d34d7b896283210c1b4bb56c4dc94'),
    title: 'Together at work',
    alt: 'Ephron Industries team in a meeting',
    category: 'Team',
  },
  {
    image: imageUrl('a26cd01d28fa561498d5b79bd8b3cc89'),
    title: 'A team effort',
    alt: 'Ephron Industries colleagues in discussion',
    category: 'Team',
  },
  {
    image: imageUrl('a5fdfc1baf8042a53ac1c6ff19c38877'),
    title: 'Bottling operations',
    alt: 'Bottling and packaging equipment at work',
    category: 'Production',
  },
  {
    image: imageUrl('ecf05b530d09ec6be628f2bc1ec0b8f8'),
    title: 'Production in motion',
    alt: 'Production equipment inside the facility',
    category: 'Production',
  },
  {
    image: imageUrl('d3283f1be15a2f80796e0db67b355716'),
    title: 'Ready for distribution',
    alt: 'Rows of bottled water prepared for distribution',
    category: 'Production',
  },
  {
    image: imageUrl('b18483372bcaafbf4e9e6b125ad1aaa8'),
    title: 'From plant to doorstep',
    alt: 'Bottled water and production equipment at the plant',
    category: 'Production',
  },
];
