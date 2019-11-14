import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { navigate } from '@reach/router';
import React, { useCallback, useEffect, useState } from 'react';
import * as Api from '../../api';
import AppHeader from '../../components/header';
import StyledImg from '../../components/image';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import {
  DonateModal,
  ProjectInfo,
  ShowProjDesc,
  ShowProjectContainer,
} from './show-project-styles';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWith: 300,
    display: 'inline-block',
    margin: '20px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ShowProject = ({ projectId }) => {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);
  const [openDonateModal, setOpenDonateModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const classes = useStyles();

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
      setErrorMessage(error.errorDetails.error[0]);
    }
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
              <p
                style={{
                  margin: '25px 0 5px',
                  fontSize: '1rem',
                  color: '#acacac',
                }}
              >
                Pledges
              </p>
              {project.pledges.map((p, idx) => (
                <Card key={'card' + idx} className={classes.card}>
                  <CardContent>
                    <h2>{p.user.first_name + ' ' + p.user.last_name}</h2>
                    <h4>PHP {p.amount.toFixed(2)}</h4>
                  </CardContent>
                </Card>
              ))}
            </section>
            <p style={{ color: 'red' }}>{errorMessage}</p>
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
