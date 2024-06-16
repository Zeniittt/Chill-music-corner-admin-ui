import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

function ModalCustom({ type, title, isModalOpen, handleCancel, btnSubmit, handleSubmit, genreData }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (genreData) {
            form.setFieldsValue(genreData);
        } else {
            form.resetFields();
        }
    }, [genreData, form]);

    const onFinish = (values) => {
        handleSubmit(values);
    };

    return (
        <Modal title={title} open={isModalOpen} onCancel={handleCancel} footer={null}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input genre name!',
                        },
                    ]}
                >
                    <Input type="text" name="name" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        {btnSubmit}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ModalCustom;
