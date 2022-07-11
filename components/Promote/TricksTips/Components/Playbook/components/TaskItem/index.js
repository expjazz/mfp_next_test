import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import BackHeader from 'components/BackHeader';
import Button from 'components/SecondaryButton';
import { Heading } from 'styles/TextStyled';
import { Layout, ButtonWrapper, ContentWrapper } from './styled';
import { getRedirectURL } from 'customHooks/domUtils';

const TaskItem = ({goBack, task, markCourse}) => {
  const { t } = useTranslation();
  const routeToUrl = (url) => () => {
    window.open(getRedirectURL(url), '_blank');
  }

  const onGoBack = () => {
    goBack()
  }

  const onCourseMark = () => {
    markCourse(task, true);
  }

  return (
    <Layout>
      <BackHeader backHandler={onGoBack} label={t('common.list')} noHelp/>
      <Heading className="sub-head">{task.title}</Heading>
      <ContentWrapper
        dangerouslySetInnerHTML={{
          __html: task.processed_contents,
        }}
      />
      <ButtonWrapper>
        {
          task.main_button_name ?
            <Button className='btn' onClick={routeToUrl(task.main_button_link)}>
              {task.main_button_name}
            </Button>
          : null
        }
        {
          task.next_button_name ?
            <Button
              className='btn'
              disabled={task.done}
              onClick={onCourseMark}
            >
              {task.next_button_name}
            </Button>
          : null
        }
      </ButtonWrapper>
    </Layout>
  )
}

TaskItem.defaultProps = {
  task: {},
  goBack: () => {},
  markCourse: () => {},
}

TaskItem.propTypes = {
  goBack: PropTypes.func,
  task: PropTypes.object,
  markCourse: PropTypes.func,
}

export default TaskItem;
