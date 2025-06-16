import React from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@heroui/react";

export interface AuthFormProps {
  onLogin?: (email: string, password: string) => Promise<{ error?: string } | void> | { error?: string } | void;
  onSignUp?: (name: string, email: string, password: string) => Promise<{ error?: string } | void> | { error?: string } | void;
  initialTab?: "login" | "sign-up";
  headerText?: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  onLogin,
  onSignUp,
  initialTab = "login",
  headerText,
}) => {
  const [selected, setSelected] = React.useState<"login" | "sign-up">(
    initialTab,
  );

  // Login form state
  const [loginUsername, setLoginUsername] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  // Sign up form state
  const [signUpName, setSignUpName] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");

  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await onLogin?.(loginUsername, loginPassword);


      // If onLogin returns a value, check for error indication
      if (
        result &&
        typeof result === "object" &&
        "error" in result &&
        result.error
      ) {
        setError(result.error);
      }
    } catch (err: any) {
      alert("Login failed. Please try again.");
      setError(err?.message || "Login failed. Please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await onSignUp?.(signUpName, signUpEmail, signUpPassword);

      if (
        result &&
        typeof result === "object" &&
        "error" in result &&
        result.error
      ) {
        setError(result.error);

        return;
      }
      setSelected("login");
    } catch (err: any) {
      alert("Sign up failed. Please try again.");
      setError(err?.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Card className="max-w-full w-auto h-auto">
        <CardBody className="overflow-hidden px-6 py-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">{headerText ?? "Welcome"}</h2>
          </div>
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={(key) => setSelected(key as "login" | "sign-up")}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <Input
                  isRequired
                  label="Username"
                  placeholder="Enter your username"
                  type="username"
                  value={loginUsername}
                  onValueChange={setLoginUsername}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={loginPassword}
                  onValueChange={setLoginPassword}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                className="flex flex-col gap-4 h-[300px]"
                onSubmit={handleSignUp}
              >
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  value={signUpName}
                  onValueChange={setSignUpName}
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={signUpEmail}
                  onValueChange={setSignUpEmail}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={signUpPassword}
                  onValueChange={setSignUpPassword}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default AuthForm;
