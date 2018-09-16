import React from "react";
import swal from "sweetalert2";
import ServiceList from "./ServiceList";
import { ErrorFetch, ErrorNotFound } from "./Errors";

function Loader() {
  return (
    <div className="services-loader">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
}

export default class Services extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      success: true,
      data: [],
      error: {}
    };
    this.filter = "";
    this.initData;
  }

  componentDidMount() {
    //fetching data
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
          this.setState({
            data: data.data,
            success: data.success,
            loading: false
          });
          this.initData = [...data.data];
        } else {
          this.setState({
            error: data.error,
            success: data.success,
            loading: false
          });
        }
      })
      .catch(error => {
        this.setState({
          error: {
            message: "Network error",
            description: "Sorry, the server did not respond."
          },
          success: false
        });
        console.log("fetch error", error);
      });

    //enable search
    const search = document.querySelector(".search__field");
    search.addEventListener("input", () => {
      const filteredData = this.initData.filter(
        item => item.title.toLowerCase().indexOf(search.value.toLowerCase()) !== -1
      );
      this.filter = search.value;
      this.setState({ data: filteredData });
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
    if (this.state.loading) {
      return <Loader />;
    }

    if (this.state.success) {
      if (this.state.data[0]) {
        return <ServiceList cards={this.state.data} />;
      } else {
        return <ErrorNotFound companyName={this.filter} />;
      }
    }

    return <ErrorFetch />;
  }
}

//define scrollWidth for headerShift when modal is shown
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
