import { Box, Card, CardContent, Grid } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { DndContext, closestCorners, useDraggable, useDroppable } from '@dnd-kit/core';
import EmployeesDepartmentGraphs from './EmployeesDepartmentGraphs';
import RecentPromotions from './RecentPromotions';
import WeeklyNewEmp from './WeeklyNewEmp';
import EmployeesRoleGraph from './EmployeesRoleGraph';
import HeadcountChanges from './HeadcountChanges';

// Customizing CardContent with additional padding
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    padding: '25px',
}));

// DraggableItem component represents an item that can be dragged and dropped
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

// DroppableContainer component represents a container where draggable items can be dropped
function DroppableContainer({ id, children }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <Box ref={setNodeRef} sx={{ width: '100%' }}>
            {children}
        </Box>
    );
}

// Function to check if two items can be placed next to each other
const canBeAdjacent = (item1, item2) => {
    if (item1.size === item2.size) {
        return false; // Items of the same size cannot be adjacent
    }
    return true; // Items of different sizes can be adjacent
};

// Function to check if two items can be swapped
const canSwap = (item1, item2) => {
    if (item1.size === item2.size) {
        return true; // Same size items can swap if they are in different rows
    }
    return canBeAdjacent(item1, item2); // Different size items can swap if they are in the same row
};

// Function to generate rows based on item sizes
const generateRows = (tasks) => {
    const rows = [];
    let row = [];
    let rowSize = 0;

    tasks.forEach(task => {
        if (rowSize + task.size > 12) {
            rows.push(row);
            row = [];
            rowSize = 0;
        }
        row.push(task);
        rowSize += task.size;
    });

    if (row.length > 0) {
        rows.push(row);
    }

    return rows;
};

// Main Task component that contains draggable and droppable items
function ReportsMainCards(props) {
    const [tasks, setTasks] = useState([
        { id: 1, component: <EmployeesDepartmentGraphs />, size: 5 },
        { id: 2, component: <RecentPromotions/>, size: 7 },
        { id: 3, component: <WeeklyNewEmp/>, size: 7 },
        { id: 4, component: <EmployeesRoleGraph />, size: 5 },
        { id: 5, component: <HeadcountChanges />, size: 7 },
    ]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active && over && active.id !== over.id) {
            const activeIndex = tasks.findIndex(task => task.id === active.id);
            const overIndex = tasks.findIndex(task => task.id === over.id);

            if (canSwap(tasks[activeIndex], tasks[overIndex])) {
                setTasks(prevTasks => {
                    const newTasks = [...prevTasks];
                    [newTasks[activeIndex], newTasks[overIndex]] = [newTasks[overIndex], newTasks[activeIndex]];
                    return newTasks;
                });
            }
        }
    };

    const rows = generateRows(tasks);

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
                        {rows.map((row, rowIndex) => (
                            <Grid container spacing={2} key={rowIndex} sx={{ mt: rowIndex > 0 ? 1 : 0 }}>
                                {row.map(task => (
                                    <Grid key={task.id} item xs={task.size}>
                                        <DroppableContainer id={task.id}>
                                            <DraggableItem id={task.id}>
                                                {task.component}
                                            </DraggableItem>
                                        </DroppableContainer>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </DndContext>
                </StyledCardContent>
            </Box>
        </Card>
    );
}

ReportsMainCards.propTypes = {};

export default ReportsMainCards;
