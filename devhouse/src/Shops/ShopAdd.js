import React from 'react';
import Parent from '../Parent.js';
import { Container, InputGroup, Button, FormControl, Row, Form } from 'react-bootstrap';

import Shops from '../helpers/Api/Shops.js';

const config = require('../config.js');

class ShopAdd extends Parent {
  constructor(props) {
    super(props);

    this.state = {
      me: {},
      shop: {
        name: '',
        address: '',
        owner: '',
        schedule: config.defaultShopSchedule
      },
      choosenDay: 0
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;

    if (!id) return;

    Shops.list({ _id: id }, (res) => {
      let shop = res.data.shops ? res.data.shops[0] : {};
      this.setState({
        shop: shop
      });
    }, (err) => {
      return;
    })
  }

  onChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState((prevState) => ({
      shop: {
        ...prevState.shop,
        [name]: value
      }
    }));
  }

  onChangeDayWeek = (event) => {
    let { value } = event.target;
    this.setState({
      choosenDay: value
    });
  }

  onSubmitClickHandler = () => {

  }

  render() {
    const { shop } = this.state;
    let choosenDay = shop.schedule[this.state.choosenDay];

    return (
      <Container className={'col-md-8 d-flex flex-column my-5'}>
        <form>
          <InputGroup className={'my-2'}>
            <FormControl
              type={'text'}
              name={'name'}
              value={shop.name || ''}
              onChange={this.onChangeHandler.bind(this)}
            />
          </InputGroup>
          <InputGroup className={'my-2'}>
            <FormControl
              type={'text'}
              name={'address'}
              value={shop.address || ''}
              onChange={this.onChangeHandler.bind(this)}
            />
          </InputGroup>

          <InputGroup className={'my-2 d-flex flex-row'}>
            <Container
              className={'col-md-2 mx-0 px-0'}>
              <FormControl
                as={'select'}
                name={'dayOfWeek'}
                value={this.state.choosenDay}
                onChange={this.onChangeDayWeek.bind(this)}>
                <option value={0}>{'Sun'}</option>
                <option value={1}>{'Mon'}</option>
                <option value={2}>{'Tue'}</option>
                <option value={3}>{'Wed'}</option>
                <option value={4}>{'Thu'}</option>
                <option value={5}>{'Fri'}</option>
                <option value={6}>{'Sat'}</option>
              </FormControl>
              <Form.Check
                type={'checkbox'}
                name={'isDayOff'}
                label={'Day off'}/>
            </Container>
            <Container
              className={(choosenDay.isDayOff) ? 'col-md-8 invisible' : 'col-md-8'}>
              <Row className={'my-1'}>
                <p>{'Work time'}</p>
                <FormControl
                  type={'time'}
                  name={'workStart'}>
                </FormControl>
                <FormControl
                  type={'time'}
                  name={'workEnd'}>
                </FormControl>
              </Row>

              <Row className={'my-1'}>
                <p>{'Breaks time'}</p>
                {this.props.match.params.id ?
                  choosenDay.breakTime.map((bt, index) => {
                    return (<>
                      <FormControl
                        type={'time'}
                        name={'breakStart'}>
                      </FormControl>
                      <FormControl
                        type={'time'}
                        name={'breakEnd'}>
                      </FormControl></>);
                  }) :
                  <Row>
                    <FormControl
                      type={'time'}
                      name={'breakStart'}>
                    </FormControl>
                    <FormControl
                      type={'time'}
                      name={'breakEnd'}>
                    </FormControl>
                  </Row>}
              </Row>
            </Container>
          </InputGroup>

          <Button
            onClick={this.onSubmitClickHandler}>
            {this.props.match.params.id ? 'Save' : 'Add'}
          </Button>
        </form>

      </Container>
    )
  }
}

export default ShopAdd;