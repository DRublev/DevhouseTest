import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class ShopCard extends Component {
    render() {
        let shop = this.props.shop || {};
        return (
            <Card className={'mx-1 my-2 py-2 px-3 shadow-sm'}>
                <Card.Title>
                    <p className={'h4'}>
                        {shop.name || 'Shop name dafault'}
                    </p>
                </Card.Title>
                <Card.Subtitle>
                    <span className={'text-success'}>Open</span>
                    <p className={'lead'}>adress</p>
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
                            {console.log(shop.schedule)}
                            <tr>
                                <th scope="row">Sun</th>
                                <td>DayOff</td>
                            </tr>
                            <tr>
                                <th scope="row">Mon</th>
                                <td>8.00 - 18.00</td>
                                <td>13.00 - 14.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Tue</th>
                                <td>8.00 - 18.00</td>
                                <td>13.00 - 14.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Wed</th>
                                <td>8.00 - 18.00</td>
                                <td>13.00 - 14.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Thu</th>
                                <td>8.00 - 18.00</td>
                                <td>13.00 - 14.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Fri</th>
                                <td>8.00 - 18.00</td>
                                <td>13.00 - 14.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Sat</th>
                                <td>8.00 - 18.00</td>
                                <td>13.00 - 14.00</td>
                            </tr>
                        </tbody>
                    </table>
                </Card.Body>
            </Card>
        )
    }
}

export default ShopCard;
