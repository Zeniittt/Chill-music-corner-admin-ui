import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

function ModalCustom({ type, title, isModalOpen, handleCancel, btnSubmit, handleSubmit, bannerData }) {
    const [form] = Form.useForm();
    const [file, setFile] = useState(null);

    useEffect(() => {
        console.log(bannerData);
        if (bannerData) {
            form.setFieldsValue(bannerData);
        } else {
            form.resetFields();
        }
    }, [bannerData, form]);

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
                    label="Link"
                    name="link"
                    rules={[
                        {
                            required: true,
                            message: 'Please input banner link!',
                        },
                    ]}
                >
                    <Input type="text" name="link" />
                </Form.Item>

                {type === 'update' ? null : (
                    <Form.Item
                        label="Banner Image"
                        name="imageURL"
                        rules={[
                            {
                                required: true,
                                message: 'Please upload a banner file!',
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
