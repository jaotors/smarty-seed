import React from 'react';
import styled from 'styled-components';

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

const ProgressBar = ({ percentage }) => (
  <ProgressTrack>
    <ProgressCurrent percentage={percentage} />
  </ProgressTrack>
);

export default ProgressBar;
