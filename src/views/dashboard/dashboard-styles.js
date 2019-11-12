import React from 'react';
import styled from 'styled-components';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import StyledImg from '../../components/image';
import { CardColumn } from '../../components/card';

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

const UserBadge = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #27ae60;
`;

const HeaderInfo = ({ user }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {user ? (
      <UserBadge />
    ) : (
      <GetStartedLink href="/login">Get Started</GetStartedLink>
    )}
  </div>
);

export const DashboardHeader = ({ user, onSearch }) => (
  <HeaderContainer>
    <HeaderControls />
    <HeaderSearchbar onSearch={onSearch} />
    <HeaderInfo user={user} />
  </HeaderContainer>
);

const SectionHeader = styled.h1`
  font-size: 2rem;
  color: #4f4f4f;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #4f4f4f;
  margin-bottom: 15px;
  font-weight: 500;
`;

const HalfSectionCardContainer = styled.div`
  img {
    max-height: 317px;
  }
`;

const HalfSectionCardDescription = styled.p`
  color: #acacac;
  margin-top: 0;
`;

const HalfSectionAuthor = styled.p`
  text-align: right;
  margin-top: 0;

  & > span {
    font-weight: bold;
    color: #4f4f4f;
  }
`;

const HalfSectionCard = ({ src, title, description, author }) => {
  return (
    <HalfSectionCardContainer>
      <StyledImg src="https://picsum.photos/id/237/536/317" alt="src" />
      <SectionTitle>
        Sample Title for Design Purposes {/* title */}
      </SectionTitle>
      <HalfSectionCardDescription>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet
        cumque, harum, aspernatur, eaque quam enim aut voluptas placeat
        inventore temporibus alias dicta iusto? Repudiandae labore eveniet nihil
        qui est?{/* description */}
      </HalfSectionCardDescription>
      <HalfSectionAuthor>
        By <span>Dio Brando {/* author */}</span>
      </HalfSectionAuthor>
    </HalfSectionCardContainer>
  );
};

export const SectionFeaturedProjects = ({
  src,
  title,
  description,
  author,
  children,
}) => {
  return (
    <section>
      <SectionHeader>Featured Projects</SectionHeader>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <HalfSectionCard
            src={src}
            title={title}
            description={description}
            author={author}
          />
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
      </Grid>
    </section>
  );
};

export const SectionCategory = ({ category, data }) => (
  <section style={{ marginBottom: '20px' }}>
    <SectionHeader>{category}</SectionHeader>
    <Grid container spacing={3}>
      {data.map((d, idx) => (
        <Grid item xs={4} key={d.title + idx}>
          <CardColumn
            title={d.title}
            description={d.description}
            current={d.current}
            goal={d.goal}
            daysLeft={d.daysLeft}
            src={d.src}
          />
        </Grid>
      ))}
    </Grid>
  </section>
);
