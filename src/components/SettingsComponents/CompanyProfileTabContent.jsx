import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Form from './Form';
import { colors, fonts } from "../../Styles";
import PropTypes from "prop-types";

export default function CompanyProfileTabContent({ company, style }) {
  return (
    <Box
      sx={{
        ...{
          marginTop: "40px",
          color: colors.darkGrey,
          fontFamily: fonts.fontFamily,
        },
        ...style,
      }}
    >
      {/*Company Profile header and form*/}
      <h3 style={{ marginBottom: "40px" }}>Edit company profile information</h3>

      {/*Upcoming time off header*/}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: "50px", marginBottom: "25px" }}
      >
        <Form company={company} />
      </Stack>
    </Box>
  );
}

//Control panel settings for storybook
CompanyProfileTabContent.propTypes = {
  //Company data info
  company: PropTypes.arrayOf(PropTypes.object),
};

//Default values for this component
CompanyProfileTabContent.defaultProps = {
  style: {},
};
