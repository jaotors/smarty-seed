import React from 'react';
import styled from 'styled-components';
import StyledImg from './image';
import ProgressBar from './progress-bar';
import { numberWithCommas, computePercent } from '../utils';

const CardRowContainer = styled.div`
  display: flex;
  color: #4f4f4f;
  margin-bottom: 40px;
  cursor: pointer;

  & > img {
    max-height: 82px;
    max-width: 159px;
  }
`;

const CardRowTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const CardRowContent = styled.div`
  margin-left: 15px;
  flex-grow: 1;
`;

const CardRowGoalContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;

  p {
    margin: 0;
  }
`;

const CardRowGoal = styled.span`
  color: #27ae60;
  font-weight: bold;
`;

const CardRowAuthor = styled.p`
  color: #acacac;
  & span {
    color: #4f4f4f;
    font-weight: bold;
  }
`;

export const CardRow = ({ onClick, id, src, title, current, goal, author }) => {
  const percentage = computePercent(current, goal);
  return (
    <CardRowContainer onClick={() => onClick(id)}>
      <StyledImg src={src} alt={title} />
      <CardRowContent>
        <CardRowTitle>{title}</CardRowTitle>
        <CardRowGoalContent>
          <p>
            <CardRowGoal>{percentage}%</CardRowGoal> of {goal} php
          </p>
          <CardRowAuthor>
            By <span>{author}</span>
          </CardRowAuthor>
        </CardRowGoalContent>
      </CardRowContent>
    </CardRowContainer>
  );
};

const CardColumnTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const CardColumnDesc = styled.p`
  color: #acacac;
  margin: 0 0 20px;
  max-height: 100px;
  min-height: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CardColumnGoal = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 10px;
`;

const CardColumnDays = styled.div`
  text-align: right;
  color: #acacac;
  margin: 10px 0;
`;

export const CardColumn = ({
  src,
  title,
  description,
  current,
  goal,
  daysLeft,
  onClick,
  id,
}) => {
  // need formula of getting percentage
  const percentage = computePercent(current, goal);

  return (
    <div style={{ cursor: 'pointer' }} onClick={() => onClick(id)}>
      <StyledImg style={{ maxHeight: '202px' }} src={src} alt={title} />
      <div>
        <CardColumnTitle>{title}</CardColumnTitle>
        <CardColumnDesc>{description}</CardColumnDesc>
        <div>
          <CardColumnGoal>
            {numberWithCommas(current)} out of {numberWithCommas(goal)} raised
          </CardColumnGoal>
          <div>
            <ProgressBar percentage={percentage} />
          </div>
        </div>
        <CardColumnDays>{daysLeft} days left</CardColumnDays>
      </div>
    </div>
  );
};
