import { createContext, ReactNode, useContext } from "react";

const TextContext = createContext<{ msg: string }>({ msg: "" });

const TestProvider = () => {
  return (
    <TextContext.Provider value={{ msg: "default" }}>
      <Son>
        <Son>
          <Son />
        </Son>
      </Son>
    </TextContext.Provider>
  );
};

export default TestProvider;

const Son = (props: { children?: ReactNode }) => {
  const context = useContext(TextContext);

  return (
    <TextContext.Provider value={{ msg: context.msg + "1" }}>
      <div>
        <div>{context.msg}</div>
        {props?.children}
      </div>
    </TextContext.Provider>
  );
};
