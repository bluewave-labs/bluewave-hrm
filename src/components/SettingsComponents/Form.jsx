import { FormControl } from '@mui/base/FormControl';
export default function Form() {
  return (
    <FormControl defaultValue="" required>
      <label>Name</label>
      <input placeholder="Write your name here" />
    </FormControl>
  );
}
