// import the required animation functions from the angular animations module
import { animate, style, query, group } from '@angular/animations';

export const hoch = [
    query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translateY(0)' }), { optional: true }),
    query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translateY(-100%)' }), { optional: true }),

    group([
        query(':leave', animate('750ms ease', style({ transform: 'translateY(100%)' })), { optional: true }), // y: '-100%', { optional: true }),
        query(':enter', animate('750ms ease', style({ transform: 'translateY(0)' })), { optional: true })
    ])
];

export const runter = [
    query(':leave', style({ position: 'absolute', left: 0, right: 0, transform: 'translateY(0)' }), { optional: true }),
    query(':enter', style({ position: 'absolute', left: 0, right: 0, transform: 'translateY(100%)' }), { optional: true }),

    group([
        query(':leave', animate('750ms ease', style({ transform: 'translateY(-100%)' })), { optional: true }), // y: '-100%', { optional: true }),
        query(':enter', animate('750ms ease', style({ transform: 'translateY(0)' })), { optional: true })
    ])
];
