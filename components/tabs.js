import React from "react";

class Tabs extends React.Component {
  constructor(props) {
    super();
    this.state = {
      active: 0,
    };
  }

  select = (i) => {
    this.setState({ active: i });
    
  };

  renderTabs = () => {
    return React.Children.map(this.props.children, (item, i) => {
      if (i % 2 === 0) {
        let active = this.state.active === i ? "active_db_tab" : "";
        return (
          <button
            onClick={() => this.select(i)}
            className={`${active} ${this.props.tabClass}`}
          >
            <h6>{item}</h6>
          </button>
        );
      }
    });
  };
  renderContent() {
    return React.Children.map(this.props.children, (item, i) => {
      if (i - 1 === this.state.active) {
        return <div className="db_tab_content">{item}</div>;
      } else {
        return;
      }
    });
  }
  render() {
    return (
      <div className="db_tabs">
        <div className="db_tab_container">{this.renderTabs() } </div>
        <div className="db_tab_content_container">{this.renderContent()}</div>
      </div>
    );
  }
}
export default Tabs;
