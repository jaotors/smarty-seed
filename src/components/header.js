import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import Grow from '@material-ui/core/Grow';
import * as Api from '../api';

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

const UserBadge = styled(Button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #27ae60;
  color: #fff;

  &:hover {
    background-color: #218f50;
  }
`;

const HeaderMenu = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(menuOpen);

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setMenuOpen(false);
  };

  const handleToggle = () => {
    setMenuOpen(state => !state);
  };

  useEffect(() => {
    if (prevOpen.current === true && menuOpen === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = menuOpen;
  }, [menuOpen]);

  return (
    <div>
      <UserBadge
        aria-controls={menuOpen ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        ref={anchorRef}
      >
        {' '}
      </UserBadge>
      <Popper
        open={menuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={menuOpen} id="menu-list-grow">
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

const HeaderInfo = () => {
  const [user, setUser] = useState(null);

  const onLogout = () => {
    setUser(null);
    localStorage.setItem('access_token', '');
    navigate('/');
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        const { data } = await Api.getUser(token);
        setUser(data);
      } catch (error) {}
    })();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {user && user.email ? (
        <HeaderMenu onLogout={onLogout} />
      ) : (
        <GetStartedLink href="/login">Get Started</GetStartedLink>
      )}
    </div>
  );
};

export default ({ onSearch }) => (
  <HeaderContainer>
    <HeaderControls />
    <HeaderSearchbar onSearch={onSearch} />
    <HeaderInfo />
  </HeaderContainer>
);
