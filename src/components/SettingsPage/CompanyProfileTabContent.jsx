import Box from "@mui/system/Box";
import CompanyProfileForm from "./CompanyProfileForm";

export default function CompanyProfileTabContent({ company }) {
  return (
    <Box>
      <CompanyProfileForm company={company} />
    </Box>
  );
}
