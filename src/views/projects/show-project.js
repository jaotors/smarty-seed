import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { navigate } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import * as Api from '../../api';
import AppHeader from '../../components/header';
import StyledImg from '../../components/image';
import {
  DonateModal,
  ProjectInfo,
  ShowProjDesc,
  ShowProjectContainer,
} from './show-project-styles';

const ShowProject = ({ projectId }) => {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const [openDonateModal, setOpenDonateModal] = useState(false);

  const onShowModal = useCallback(() => {
    if (user !== null) {
      setOpenDonateModal(true);
      return;
    }
    navigate('/login');
  }, [user]);

  const onDonate = async (id, amount) => {
    try {
      const token = localStorage.getItem('access_token');
      const { data } = await Api.redirectToPayments(token, {
        project_id: id,
        amount,
      });
      window.location.replace(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('access_token');
        const { data } = await Api.getUser(token);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Api.getProject(projectId);
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
        <>
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
                  <ProjectInfo
                    project={project}
                    onShowModal={() => onShowModal()}
                  />
                </Grid>
              </Grid>
              <ShowProjDesc description={project.description} />
            </section>
          </Container>
          <DonateModal
            id={project.id}
            isOpen={openDonateModal}
            onClick={onDonate}
            onClose={() => setOpenDonateModal(false)}
          />
        </>
      )}
    </ShowProjectContainer>
  );
};

export default ShowProject;
