import React from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@heroui/react";

export interface AuthFormProps {
  onLogin?: (email: string, password: string) => void;
  onSignUp?: (name: string, email: string, password: string) => void;
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
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  // Sign up form state
  const [signUpName, setSignUpName] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin?.(loginEmail, loginPassword);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp?.(signUpName, signUpEmail, signUpPassword);
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
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  value={loginEmail}
                  onValueChange={setLoginEmail}
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
