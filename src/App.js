import { Button, Form, Dropdown, Container, Row, Col} from 'react-bootstrap';
import { useState} from 'react';
import {useImmer} from 'use-immer';

export default function ExpressionForm(){
  const initialState = {
    connectorType: 'AND',
    expressions: [{ ruleType: 'Age', operator: '>=', value: '', score: '' }],
  };
  const [state, updateState] = useImmer(initialState);

 const handleConnectorChange = (e) => {
  updateState((draft) => {
    draft.connectorType = e.target.value;
  });
};
const handleExpressionChange = (index, field, value) => {
  updateState((draft) => {
    draft.expressions[index][field] = value;
  });
};
const handleAddExpression = () => {
  updateState((draft) => {
    draft.expressions.push({ ruleType: 'Age', operator: '>=', value: '', score: '' });
  });
};
const handleDeleteExpression = (index) => {
  updateState((draft) => {
    draft.expressions.splice(index, 1);
  });
};
const handleSubmit = (event) => {
  const form = event.currentTarget;
  event.preventDefault();
  event.stopPropagation();
  let isValid = true;
  // Check for empty values in expressions
  state.expressions.forEach(expression => {
    if (expression.value === '' || expression.score === '') {
      isValid = false;
    }
  });
  return (
    <Container >
      <h1>Expression Engine</h1>
      <Form onSubmit={""}>
        <Form.Group controlId="connectorType">
          <Form.Label>Connector Type</Form.Label>
          <Form.Control as="select" onChange={""} value={""} required>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </Form.Control>
        </Form.Group>

        
          <div>
            <Row>
              <Col>
                <Form.Group controlId={""}>
                  <Form.Label>Rule Type</Form.Label>
                  <Dropdown onSelect={""}>
                    <Dropdown.Toggle variant="success" id={""}>
                      
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Age">Age</Dropdown.Item>
                      <Dropdown.Item eventKey="Credit Score">Credit Score</Dropdown.Item>
                      <Dropdown.Item eventKey="Account Balance">Account Balance</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId={""}>
                  <Form.Label>Operator</Form.Label>
                  <Form.Control as="select" value={""} onChange={""}>
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value=">=">{'>='}</option>
                    <option value="<=">{'<='}</option>
                    <option value="=">{'='}</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId={""}>
                  <Form.Label>Value</Form.Label>
                  <Form.Control type="text" value={""}  onChange={""} />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId={""}>
                  <Form.Label>Score</Form.Label>
                  <Form.Control type="text" value={""} onChange={""} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="danger" onClick={""}>
              Delete Expression
            </Button>
          </div>
        

        <Button variant="outline-primary" onClick={""} >
          Add Expression
        </Button>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}