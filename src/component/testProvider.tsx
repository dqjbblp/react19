import { createContext, useContext } from "react";

const TextContext = createContext<{ msg: string }>({ msg: "" });

const TestProvider = () => {
  return (
    <TextContext.Provider
      value={{
        msg: "123",
      }}
    >
      <Son />
    </TextContext.Provider>
  );
};

export default TestProvider;

const Son = () => {
  const context = useContext(TextContext);

  return (
    <div>
      <div>{context.msg}</div>
    </div>
  );
};
