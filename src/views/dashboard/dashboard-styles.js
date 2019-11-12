import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import StyledImg from '../../components/image';
import { CardColumn } from '../../components/card';
import { formatDays } from '../../utils';

export const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

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
  cursor: pointer;
  img {
    max-height: 318px;
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

const defaultDesc = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed eveniet
cumque, harum, aspernatur, eaque quam enim aut voluptas placeat
inventore temporibus alias dicta iusto? Repudiandae labore eveniet nihil
qui est?`;

const HalfSectionCard = ({
  src = 'https://picsum.photos/id/237/536/317',
  title = 'Sample Title for Design Purposes',
  description = defaultDesc,
  author = 'Dio Brando',
  id,
  onClick,
}) => {
  return (
    <HalfSectionCardContainer onClick={() => onClick(id)}>
      <StyledImg src={src} alt={title} />
      <SectionTitle>{title}</SectionTitle>
      <HalfSectionCardDescription>{description}</HalfSectionCardDescription>
      <HalfSectionAuthor>
        By <span>{author}</span>
      </HalfSectionAuthor>
    </HalfSectionCardContainer>
  );
};

export const SectionFeaturedProjects = ({ children, data, onClick }) => {
  return (
    <section>
      <SectionHeader>Featured Projects</SectionHeader>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <HalfSectionCard
            onClick={onClick}
            id={data && data.id}
            src={data && data.image_url}
            title={data && data.title}
            description={data && data.description}
            author={data && data.beneficiary}
          />
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
      </Grid>
    </section>
  );
};

export const SectionCategory = ({ category, data, onClick }) => {
  return (
    <section style={{ marginBottom: '20px' }}>
      <SectionHeader>{category}</SectionHeader>
      <Grid container spacing={3}>
        {data.map((d, idx) => (
          <Grid item xs={4} key={d.title + idx}>
            <CardColumn
              onClick={onClick}
              id={d.id}
              title={d.title}
              description={d.description}
              current={d.current}
              goal={d.goal}
              daysLeft={formatDays(d.deadline)}
              src={d.image_url}
            />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};
