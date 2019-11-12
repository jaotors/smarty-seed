import Container from '@material-ui/core/Container';
import React, { useState, useEffect } from 'react';
import {
  DashboardContainer,
  SectionFeaturedProjects,
  SectionCategory,
} from './dashboard-styles';
import { getUser, getAllProjects } from '../../api';
import { CardRow } from '../../components/card';
import AppHeader from '../../components/header';
import { navigate } from '@reach/router';

export const categoryMap = data => {
  const categories = data
    .map(d => d.category)
    .filter((val, idx, arr) => arr.indexOf(val) === idx);

  const dataWithCategory = categories.map(d => {
    return { category: d, data: data.filter(e => e.category === d) };
  });

  return dataWithCategory;
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [categoriesProj, setCategoriesProj] = useState([]);

  const onShowProject = projectId => {
    if (projectId === undefined) return;
    if (user && user.email) {
      navigate(`/projects/${projectId}`);
      return;
    }
    navigate('/login');
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        const { data } = await getUser(token);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllProjects();
        const transformedData = categoryMap(data);
        setCategoriesProj(transformedData);
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <DashboardContainer>
      <AppHeader user={user} />
      <Container style={{ paddingTop: '90px' }}>
        <SectionFeaturedProjects onClick={onShowProject} data={projects[0]}>
          {projects
            .filter((_, idx) => idx < 4)
            .map((c, idx) => (
              <CardRow
                id={c.id}
                onClick={onShowProject}
                key={c.beneficiary + idx}
                src={c.image_url}
                title={c.title}
                current={c.current}
                goal={c.goal}
                author={c.beneficiary}
              />
            ))}
        </SectionFeaturedProjects>
        {categoriesProj.map(({ category, data }, idx) => (
          <SectionCategory
            onClick={onShowProject}
            key={category + idx}
            category={category}
            data={data}
          />
        ))}
      </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
