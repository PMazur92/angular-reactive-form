import { User } from "../classes/user";

export const users: User[] = [
    {
        id: 1,
        name: 'Piotr',
        email: 'example1@example.com',
        addresses: [
            {street: 'Kan 2/1', city: 'Pul', zip_code: '24-100', voivodeship: 'LBU'},
            {street: 'Jez', city: 'Kaz W', zip_code: '24-120', voivodeship: 'LBU'}
        ]
    },
    {
        id: 2,
        name: 'Pawel',
        email: 'example2@example.com',
        addresses: [
            {street: 'Kan 2/1', city: 'Pul', zip_code: '24-100', voivodeship: 'LBU'},
            {street: 'Jez', city: 'Kaz W', zip_code: '24-120', voivodeship: 'LBU'}
        ]
    },
    {
        id: 3,
        name: 'Aleksandra',
        email: 'example3@example.com',
        addresses: []
    },
    {
        id: 4,
        name: 'Aleksandra',
        email: 'example3@example.com',
        addresses: []
    }
];

export const voivodeships = ['DŚL', 'K-P', 'LBL', 'LBU', 'ŁDZ', 'MAZ', 'MŁP', 'ZPM',
                            'OPO', 'PDL', 'PKR', 'POM', 'ŚL', 'ŚW', 'WLKP', 'W-M']