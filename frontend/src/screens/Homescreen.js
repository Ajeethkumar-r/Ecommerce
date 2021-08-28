import React from 'react'
import {Row,Col} from 'react-bootstrap'
import products from '../products'
const Homescreen = () => {
    return (
        <>
            <h1>Latest products</h1> 
            <Row>
                {products.map(products=>(
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <h3>{products.name}</h3>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Homescreen
