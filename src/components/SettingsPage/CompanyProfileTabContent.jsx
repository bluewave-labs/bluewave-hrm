import Box from "@mui/system/Box";
import Form from "./Form";
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
