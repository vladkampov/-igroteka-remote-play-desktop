import React, { Fragment, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { ModalUpdate } from '../';


@inject('uiStore')
@observer
class DefaultLayout extends Component {
  componentDidMount() {
    this.props.uiStore.checkVersion();
  }

  render() {
    const { Wrapped, uiStore, ...rest } = this.props;
    const { clientOutdated } = uiStore;

    return (
      <Fragment>
        {clientOutdated && <ModalUpdate {...clientOutdated} />}
        <Wrapped {...rest} />
      </Fragment>
    );
  }
}

export default Wrapped => ({ ...rest }) => <DefaultLayout Wrapped={Wrapped} {...rest} />;
