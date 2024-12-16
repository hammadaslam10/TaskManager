"use client";

import { useCreateTaskManagementMutation } from "@/redux/features/taskmanagementApi";
import { StyledButton } from "@/styles/GlobalStyles";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Lottie from "lottie-react";
import loaderAnimation from "@/assets/Loader.json";
import TaskForm from "@/components/TaskForm";
export default function CreateTaskForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [createTask, { isLoading }] = useCreateTaskManagementMutation();

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Lottie
          animationData={loaderAnimation}
          loop={true}
          style={{ width: 200, height: 200, margin: '0 auto' }}
        />
      </div>
    );
  }

  const handleCreate = async (values) => {
    try {
      await createTask(values).unwrap();
      message.success("Task created successfully!");
      router.push("/");
    } catch (error) {
      message.error("Failed to create task.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", textAlign: "center", marginBottom: "20px" }}>Create New Task</h1>
      <TaskForm onSubmit={handleCreate} isLoading={isLoading} />
    </div>
  );
}




