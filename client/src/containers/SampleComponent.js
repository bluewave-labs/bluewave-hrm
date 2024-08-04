import { Box } from "@mui/material";
import React from "react";

function SampleComponent({ title }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "800px",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <h1>{title}</h1>
    </Box>
  );
}

export default SampleComponent;
