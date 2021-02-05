import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";
import { Container, Error, PasswordButtonContainer } from "./styles";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import CCV from '../../assets/ccv.svg'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconPosition?: "left" | "right";
  type?: string;
  preffix?: boolean;
}

const PasswordToggle = ({
  visible,
  onToggle,
}: {
  visible: boolean;
  onToggle: () => any;
}) => {
  return (
    <PasswordButtonContainer onClick={onToggle} type="button" className="eye">
      {visible ? (
        <FiEye size={18} width="10px" />
      ) : (
        <FiEyeOff size={18} width="10px" />
      )}
    </PasswordButtonContainer>
  );
};

const Input: React.FC<InputProps> = ({
  name,
  preffix = false,
  icon: Icon,
  iconPosition = "left",
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [currentType, setCurrentType] = useState(rest.type);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {Icon && iconPosition === "left" && <Icon size={18} />}
      {preffix && <span style={{ marginRight: 4, fontSize: 14 }}>+55</span>}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
        type={currentType}
      />
      {Icon && iconPosition === "right" && <Icon size={18} />}
      {rest.type === "password" && (
        <PasswordToggle
          visible={currentType === "text"}
          onToggle={() =>
            setCurrentType(currentType === "password" ? "text" : "password")
          }
        />
      )}
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#FF0045" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default Input;
