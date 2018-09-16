import React from "react";
import swal from "sweetalert2";

function ServiceCard(props) {
  return (
    <div className="service-card" tabIndex={props.i}>
      <img src={props.item.icon} className="service-card__img" />
      <h3 className="service-card__title">{props.item.title}</h3>
    </div>
  );
}

function ErrorFetch(props) {
  return (
    <div className="error">
      <h3>Oops...</h3>
      <p>We're sorry, but something went wrong.</p>
    </div>
  );
}

function ErrorNotFound(props) {
  return (
    <React.Fragment>
      <ServiceCard item={{ icon: "./img/notFound.png", title: "" }} />
      <h3 className="notFound">{`Search for ${props.companyName} found no results`}</h3>
    </React.Fragment>
  );
}

class ServiceList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: true,
      data: [],
      error: {}
    };
    this.initData = {};
  }
  componentDidMount() {
    const url = "http://504080.com/api/v1/services/categories";
    const options = {
      method: "GET",
      headers: {
        Authorization: "13d0630ae29a48249796803315658784fdcf83d4"
      }
    };

    fetch(url, options)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.success) {
          this.setState({ data: data.data, success: data.success });
          this.initData = Object.assign({}, data.data);
        } else {
          this.setState({ error: data.error, success: data.success });
        }
      })
      .catch(error => {
        swal({
          type: "error",
          title: "Error",
          text: "Sorry, the server did not respond.",
          confirmButtonColor: "#87b448"
        });
        console.log("fetch error", error);
      });
  }
  componentDidUpdate() {
    if (!this.state.success) {
      swal({
        type: "error",
        title: this.state.error.message,
        text: this.state.error.description,
        onClose: preventHeaderShift(),
        confirmButtonColor: "#87b448"
      });
    }
  }
  render() {
    let cards;
    let error = <ErrorFetch />;
    if (this.state.success) {
      if (this.state.data) {
        cards = this.state.data.map((item, i) => <ServiceCard item={item} key={item.id} i={i} />);
      } else {
        error = <ErrorNotFound companyName="Companeeeee" />;
      }
    }
    return <React.Fragment>{cards ? cards : error}</React.Fragment>;
  }
}

export default ServiceList;

const scrollWidth = (function() {
  var div = document.createElement("div");

  div.style.overflowY = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.visibility = "hidden";

  document.body.appendChild(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);

  return scrollWidth;
})();
function preventHeaderShift() {
  // To prevent jumping header due to scrollbar
  const header = document.querySelector(".header-container");
  // before open modal padding instead scrollbar
  header.style.paddingRight = "17px";
  // after start closing, setTimout for function which delete padding  after animation
  return () => {
    setTimeout(() => {
      header.style.paddingRight = 0;
    }, 140);
  };
}
