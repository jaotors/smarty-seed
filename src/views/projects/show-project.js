import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AppHeader from '../../components/header';
import { navigate } from '@reach/router';
import {
  ShowProjectContainer,
  ProjectInfo,
  ShowProjDesc,
} from './show-project-styles';
import { getUser, getProject } from '../../api';
import StyledImg from '../../components/image';

const ShowProject = ({ projectId }) => {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        const { data } = await getUser(token);
        setUser(data);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProject(projectId);
        console.log('project data', data);
        setProject(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [projectId]);

  return (
    <ShowProjectContainer>
      <AppHeader user={user} />
      {project && (
        <Container style={{ paddingTop: '90px' }}>
          <section style={{ marginTop: '48px' }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <StyledImg
                  style={{ maxHeight: '318px' }}
                  src={project.image_url}
                />
              </Grid>
              <Grid item xs={6}>
                <ProjectInfo project={project} />
              </Grid>
            </Grid>
            <ShowProjDesc description={project.description} />
          </section>
        </Container>
      )}
    </ShowProjectContainer>
  );
};

export default ShowProject;
