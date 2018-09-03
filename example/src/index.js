// @flow
import * as React from "react";
import { debounce } from "lodash";
import ReactDOM from "react-dom";
import Editor from "../../src";

const element = document.getElementById("main");
const savedText = localStorage.getItem("saved");
const exampleText = `
# Welcome

This is example content. It is persisted between reloads in localStorage.
`;
const defaultValue = savedText || exampleText;
class Example extends React.Component<*, { readOnly: boolean, dark: boolean }> {
  blockToolbarPlugins = [
    {
      blockGenerator: () => {
        return { type: "block-quote" };
      },
      icon: <span>></span>,
    },
  ];

  state = {
    readOnly: false,
    dark: false,
  };

  handleToggleReadOnly = () => {
    this.setState({ readOnly: !this.state.readOnly });
  };

  handleToggleDark = () => {
    this.setState({ dark: !this.state.dark });
  };

  handleChange = debounce(value => {
    localStorage.setItem("saved", value());
  }, 250);

  render() {
    return (
      <div style={{ marginTop: "60px" }}>
        <p>
          <button type="button" onClick={this.handleToggleReadOnly}>
            {this.state.readOnly ? "Editable" : "Read Only"}
          </button>
          <button type="button" onClick={this.handleToggleDark}>
            {this.state.dark ? "Light Theme" : "Dark Theme"}
          </button>
        </p>
        <Editor
          readOnly={this.state.readOnly}
          defaultValue={defaultValue}
          blockToolbarPlugins={this.blockToolbarPlugins}
          onSave={options => console.log("Save triggered", options)}
          onCancel={() => console.log("Cancel triggered")}
          onChange={this.handleChange}
          onClickLink={href => console.log("Clicked link: ", href)}
          onShowToast={message => window.alert(message)}
          onSearchLink={async term => {
            console.log("Searched link: ", term);
            return [
              {
                title: term,
                url: "localhost",
              },
            ];
          }}
          uploadImage={async file => {
            console.log("File upload triggered: ", file);
            return "";
          }}
          dark={this.state.dark}
          autoFocus
          toc
        />
      </div>
    );
  }
}

if (element) {
  ReactDOM.render(<Example />, element);
}
