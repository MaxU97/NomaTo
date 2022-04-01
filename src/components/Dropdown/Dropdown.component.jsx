import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isListOpen: false,
      headerTitle: this.props.title,
    };
  }

  render() {
    const { isListOpen, headerTitle } = this.state;
    const { list } = this.props;

    return (
      <div className="dd-wrapper">
        <button
          type="button"
          className="dropdown-header"
          onClick={this.toggleList}
        >
          <div className="dropdown-header-title">{headerTitle}</div>
          {isListOpen ? (
            <FontAwesome name="angle-up" size="2x" />
          ) : (
            <FontAwesome name="angle-down" size="2x" />
          )}
        </button>
        {isListOpen && (
          <div role="list" className="dropdown-list">
            {list.map((item) => (
              <button
                type="button"
                className="dropdown-list-item"
                key={item.id}
                onClick={() => this.selectItem(item)}
              >
                {item.title} {item.selected && <FontAwesome name="check" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  toggleList = () => {
    this.setState((prevState) => ({
      isListOpen: !prevState.isListOpen,
    }));
  };

  selectItem = (item) => {
    const { resetThenSet } = this.props;
    const { title, id, key } = item;

    this.setState(
      {
        headerTitle: title,
        isListOpen: false,
      },
      () => resetThenSet(id, key)
    );
  };
}

export default Dropdown;
