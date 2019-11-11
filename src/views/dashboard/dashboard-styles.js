import React from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';

export const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const HeaderContainer = styled.div`
  position: ${props => (props.fix ? 'fixed' : 'absolute')};
  height: 90px;
  width: 100%;
  padding: 0 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
`;

const HeaderControlsBox = styled.div`
  display: flex;
  align-items: center;
`;

const LinkControl = styled.a`
  text-transform: uppercase;
  color: #000;
  font-weight: bold;
  text-decoration: none;
  padding: 10px 20px;
`;

const LogoControl = styled(LinkControl)`
  color: #27ae60;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0;
  padding-right: 10px;
  text-transform: inherit;
`;

const HeaderControls = () => (
  <HeaderControlsBox>
    <LogoControl href="/">Smarty Seed</LogoControl>
    <LinkControl href="#">Start a project</LinkControl>
    <LinkControl href="#">discover</LinkControl>
  </HeaderControlsBox>
);

const HeaderSearchContainer = styled.div`
  align-self: center;
  width: 450px;
  margin: 0 10px;
`;

const SearchInputLabel = styled(InputLabel)`
  &.Mui-focused {
    color: #27ae60;
  }
`;

const SearchInput = styled(Input)`
  &.MuiInput-underline:after {
    border-bottom: 2px solid #27ae60;
  }
`;

const HeaderSearchbar = ({ onSearch }) => (
  <HeaderSearchContainer>
    <FormControl fullWidth>
      <SearchInputLabel htmlFor="dashboard-searchbar">
        Search for a project
      </SearchInputLabel>
      <SearchInput
        type="text"
        id="dashboard-searchbar"
        onChange={onSearch}
        endAdornment={
          <InputAdornment position="end">
            <Icon>search</Icon>
          </InputAdornment>
        }
      />
    </FormControl>
  </HeaderSearchContainer>
);

const GetStartedLink = styled.a`
  padding: 20px 30px;
  text-transform: uppercase;
  background-color: #27ae60;
  border-radius: 30px;
  color: #fff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    background-color: #24a259;
  }
`;

const HeaderInfo = ({ user }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <GetStartedLink href="#">Get Started</GetStartedLink>
  </div>
);

export const DashboardHeader = ({ user, onSearch }) => (
  <HeaderContainer>
    <HeaderControls />
    <HeaderSearchbar onSearch={onSearch} />
    <HeaderInfo user={user} />
  </HeaderContainer>
);
