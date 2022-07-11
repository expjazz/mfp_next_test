import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import FundStyled from './styled';

const FundProgress = ({ goal, acheived, goalText, classes, ...props }) => {
  const { t } = useTranslation();
  const [progress, updateProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      updateProgress((acheived / goal) * 100)
    }, 10)
  }, [goal, acheived])

  return (
    <FundStyled className={classes.root}>
      <FundStyled.FundProgress className={classes.progress} progress={progress} />
      {
        goalText &&
          <FundStyled.GoalDisplay className={classes.goalRoot}>
            {t('common.goal')}: {goalText}
          </FundStyled.GoalDisplay>
      }
    </FundStyled>
  )
}

FundProgress.defaultProps = {
  goal: 0,
  acheived: 0,
  goalText: '',
  classes: {},
}

FundProgress.propTypes = {
  goal: PropTypes.number,
  acheived: PropTypes.number,
  goalText: PropTypes.string,
  classes: PropTypes.object,
}

export default FundProgress;
