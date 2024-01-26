import { Button, Form, Dropdown, Container, Row, Col, Alert } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useImmer } from 'use-immer'; // Using immer to avoid recursive copying of data manually

export default function ExpressionForm({ onSubmit }){
  // Define initial state for the form
  const initialState = {
    connectorType: 'AND',
    expressions: [{ ruleType: 'Age', operator: '>=', value: '', score: '' }],
  };
  const [state, updateState] = useImmer(initialState);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  // Handler for connector type change
  const handleConnectorChange = (e) => {
    updateState((draft) => {
      draft.connectorType = e.target.value;
    });
  };
   // Handler for expression field change
  const handleExpressionChange = (index, field, value) => {
    updateState((draft) => {
      draft.expressions[index][field] = value;
    });
  };
  // Handler for adding a new expression
  const handleAddExpression = () => {
    updateState((draft) => {
      draft.expressions.push({ ruleType: 'Age', operator: '>=', value: '', score: '' });
    });
  };
  // Handler for deleting an expression
  const handleDeleteExpression = (index) => {
    updateState((draft) => {
      draft.expressions.splice(index, 1);
    });
  };
  // Handler for form submission
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
    // Validate the form
    if (form.checkValidity() && isValid) {
      // Preparing the rules based on form data
      const rules = state.expressions.map(expression => ({
        key: expression.ruleType.toLowerCase().replace(' ', '_'),
        output: {
          value: parseFloat(expression.value),
          operator: expression.operator,
          score: parseInt(expression.score)
        }
      }));

      // Construct the output object
      const output = {
        rules: rules,
        combinator: state.connectorType
      };

      // Submit the output
      onSubmit(output);
      setShowAlert(true); // Show alert after form submission
    }

    setValidated(true);
  };
  // Effect to hide alert after a few seconds
  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Change duration as needed (in milliseconds)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  return (
    // Rendering the form
    <Container className="mt-5">
      <h1 className="mb-4">Expression Engine</h1>
      <Alert show={showAlert} variant="success">
      Form submitted successfully!
    </Alert>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="connectorType" className="mb-3">
          <Form.Label>Connector Type</Form.Label>
          <Form.Control as="select" onChange={handleConnectorChange} value={state.connectorType} required>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">Please select a connector type.</Form.Control.Feedback>
        </Form.Group>

        {state.expressions.map((expression, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            <Row className="mb-3">
              <Col>
                <Form.Group controlId={`ruleType${index}`}>
                  <Form.Label>Rule Type</Form.Label>
                  <Dropdown onSelect={(value) => handleExpressionChange(index, 'ruleType', value)}>
                    <Dropdown.Toggle variant="success" id={`dropdown-ruleType${index}`}>
                      {expression.ruleType}
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
                <Form.Group controlId={`operator${index}`}>
                  <Form.Label>Operator</Form.Label>
                  <Form.Control as="select" value={expression.operator} onChange={(e) => handleExpressionChange(index, 'operator', e.target.value)}>
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value=">=">{'>='}</option>
                    <option value="<=">{'<='}</option>
                    <option value="=">{'='}</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* Rendering value and score fields with validation */}
              <Col>
                <Form.Group controlId={`value${index}`}>
                  <Form.Label>Value</Form.Label>
                  <Form.Control type="text" value={expression.value} pattern="[0-9]*" onChange={(e) => handleExpressionChange(index, 'value', e.target.value)} />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId={`score${index}`}>
                  <Form.Label>Score</Form.Label>
                  <Form.Control type="text" value={expression.score} pattern="[0-9]*" onChange={(e) => handleExpressionChange(index, 'score', e.target.value)} />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="danger" onClick={() => handleDeleteExpression(index)} className="me-3">
              Delete Expression
            </Button>
          </div>
        ))}

        {/* Add expression button */}
        <Button variant="primary" onClick={handleAddExpression} className="mb-3">
          Add Expression
        </Button>

        {/* Submit button */}
        <Button variant="success" type="submit" className='mb-3 ms-3'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};