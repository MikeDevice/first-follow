import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './section.scss';

function Section({title, children, className}) {
  return (
    <section className={classNames(className, 'section')}>
      {title && <h2 className="section__title">{title}</h2>}
      <div className="section__content">
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

Section.defaultProps = {
  title: null,
  className: null,
};

export default Section;
