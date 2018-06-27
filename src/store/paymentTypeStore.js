import { getPaymentTypes, getPaymentType } from '../api/paymentTypes';
import { DomainInstanceStore, DomainInstance } from './domainInstanceStore';


export class PaymentTypeStore extends DomainInstanceStore {
  constructor() {
    super(PaymentType, getPaymentTypes, getPaymentType); // eslint-disable-line no-this-before-super
  }

  getPaymentTypes() {
    this.getInstances();
  }

  getPaymentTypeDetails = id => this.getInstance(id);
}

export class PaymentType extends DomainInstance {

}
