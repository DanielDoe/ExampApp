<Row>
                                <Col span={8} className="classCol">
                                    <p className="classPickerText">Default</p>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        style={{ marginBottom: '5px' }}
                                        validateStatus={startError ? 'error' : ''}
                                        help={startError || ''}
                                        >
                                        {getFieldDecorator('start', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <TimePicker 
                                                className="classTimepicker"
                                                use12Hours 
                                                format="h:mm A"
                                                // onChange={moment => this.fieldChanged(moment, fieldId)}
                                                size="large" />    
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        style={{ marginBottom: '5px' }}
                                        validateStatus={endError ? 'error' : ''}
                                        help={endError || ''}
                                        >
                                        {getFieldDecorator('end', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <TimePicker 
                                                className="classTimepicker" 
                                                use12Hours 
                                                format="h:mm A" 
                                                // onChange={moment => this.fieldChanged(moment, endFieldId)} 
                                                size="large" />    
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <div className="savedButton">
                            <Button 
                                type="primary" 
                                // className="add-exception-button"
                                size={'large'}  
                                style={{width: '150px', marginBottom: '10px'}}
                                htmlType="submit" 
                                disabled={this.hasErrors(getFieldsError()) || isEmpty}
                                >Save</Button>
                            </div> 