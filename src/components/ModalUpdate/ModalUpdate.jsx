import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import './ModalUpdate.scss';


export default ({ url }) => (
  <div className="ModalUpdate">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>
          <FormattedMessage id="modalUpdate.title" />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormattedMessage id="modalUpdate.body" />
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            window.open(url);
            window.closeApp();
          }}
          bsStyle="success"
        >
          <FormattedMessage id="modalUpdate.button" />
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
);
