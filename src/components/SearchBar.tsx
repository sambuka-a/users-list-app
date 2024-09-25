import { TextField } from '@mui/material';

type InputProps = {
  required?: boolean;
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar: React.FC<InputProps> = ({ id, value, onChange, label, required }) => {
  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        fullWidth
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  )
}

