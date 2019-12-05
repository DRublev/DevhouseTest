import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class ShopCard extends Component {
    onEditHandler = () => {
        window.location.href = window.location.origin + `/shop/add/${this.props.shop._id}`;
    }

    render() {
        let shop = this.props.shop || {};

        let timeSpan = (time) => {
            return time.map((t, index) => {
                let tDateStart = new Date(t.start);
                let tDateEnd = new Date(t.end);

                return (
                    <td key={index}>
                        {tDateStart.getHours() + ':' + tDateStart.getMinutes() + ' - ' + tDateEnd.getHours() + ':' + tDateEnd.getMinutes()}
                    </td>
                );
            });
        };

        let isOpen = (schedule) => {
            let isOpen = false;
            let current = new Date();
            let day = schedule[current.getDay()];

            let cHours = current.getUTCHours();
            let cMinutes = current.getUTCMinutes();

            if (day.isDayOff) {
                return;
            }


            day.breakTime.forEach(bt => {
                let btStart = new Date(bt.start);
                let btEnd = new Date(bt.end);

                if ((cHours > btStart.getHours() && cMinutes > btStart.getMinutes()) &&
                    (cHours < btEnd.getHours() && cMinutes < btEnd.getMinutes())) {
                    isOpen = false;
                } else {
                    isOpen = true;
                }
            });

            let wtStart = new Date(day.workTime.start);
            let wtEnd = new Date(day.workTime.end);
            if (cHours > wtStart.getHours() && cMinutes > wtStart.getMinutes()) {
                isOpen = true;
            }

            if (cHours > wtEnd.getHours() && cMinutes > wtEnd.getMinutes()) {
                isOpen = false;
            }

            return isOpen;
        };

        return (
            <Card className={'mx-1 my-2 py-2 px-3 shadow-sm'}>
                <Card.Title>
                    <p className={'h4'}>
                        {shop.name || 'Shop name dafault'}
                    </p>
                </Card.Title>
                <Card.Subtitle>
                    <p className={'lead'}>{shop.address || 'Default address'}</p>
                    {isOpen(shop.schedule) ?
                        <span className={'text-success'}>Open now</span> :
                        <span className={'text-danger'}>Closed now</span>}
                </Card.Subtitle>
                <Card.Body>
                    <table className={'table table-sm table-borderless table-hover overflow-auto'}>
                        <thead>
                            <tr>
                                <th scope="col">Day of week</th>
                                <th scope="col">Work hours</th>
                                <th scope="col">Break hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shop.schedule.map((day, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{day.day}</th>
                                        {day.isDayOff ? (<td>Day off</td>) :
                                            (day.workTime &&
                                                <td>{new Date(day.workTime.start).getHours() + ':' + new Date(day.workTime.start).getMinutes() + ' - ' + new Date(day.workTime.end).getHours() + ':' + new Date(day.workTime.end).getMinutes()}</td>)}
                                        {day.isDayOff ?
                                            (<td></td>) :
                                            (day.breakTime && timeSpan(day.breakTime))}
                                    </tr>
                                );
                            }
                            )}
                        </tbody>
                    </table>
                    {this.props.editable && <Button onClick={this.onEditHandler}>{'Edit'}</Button>}
                </Card.Body>
            </Card >
        )
    }
}

export default ShopCard;
