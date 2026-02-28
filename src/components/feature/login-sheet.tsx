"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useUserStore } from "@/stores/use-store";
import { useToast } from "@/components/common/toast";

export const LoginSheet = observer(function LoginSheet() {
  const userStore = useUserStore();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(0);

  // Login tab state
  const [loginAccount, setLoginAccount] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [obscureLoginPwd, setObscureLoginPwd] = useState(true);

  // Register tab state
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [obscureRegisterPwd, setObscureRegisterPwd] = useState(true);
  const [obscureConfirmPwd, setObscureConfirmPwd] = useState(true);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!userStore.showLoginSheet) return null;

  const handleLogin = async () => {
    if (!loginAccount.trim() || !loginPassword) {
      setError("请填写完整信息");
      return;
    }
    setError("");
    setIsSubmitting(true);
    const result = await userStore.login({ account: loginAccount, password: loginPassword });
    setIsSubmitting(false);
    if (result) {
      setError(result.userMessage);
    } else {
      toast.show("登录成功", "success");
      userStore.closeLoginSheet();
    }
  };

  const handleRegister = async () => {
    if (!registerPhone.trim() || !registerPassword || !confirmPassword) {
      setError("请填写完整信息");
      return;
    }
    if (registerPassword !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }
    setError("");
    setIsSubmitting(true);
    const result = await userStore.register({ account: registerPhone, password: registerPassword });
    setIsSubmitting(false);
    if (result) {
      setError(result.userMessage);
    } else {
      toast.show("注册成功", "success");
      userStore.closeLoginSheet();
    }
  };

  const isLoading = isSubmitting || userStore.isLoggingIn;

  const switchTab = (idx: number) => {
    setActiveTab(idx);
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0, 0, 0, 0.56)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) userStore.closeLoginSheet();
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: 500,
          height: 480,
          background: "#0E0B0B",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        {/* Background image */}
        <Image
          src="/images/login_modal_head_bg.webp"
          alt=""
          width={500}
          height={480}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(58, 21, 22, 0.65), rgba(13, 12, 11, 0.65))",
          }}
        />

        {/* Close button */}
        <button
          onClick={() => userStore.closeLoginSheet()}
          className="absolute z-10"
          style={{ top: 12, right: 12 }}
        >
          <Image src="/images/ov_close_btn.webp" alt="close" width={28} height={28} />
        </button>

        {/* Content */}
        <div className="relative flex h-full flex-col">
          {/* Tab bar */}
          <div style={{ paddingLeft: 29, paddingTop: 29 }}>
            <div className="flex items-end">
              {["密码登录", "账号注册"].map((label, idx) => {
                const isSelected = idx === activeTab;
                return (
                  <button
                    key={label}
                    onClick={() => switchTab(idx)}
                    className="flex flex-col items-start"
                    style={{ marginRight: 20 }}
                  >
                    <span
                      style={{
                        fontSize: isSelected ? 16 : 14,
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
                        lineHeight: "16px",
                        transition: "font-size 200ms, color 200ms",
                      }}
                    >
                      {label}
                    </span>
                    {/* Gradient indicator */}
                    <div
                      style={{
                        width: 48,
                        height: 3,
                        borderRadius: 1.5,
                        marginTop: 8,
                        background: isSelected
                          ? "linear-gradient(to bottom, #F9315C, #F64E36)"
                          : "transparent",
                        transition: "background 200ms",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form area */}
          <div style={{ marginTop: 46, paddingLeft: 30, paddingRight: 30 }} className="flex-1">
            {activeTab === 0 ? (
              /* Login tab */
              <div className="flex flex-col items-center">
                {/* Account input */}
                <CapsuleInput
                  value={loginAccount}
                  onChange={setLoginAccount}
                  placeholder="请输入账号/手机号"
                />
                <div style={{ height: 16 }} />
                {/* Password input */}
                <CapsuleInput
                  value={loginPassword}
                  onChange={setLoginPassword}
                  placeholder="请输入密码"
                  type={obscureLoginPwd ? "password" : "text"}
                  suffix={
                    <EyeButton obscure={obscureLoginPwd} onToggle={() => setObscureLoginPwd(!obscureLoginPwd)} />
                  }
                />
                {/* Error */}
                {error && (
                  <p style={{ fontSize: 12, color: "#F64E36", marginTop: 12, alignSelf: "flex-start" }}>
                    {error}
                  </p>
                )}
                <div style={{ height: 24 }} />
                {/* Submit */}
                <GradientSubmitButton
                  label={isLoading ? "请稍候..." : "登录"}
                  disabled={isLoading}
                  onClick={handleLogin}
                />
              </div>
            ) : (
              /* Register tab */
              <div className="flex flex-col items-center">
                {/* Phone input with country code */}
                <PhoneInput value={registerPhone} onChange={setRegisterPhone} />
                <div style={{ height: 16 }} />
                {/* Password input */}
                <CapsuleInput
                  value={registerPassword}
                  onChange={setRegisterPassword}
                  placeholder="请输入密码"
                  type={obscureRegisterPwd ? "password" : "text"}
                  suffix={
                    <EyeButton obscure={obscureRegisterPwd} onToggle={() => setObscureRegisterPwd(!obscureRegisterPwd)} />
                  }
                />
                <div style={{ height: 16 }} />
                {/* Confirm password input */}
                <CapsuleInput
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  placeholder="请再次输入密码"
                  type={obscureConfirmPwd ? "password" : "text"}
                  suffix={
                    <EyeButton obscure={obscureConfirmPwd} onToggle={() => setObscureConfirmPwd(!obscureConfirmPwd)} />
                  }
                />
                {/* Error */}
                {error && (
                  <p style={{ fontSize: 12, color: "#F64E36", marginTop: 12, alignSelf: "flex-start" }}>
                    {error}
                  </p>
                )}
                <div style={{ height: 24 }} />
                {/* Submit */}
                <GradientSubmitButton
                  label={isLoading ? "请稍候..." : "注册"}
                  disabled={isLoading}
                  onClick={handleRegister}
                />
              </div>
            )}
          </div>

          {/* Bottom hint */}
          <p
            className="text-center"
            style={{ fontSize: 12, fontWeight: 500, color: "#E4D5D1", paddingBottom: 20 }}
          >
            绿色、安全、永久免费请放心注册
          </p>
        </div>
      </div>
    </div>
  );
});

/* ── Sub-components ── */

/** Capsule-shaped input field matching Flutter spec: w315 h46 r23 */
function CapsuleInput({
  value,
  onChange,
  placeholder,
  type = "text",
  prefix,
  suffix,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center"
      style={{
        width: 315,
        height: 46,
        borderRadius: 23,
        background: "rgba(38, 33, 34, 0.87)",
        border: "0.5px solid #6C6C6C",
      }}
    >
      {prefix}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        className="flex-1"
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: 14,
          lineHeight: "20px",
          color: "#FFFFFF",
          paddingLeft: prefix ? 0 : 30,
          paddingRight: suffix ? 0 : 30,
        }}
      />
      {suffix && (
        <div style={{ marginRight: 16 }}>{suffix}</div>
      )}
    </div>
  );
}

