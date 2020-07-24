import React, { Component } from 'react';
import {
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Row,
    Col,
    Jumbotron,
    InputGroup,
    InputGroupAddon,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { addUrl } from '../actions/urlActions';

class UrlModal extends Component {
    state = {
        url: '',
        msg: ''
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const validUrl = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
        let valid = true;
        if (!validUrl.test(this.state.url) && valid) {
            this.setState({ msg: 'Invalid URL' })
            valid = false;
        }
        if (valid) {
            const newUrl = {
                url: this.state.url,
                userid: this.props.user.email
            }
            this.setState({ msg: '' })
            this.props.addUrl(newUrl);
        }

    }

    render() {
        return (
            <Container className='mt-5'>
                <h1 className="text-center">URL SHORTENER</h1>
                <Row>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                    {this.state.msg ? (<Alert color='danger'>{this.state.msg}</Alert>) : ''}
                        <Jumbotron>
                            <Form onSubmit={this.onSubmit} >
                                <FormGroup className="flex-center">
                                    <InputGroup>
                                        <Input
                                            bsSize="lg"
                                            type="text"
                                            name="url"
                                            id="url"
                                            value={this.state.url}
                                            placeholder="Full Url"
                                            onChange={this.onChange} />
                                        <InputGroupAddon addonType="append">
                                            <Button size="lg" color="dark">Shrink</Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        );
    }
}
const mapStateTopProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateTopProps, { addUrl })(UrlModal);