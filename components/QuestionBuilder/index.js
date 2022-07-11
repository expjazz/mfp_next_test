import React from 'react';
// import dompurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { QuestionWrapper, QuestionTag } from './styled';
import { isEmpty } from 'src/utils/dataStructures';


const QuestionBuilder = ({ questionsList }) => {
  return (
    <React.Fragment>
      {questionsList.map(question => (
        <React.Fragment key={question.key}>
          {!isEmpty(question.question) && (
            <QuestionWrapper key={question.key} className="questionWrapper">
              <FontAwesomeIcon className="tick" icon={faCheck} />{' '}
              <QuestionTag
                className={`question ${question.className}`}
                dangerouslySetInnerHTML={{
                  __html: question.question,
                }}
              ></QuestionTag>
            </QuestionWrapper>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default QuestionBuilder;
