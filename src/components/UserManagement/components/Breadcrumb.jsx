import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ path }) => {
  return (
    <div className="breadcrumb-container">
      {path.map((item, index) => (
        <React.Fragment key={index}>
          <span 
            className={`breadcrumb-item ${item.current ? 'current' : ''}`}
          >
            {item.url && !item.current ? (
              <Link to={item.url}>{item.name}</Link>
            ) : (
              item.name
            )}
          </span>
          {index < path.length - 1 && (
            <span className="breadcrumb-separator">›</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;