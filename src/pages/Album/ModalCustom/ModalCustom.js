import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

function ModalCustom({ type, title, isModalOpen, handleCancel, btnSubmit, handleSubmit, albumData }) {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (albumData) {
            form.setFieldsValue(albumData);
        } else {
            form.resetFields();
        }
    }, [albumData, form]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const onFinish = (values) => {
        handleSubmit(values, file);
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
                            message: 'Please input album name!',
                        },
                    ]}
                >
                    <Input type="text" name="name" />
                </Form.Item>

                <Form.Item
                    label="Artist"
                    name="artist"
                    rules={[
                        {
                            required: true,
                            message: 'Please input album artist!',
                        },
                    ]}
                >
                    <Input type="text" name="artist" rows={7} />
                </Form.Item>

                {type === 'update' ? null : (
                    <Form.Item
                        label="Avatart File"
                        name="imageURL"
                        rules={[
                            {
                                required: true,
                                message: 'Please upload a avatar file!',
                            },
                        ]}
                    >
                        <Input type="file" onChange={handleFileChange} />
                    </Form.Item>
                )}

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
