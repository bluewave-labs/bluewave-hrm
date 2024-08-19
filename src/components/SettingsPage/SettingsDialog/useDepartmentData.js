export const useDepartmentData = () => {
  const addDepartment = (data) => console.log('addDepartment');

  const editDepartment = (data) => console.log('editDepartment');

  const deleteDepartment = () => console.log('deleteDepartment');
  
  return {
    add: addDepartment,
    edit: editDepartment,
    delete: deleteDepartment,
  };
};
