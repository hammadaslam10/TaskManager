"use client";

import { Form, Input, DatePicker, Select, Button } from "antd";
import { useState } from "react";

export default function TaskForm({ onSubmit, initialData = {}, isLoading = false }) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = async (values) => {
    try {
      setIsSubmitting(true);
      const formattedValues = {
        ...values,
        dueDate: values.dueDate.format("YYYY-MM-DD") 
      };
      await onSubmit(formattedValues);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        ...initialData,
        status: initialData.status || "pending"
      }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Title is required!" }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Enter task description" rows={4} />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Status is required!" }]}
      >
        <Select placeholder="Select task status">
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="in-progress">In Progress</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Due Date"
        name="dueDate"
        rules={[{ required: true, message: "Due date is required!" }]}
      >
        <DatePicker style={{ width: '100%' }} placeholder="Select due date" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={isSubmitting || isLoading}
        >
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </Button>
      </Form.Item>
    </Form>
  );
}
