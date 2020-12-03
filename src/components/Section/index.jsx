import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './section.scss';

function Section({title, label, className, children}) {
  return (
    <section className={classNames(className, 'section')}>
      {title && (
        <div className="section__header">
          <h2 className="section__title">{title}</h2>
          {label && <p className="section__label">{label}</p>}
        </div>
      )}
      <div className="section__content">
        {children}
      </div>
    </section>
  );
}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

Section.defaultProps = {
  title: null,
  label: null,
  className: null,
};

export default Section;
