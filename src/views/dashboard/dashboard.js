import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { cardrowdummydata, cardcolumndata } from '../../fixtures/card-fixtures';
import {
  DashboardContainer,
  DashboardHeader,
  SectionFeaturedProjects,
  SectionCategory,
} from './dashboard-styles';
import { CardRow } from '../../components/card';

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardHeader />
      <Container style={{ paddingTop: '90px' }}>
        <SectionFeaturedProjects>
          {cardrowdummydata.map(c => (
            <CardRow
              src={c.src}
              title={c.title}
              percentage={c.percentage}
              goal={c.goal}
              author={c.author}
            />
          ))}
        </SectionFeaturedProjects>
        {cardcolumndata.map(data => (
          <SectionCategory category={data.category} data={data.data} />
        ))}
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
