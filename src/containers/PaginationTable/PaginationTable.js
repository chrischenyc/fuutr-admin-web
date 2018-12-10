import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Pagination, PaginationItem, PaginationLink, Input, Row, Col,
} from 'reactstrap';

class PaginationTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      search: '',
    };

    this.handlePrevPage = this.handlePrevPage.bind(this);
    this.handleNextPage = this.handleNextPage.bind(this);
    this.handleSelectPage = this.handleSelectPage.bind(this);
  }

  componentDidMount() {
    const { page, search } = this.state;
    const { loadItemsForPage } = this.props;

    loadItemsForPage(page, search);
  }

  handlePrevPage() {
    const { page, search } = this.state;
    const { loadItemsForPage } = this.props;

    if (page > 0) {
      this.setState({ page: page - 1 });
      loadItemsForPage(page - 1, search);
    }
  }

  handleNextPage() {
    const { page, search } = this.state;
    const { pages, loadItemsForPage } = this.props;

    if (page + 1 < pages) {
      this.setState({ page: page + 1 });
      loadItemsForPage(page + 1, search);
    }
  }

  handleSelectPage(page) {
    const { search } = this.state;
    const { pages, loadItemsForPage } = this.props;

    if (page < pages) {
      this.setState({ page });
      loadItemsForPage(page, search);
    }
  }

  render() {
    const {
      items,
      headerComponent,
      rowComponent,
      pages,
      searchable,
      searchPlaceholder,
    } = this.props;

    const { page } = this.state;

    const paginationItems = [];
    for (let index = 0; index < pages; index += 1) {
      paginationItems.push(
        <PaginationItem active={index === page}>
          <PaginationLink
            tag="button"
            onClick={() => {
              this.handleSelectPage(index);
            }}
          >
            {index + 1}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return (
      <Fragment>
        {searchable && (
          <Fragment>
            <Row>
              <Col lg="4">
                <Input
                  placeholder={searchPlaceholder}
                  onChange={(event) => {
                    const search = event.target.value;
                    this.setState({ search });

                    setTimeout(() => {
                      this.setState({ page: 0 });
                      this.props.loadItemsForPage(0, search);
                    }, 500);
                  }}
                />
              </Col>
            </Row>

            <br />
          </Fragment>
        )}

        <Table responsive hover>
          <thead>{headerComponent()}</thead>

          <tbody>{items.map(rowComponent)}</tbody>
        </Table>

        {pages > 1 && (
          <Pagination>
            <PaginationItem>
              <PaginationLink
                previous
                tag="button"
                disabled={page === 0}
                onClick={this.handlePrevPage}
              />
            </PaginationItem>

            {paginationItems}

            <PaginationItem>
              <PaginationLink
                next
                tag="button"
                disabled={page + 1 >= pages}
                onClick={this.handleNextPage}
              />
            </PaginationItem>
          </Pagination>
        )}
      </Fragment>
    );
  }
}

PaginationTable.defaultProps = {
  searchable: true,
  searchPlaceholder: 'search for first name, last name, or email',
};

PaginationTable.propTypes = {
  pages: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
  loadItemsForPage: PropTypes.func.isRequired,
  headerComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  searchable: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
};

export default PaginationTable;
