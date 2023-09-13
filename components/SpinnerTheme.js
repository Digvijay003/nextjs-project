import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
const bold = defineStyle({
  borderWidth: 6, // change the thickness of the spinner
})
const xxl=defineStyle({
    width:100,
    height:100
})
export const spinnerTheme = defineStyleConfig({
  variants: { bold },
  sizes:{xxl}
})