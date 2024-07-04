import { Box } from "@mui/material";
import Home from "./containers/Home";
function App() {
  //Test data - to be removed in production
  const admin = "elwyn.ginnety@bluewavelabs.ca";
  const manager = "maye.juggings@bluewavelabs.ca";
  const employee = "elora.caine@bluewavelabs.ca";
  
  return <Box>{<Home email={manager} />}</Box>;
}

export default App;
