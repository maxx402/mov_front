"use client";

import { PageHeader } from "@/components/common/page-header";
import { LoginForm } from "@/components/feature/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-scaffold">
      <PageHeader showBack />
      <div className="mx-auto max-w-sm px-4 pt-8">
        <LoginForm />
      </div>
    </div>
  );
}
