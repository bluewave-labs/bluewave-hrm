import Box from "@mui/system/Box";
import CompanyProfileForm from "./CompanyProfileForm";
import PropTypes from "prop-types";

export default function CompanyProfileTabContent({ company, style }) {
  return (
    <Box>
      <CompanyProfileForm company={company} />
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
