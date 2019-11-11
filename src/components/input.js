import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  & .Mui-focused {
    color: #27ae60;
  }

  & .MuiInput-underline:after {
    border-bottom: 2px solid #27ae60;
  }
`;

export default StyledTextField;
