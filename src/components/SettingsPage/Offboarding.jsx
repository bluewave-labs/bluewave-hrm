import { useState } from "react";
import {
  styled,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

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
    title: "Survey Questions",
  });

  const handleListItemClick = (_, selectedListItem) => {
    setListItem(selectedListItem);
  };

  return (
    <Box
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
      <List component="nav" sx={{ pr: 8 }}>
        {offboardingListItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={listItem.id === item.id}
            onClick={(event) => handleListItemClick(event, item)}
          >
            <ListItemText
              primary={
                <Typography style={{ fontSize: "13px" }}>
                  {item.title}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
      {listItem.title === "Survey questions" ? (
        <Box>
          <HeadText component="h3">
            Offboarding (exit survey) questions
          </HeadText>
        </Box>
      ) : (
        <Box>
          <HeadText component="h3">Offboarding documents</HeadText>
        </Box>
      )}
    </Box>
  );
}
