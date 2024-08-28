import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

/**
<<<<<<< HEAD
 * Toggle button group component for filtering between all and unread components
=======
 * Toggle button group component for filtering between all and unread components.
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
 * 
 * Props:
 * - filter<String>: The current value of the filter setting for updates.
 *      Valid values: ['All', 'Unread']
 * 
 * - handleFilter<Function>: The function to set the currently selected filter.
 *      Syntax: handleFilter()
 * 
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function UpdatesFilter({filter, handleFilter, style}) {
    return (
        <ToggleButtonGroup 
            size="small"
            value={filter}
            onChange={handleFilter}
            exclusive
            sx={{...{
                border: "1px solid #D0D5DD",
                borderRadius: "8px",
                height: "34px"
            }, ...style}}
        >
            <ToggleButton value="All" sx={{textTransform: "none", paddingY: "4px"}}>All</ToggleButton>
            <ToggleButton value="Unread" sx={{textTransform: "none", paddingY: "4px"}}>Unread</ToggleButton>
        </ToggleButtonGroup>
    );
};

//Control panel settings for storybook
UpdatesFilter.propTypes = {};

//Default values for this component
UpdatesFilter.defaultProps = {
<<<<<<< HEAD
    args: {
        style: {}
    }
=======
    style: {}
>>>>>>> e3a266988eb969a3200e7d956ea1baeb3a93dcea
};