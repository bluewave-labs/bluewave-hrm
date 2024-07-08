import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import Form from "./Form";
import { colors, fonts } from "../../Styles";
import PropTypes from "prop-types";

export default function CompanyProfileTabContent({ company, style }) {
  return (
    <Box>
      <Form company={company} />
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
