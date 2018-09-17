import React from "react";

function ServiceCard(props) {
  return (
    <div className="service-card" tabIndex="0">
      <img src={props.item.icon} className="service-card__img" />
      <h3 className="service-card__title">{props.item.title}</h3>
    </div>
  );
}

export default function ServiceList(props) {
  return props.cards.map((item, i) => <ServiceCard item={item} key={item.id} i={i} />);
}
