import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, navigate } from "./Router";
import _ from "lodash";
import { Row } from "./Flexbox";

const Select = styled.select`
  width: 3.5rem;
  padding: 0;
  text-align: center;
`;

const PageSizeSelect = ({ pageSizes, pageSize, onChange }) => (
  <Select onChange={onChange} defaultValue={pageSize}>
    {pageSizes.map((size, i) => (
      <option key={i} value={size}>
        {size}
      </option>
    ))}
  </Select>
);

const PageLink = ({ link, disabled, children }) => (
  <li>
    {disabled ? <span>{children}</span> : <Link to={link}>{children}</Link>}
  </li>
);

const Pagination = styled(Row)`
  margin-top: 1rem;
  ul {
    display: inline-block;
    padding-left: 0;
    li {
      display: inline;
    }
    li > a:hover {
      color: #23527c;
      background-color: #eee;
    }
    li.active > span {
      color: #676a6c;
      background-color: #f4f4f4;
    }
    li > a,
    li > span {
      border: 1px solid #ddd;
      padding: 0.25rem 0.5rem;
      color: #676a6c;
    }
    li > span {
      cursor: default;
      color: #ccc;
    }
  }
`;

const visibleRange = (current, total, radius) => {
  let pageFrom = current - radius;
  let pageTo = current + radius;

  if (pageTo > total) {
    pageFrom -= pageTo - total;
    pageTo = total;
  }

  if (pageFrom < 1) {
    pageTo += 1 - pageFrom;
    pageFrom = 1;
    pageTo = Math.min(pageTo, total);
  }

  let middle = _.range(pageFrom, pageTo + 1);

  let left = pageFrom > 4 ? [1, 2, "lgap"] : _.range(1, pageFrom + 1);

  let right =
    pageTo < total - 3
      ? ["rgap", total - 1, total]
      : _.range(pageTo, total + 1);

  return _.union(left, middle, right);
};

export default class Pager extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number,
    autoHide: PropTypes.bool,
    visiblePages: PropTypes.number,
    titles: PropTypes.object,
    pageSize: PropTypes.number,
    pageSizes: PropTypes.array,
    location: PropTypes.object,
    query: PropTypes.object,
  };

  static defaultProps = {
    visiblePages: 9,
    autoHide: false,
    current: 1,
    pageSize: 50,
    pageSizes: [20, 50, 100],
    titles: {
      prev: "上一页",
      next: "下一页",
    },
  };

  state = {
    current: this.props.query.page
      ? _.toNumber(this.props.query.page)
      : this.props.current,
    pageSize: this.props.query.size
      ? _.toNumber(this.props.query.size)
      : this.props.pageSize,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.query.page
        ? _.toNumber(nextProps.query.page)
        : nextProps.current,
      pageSize: nextProps.query.size
        ? _.toNumber(nextProps.query.size)
        : nextProps.pageSize,
    });
  }

  createPageLink = page => {
    let query = {
      ...this.props.query,
      page,
      size: this.state.pageSize,
    };
    return (
      this.props.location.pathname +
      "?" +
      Object.entries(query)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&")
    );
  };

  pageSizeChanged = event => {
    this.setState(
      {
        current: 1,
        pageSize: _.toNumber(event.target.value),
      },
      () => {
        navigate(this.createPageLink(1));
      }
    );
  };

  render() {
    const { autoHide, total, titles } = this.props;
    const { pageSize, current } = this.state;
    if (autoHide && total <= pageSize) {
      return null;
    }
    const totalPages = Math.ceil(total / pageSize);
    const radius = Math.floor(this.props.visiblePages / 2);

    const pageSizeSelect = (
      <PageSizeSelect
        onChange={this.pageSizeChanged}
        pageSize={pageSize}
        pageSizes={this.props.pageSizes}
      />
    );

    return (
      <Pagination space="between" align="right">
        <span>
          每页{pageSizeSelect}条，共{total}条
        </span>
        {total > pageSize && (
          <ul>
            <PageLink
              key="prev-page"
              disabled={current - 1 < 1}
              link={this.createPageLink(current - 1)}
            >
              {titles["prev"]}
            </PageLink>

            {visibleRange(current, totalPages, radius).map(page => {
              if (page === "lgap" || page === "rgap") {
                return (
                  <li key={page}>
                    <em className="gap">…</em>
                  </li>
                );
              } else if (page === current) {
                return (
                  <li key={page} className="active">
                    <span>{page}</span>
                  </li>
                );
              } else {
                return (
                  <PageLink key={page} link={this.createPageLink(page)}>
                    {page}
                  </PageLink>
                );
              }
            })}

            <PageLink
              key="next-page"
              disabled={current + 1 > totalPages}
              link={this.createPageLink(current + 1)}
            >
              {titles["next"]}
            </PageLink>
          </ul>
        )}
      </Pagination>
    );
  }
}
