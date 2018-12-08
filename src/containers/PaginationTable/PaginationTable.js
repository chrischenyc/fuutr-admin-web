import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table, Pagination, PaginationItem, PaginationLink, Input,
} from 'reactstrap';

class PaginationTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      limit: 15,
      search: '',
    };

    this.reloadItems = this.reloadItems.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    this.reloadItems();
  }

  handlePrev() {
    const { page, limit, search } = this.state;
    const { onLoadItemsForPage } = this.props;

    if (page > 0) {
      this.setState({ page: page - 1 });
      onLoadItemsForPage(page - 1, limit, search);
    }
  }

  handleNext() {
    const { page, limit, search } = this.state;
    const { total, onLoadItemsForPage } = this.props;

    if ((page + 1) * limit < total) {
      this.setState({ page: page + 1 });
      onLoadItemsForPage(page + 1, limit, search);
    }
  }

  reloadItems() {
    const { limit, search } = this.state;
    const { onReloadItems } = this.props;

    this.setState({ page: 0 });

    onReloadItems(0, limit, search);
  }

  render() {
    const {
      items, headerComponent, rowComponent, total, searchPlaceholder,
    } = this.props;

    const { page, limit } = this.state;

    return (
      <Fragment>
        <Input
          placeholder={searchPlaceholder}
          input={{ size: '40' }}
          onChange={(event) => {
            const search = event.target.value;
            this.setState({ search });
            setTimeout(() => {
              this.reloadItems();
            }, 500);
          }}
        />

        <Table responsive hover>
          <thead>{headerComponent()}</thead>

          <tbody>{items.map(rowComponent)}</tbody>
        </Table>

        <Pagination>
          <PaginationItem>
            <PaginationLink previous tag="button" disabled={page === 0} onClick={this.handlePrev} />
          </PaginationItem>

          <PaginationItem active>
            <PaginationLink tag="button">1</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink tag="button">2</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              next
              tag="button"
              disabled={(page + 1) * limit >= total}
              onClick={this.handleNext}
            />
          </PaginationItem>
        </Pagination>
      </Fragment>
    );
  }
}

PaginationTable.defaultProps = {
  total: 0,
  searchPlaceholder: 'search for first name, last name, or email',
};

PaginationTable.propTypes = {
  total: PropTypes.number,
  items: PropTypes.array.isRequired,
  onReloadItems: PropTypes.func.isRequired,
  onLoadItemsForPage: PropTypes.func.isRequired,
  headerComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
};

export default PaginationTable;
