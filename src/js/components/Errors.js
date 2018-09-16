import React from "react";

export function ErrorFetch(props) {
  return (
    <div className="error">
      <h3>Oops...</h3>
      <p>We're sorry, but something went wrong.</p>
    </div>
  );
}

export function ErrorNotFound(props) {
  return (
    <React.Fragment>
      <div className="service-card" tabIndex={props.i}>
        <img src="./img/notFound.png" className="service-card__img" />
      </div>
      <h3 className="notFound">{`Search for ${props.companyName} found no results`}</h3>
    </React.Fragment>
  );
}
