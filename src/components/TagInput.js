import React from "react";
import { Tag, Input, Tooltip, Icon } from "antd";

export default class TagInput extends React.Component {
  state = {
    tags: this.props.formData[this.props.name] || [],
    inputVisible: false,
    inputValue: "",
  };

  handleClose = async removedTag => {
    if (this.props.onRemove) {
      const result = await this.props.onRemove(removedTag);
      if (result === false) {
        return;
      }
    }
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    this.props.onChange && this.props.onChange(this.props.name, tags);
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value.trim() });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: "",
    });
    this.props.onChange && this.props.onChange(this.props.name, tags);
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { style } = this.props;
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div style={style}>
        {tags.map(tag => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} onClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: "#fff", borderStyle: "dashed" }}>
            <Icon type="plus" /> {this.props.newText || "新增标签"}
          </Tag>
        )}
      </div>
    );
  }
}
