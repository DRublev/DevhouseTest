import React from 'react';
import Parent from '../Parent.js';
import { Container, InputGroup, Button, FormControl, Row, Form } from 'react-bootstrap';

import Shops from '../helpers/Api/Shops.js';
import Users from '../helpers/Api/Users.js';

const config = require('../config.js');

class ShopAdd extends Parent {
  constructor(props) {
    super(props);

    this.state = {
      me: {},
      shop: {
        name: '',
        address: '',
        schedule: config.defaultShopSchedule
      },
      choosenDay: 0,
      breakTimePickers: [],
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

      this.addBreaksForDay();
    }, (err) => {
      return;
    });
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

  addBreaksForDay = () => {
    const { shop, choosenDay } = this.state;
    let curDay = shop.schedule[choosenDay];
    let nodes = [];

    this.setState({
      breakTimePickers: []
    });

    curDay.breakTime.forEach((bt, index) => {
      let btp = this.createBreakTimePicker(index);
      nodes.push(btp);
    });

    this.setState({
      breakTimePickers: nodes
    });
  }

  onChangeDayWeek = (event) => {
    let { value } = event.target;
    const { shop } = this.state;
    this.setState({
      choosenDay: value,
      breakTimePickers: []
    });

    this.addBreaksForDay();

    this.refs.isDayOff.checked = shop.schedule[value].isDayOff;
  }

  onDayOffChangeHandler = (event) => {
    let { value } = event.target;
    const { shop, choosenDay } = this.state;
    let prevSchedule = shop.schedule;

    this.setState({
      shop: {
        ...shop,
        schedule: {
          ...prevSchedule,
          [choosenDay]: {
            isDayOff: value
          }
        }
      }
    });
  }

  onWorkTimeChangeHandler = (event) => {
    let { name, value } = event.target;
    const { shop, choosenDay } = this.state;
    let prevSchedule = shop.schedule;

    const oldTime = shop.schedule[choosenDay].workTime;

    const vSplit = value.split(':');
    const hours = vSplit[0];
    const minutes = vSplit[1];
    const prop = name === 'workStart' ? 'start' : 'end';

    let newTime = new Date(oldTime[prop]);
    newTime.setHours(hours);
    newTime.setMinutes(minutes);

    this.setState({
      shop: {
        ...shop,
        schedule: {
          ...prevSchedule,
          [choosenDay]: {
            workTime: newTime
          }
        }
      }
    })
  }

  onBreakTimeChangeHandler = (event) => {
    let { name, value } = event.target;
    const { shop, choosenDay } = this.state;
    let prevSchedule = shop.schedule;

    const breaks = shop.schedule[choosenDay].breakTime;
    const breakIndex = name[name.length - 2];

    if (!breaks[breakIndex]) {
      let empty = {
        start: new Date(),
        end: new Date()
      };
      empty.start.setHours(0);
      empty.start.setMinutes(0);
      empty.end.setHours(0);
      empty.end.setMinutes(0);

      breaks.push(empty);
    }

    const vSplit = value.split(':');
    const hours = vSplit[0];
    const minutes = vSplit[1];
    const prop = name.substr(0, name.indexOf('[')) === 'breakStart' ? 'start' : 'end';

    let newBreak = new Date(breaks[breakIndex][prop]);
    newBreak.setHours(hours);
    newBreak.setMinutes(minutes);
    breaks[breakIndex][prop] = newBreak;

    this.setState({
      shop: {
        ...shop,
        schedule: {
          ...prevSchedule,
          [choosenDay]: {
            ...prevSchedule[choosenDay],
            breakTime: breaks
          }
        }
      }
    });

    console.log(this.state.shop.schedule);
  }

  onAddBreakTimeHandler = () => {
    const { choosenDay, shop } = this.state;
    let newSchedule = shop.schedule;
    let curDay = newSchedule[choosenDay];


    curDay.breakTime.push({
      start: new Date(2019, 1, 1, 0, 0, 0),
      end: new Date(2019, 1, 1, 0, 0, 0)
    });

    newSchedule[choosenDay] = curDay;

    this.setState({
      shop: {
        ...shop,
        schedule: newSchedule
      }
    });

    this.addBreaksForDay();
  }

