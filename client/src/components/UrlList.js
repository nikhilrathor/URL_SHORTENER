import React, { Component } from 'react';
import { Container, Button, Table, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { getUrls, deleteUrl } from '../actions/urlActions';
import PropTypes from 'prop-types';

class UrlList extends Component {
    componentDidMount() {
        this.props.loadUser();
        this.props.getUrls(this.props.user.email);
    }

    onDeleteClick = (id) => {
        this.props.deleteUrl(id);
    }

    render() {
        const { urls } = this.props.url;
        let newUser = '';
        if (urls.length === 0) {
            newUser = "Start creating your short Urls!";
        }
        return (
            <Container>
                {newUser === '' ?
                    <Table hover responsive className="mt-5 text-center">
                        <thead>
                            <tr>
                                <th>Delete</th>
                                <th>Full Url</th>
                                <th>Short Url</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.map(({ _id, FullUrl, ShortUrl }) => (
                                <tr key={_id}>
                                    <td>
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;</Button>
                                    </td>
                                    <td><NavLink href={FullUrl}>{FullUrl}</NavLink></td>
                                    <td><NavLink href={ShortUrl}>{ShortUrl}</NavLink></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> : <h3 className="text-center">{newUser}</h3>}
            </Container>
        );
    }
}

UrlList.propTypes = {
    getUrls: PropTypes.func.isRequired,
    url: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    url: state.url,
    user: state.auth.user
})

export default connect(mapStateToProps, { getUrls, deleteUrl, loadUser })(UrlList);