import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import Loading from '~/pages/Loading';

function ModalCustom({ type, title, isModalOpen, handleCancel, btnSubmit, handleSubmit, genreData }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (genreData) {
            form.setFieldsValue(genreData);
        } else {
            form.resetFields();
        }
    }, [genreData, form]);

    const onFinish = (values) => {
        handleSubmit(values);
        setLoading(true);
    };

    return (
        // <div>
        //     {loading ? (
        //         <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        //             <Loading />
        //         </Modal>
        //     ) : (
        //         <Modal title={title} open={isModalOpen} onCancel={handleCancel} footer={null}>
        //             <Form
        //                 form={form}
        //                 name="basic"
        //                 labelCol={{ span: 8 }}
        //                 wrapperCol={{ span: 16 }}
        //                 onFinish={onFinish}
        //                 autoComplete="off"
        //             >
        //                 <Form.Item
        //                     label="Name"
        //                     name="name"
        //                     rules={[
        //                         {
        //                             required: true,
        //                             message: 'Please input genre name!',
        //                         },
        //                     ]}
        //                 >
        //                     <Input type="text" name="name" />
        //                 </Form.Item>

        //                 <Form.Item
        //                     wrapperCol={{
        //                         offset: 8,
        //                         span: 16,
        //                     }}
        //                 >
        //                     <Button type="primary" htmlType="submit">
        //                         {btnSubmit}
        //                     </Button>
        //                 </Form.Item>
        //             </Form>
        //         </Modal>
        //     )}
        // </div>

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
