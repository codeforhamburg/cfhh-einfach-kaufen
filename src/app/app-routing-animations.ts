import {trigger, state, animate, style, transition} from '@angular/animations';

// horizontal slide animation
const statesSlidedIn = [
  state('fromTop' , style({})),
  state('fromBot' , style({}))
];
const styleSlidedTop = style({transform: 'translateY(-100%)', display: 'none'});
const styleSlideBot = style({transform: 'translateY(100%)', display: 'none'});
const stateSlidedTop = state('left', styleSlidedTop);
const stateSlidedBot = state('right', styleSlideBot);
const transitionsSlideLeft = [
  transition('fromTop => void', animate('.3s ease-out', styleSlideBot)),
  transition('void => fromTop', [styleSlidedTop, animate('.3s ease-out')])
];
const transitionsSlideRight = [
  transition('fromBot => void', animate('.3s ease-out', styleSlidedTop)),
  transition('void => fromBot', [styleSlideBot, animate('.3s ease-out')])
];
export const slideVertical = trigger('slideVertical', [
  ...statesSlidedIn,
  stateSlidedTop,
  stateSlidedBot,
  ...transitionsSlideLeft,
  ...transitionsSlideRight
]);


// let position = 0;

// export function routerTransition2(int) {
//   console.log(int);
//   position = int;
//   return slideToBottom();
// }
// export function routerTransition() {
//   console.log(position);
//   return slideToBottom();
// }

// export function routerSlide() {
//   console.log();
//   return conditionalSlide();
// }

// function slideToRight() {
//   return trigger('routerTransition', [
//     state('void', style({position:'fixed', width:'100%'}) ),
//     state('*', style({position:'fixed', width:'100%'}) ),
//     transition(':enter', [
//       style({transform: 'translateX(-100%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
//     ]),
//     transition(':leave', [
//       style({transform: 'translateX(0%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateX(100%)'}))
//     ])
//   ]);
// }

// function slideToLeft() {
//   return trigger('routerTransition', [
//     state('void', style({position:'fixed', width:'100%'}) ),
//     state('*', style({position:'fixed', width:'100%'}) ),
//     transition(':enter', [
//       style({transform: 'translateX(100%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
//     ]),
//     transition(':leave', [
//       style({transform: 'translateX(0%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
//     ])
//   ]);
// }

// function slideToBottom() {
//   console.log("yoo")
//   return trigger('routerTransition', [
//     state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
//     state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
//     transition(':enter', [
//       style({transform: 'translateY(-100%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
//     ]),
//     transition(':leave', [
//       style({transform: 'translateY(0%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateY(100%)'}))
//     ])
//   ]);
// }

// function slideToTop() {
//   return trigger('routerTransition', [
//     state('void', style({position:'fixed', width:'100%', height:'100%'}) ),
//     state('*', style({position:'fixed', width:'100%', height:'100%'}) ),
//     transition(':enter', [
//       style({transform: 'translateY(100%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateY(0%)'}))
//     ]),
//     transition(':leave', [
//       style({transform: 'translateY(0%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateY(-100%)'}))
//     ])
//   ]);
// }

// function conditionalSlide() {
//         return trigger(
//             "routerSlide",
//             [
//                 transition(
//                     "void => down", // ---> Entering --->
//                     [
//                         // In order to maintain a zIndex of 2 throughout the ENTIRE
//                         // animation (but not after the animation), we have to define it
//                         // in both the initial and target styles. Unfortunately, this
//                         // means that we ALSO have to define target values for the rest
//                         // of the styles, which we wouldn't normally have to.
//                         style({
//                             transform: 'translateY(100%)',
//                             // opacity: 0.0,
//                             zIndex: 2
//                         }),
//                         animate(
//                             "2400ms ease-in-out",
//                             style({
//                               transform: 'translateY(0%)',
//                                 // left: 0,
//                                 // opacity: 1.0,
//                                 zIndex: 2
//                             })
//                         )
//                     ]
//                 ),
//                 transition(
//                     "down => void", // ---> Leaving --->
//                     [
//                         animate(
//                             "2400ms ease-in-out",
//                             style({
//                                 transform: 'translateY(-100%)'
//                             })
//                         )
//                     ]
//                 ),
//                 transition(
//                     "void => up", // <--- Entering <---
//                     [
//                         // In order to maintain a zIndex of 2 throughout the ENTIRE
//                         // animation (but not after the animation), we have to define it
//                         // in both the initial and target styles. Unfortunately, this
//                         // means that we ALSO have to define target values for the rest
//                         // of the styles, which we wouldn't normally have to.
//                         style({
//                             transform: 'translateY(-100%)',

//                             // left: 100,
//                             // opacity: 0.0,
//                             zIndex: 2
//                         }),
//                         animate(
//                             "2400ms ease-in-out",
//                             style({
//                               transform: 'translateY(0%)',

//                                 // left: 0,
//                                 // opacity: 1.0,
//                                 zIndex: 2
//                             })
//                         )
//                     ]
//                 ),
//                 transition(
//                     "up => void", // <--- Leaving <---
//                     [
//                         animate(
//                             "2400ms ease-in-out",
//                             style({
//                               transform: 'translateY(100%)'

//                                 // left: -100,
//                                 // opacity: 0.0
//                             })
//                         )
//                     ]
//                 )
//             ]
//         )
// }