  createBreakTimePicker = (index) => {
    const { shop, choosenDay } = this.state;
    const cDay = shop.schedule[choosenDay];

    let start, end = '00:00';
    if (cDay.breakTime[index]) {
      start = this.formatDate(new Date(cDay.breakTime[index].start));
      end = this.formatDate(new Date(cDay.breakTime[index].end));
    }

    let node = <InputGroup key={index}>
      <Form.Control
        type={'time'}
        name={`breakStart[${index}]`}
        defaultValue={start || '00:00'}
        onChange={this.onBreakTimeChangeHandler.bind(this)} />
      <Form.Control
        type={'time'}
        name={`breakEnd[${index}]`}
        defaultValue={end || '00:00'}
        className={'mb-2'}
        onChange={this.onBreakTimeChangeHandler.bind(this)} />
    </InputGroup>;
    return node;
  }

  formatDate = (date) => {
    let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    let min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    let res = `${hours}:${min}`;
    return res;
  }

  onSubmitClickHandler = () => {
    let { shop } = this.state;
    let newShop = {
      owner: '',
      name: shop.name || '',
      address: shop.address || '',
      schedule: shop.schedule || config.defaultShopSchedule
    }

    Users.me({}, (data) => {
      newShop.owner = data._id || ''
    });

    if (this.props.match.params.id) {
      console.log('upssd');
      Shops.update(newShop, (res) => {
        console.log('upd');
        window.location.href = window.location.origin + '/';
      });
    } else {
      Shops.add(newShop, (res) => {
        window.location.href = window.location.origin + '/';
      }, (err) => {
        alert('err');
      });
    }
  }

  render() {
    const { shop, choosenDay, breakTimePickers } = this.state;
    let cDay = shop.schedule[choosenDay];

    let workStart, workEnd;
    if (cDay.workTime) {
      workStart = this.formatDate(new Date(cDay.workTime.start)) || '';
      workEnd = this.formatDate(new Date(cDay.workTime.end)) || '';
    }

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
          <Container
            className={'col-md-12 mx-0 px-0 d-flex flex-row'}>
            <FormControl
              as={'select'}
              name={'dayOfWeek'}
              value={choosenDay}
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
              ref={'isDayOff'}
              label={'Day off'}
              className={'mx-3'}
              onChange={this.onDayOffChangeHandler.bind(this)}
              defaultChecked={cDay.isDayOff} />
          </Container>
          {!this.state.shop.schedule[choosenDay].isDayOff && (
            <Container
              className={'col-md-12'}>
              <Row className={'my-1'} id={'workTimeContainer'} ref={'workTimeContainer'}>
                <p>{'Work time'}</p>
                <InputGroup>
                  <FormControl
                    type={'time'}
                    name={'workStart'}
                    defaultValue={workStart || '00:00'}
                    onChange={this.onWorkTimeChangeHandler.bind(this)} />
                  <FormControl
                    type={'time'}
                    name={'workEnd'}
                    defaultValue={workEnd || '00:00'}
                    onChange={this.onWorkTimeChangeHandler.bind(this)} />
                </InputGroup>
              </Row>

              <Row className={'my-1'} >
                <p>{'Breaks time'}</p>
                <InputGroup id={'breakTimeContainer'} ref={'breakTimeContainer'}>

                  {breakTimePickers}

                </InputGroup>

                <Button
                  variant={'secondary'}
                  className={'my-1'}
                  onClick={() => this.onAddBreakTimeHandler()}>
                  {'+'}
                </Button>
              </Row>
            </Container>
          )}

          <Button
            onClick={this.onSubmitClickHandler.bind(this)}>
            {this.props.match.params.id ? 'Save' : 'Add'}
          </Button>
        </form>

      </Container >
    )
  }
}

export default ShopAdd;