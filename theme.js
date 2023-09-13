import { extendTheme} from "@chakra-ui/react"
import { spinnerTheme } from "./components/SpinnerTheme"

// 2. Add your color mode config
const config  = {
  initialColorMode: "light",
  useSystemColorMode: true,

}

// 3. extend the theme
const theme = extendTheme({ config },{components:{Spinner:spinnerTheme}})

export default theme