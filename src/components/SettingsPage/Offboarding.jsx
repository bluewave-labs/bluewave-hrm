import { useState } from "react";
import {
  styled,
  Grid,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import HRMButton from "../Button/HRMButton";
import OffboardingTable from "./OffboardingTable";
import { OffboardingDocuments } from "./OffboardingDocuments";

const HeadText = styled(Typography)({
  fontSize: "18px",
  lineHeight: "28px",
  color: "#101828",
  fontWeight: "500",
});

export default function Offboarding({ style }) {
  const offboardingListItems = [
    {
      id: 0,
      title: "Survey questions",
    },
    {
      id: 1,
      title: "Documents",
    },
  ];
  const [listItem, setListItem] = useState({
    id: 0,
    title: "Survey questions",
  });
  const [offboardingTableData, setOffboardingTableData] = useState([
    { id: "1", order: 1, question: "Why are you leaving?" },
    { id: "2", order: 2, question: "What did you like most about your job?" },
    { id: "3", order: 3, question: "What did you like least about your job?" },
  ]);

  const handleListItemClick = (_, selectedListItem) => {
    setListItem(selectedListItem);
  };

  return (
    <Box
      direction="row"
      justifyContent="space-between"
      sx={{
        ...{
          paddingTop: 6,
          paddingBottom: 16,
          fontFamily: "Inter, sans-serif",
          display: "flex",
        },
        ...style,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <List component="nav" sx={{ pr: 2 }}>
            {offboardingListItems.map((item) => (
              <ListItemButton
                key={item.id}
                selected={listItem.id === item.id}
                onClick={(event) => handleListItemClick(event, item)}
              >
                <ListItemText
                  primary={
                    <HeadText style={{ fontSize: "13px" }}>
                      {item.title}
                    </HeadText>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          {listItem.title === "Survey questions" ? (
            <Stack spacing={4}>
              <Stack direction="row" justifyContent="space-between">
                <HeadText component="h3">
                  Offboarding (exit survey) questions
                </HeadText>
                <HRMButton
                  mode="primary"
                  onClick={() => console.log("Add new")}
                >
                  Add new
                </HRMButton>
              </Stack>
              <OffboardingTable/>
              <Stack direction="row" justifyContent="flex-end">
                <HRMButton
                  mode="primary"
                  onClick={() => console.log("Add new")}
                >
                  Save changes
                </HRMButton>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={4}>
              <HeadText component="h3">Offboarding documents</HeadText>
              <OffboardingDocuments/>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
