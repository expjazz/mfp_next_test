import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { getTimeString } from 'src/utils/timeUtils';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { Description } from 'styles/TextStyled';
import Loader from 'components/Loader';
// import { markCourse } from 'services/userManagement';
import CourseItem from './components/CourseItem';
import TaskItem from './components/TaskItem';
// import { fetchCourses, updateCourses } from '../../actions/getCourses';
import {
  Container,
  Wrap,
  PlayList,
  PlayListItem,
  ListHeading,
  Banner,
  ListDescription,
  ModalWrap,
  ListKicker,
} from './styled';
import { useRouter } from 'next/router';
import { useFetchCourses } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { markCourse, updateCourses } from 'src/services/myfanpark/celebActions';
import { useQueryClient } from 'react-query';

const Playbook = (props) => {
  const { t } = useTranslation();
  // courses: state.marketing.courses.data,
  // courseLoading: state.marketing.courses.loading,
  // userDetails: state.userDetails.settings_userDetails,
  const [_, dispatch] = useGeneral()
  const queryClient = useQueryClient()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const { data: userData } = useFetchLoggedUser()
  const userDetails = userData?.user
  const { data: coursesData, isLoading: courseLoading } = useFetchCourses()
  const courses = coursesData?.data
  const starName = getShortName(userDetails.nick_name, userDetails.first_name);
  const router = useRouter()
  const [currentCourse, updateCourse] = useState(null);
  const [currentTask, updateTask] = useState(null);

  const onCourseClick = course => () => {
    router.push({...router, query: {
      ...router.query,
      course: course.id
    }},
    undefined,
    { shallow: true });
  };

  const setCourse = courseVal => () => {
    updateCourse(courseVal);
    if (!courseVal) {
      props.history.goBack();
    }
  };

  const setTask = () => (task = null) => {
    updateTask(task);
  };

  const markCourseDet = async (task, goNext) => {
    try {
      loaderAction(true);
      const resp = await markCourse({
        courseId: currentCourse.id,
        taskId: task.id,
        done: !task.done,
      });
      if (resp.success && resp.data) {
        if (goNext) {
          const currentSection = currentCourse.sections;
          const unmarkedTasks = currentSection.filter(
            taskItem => !taskItem.done && taskItem.id !== task.id,
          );
          if (unmarkedTasks.length) {
            setTask()(unmarkedTasks[0]);
          } else {
            setTask()(null);
          }
        } else {
          setTask()(null);
        }
        updateCourses(currentCourse.id, resp.data, coursesData?.data, queryClient);
      }
    } catch (exception) {
      const errormsg =
        exception &&
        exception.response &&
        exception.response.data &&
        exception.response.data.error
          ? exception.response.data.error.message
          : t('common.failed_to_mark_course');
      updateToast(dispatch, {
        value: true,
        message: errormsg,
        variant: 'error',
      });
    }
    loaderAction(false);
  };

  const getCountStats = course => {
    const totalCount = course.sections ? course.sections.length : 0;
    const currentCount = course.sections
      ? course.sections.filter(task => task.done).length
      : 0;
    return `${currentCount}/${totalCount}`;
  };

  const renderCourses = () => {
    return courses.map(course => (
      <PlayListItem key={course.id} onClick={onCourseClick(course)}>
        <ListKicker>{t('common.strategyCap')}</ListKicker>
        <ListHeading>{course.title}</ListHeading>
        <ListDescription>{course.description}</ListDescription>
        <ListDescription bold>
          {getCountStats(course)} | {getTimeString(course.completion_time)}
        </ListDescription>
      </PlayListItem>
    ));
  };

  useEffect(() => {
    const { course } = router.query
    const selectedCourse = courses.find(courseItem => courseItem.id === course);
    if (selectedCourse) {
      props.modalBackHandler(false);
      setCourse(selectedCourse)();
    }
  }, [router.query, courses]);

  // useEffect(() => {
  //   fetchStarCourses();
  // }, []);

  if (currentCourse) {
    return (
      <Container>
        <ModalWrap>
          <Scrollbars
            autoHide
            className="scroll-root"
            renderView={scrollProps => (
              <div {...scrollProps} id="inner-scroll" />
            )}
          >
            <Wrap>
              {currentTask ? (
                <TaskItem
                  goBack={setTask()}
                  task={currentTask}
                  markCourse={markCourseDet}
                />
              ) : (
                <CourseItem
                  starName={starName}
                  goBack={setCourse(null)}
                  setTask={setTask()}
                  markCourse={markCourseDet}
                  course={currentCourse}
                />
              )}
            </Wrap>
          </Scrollbars>
        </ModalWrap>
      </Container>
    );
  }

  return (
    <Container>
      <Scrollbars
        autoHide
        className="scroll-root"
        renderView={scrollProps => <div {...scrollProps} id="inner-scroll" />}
      >
        <Wrap>
          <Banner src="/images/playbook.png" alt="playbook-image" />
          <Description>{t('common.playbood_desc', { starName })}</Description>
          <PlayList>{renderCourses()}</PlayList>
          {courseLoading && <Loader />}
        </Wrap>
      </Scrollbars>
    </Container>
  );
};

Playbook.propTypes = {
  courses: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  modalBackHandler: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateCourseData: PropTypes.func.isRequired,
  fetchStarCourses: PropTypes.func.isRequired,
};

Playbook.defaultProps = {};

const mapStates = state => ({
  courses: state.marketing.courses.data,
  courseLoading: state.marketing.courses.loading,
  userDetails: state.userDetails.settings_userDetails,
});

function mapDispatch(dispatch) {
  return {
    fetchStarCourses: () => dispatch(fetchCourses()),
    updateCourseData: (courseId, updatedTask) =>
      dispatch(updateCourses(courseId, updatedTask)),
  };
}

export default Playbook
