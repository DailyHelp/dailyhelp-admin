// src/data/dummyData.ts

// data/statisticsData.js
import BronzeIcon from '@/assets/bronze-icon.svg'
import SilverIcon from '@/assets/silver-icon.svg'
import GoldIcon from '@/assets/gold-icon.svg'
import PlatinumIcon from '@/assets/platinum-icon.svg'


export const badgeData = [
  {  name: 'Bronze ', amount: '100000', icon: BronzeIcon },
  {  name: 'Silver ', amount: '300000', icon: SilverIcon },
  {  name: 'Gold ', amount: '40000', icon: GoldIcon },
  {  name: 'Platinum ', amount: '4000', icon: PlatinumIcon },
];

export const ratingsData = [
  { name: "5", amount: 1000000 },
  { name: "4.5+", amount: 3000000 },
  { name: "3.5+", amount: 400000 },
  { name: "3", amount: 40000 },
  { name: "2.5+", amount: 40000 },
  { name: "2", amount: 40000 },
  { name: "1+", amount: 40000 },
  { name: "0", amount: 40000 },



  // ...up to 32 or more for pagination testing
];
 const statisticsData = [
    { id: 1, title: 'Total Revenue', value: 10000000000, isCurrency: true },
    { id: 2, title: 'Total Payout', value: 300000000, isCurrency: true },
    { id: 3, title: 'Total Users', value: 300000, isCurrency: false },
    { id: 4, title: 'Total Providers', value: 100000, isCurrency: false },
    { id: 5, title: 'Total Jobs In-Progress', value: 120, isCurrency: false },
    { id: 6, title: 'Total Jobs Completed', value: 400, isCurrency: false },
    { id: 7, title: 'Total Jobs Cancelled', value: 200, isCurrency: false },
    { id: 8, title: 'Total Jobs Disputed', value: 10, isCurrency: false },
  ];
  export default statisticsData
  
export const revenueData = [
    { name: 'JAN', value: 11.5 },
    { name: 'FEB', value: 9 },
    { name: 'MAR', value: 4 },
    { name: 'APR', value: 7.5 },
    { name: 'MAY', value: 9.8 },
    { name: 'JUN', value: 10.9 },
    { name: 'JUL', value: 6.9 },
    { name: 'AUG', value: 9 },
  ];
  
  export const userGrowthData = [
    { name: 'JAN', value: 11.5 },
    { name: 'FEB', value: 9 },
    { name: 'MAR', value: 4 },
    { name: 'APR', value: 7.5 },
    { name: 'MAY', value: 9.8 },
    { name: 'JUN', value: 10.9 },
    { name: 'JUL', value: 6.9 },
    { name: 'AUG', value: 9 },
  ];

   export const topServicesData = [
    { id: 1, category: "House cleaner", amount: 50000000, isCurrency: true },
    { id: 2, category: "Graphic designer", amount: 45000000,isCurrency: true  },
    { id: 3, category: "Web developer", amount: 60000000, isCurrency: true  },
    { id: 4, category: "Digital marketer", amount: 55000000, isCurrency: true  },
    { id: 5, category: "Data analyst", amount: 70000000, isCurrency: true  },
    { id: 7, category: "Content writer", amount: 40000000, isCurrency: true  },
    { id: 8, category: "House cleaner", amount: 50000000, isCurrency: true  },
    { id: 9, category: "Graphic designer", amount: 45000000, isCurrency: true  },
    { id: 10, category: "Web developer", amount: 60000000, isCurrency: true  },
    { id: 11, category: "Digital marketer", amount: 55000000, isCurrency: true  },
    { id: 12, category: "Data analyst", amount: 70000000, isCurrency: true  },
    { id: 13, category: "Content writer", amount: 40000000, isCurrency: true  },
    { id: 14, category: "House cleaner", amount: 50000000, isCurrency: true  },
    { id: 15, category: "Graphic designer", amount: 45000000, isCurrency: true  },
    { id: 16, category: "Web developer", amount: 60000000, isCurrency: true  },
    { id: 17, category: "Digital marketer", amount: 55000000, isCurrency: true  },
    { id: 18, category: "Data analyst", amount: 70000000, isCurrency: true  },
    { id: 19, category: "Data analyst", amount: 70000000, isCurrency: true  },
    // ...up to 32 or more for pagination testing
  ];

  
  export const topLocationData = [
    { id: 1, category: "Shomolu (Lagos)", amount: 3000000 },
    { id: 2, category: " Lekki Ajah (Lagos)", amount: 2000000 },
    { id: 3, category: "Ikoyi (Lagos)", amount: 10000000 },
    { id: 4, category: "Bodija (Oyo)", amount: 900000 },
    { id: 5, category: "Agege (Lagos)", amount: 800000 },
    { id: 7, category: "Ibeju Lekki (Lagos)", amount: 600000 },
    { id: 8, category: "Shomolu (Lagos)", amount: 3000000 },
    { id: 9, category: " Lekki Ajah (Lagos)", amount: 2000000 },
    { id: 10, category: "Ikoyi (Lagos)", amount: 10000000 },
    { id: 11, category: "Bodija (Oyo)", amount: 900000 },
    { id: 12, category: "Agege (Lagos)", amount: 800000 },
    { id: 13, category: "Ibeju Lekki (Lagos)", amount: 600000 },
    { id: 14, category: "Shomolu (Lagos)", amount: 3000000 },
    { id: 15, category: "Lekki Ajah (Lagos)", amount: 2000000 },
    { id: 16, category: "Ikoyi (Lagos)", amount: 10000000 },
    { id: 17, category: "Bodija (Oyo)", amount: 900000 },
    { id: 18, category: "Agege (Lagos)", amount: 800000 },
    { id: 19, category: "Ibeju Lekki (Lagos)", amount: 600000 },
 
 
    // ...up to 32 or more for pagination testing
  ];

  export const CategoryProviders = [
    { id: 1, category: "House cleaner", amount: 50000000,  },
    { id: 2, category: "Graphic designer", amount: 45000000,  },
    { id: 3, category: "Web developer", amount: 60000000,   },
    { id: 4, category: "Digital marketer", amount: 55000000,   },
    { id: 5, category: "Data analyst", amount: 70000000,   },
    { id: 6, category: "Content writer", amount: 40000000,   },
    { id: 7, category: "House cleaner", amount: 50000000,   },
    { id: 8, category: "Graphic designer", amount: 45000000,  },
    { id: 9, category: "House cleaner", amount: 50000000,  },
    { id: 10, category: "Graphic designer", amount: 45000000,  },
    { id: 11, category: "Web developer", amount: 60000000,   },
    { id: 12, category: "Digital marketer", amount: 55000000,   },
    { id: 13, category: "Data analyst", amount: 70000000,   },
    { id: 14, category: "Content writer", amount: 40000000,   },
    { id: 15, category: "House cleaner", amount: 50000000,   },
    { id: 16, category: "Graphic designer", amount: 45000000,  },
    // ...up to 32 or more for pagination testing
  ];
  