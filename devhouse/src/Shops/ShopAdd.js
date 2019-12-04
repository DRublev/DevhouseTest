import React from 'react';
import Parent from '../Parent.js';
import { Container, InputGroup, Button, FromControl, FormControl } from 'react-bootstrap';

import Shops from '../helpers/Api/Shops.js';

class ShopAdd extends Parent {
  constructor(props) {
    super(props);

    this.state = {
      me: {},
      shop: {
        name: '',
        address: '',
        owner: '',
        schedule: []
      }
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;

    Shops.list({ _id: id }, (res) => {
      let shop = res.data.shops[0];
      this.setState({
        shop: shop
      });
    })
  }

  render() {
    const { shop } = this.state;

    return (
      <Container className={'col-md-8 d-flex flex-column my-5'}>
        <form>
          <InputGroup>
            <FormControl
              type={'text'}
              name={'name'}
              value={shop.name || ''}
            />
          </InputGroup>
        </form>
        
      </Container>
    )
  }
}

export default ShopAdd;