/** Phone input with +86 country code prefix */
function PhoneInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <CapsuleInput
      value={value}
      onChange={onChange}
      placeholder="请输入手机号"
      type="tel"
      prefix={
        <div className="flex items-center" style={{ paddingLeft: 30 }}>
          <span style={{ fontSize: 14, lineHeight: "20px", fontWeight: 500, color: "#FFFFFF" }}>
            +86
          </span>
          <div
            style={{
              width: 1,
              height: 26,
              marginLeft: 16,
              marginRight: 16,
              background: "rgba(255, 255, 255, 0.1)",
            }}
          />
        </div>
      }
    />
  );
}

/** Eye toggle button for password visibility */
function EyeButton({ obscure, onToggle }: { obscure: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center justify-center"
      style={{ width: 28, height: 28 }}
    >
      <Image
        src={obscure ? "/images/eye_off_fill.webp" : "/images/eye_fill.webp"}
        alt=""
        width={18}
        height={15}
      />
    </button>
  );
}

/** Gradient submit button matching Flutter PlainLabelGradientBorderButton */
function GradientSubmitButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: 315,
        height: 46,
        borderRadius: 23,
        padding: 0.5,
        background: "linear-gradient(to right, rgba(254, 172, 166, 0.88), rgba(255, 183, 183, 0.86))",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 22.5,
          border: "none",
          background: "linear-gradient(to right, #F64E36, #F9315C)",
          fontSize: 14,
          fontWeight: 700,
          color: "#FFFFFF",
          lineHeight: "20px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {label}
      </button>
    </div>
  );
}
