import React from 'react';
import styled from 'styled-components';
import StyledImg from './image';
import { numberWithCommas } from '../utils';

const CardRowContainer = styled.div`
  display: flex;
  color: #4f4f4f;
  margin-bottom: 40px;

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

export const CardRow = ({ src, title, percentage, goal, author }) => (
  <CardRowContainer>
    <StyledImg src={src} alt="" />
    <CardRowContent>
      <CardRowTitle>{title}</CardRowTitle>
      <CardRowGoalContent>
        <p>
          <CardRowGoal>{percentage}</CardRowGoal> of {goal}
        </p>
        <CardRowAuthor>
          By <span>{author}</span>
        </CardRowAuthor>
      </CardRowGoalContent>
    </CardRowContent>
  </CardRowContainer>
);

const CardColumnTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const CardColumnDesc = styled.p`
  color: #acacac;
  margin: 0 0 20px;
`;

const CardColumnGoal = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 10px;
`;

const ProgressTrack = styled.div`
  position: relative;
  height: 6px;
  width: 100%;
  border-radius: 3px;
  background-color: #e0e0e0;
`;

const ProgressCurrent = styled.div`
  position: absolute;
  border-radius: 3px;
  width: ${props => props.percentage}%;
  background-color: #27ae60;
  top: 0;
  left: 0;
  bottom: 0;
`;

const CardColumnProgress = ({ percentage }) => (
  <ProgressTrack>
    <ProgressCurrent percentage={percentage} />
  </ProgressTrack>
);

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
}) => {
  // need formula of getting percentage
  const percentage = current >= goal ? 100 : (current / goal) * 100;

  return (
    <div>
      <StyledImg style={{ minHeight: '202px' }} src={src} alt="" />
      <div>
        <CardColumnTitle>{title}</CardColumnTitle>
        <CardColumnDesc>{description}</CardColumnDesc>
        <div>
          <CardColumnGoal>
            {numberWithCommas(current)} out of {numberWithCommas(goal)} raised
          </CardColumnGoal>
          <div>
            <CardColumnProgress percentage={percentage} />
          </div>
        </div>
        <CardColumnDays>{daysLeft} days left</CardColumnDays>
      </div>
    </div>
  );
};
