import Container from '@material-ui/core/Container';
import React, { useEffect } from 'react';
import { cardrowdummydata, cardcolumndata } from '../../fixtures/card-fixtures';
import {
  DashboardContainer,
  DashboardHeader,
  SectionFeaturedProjects,
  SectionCategory,
} from './dashboard-styles';
import { getUser } from '../../api';
import { CardRow } from '../../components/card';

const Dashboard = () => {
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        const data = await getUser(token);
        console.log('data', data);
      } catch (error) {}
    })();
  }, []);

  return (
    <DashboardContainer>
      <DashboardHeader user={'email'} />
      <Container style={{ paddingTop: '90px' }}>
        <SectionFeaturedProjects>
          {cardrowdummydata.map((c, idx) => (
            <CardRow
              key={c.author + idx}
              src={c.src}
              title={c.title}
              percentage={c.percentage}
              goal={c.goal}
              author={c.author}
            />
          ))}
        </SectionFeaturedProjects>
        {cardcolumndata.map((data, idx) => (
          <SectionCategory
            key={data.category + idx}
            category={data.category}
            data={data.data}
          />
        ))}
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
