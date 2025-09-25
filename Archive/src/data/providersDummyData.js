import AvatarIcon from '@/assets/avatar-user-icon.svg';
import PassportIcon from '@/assets/passport-icon.svg';
import PlatinumIcon from '@/assets/platinum-icon.svg';
import BronzeIcon from '@/assets/bronze-icon.svg';
import SilverIcon from '@/assets/silver-icon.svg';
import GoldIcon from '@/assets/gold-icon.svg';
import InspoIcon from '@/assets/inspo-icon.svg';

export const providersData = [
  {
    id: 'U001',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Barber',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,
    badgeIcon: BronzeIcon,
    address: '34 Adeola street, Ojuelegba, Yaba, Lagos',
    direction:
      "From Ojuelegba Bus Stop:  Take a bike or walk towards Lawanson Road. Stop at the third street after the Mobil filling station, it’s called Adeola Street. Enter the street and walk straight down. Look for a two-storey cream-colored house with a black gate on the left. There's a small shop with a red umbrella in front of it. That’s the house.",
    // ✅ NEW OVERVIEW SECTION
    overview: {
      ratingLevel: 'Bronze',
      levelTag: 'Starter level',
      badge: {
        type: 'Bronze', // Bronze | Silver | Gold | Platinum
        color: '#F97316', // orange-500 for Bronze
        icon: '/icons/bronze.png', // replace with your actual asset path
      },
      completionPercent: 15,
      jobsCompleted: {
        total: 15,
        done: 5,
      },
      ratings: {
        average: 4.5,
        totalReviews: 2000,
        breakdown: {
          5: 1212,
          4: 182,
          3: 123,
          2: 345,
          1: 212,
        },
        score: 3,
        total: 4,
      },
      about:
        'Flawless styles, every time. I specialize in knotless braids, cornrows, lace installs, silk press, twists, and more — starting from ₦5,000. Available Mon–Sat (9 AM – 6 PM). Home service in Surulere & nearby (extra fee). Your hair, done right.',
      prices: {
        startingFee: '20,000',
        minimumOffer: '5,000',
      },
      gallery: ['/chatinspo.png', '/chatinspo.png'],
      reviews: [
        {
          id: 'R001',
          name: 'Funmi A',
          date: '23, Mar',
          text: 'She did amazing well when she came',
          rating: 5,
        },
        {
          id: 'R002',
          name: 'Adanna O',
          date: '23, Mar',
          text: 'Her service was really good',
          rating: 5,
        },
        { id: 'R003', name: 'Bayo D', date: '23, Mar', text: 'Very great service', rating: 4 },
        {
          id: 'R004',
          name: 'Samuel L',
          date: '23, Mar',
          text: 'Exceptional service but could be better',
          rating: 4,
        },
        {
          id: 'R005',
          name: 'Chioma G',
          date: '23, Mar',
          text: 'Her service was really bad',
          rating: 2,
        },
        { id: 'R006', name: 'Sophia M', date: '23, Mar', text: 'Not bad, not good', rating: 3 },
      ],
    },

    analytics: {
      revenue: {
        earnings: 2020000,
        tips: 20000,
        commission: 200000,
        breakdown: {
          jobPayment: 2200000,
          tips: 20000,
          income: 2220000,
          commissionRate: '10',
          deductions: 200000,
          finalEarnings: 2020000,
        },
      },
      jobs: {
        total: 54,
        completed: 48,
        canceled: 3,
        disputed: 3,
      },
      offers: {
        total: 80,
        accepted: 54,
        declined: 6,
        cancelled: 4,
        declinedByClient: 6,
        cancelledByClient: 10,
      },
      offersRate: {
        acceptanceRate: 67.5,
        declineRate: 7.5,
        cancelledRate: 5,
        cancelledByClientRate: 7.5,
        declinedByClientRate: 12.5,
      },
    },
    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],

    chat: [
      {
        chatId: 'C001',
        with: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          avatar: AvatarIcon,
        },
        messages: [
          {
            id: 'M001',
            sender: 'user', // or "provider"
            text: 'Hello Chika, can you confirm the appointment?',
            time: '10:15 AM',
            date: '12 Dec, 2025',
            status: 'countered',
            type: 'offer',
            amount: '6,000',
            images: ['/chatinspo.png', '/chatinspo.png', '/chatinspo.png', '/chatinspo.png'],
          },
          {
            id: 'M002',
            sender: 'provider',
            text: 'Yes! I’ll be there by 11:00 AM as scheduled.',
            time: '10:17 AM',
            date: '12 Dec, 2025',
            status: 'delivered',
            type: 'offer',
            amount: '10,000',
          },
          {
            id: 'M003',
            sender: 'user',
            text: 'Perfect. Please don’t forget the bridal kit.',
            time: '10:20 AM',
            date: '12 Dec, 2025',
            status: 'seen',
          },
        ],
      },
    ],
  },

  {
    id: 'U002',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Cosmetologist',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    badgeIcon: SilverIcon,
    passport: PassportIcon,
    // ✅ NEW OVERVIEW SECTION
    overview: {
      ratingLevel: 'Silver',
      levelTag: 'Skilled level',
      badge: {
        type: 'Silver', // Bronze | Silver | Gold | Platinum
      },
      completionPercent: 50,
      jobsCompleted: {
        total: 50,
        done: 25,
      },
      ratings: {
        average: 4.5,
        totalReviews: 2000,
        breakdown: {
          5: 1212,
          4: 182,
          3: 123,
          2: 345,
          1: 212,
        },
        score: 4,
        total: 4,
      },
      about:
        'Flawless styles, every time. I specialize in knotless braids, cornrows, lace installs, silk press, twists, and more — starting from ₦5,000. Available Mon–Sat (9 AM – 6 PM). Home service in Surulere & nearby (extra fee). Your hair, done right.',
      prices: {
        startingFee: '20,000',
        minimumOffer: '5,000',
      },
      gallery: ['/chatinspo.png', '/chatinspo.png'],
      reviews: [
        {
          id: 'R001',
          name: 'Funmi A',
          date: '23, Mar',
          text: 'She did amazing well when she came',
          rating: 5,
        },
        {
          id: 'R002',
          name: 'Adanna O',
          date: '23, Mar',
          text: 'Her service was really good',
          rating: 5,
        },
        { id: 'R003', name: 'Bayo D', date: '23, Mar', text: 'Very great service', rating: 4 },
        {
          id: 'R004',
          name: 'Samuel L',
          date: '23, Mar',
          text: 'Exceptional service but could be better',
          rating: 4,
        },
        {
          id: 'R005',
          name: 'Chioma G',
          date: '23, Mar',
          text: 'Her service was really bad',
          rating: 2,
        },
        { id: 'R006', name: 'Sophia M', date: '23, Mar', text: 'Not bad, not good', rating: 3 },
      ],
    },

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U003',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Stylist',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,
    badgeIcon: GoldIcon,
    // ✅ NEW OVERVIEW SECTION
    overview: {
      ratingLevel: 'Gold',
      levelTag: 'Experienced level',
      badge: {
        type: 'Gold', // Bronze | Silver | Gold | Platinum
      },
      completionPercent: 75,
      jobsCompleted: {
        total: 200,
        done: 125,
      },
      ratings: {
        average: 4.5,
        totalReviews: 2000,
        breakdown: {
          5: 1212,
          4: 182,
          3: 123,
          2: 345,
          1: 212,
        },
        score: 5,
        total: 5,
      },
      about:
        'Flawless styles, every time. I specialize in knotless braids, cornrows, lace installs, silk press, twists, and more — starting from ₦5,000. Available Mon–Sat (9 AM – 6 PM). Home service in Surulere & nearby (extra fee). Your hair, done right.',
      prices: {
        startingFee: '20,000',
        minimumOffer: '5,000',
      },
      gallery: ['/chatinspo.png', '/chatinspo.png'],
      reviews: [
        {
          id: 'R001',
          name: 'Funmi A',
          date: '23, Mar',
          text: 'She did amazing well when she came',
          rating: 5,
        },
        {
          id: 'R002',
          name: 'Adanna O',
          date: '23, Mar',
          text: 'Her service was really good',
          rating: 5,
        },
        { id: 'R003', name: 'Bayo D', date: '23, Mar', text: 'Very great service', rating: 4 },
        {
          id: 'R004',
          name: 'Samuel L',
          date: '23, Mar',
          text: 'Exceptional service but could be better',
          rating: 4,
        },
        {
          id: 'R005',
          name: 'Chioma G',
          date: '23, Mar',
          text: 'Her service was really bad',
          rating: 2,
        },
        { id: 'R006', name: 'Sophia M', date: '23, Mar', text: 'Not bad, not good', rating: 3 },
      ],
    },

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U004',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',
    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,
    badgeIcon: PlatinumIcon,
    // ✅ NEW OVERVIEW SECTION
    overview: {
      ratingLevel: 'Platinum',
      levelTag: 'Elite level',
      badge: {
        type: 'Platinum', // Bronze | Silver | Gold | Platinum
      },
      completionPercent: 100,
      jobsCompleted: {
        total: 100,
        done: 100,
      },
      ratings: {
        average: 4.5,
        totalReviews: 2000,
        breakdown: {
          5: 1212,
          4: 182,
          3: 123,
          2: 345,
          1: 212,
        },
        score: 5,
        total: 5,
      },
      about:
        'Flawless styles, every time. I specialize in knotless braids, cornrows, lace installs, silk press, twists, and more — starting from ₦5,000. Available Mon–Sat (9 AM – 6 PM). Home service in Surulere & nearby (extra fee). Your hair, done right.',
      prices: {
        startingFee: '20,000',
        minimumOffer: '5,000',
      },
      gallery: ['/chatinspo.png', '/chatinspo.png'],
      reviews: [
        {
          id: 'R001',
          name: 'Funmi A',
          date: '23, Mar',
          text: 'She did amazing well when she came',
          rating: 5,
        },
        {
          id: 'R002',
          name: 'Adanna O',
          date: '23, Mar',
          text: 'Her service was really good',
          rating: 5,
        },
        { id: 'R003', name: 'Bayo D', date: '23, Mar', text: 'Very great service', rating: 4 },
        {
          id: 'R004',
          name: 'Samuel L',
          date: '23, Mar',
          text: 'Exceptional service but could be better',
          rating: 4,
        },
        {
          id: 'R005',
          name: 'Chioma G',
          date: '23, Mar',
          text: 'Her service was really bad',
          rating: 2,
        },
        { id: 'R006', name: 'Sophia M', date: '23, Mar', text: 'Not bad, not good', rating: 3 },
      ],
    },

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U005',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Technician',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U006',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Groomig Specialist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U007',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Care Expert',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U008',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Consultant',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U009',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Fashion Designer',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0010',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0011',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0012',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0013',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0014',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0015',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0016',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0017',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },

  {
    id: 'U0018',
    name: 'Ezenwa Vincent',
    gender: 'Male',
    status: 'Verified',
    category: 'Hair Artist',

    email: 'ezenwavincent@gmail.com',
    phone: '+2348090233431',
    dob: '29-April-1995',
    nin: '8123761890231',
    bvn: '22346578912',
    avatar: AvatarIcon,
    passport: PassportIcon,

    jobs: [
      {
        jobId: '#DH450123',
        serviceProvider: {
          name: 'Chika Nwosu',
          role: 'Makeup Artist',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '13,500',
        status: 'Pending',
        jobDesc:
          'Hey! I need help cleaning my room. It’s mostly just sweeping, mopping, wiping down surfaces, and helping me organize a few things. Nothing too heavy, but I’d love it to look fresh and neat again.',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '12 Dec, 2025', time: '11:00' },
          started: { date: '12 Dec, 2025', time: '09:30' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH789456',
        serviceProvider: {
          name: 'Tunde Okafor',
          role: 'Fashion Designer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '5,700',
        status: 'InProgress',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '20 Oct, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH234567',
        serviceProvider: {
          name: 'Adaobi Ibe',
          role: 'Nail Technician',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '21,230',
        status: 'Canceled',
        statusReason: 'Failed identity verification',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '23 Jun, 2025', time: '11:00' },
          ended: { date: '-', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
      {
        jobId: '#DH778899',
        serviceProvider: {
          name: 'Chukwuma Eke',
          role: 'Photographer',
          icon: AvatarIcon,
          badgeIcon: PlatinumIcon,
        },
        amount: '25,000',
        status: 'Disputed',
        jobDesc: 'Hey! I need help cleaning my room...',
        jobInspo: InspoIcon,
        disputeDetails: {
          issue: 'Provider didn’t complete the work',
          description: 'The cleaner left the room halfway through...',
          images: InspoIcon,
        },
        resolutionDetails: {
          issue: 'Partial refund',
          description:
            'The service provider acknowledged a delay and offered to reschedule, but the user declined. Partial refund approved due to incomplete work.',
          refundAmount: '12,500',
        },
        timeline: {
          accepted: { date: '23 Jun, 2025', time: '11:00' },
          started: { date: '18 May, 2025', time: '11:00' },
          ended: { date: '14 Aug, 2025', time: '11:00' },
          resolution: { date: '23 Jun, 2025', time: '11:00' },
        },
      },
      {
        jobId: '#DH334455',
        serviceProvider: { name: 'Ngozi Umeh', role: 'Event Planner' },
        amount: '80,000',
        status: 'Completed',
        timeline: {
          accepted: { date: '-', time: '-' },
          started: { date: '02 Apr, 2025', time: '-' },
          ended: { date: '05 Apr, 2025', time: '-' },
          resolution: { date: '-', time: '-' },
        },
      },
    ],

    wallet: [
      {
        balance: '120,000',
        transactions: [
          {
            id: 'T001',
            name: 'Wallet top up',
            type: 'Credit',
            amount: '30,000 NGN',
            date: '01 Aug 2025',
            status: 'Successful',
          },
          {
            id: 'T002',
            name: 'Order payment for Olivia Amarachi',
            type: 'Debit',
            amount: '10,000 NGN',
            date: '05 Aug 2025',
            status: 'Pending',
          },
        ],
      },
    ],
  },
];
