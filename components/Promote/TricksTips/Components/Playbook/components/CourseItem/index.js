import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import BackHeader from 'components/BackHeader';
import Checkbox from 'components/Checkbox';
import dompurify from 'dompurify';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { getTimeString } from 'src/utils/timeUtils';
import { Heading, Description } from 'styles/TextStyled';
import { SmallHeading } from '../../styled';
import {
  Layout,
  TaskOverview,
  ListWrapper,
  ListItem,
  TaskHeading,
} from './styled';

const CourseItem = ({ course, goBack, setTask, starName, markCourse }) => {
  const { t } = useTranslation();
  const isGrid = course.view_type === 2;
  const onTaskClick = task => () => {
    setTask(task);
  };

  const courseMark = task => () => {
    markCourse(task);
  };

  const getRemainingTask = () => {
    if (course.sections) {
      return course.sections.filter(task => !task.done).length;
    }
    return 0;
  };

  const onImageClick = task => event => {
    if (isGrid) {
      courseMark(task)();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const renderTasks = () => {
    return (
      course.sections &&
      course.sections.map(task => (
        <ListItem
          tabIndex="0"
          grid={isGrid}
          taskDone={task.done}
          hasImage={task.image}
          onClick={isGrid ? onTaskClick(task) : () => {}}
        >
          {!isGrid && (
            <Checkbox
              disabled={task.done}
              onChange={courseMark(task)}
              checked={task.done}
            />
          )}
          <article
            role="presentation"
            className="task-content"
            onClick={!isGrid ? onTaskClick(task) : () => {}}
          >
            <span
              role="presentation"
              className="task-image-wrapper"
              onClick={onImageClick(task)}
            >
              {isGrid && (
                <Checkbox
                  disabled={task.done}
                  onChange={courseMark(task)}
                  checked={task.done}
                />
              )}
              {task.image ? (
                <img className="task-image" src={task.image} alt={task.title} />
              ) : null}
            </span>
            <article role="presentation" className="task-text">
              <TaskHeading>{task.title}</TaskHeading>
              <span className="task-description">
                <HTMLEllipsis
                  unsafeHTML={dompurify.sanitize(task.processed_contents)}
                  maxLine="2"
                  ellipsis="..."
                  basedOn="letters"
                />
              </span>
            </article>
          </article>
        </ListItem>
      ))
    );
  };

  return (
    <Layout isGrid={isGrid}>
      <BackHeader backHandler={goBack} label={t('common.playbook')} noHelp />
      <Heading className="sub-head">{course.title}</Heading>
      <Description className="time-description">
        {getTimeString(course.completion_time)}
      </Description>
      <TaskOverview>
        <span className="task-count">{getRemainingTask()}</span>
        <span className="description">{t('common.course_desc', { starName })}</span>
      </TaskOverview>
      <SmallHeading>{course.description}</SmallHeading>
      <ListWrapper grid={isGrid}>{renderTasks()}</ListWrapper>
    </Layout>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
  markCourse: PropTypes.func.isRequired,
  starName: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  setTask: PropTypes.func.isRequired,
};

export default CourseItem;
