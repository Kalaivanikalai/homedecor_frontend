import React from "react";
import { Nav, Tab, Col, Row } from "react-bootstrap";
import ClientsPage from "../admin/ClientsPage";
import AdminProducts from "../admin/AdminProducts";
import Orderpage from "../admin/Orderpage";

function Dashboard() {
    return (
        <div className="container-fluid">
            <Tab.Container defaultActiveKey="products">
                <Row>
                    <Col sm={2} className="bg-style">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="products">
                                    <i className="fa fa-tachometer">Products</i>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">
                                    <i className="fa fa-shopping-basket"> Orders </i>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">
                                <i className="fa fa-users">Clients </i>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <AdminProducts />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <Orderpage />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <ClientsPage />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default Dashboard;
