import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '../../components/input';
import ProgressBar from '../../components/progress-bar';
import { computePercent, formatDays, numberWithCommas } from '../../utils';

export const ShowProjectContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const StyledButton = styled(Button)`
  padding: 15px 40px;
  border-radius: 30px;
  color: #fff;
  background-color: #27ae60;
  margin-top: 10px;

  &:hover {
    background-color: #24a259;
  }
`;

const CategoryTitle = styled.p`
  margin: 0 0 5px;
  font-size: 1rem;
  color: #acacac;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 0 0 30px;
`;

const Header = ({ category, title }) => (
  <>
    <CategoryTitle>{category}</CategoryTitle>
    <Title>{title}</Title>
  </>
);

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  color: #fff;
  background-color: #27ae60;
  border-radius: 50%;
`;

const UserContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
`;

const UserInfo = ({ beneficiary }) => (
  <UserContainer>
    <Avatar />
    <div style={{ flexGrow: 1, marginLeft: '10px' }}>
      <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>
        {beneficiary}
      </p>
      <p style={{ margin: 0, fontSize: '1rem', color: '#acacac' }}>
        Manila, Philippines
      </p>
    </div>
  </UserContainer>
);

const OtherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ProjectInfo = ({ project, onShowModal }) => {
  const { title, category, current, goal, beneficiary, deadline } = project;
  const percentage = computePercent(current, goal);

  return (
    <>
      <Header title={title} category={category} />
      <UserInfo beneficiary={beneficiary} />
      <div style={{ fontSize: '1.1rem' }}>
        <OtherInfo>
          <div style={{ fontWeight: 600 }}>
            {numberWithCommas(current)}{' '}
            <span style={{ color: '#acacac', fontWeight: 'normal' }}>
              raised
            </span>
          </div>
        </OtherInfo>
        <div style={{ marginBottom: '10px' }}>
          <ProgressBar percentage={percentage} />
        </div>
        <OtherInfo>
          <div>
            <span style={{ fontWeight: 'bold' }}>{percentage}%</span> of{' '}
            <span style={{ color: '#7c7c7c' }}>
              {numberWithCommas(goal)} goal
            </span>
          </div>
          <div>
            {formatDays(deadline)}{' '}
            <span style={{ color: '#acacac' }}>days left</span>
          </div>
        </OtherInfo>
        <StyledButton onClick={onShowModal}>Donate</StyledButton>
      </div>
    </>
  );
};

export const ShowProjDesc = ({ description }) => (
  <div>
    <p
      style={{
        margin: '25px 0 5px',
        fontSize: '1rem',
        color: '#acacac',
      }}
    >
      Description
    </p>
    <p style={{ fontSize: '1.1rem', margin: 0 }}>{description}</p>
  </div>
);

const DonateInput = styled.div`
  & input {
    text-align: center;
    font-size: 2rem;
  }
`;

export const DonateModal = ({ id, isOpen, onClose, onClick }) => {
  const [donateAmount, setDonateAmount] = useState(0);
  return (
    <Dialog
      open={isOpen}
      maxWidth={'xs'}
      onClose={onClose}
      aria-labelledby="donate-modal"
      fullWidth={true}
    >
      <div style={{ padding: '30px' }}>
        <DialogTitle id="donate-modal-title" style={{ textAlign: 'center' }}>
          Donate to this Project
        </DialogTitle>
        <DialogContent>
          <DonateInput>
            <TextField
              value={donateAmount}
              onChange={e => setDonateAmount(e.target.value)}
              autoFocus
              margin="dense"
              id="donate-money"
              type="number"
              inputProps={{
                min: 0.01,
              }}
            />
          </DonateInput>
        </DialogContent>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <StyledButton
            style={{ marginTop: 0 }}
            onClick={async () => {
              await onClick(id, donateAmount);
              onClose();
            }}
          >
            Donate
          </StyledButton>
        </div>
      </div>
    </Dialog>
  );
};
