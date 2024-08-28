import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { DndContext, closestCorners, useDraggable, useDroppable } from '@dnd-kit/core';
import EmployeesDepartmentGraph from './EmployeesDepartmentGraph';
//import HeadcountChanges from './HeadcountChanges2';
import EmployeesRoleGraph from './EmployeesRoleGraph';
import RecentPromotions from './RecentPromotions';
import WeeklyNewEmployeesChart from './WeeklyNewEmp';

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: '25px',
}));

function DraggableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    height: '345px',
  };

  return (
    <Box ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </Box>
  );
}

function DroppableContainer({ id, children }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <Box ref={setNodeRef} sx={{ width: '100%' }}>
      {children}
    </Box>
  );
}

function ReportsMainCard() {
  const [tasks, setTasks] = useState([
    { id: 1, component: <EmployeesDepartmentGraph />, size: 5 },
    { id: 2, component: <RecentPromotions/>, size: 7 },
    { id: 3, component: <WeeklyNewEmployeesChart/>, size: 7 },
    { id: 4, component: <EmployeesRoleGraph />, size: 5 },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const activeIndex = tasks.findIndex(task => task.id === active.id);
      const overIndex = tasks.findIndex(task => task.id === over.id);

      setTasks(prevTasks => {
        const newTasks = [...prevTasks];
        [newTasks[activeIndex], newTasks[overIndex]] = [newTasks[overIndex], newTasks[activeIndex]];
        return newTasks;
      });
    }
  };

  // Split tasks into two rows
  const firstRowTasks = tasks.slice(0, 2);
  const secondRowTasks = tasks.slice(2);

  return (
    <Card
      sx={{
        border: '1px solid #EBEBEB',
        borderRadius: '5px',
        boxShadow: 'none',
        overflowX: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '980px',
          overflowX: 'auto',
        }}
      >
        <StyledCardContent>
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            {/* First Row */}
            <Grid container spacing={2}>
              {firstRowTasks.map((task) => (
                <Grid key={task.id} item xs={task.size}>
                  <DroppableContainer id={task.id}>
                    <DraggableItem id={task.id}>{task.component}</DraggableItem>
                  </DroppableContainer>
                </Grid>
              ))}
            </Grid>

            {/* Second Row */}
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {secondRowTasks.map((task) => (
                <Grid key={task.id} item xs={task.size}>
                  <DroppableContainer id={task.id}>
                    <DraggableItem id={task.id}>{task.component}</DraggableItem>
                  </DroppableContainer>
                </Grid>
              ))}
            </Grid>
          </DndContext>
        </StyledCardContent>
      </Box>
    </Card>
  );
}

export default ReportsMainCard;
