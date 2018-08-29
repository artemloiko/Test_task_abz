import React from "react";
import swal from "sweetalert2";

function ServiceCard(props) {
  return (
    <div className="service-card">
      <img src={props.item.icon} className="service-card__img" />
      <h3 className="service-card__title">{props.item.title}</h3>
    </div>
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
  }
  componentDidMount() {
    // token
    //a9c521539b48f40732161c9b694176afb2e41db8
    const url = "http://504080.com/api/v1/services/categories";
    const getOption = {
      method: "GET",
      headers: {
        Authorization: "a9c521539b48f40732161c9b694176afb2e41db"
      }
    };

    fetch(url, getOption)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({ data: data.data, success: data.success });
        } else {
          this.setState({ error: data.error, success: data.success });
        }
      })
      .catch(error => {
        console.log("fetch error", error);
      });
  }
  componentDidUpdate() {
    if (!this.state.success) {
      // To prevent jumping header due to scrollbar
      const header = document.querySelector(".header-container");
      // before open modal padding instead scrollbar
      header.style.paddingRight = "17px";
      // after start closing, setTimout for function which delete padding  after animation
      const clearHeader = () => {
        setTimeout(() => {
          header.style.paddingRight = 0;
        }, 140);
      };

      swal({
        type: "error",
        title: this.state.error.message,
        text: this.state.error.description,
        onClose: clearHeader,
        confirmButtonColor: "#87b448"
      });
    }
  }
  render() {
    let cards, error;
    if (this.state.success) {
      cards = this.state.data.map(item => (
        <ServiceCard item={item} key={item.id} />
      ));
    } else {
      error = (
        <div className="error">
          <h3>Oops...</h3>
          <p>We're sorry, but something went wrong.</p>
        </div>
      );
    }
    return <React.Fragment>{cards ? cards : error}</React.Fragment>;
  }
}
export default ServiceList;
