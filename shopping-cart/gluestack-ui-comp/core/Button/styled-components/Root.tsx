import { Pressable } from 'react-native';
// import { styled } from '../../styled';

// export default styled(
//   Button,
//   {
//     color: '$textLight700',
//     fontWeight: '$normal',
//     fontFamily: '$body',
//     fontStyle: 'normal',
//     fontSize: '$md',
//     letterSpacing: '$md',
//     lineHeight: '$md',

//     variants: {
//       variant: {
//         solid: {
//           bg: "$primary600",
//         },
//         subtle: {
//           bg: "$primary300",
//         },
//       },

//       size: {
//         'xs': {
//           fontSize: '$xs',
//           lineHeight: '$sm',
//         },

//         'sm': {
//           fontSize: '$sm',
//           lineHeight: '$sm',
//         },

//         'md': {
//           fontSize: '$md',
//           lineHeight: '$md',
//         },

//         'lg': {
//           fontSize: '$lg',
//           lineHeight: '$xl',
//         },

//         'xl': {
//           fontSize: '$xl',
//           lineHeight: '$xl',
//         },

//         '2xl': {
//           fontSize: '$2xl',
//           lineHeight: '$2xl',
//         },

//         '3xl': {
//           fontSize: '$3xl',
//           lineHeight: '$3xl',
//         },

//         '4xl': {
//           fontSize: '$4xl',
//           lineHeight: '$4xl',
//         },

//         '5xl': {
//           fontSize: '$5xl',
//           lineHeight: '$6xl',
//         },

//         '6xl': {
//           fontSize: '$6xl',
//           lineHeight: '$7xl',
//         },
//       },
//     },

//     defaultProps: {
//       size: 'md',
//     },

//     _dark: {
//       color: '$textDark200',
//     },
//   },
//   {
//     ancestorStyle: ['_text'],
//   }
// );


import { styled } from "@gluestack-style/react"
export const Button = styled(
  Pressable,
  {
    rounded: "$lg",
    py: "$3",
    px: "$9",
    variants: {
      variant: {
        solid: { bg: "$backgroundLight100" },
        outline: {
          bg: " rgba(255, 255, 255, 0.24)",
          borderWidth: "$1",
          borderColor: "$borderLight100",
        },
      },
    },
  },
  {}
)
