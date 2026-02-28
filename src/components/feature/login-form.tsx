"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { useUserStore } from "@/stores/use-store";
import { useToast } from "@/components/common/toast";

export const LoginForm = observer(function LoginForm() {
  const userStore = useUserStore();
  const toast = useToast();
  const [isRegister, setIsRegister] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!account.trim()) {
      setError("请输入账号");
      return;
    }
    if (password.length < 6) {
      setError("密码至少6个字符");
      return;
    }
    if (isRegister && password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    const result = isRegister
      ? await userStore.register({ account, password })
      : await userStore.login({ account, password });

    if (result) {
      setError(result.userMessage);
    } else {
      toast.show(isRegister ? "注册成功" : "登录成功", "success");
      userStore.closeLoginSheet();
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setConfirmPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
      {/* Logo */}
      <div
        className="flex items-center justify-center"
        style={{
          width: 80,
          height: 80,
          borderRadius: 20,
          background: "linear-gradient(135deg, #2196F3, rgba(33, 150, 243, 0.7))",
          boxShadow: "0 10px 20px rgba(33, 150, 243, 0.3)",
        }}
      >
        <Image
          src="/images/logo.webp"
          alt="Logo"
          width={48}
          height={48}
          style={{ borderRadius: 10 }}
        />
      </div>

      {/* Title */}
      <h2
        style={{
          marginTop: 20,
          fontSize: 24,
          fontWeight: 700,
          color: "#FFFFFF",
        }}
      >
        {isRegister ? "创建账号" : "欢迎回来"}
      </h2>

      {/* Subtitle */}
      <p
        style={{
          marginTop: 8,
          fontSize: 14,
          color: "rgba(255, 255, 255, 0.6)",
        }}
      >
        {isRegister ? "注册以解锁全部功能" : "登录以享受更多精彩内容"}
      </p>

      {/* Form fields */}
      <div className="mt-10 flex w-full flex-col" style={{ gap: 16, padding: "0 24px" }}>
        {/* Account */}
        <div
          className="flex items-center"
          style={{
            height: 50,
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: 12,
            padding: "0 16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Image src="/images/ic_auth_avatar.webp" alt="" width={22} height={22} style={{ opacity: 0.5 }} />
          <input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="手机号/邮箱"
            className="flex-1"
            style={{
              marginLeft: 12,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 16,
              color: "#FFFFFF",
            }}
          />
        </div>

        {/* Password */}
        <div
          className="flex items-center"
          style={{
            height: 50,
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: 12,
            padding: "0 16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Image src="/images/ic_auth_avatar.webp" alt="" width={22} height={22} style={{ opacity: 0.5 }} />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="密码"
            className="flex-1"
            style={{
              marginLeft: 12,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 16,
              color: "#FFFFFF",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ padding: 4 }}
          >
            <Image
              src={showPassword ? "/images/eye_fill.webp" : "/images/eye_off_fill.webp"}
              alt=""
              width={18}
              height={15}
            />
          </button>
        </div>

        {/* Confirm Password (register only) */}
        {isRegister && (
          <div
            className="flex items-center"
            style={{
              height: 50,
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: 12,
              padding: "0 16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Image src="/images/ic_auth_avatar.webp" alt="" width={22} height={22} style={{ opacity: 0.5 }} />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="确认密码"
              className="flex-1"
              style={{
                marginLeft: 12,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ padding: 4 }}
            >
              <Image
                src={showConfirmPassword ? "/images/eye_fill.webp" : "/images/eye_off_fill.webp"}
                alt=""
                width={18}
                height={15}
              />
            </button>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            className="flex items-center"
            style={{
              padding: 12,
              background: "rgba(244, 67, 54, 0.1)",
              borderRadius: 8,
              gap: 8,
            }}
          >
            <AlertCircle size={20} color="#F44336" />
            <span style={{ fontSize: 12, color: "#F44336" }}>{error}</span>
          </div>
        )}
      </div>

      {/* Submit button */}
      <div className="w-full" style={{ marginTop: 32, padding: "0 24px" }}>
        <button
          type="submit"
          disabled={userStore.isLoggingIn}
          className="w-full flex items-center justify-center"
          style={{
            height: 50,
            background: userStore.isLoggingIn ? "rgba(33, 150, 243, 0.5)" : "#2196F3",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            color: "#FFFFFF",
          }}
        >
          {userStore.isLoggingIn ? (
            <div
              className="animate-spin"
              style={{
                width: 24,
                height: 24,
                border: "2px solid rgba(255,255,255,0.3)",
                borderTopColor: "#FFFFFF",
                borderRadius: "50%",
              }}
            />
          ) : (
            isRegister ? "注册" : "登录"
          )}
        </button>
      </div>

      {/* Mode switch */}
      <div className="flex items-center" style={{ marginTop: 16 }}>
        <span style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.6)" }}>
          {isRegister ? "已有账号？" : "还没有账号？"}
        </span>
        <button
          type="button"
          onClick={toggleMode}
          style={{ fontSize: 14, fontWeight: 600, color: "#2196F3" }}
        >
          {isRegister ? "立即登录" : "立即注册"}
        </button>
      </div>

      {/* Agreement */}
      <p
        className="text-center"
        style={{
          marginTop: 32,
          padding: "0 24px",
          fontSize: 12,
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        登录即表示同意
        <span style={{ color: "#2196F3" }}>《用户协议》</span>
        和
        <span style={{ color: "#2196F3" }}>《隐私政策》</span>
      </p>
    </form>
  );
});
