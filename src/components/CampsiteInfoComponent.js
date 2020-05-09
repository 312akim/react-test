import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    };

    submitComment = (values) => {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    };

    render() {
        return (
            <>
                <Row className="form-group pl-3">
                    <Col>
                        <Button onClick={this.toggleModal} outline color="primary">
                            <i class="fa fa-pencil" /> Submit Comment
                        </Button>
                    </Col>
                </Row>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.submitComment(values)}>
                            <Row className="form-group">
                                <Label md={2} htmlFor="rating">
                                    Rating
                                </Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="fullName">
                                    Your Name
                                </Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".fullName"
                                        id="fullName"
                                        name="fullName"
                                        className="form-control"
                                        placeholder="Full Name"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15),
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".fullName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be at least 2 characters",
                                            maxLength: "Must be 15 characters or less",
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={2} htmlFor="comment">
                                    Comment
                                </Label>
                                <Col md={10}>
                                    <Control.text
                                        model=".comment"
                                        id="comment"
                                        name="comment"
                                        className="form-control"
                                        placeholder="Comments"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col md-5 m-1">
                <h4>Comments</h4>
                {comments.map((comment) => (
                    <div className="m-3" key={comment.id}>
                        {comment.text}
                        <br />
                        --{comment.author},{" "}
                        {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        }).format(new Date(Date.parse(comment.date)))}
                    </div>
                ))}
                <CommentForm />
            </div>
        );
    }

    return <div></div>;
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to="/directory">Directory</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
}

export default CampsiteInfo;
